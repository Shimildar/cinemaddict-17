import ShowMoreButtonView from '../view/show-more-button-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import SortView from '../view/sort-view.js';
import NoFilmMessageView from '../view/no-film-message-view.js';
import UserProfileView from '../view/user-profile-view.js';
import FooterView from '../view/footer-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {ExtraContainerTitles, FilterType} from '../const.js';
import {sortDateDown, sortRatingDown, sortCommentCountDown} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import {SortType, UserAction, UpdateType, UiBlockerTimeLimit, PopupMode} from '../const.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from './popup-presenter';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const PER_STEP_FILM_COUNT = 5;

export default class BoardPresenter {
  #popupContainer = null;
  #headerContainer = null;
  #boardContainer = null;
  #footerContaner = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderedFilmCount = PER_STEP_FILM_COUNT;
  #filmPresenter = new Map();
  #topRatedPresenter = new Map();
  #mostCommentedPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #popupMode = PopupMode.DEFAULT;
  #isLoading = true;
  #uiBlocker = new UiBlocker(UiBlockerTimeLimit.LOWER_LIMIT, UiBlockerTimeLimit.UPPER_LIMIT);

  #sortComponent = null;
  #userProfileComponent = null;
  #noFilmMessageComponent = null;
  #footerComponent = null;
  #loadingComponent = new LoadingView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #showMoreButton = new ShowMoreButtonView();
  #topRatedContainer = new ExtraContainerView(ExtraContainerTitles.TOP_RATED);
  #mostCommentedContainer = new ExtraContainerView(ExtraContainerTitles.MOST_COMMENTED);
  #popupComponent = null;

  constructor(popupContainer, headerContainer, boardContainer, footerContaner, filmsModel, commentsModel, filterModel) {
    this.#popupContainer = popupContainer;
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#footerContaner = footerContaner;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return filteredFilms.sort(sortDateDown);
      case SortType.RATING_DOWN:
        return filteredFilms.sort(sortRatingDown);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderBoard();
  };

  #clearBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#topRatedPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedPresenter.clear();
    this.#mostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedPresenter.clear();

    remove(this.#userProfileComponent);
    remove(this.#sortComponent);
    remove(this.#showMoreButton);
    remove(this.#topRatedContainer);
    remove(this.#mostCommentedContainer);
    remove(this.#footerComponent);

    if (this.#noFilmMessageComponent) {
      remove(this.#noFilmMessageComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderedFilmCount = PER_STEP_FILM_COUNT;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (filmCount === 0) {
      this.#renderedFilmCount = PER_STEP_FILM_COUNT;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    render(this.#filmsContainer, this.#boardContainer);
    render(this.#filmsList, this.#filmsContainer.element);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCount = this.films.length;

    if (filmCount === 0) {
      this.#renderNoFilmMessage();
      return;
    }

    this.#renderUserProfile();
    this.#renderSort();
    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderTopFilmList();
    this.#renderMostCommentedFilms();
    this.#renderFooter();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmsList.element);
  };

  #renderUserProfile = () => {
    this.#userProfileComponent = new UserProfileView(this.#filmsModel.films);
    render(this.#userProfileComponent, this.#headerContainer);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandle(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filmsContainer.element, RenderPosition.BEFOREBEGIN);
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmPresenter(this.#filmsList.filmsListContainer,this.#handleControlButtonClick, this.#handleOpenPopup);
    filmCardPresenter.init(film);
    this.#filmPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderTopFilmList = ({removeContainer = false} = {}) => {
    const sortedFilms = this.#filmsModel.films.sort(sortRatingDown).slice(0, 2).filter((item) => item.filmInfo.totalRating > 1);

    if (removeContainer) {
      remove(this.#topRatedContainer);
    }

    if (sortedFilms.length === 0) {
      return;
    }

    if (this.#topRatedPresenter.length > 0) {
      this.#topRatedPresenter.forEach((presenter) => presenter.destroy());
      this.#topRatedPresenter.clear();
    }

    render(this.#topRatedContainer, this.#filmsContainer.element);

    for (const film of sortedFilms) {
      const filmCardPresenter = new FilmPresenter(this.#topRatedContainer.filmsListContainer,this.#handleControlButtonClick, this.#handleOpenPopup);
      filmCardPresenter.init(film);
      this.#topRatedPresenter.set(film.id, filmCardPresenter);
    }
  };

  #renderMostCommentedFilms = ({removeContainer = false} = {}) => {
    const sortedFilms = this.#filmsModel.films.sort(sortCommentCountDown).slice(0, 2).filter((item) => item.comments.length > 0);

    if (removeContainer) {
      remove(this.#mostCommentedContainer);
    }

    if (sortedFilms.length === 0) {
      return;
    }

    render(this.#mostCommentedContainer, this.#filmsContainer.element);

    if (this.#mostCommentedPresenter > 0) {
      this.#mostCommentedPresenter.forEach((presenter) => presenter.destroy());
      this.#mostCommentedPresenter.clear();
    }

    for (const film of sortedFilms) {
      const filmCardPresenter = new FilmPresenter(this.#mostCommentedContainer.filmsListContainer,this.#handleControlButtonClick, this.#handleOpenPopup);
      filmCardPresenter.init(film);
      this.#mostCommentedPresenter.set(film.id, filmCardPresenter);
    }
  };

  #renderFooter = () => {
    this.#footerComponent = new FooterView(this.#filmsModel.films.length);
    render(this.#footerComponent, this.#footerContaner);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsList.element);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderNoFilmMessage = () => {
    this.#noFilmMessageComponent = new NoFilmMessageView(this.#filterType);
    render(this.#noFilmMessageComponent, this.#boardContainer);
  };

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmCount = Math.min(this.films.length, (this.#renderedFilmCount + PER_STEP_FILM_COUNT));
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmsCount) {
      remove(this.#showMoreButton);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #handleViewAction = async (actionType, updateType, update, comment) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          if (this.#filterType !== FilterType.ALL) {
            updateType = UpdateType.MINOR;
          }

          await this.#filmsModel.updateFilm(updateType, update);
          remove(this.#userProfileComponent);
          this.#renderUserProfile();

          if (this.#popupMode === PopupMode.POPUP) {
            this.#popupComponent.setPopupUpdate(actionType, update);
          }
        } catch(err) {
          if (this.#popupMode === PopupMode.POPUP) {
            this.#popupComponent.setAborting(actionType);
          }
          this.#filmPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentsModel.addComment(updateType, update, comment);
          await this.#filmsModel.updateFilm(updateType, update);
          this.#popupComponent.setPopupUpdate(actionType);
        } catch {
          this.#popupComponent.setAborting(actionType);
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          await this.#commentsModel.deleteComment(updateType, update, comment);
          await this.#filmsModel.updateFilm(updateType, update);
          this.#popupComponent.setPopupUpdate(actionType);
        } catch(err) {
          this.#popupComponent.setAborting(actionType);
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = async (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmPresenter.has(data.id)) {
          await this.#filmPresenter.get(data.id).init(data);
        }
        this.#renderTopFilmList({removeContainer: true});
        this.#renderMostCommentedFilms({removeContainer: true});
        break;
      case UpdateType.MINOR:
        if (this.#popupMode === PopupMode.POPUP) {
          this.#popupComponent.init(data);
        }
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleOpenPopup = (film) => {
    if (this.#popupMode === PopupMode.POPUP) {
      this.#popupComponent.resetView();
    }

    if (this.#popupMode === PopupMode.DEFAULT) {
      this.#popupMode = PopupMode.POPUP;
    }

    this.#popupComponent = new PopupPresenter(this.#popupContainer, this.#commentsModel, this.#handleViewAction, this.#handleControlButtonClick);
    this.#popupComponent.init(film);
  };

  #handleControlButtonClick = (update) => {
    this.#handleViewAction(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      update
    );
  };
}

