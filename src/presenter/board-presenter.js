import ButtonShowMoreView from '../view/button-show-more-view.js';
import UserProfileView from '../view/user-profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../render.js';
import {getItemFromCollection, isEscPressed} from '../utils.js';

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

  #filmsContainer = new FilmsContainerView();
  #filmsContainerElement = this.#filmsContainer.element;
  #filmsList = new FilmsListView();
  #topRatedContainer = new ExtraContainerView(topRatedTitle);
  #mostCommentedContainer = new ExtraContainerView(mostCommentedTitle);

  init = (boardContainer, filmsModel, commentsModel) => {
    this.#boardContainer = boardContainer;
    this.#boardContainerHeader = this.#boardContainer.querySelector('.header');
    this.#boardContainerMain = this.#boardContainer.querySelector('.main');
    this.#boardContainerFooter = this.#boardContainer.querySelector('.footer');
    this.#filmsModel = filmsModel;
    this.#boardFilms = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#boardComments = [...this.#commentsModel.comments];

    // User profile
    render(new UserProfileView(), this.#boardContainerHeader);

    // Menu, filter
    render(new MenuView(), this.#boardContainerMain);
    render(new FilterView(), this.#boardContainerMain);

    // Container
    render(this.#filmsContainer, this.#boardContainerMain);

    // Main films list
    render(this.#filmsList, this.#filmsContainerElement);

    for (const film of this.#boardFilms) {
      render(new FilmCardView(film), this.#filmsList.filmsListContainer);
    }

    // Button "Show more"
    render(new ButtonShowMoreView(), this.#filmsList.element);

    // // Top rated
    render(this.#topRatedContainer, this.#filmsContainerElement);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmCardView(this.#boardFilms[i + 6]), this.#topRatedContainer.filmsListContainer);// Временно [i + 6]
    }

    // // Most commented
    render(this.#mostCommentedContainer, this.#filmsContainerElement);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmCardView(this.#boardFilms[i + 3]), this.#mostCommentedContainer.filmsListContainer);// Временно [i + 3]
    }

    // Footer statistics
    render(new FooterStatisticsView(), this.#boardContainerFooter);

    this.#filmsContainer.getEventListener(this.#renderPopup);
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

      document.addEventListener('keydown', onEscKeyDown, {once: true});
      this.#boardContainer.classList.add('hide-overflow');
      popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', removePopupFromPage, {once: true});

      render(popupComponent, this.#boardContainer);
    }
  };
}

