import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import PopupView from '../view/popup-view.js';
import NoFilmMessageView from '../view/no-film-view.js';
import {render} from '../render.js';
import {getItemFromCollection, isEscPressed} from '../utils.js';

const PER_STEP_FILM_COUNT = 5;
const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;
const topRatedTitle = 'Top rated';
const mostCommentedTitle = 'Most commented';

export default class BoardPresenter {
  #boardContainer = null;
  #boardContainerHeader = null;
  #boardContainerMain = null;
  #boardContainerFooter = null;
  #filmsModel = null;
  #commentsModel = null;
  #boardFilms = [];
  #boardComments = [];
  #renderedFilmCount = PER_STEP_FILM_COUNT;

  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #showMoreButton = new ShowMoreButtonView();
  #topRatedContainer = new ExtraContainerView(topRatedTitle);
  #mostCommentedContainer = new ExtraContainerView(mostCommentedTitle);

  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardContainerHeader = this.#boardContainer.querySelector('.header');
    this.#boardContainerMain = this.#boardContainer.querySelector('.main');
    this.#boardContainerFooter = this.#boardContainer.querySelector('.footer');
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#commentsModel.comments];

    this.#renderBoard();
  };

  #renderPopup = (evt) => {
    const target = evt.target;

    const removePopupFromPage = () => {
      this.#boardContainer.classList.remove('hide-overflow');
      this.#boardContainer.lastChild.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(e) {
      if (isEscPressed(e)) {
        evt.preventDefault();
        removePopupFromPage();
      }
    }

    if (target.matches('.film-card__poster')) {
      if (this.#boardContainer.querySelector('.film-details')) {
        this.#boardContainer.lastChild.remove();
      }
      const filmFromPage = target.closest('.film-card');
      const filmForPopup = getItemFromCollection(this.#boardFilms, filmFromPage);
      const popupComponent = new PopupView(filmForPopup, this.#boardComments);

      this.#boardContainer.classList.add('hide-overflow');
      render(popupComponent, this.#boardContainer);
      popupComponent.createOnButtonClickListener(removePopupFromPage);
      document.addEventListener('keydown', onEscKeyDown);
    }
  };

  #onShowMoreButtonClick = () => {
    this.#boardFilms.slice(this.#renderedFilmCount, this.#renderedFilmCount + PER_STEP_FILM_COUNT)
      .forEach((film) => {
        render(new FilmCardView(film), this.#filmsList.filmsListContainer);
      });

    this.#renderedFilmCount += PER_STEP_FILM_COUNT;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      this.#showMoreButton.element.remove();
      this.#showMoreButton.removeElement();
    }
  };

  #renderBoard = () => {
    render(new UserProfileView(), this.#boardContainerHeader);
    render(new MenuView(), this.#boardContainerMain);

    if (this.#boardFilms.length === 0) {
      render(new NoFilmMessageView(), this.#boardContainerMain);
    }

    render(new FilterView(), this.#boardContainerMain);
    render(this.#filmsContainer, this.#boardContainerMain);
    render(this.#filmsList, this.#filmsContainer.element);

    for (let i = 0; i < Math.min(this.#boardFilms.length, PER_STEP_FILM_COUNT); i++) {
      render(new FilmCardView(this.#boardFilms[i]), this.#filmsList.filmsListContainer);
    }

    // Button "Show more"
    if (this.#boardFilms.length > PER_STEP_FILM_COUNT) {
      render(this.#showMoreButton, this.#filmsList.element);

      this.#showMoreButton.createClickListener(this.#onShowMoreButtonClick);
    }
    // Top rated
    render(this.#topRatedContainer, this.#filmsContainer.element);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmCardView(this.#boardFilms[i + 6]), this.#topRatedContainer.filmsListContainer);// Временно [i + 6]
    }
    // Most commented
    render(this.#mostCommentedContainer, this.#filmsContainer.element);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmCardView(this.#boardFilms[i + 3]), this.#mostCommentedContainer.filmsListContainer);// Временно [i + 3]
    }
    // Listener renderPopup
    this.#filmsContainer.createClickListener(this.#renderPopup);


    // Footer statistics
    render(new FooterStatisticsView(), this.#boardContainerFooter);
  };
}

