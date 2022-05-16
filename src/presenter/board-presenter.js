import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import SortView from '../view/sort-view.js';
import NoFilmMessageView from '../view/no-film-view.js';
import {render, remove} from '../framework/render.js';
import {extraContainerTitles} from '../const.js';
import {updateItem} from '../utils/common.js';
import {getFilterType} from '../utils/filter.js';
import FilmCardPresenter from './film-presenter.js';
import FilterPresenter from './filter-presenter.js';

const PER_STEP_FILM_COUNT = 5;
const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;

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

  #sort = new SortView();
  #noFilmMessage = new NoFilmMessageView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #showMoreButton = new ShowMoreButtonView();
  #topRatedContainer = new ExtraContainerView(extraContainerTitles.TOP_RATED);
  #mostCommentedContainer = new ExtraContainerView(extraContainerTitles.MOST_COMMENTED);

  #filmPresenter = new Map();

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

  #renderBoard = () => {
    render(new UserProfileView(this.#boardFilms), this.#boardContainerHeader);
    this.#renderFilter(this.#boardFilms);

    if (this.#boardFilms.length === 0) {
      render(this.#noFilmMessage, this.#boardContainerMain);
      this.#renderFooter();
      return;
    }

    render(this.#sort, this.#boardContainerMain);
    render(this.#filmsContainer, this.#boardContainerMain);
    render(this.#filmsList, this.#filmsContainer.element);
    this.#renderFilmList();
    this.#renderTopFilmList();
    this.#renderMostCommentedFilmList();
    this.#renderFooter();
  };

  #handleClearPopup = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilterChange = () => {
    const filter = getFilterType(this.#boardFilms);
    console.log(filter);                 //временно, пока не дошел до реализации
  };

  #renderFilter = (films) => {
    const filterPresenter = new FilterPresenter(this.#boardContainerMain, this.#handleFilterChange);
    filterPresenter.init(films);
  };

  #handleTaskChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = PER_STEP_FILM_COUNT;
    remove(this.#showMoreButton);
  };

  #renderFilm = (filmCard, container) => {
    const filmCardPresenter = new FilmCardPresenter(container, this.#boardComments, this.#handleTaskChange, this.#handleClearPopup);
    filmCardPresenter.init(filmCard);
    this.#filmPresenter.set(filmCard.id, filmCardPresenter);
  };

  #renderFilms = (from, to) => {
    this.#boardFilms.slice(from, to)
      .forEach((filmCard) => this.#renderFilm(filmCard, this.#filmsList.filmsListContainer));
  };

  #renderFilmList = () => {
    this.#renderFilms(0, (Math.min(this.#boardFilms.length, PER_STEP_FILM_COUNT)));

    if (this.#boardFilms.length > PER_STEP_FILM_COUNT) {
      this.#renderShowMoreButton();
    }
  };

  #renderTopFilmList = () => {
    render(this.#topRatedContainer, this.#filmsContainer.element);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      this.#renderFilm(this.#boardFilms[i + 6], this.#topRatedContainer.filmsListContainer);// Временно [i + 6]
    }
  };

  #renderMostCommentedFilmList = () => {
    render(this.#mostCommentedContainer, this.#filmsContainer.element);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      this.#renderFilm(this.#boardFilms[i + 3], this.#mostCommentedContainer.filmsListContainer);// Временно [i + 3]
    }
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsList.element);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);


  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, (this.#renderedFilmCount + PER_STEP_FILM_COUNT));

    this.#renderedFilmCount += PER_STEP_FILM_COUNT;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#showMoreButton);
    }
  };

  #renderFooter = () => {
    render(new FooterStatisticsView(this.#boardFilms.length), this.#boardContainerFooter);
  };
}

