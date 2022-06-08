import ShowMoreButtonView from '../view/show-more-button-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import SortView from '../view/sort-view.js';
import NoFilmMessageView from '../view/no-film-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {ExtraContainerTitles, FilterType} from '../const.js';
import {sortDateDown, sortRatingDown} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import {SortType, UserAction, UpdateType} from '../const.js';
import FilmPresenter from './film-presenter.js';
import FilmView from '../view/film-view.js';
import LoadingView from '../view/loading-view.js';

const PER_STEP_FILM_COUNT = 5;
const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderedFilmCount = PER_STEP_FILM_COUNT;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  #sortComponent = null;
  #noFilmMessageComponent = null;
  #loadingComponent = new LoadingView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #showMoreButton = new ShowMoreButtonView();
  #topRatedContainer = new ExtraContainerView(ExtraContainerTitles.TOP_RATED);
  #mostCommentedContainer = new ExtraContainerView(ExtraContainerTitles.MOST_COMMENTED);

  constructor(boardContainer, filmsModel, commentsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
    const taskCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreButton);
    remove(this.#topRatedContainer);
    remove(this.#mostCommentedContainer);

    if (this.#noFilmMessageComponent) {
      remove(this.#noFilmMessageComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderedFilmCount = PER_STEP_FILM_COUNT;
    } else {
      this.#renderedFilmCount = Math.min(taskCount, this.#renderedFilmCount);
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

    this.#renderSort();
    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderTopFilmList();
    this.#renderMostCommentedFilmList();
  };

  #handleViewAction = (actionType, updateType, update, comment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(comment);
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(comment);
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmsList.element);
  };

  #handleClearPopup = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandle(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filmsContainer.element, RenderPosition.BEFOREBEGIN);
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmPresenter(this.#filmsList.filmsListContainer, this.#commentsModel, this.#handleViewAction, this.#handleClearPopup);
    filmCardPresenter.init(film);
    this.#filmPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderTopFilmList = () => {
    render(this.#topRatedContainer, this.#filmsContainer.element);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmView(this.films[i + 6]), this.#topRatedContainer.filmsListContainer);// Временно [i + 6]
    }
  };

  #renderMostCommentedFilmList = () => {
    render(this.#mostCommentedContainer, this.#filmsContainer.element);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmView(this.films[i + 3]), this.#mostCommentedContainer.filmsListContainer);// Временно [i + 3]
    }
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

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsList.element);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderNoFilmMessage = () => {
    this.#noFilmMessageComponent = new NoFilmMessageView(this.#filterType);
    render(this.#noFilmMessageComponent, this.#boardContainer);
  };
}

