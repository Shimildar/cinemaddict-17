import ButtonShowMoreView from '../view/button-show-more-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../render.js';

const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;
const topRatedTitle = 'Top rated';
const mostCommentedTitle = 'Most commented';

export default class BoardPresenter {
  filmsContainer = new FilmsContainerView();
  filmsContainerElement = this.filmsContainer.getElement();
  filmsList = new FilmsListView();
  topRatedContainer = new ExtraContainerView(topRatedTitle);
  mostCommentedContainer = new ExtraContainerView(mostCommentedTitle);

  init = (boardContainer, filmsModel, commentsModel) => {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    this.boardComments = [...this.commentsModel.getComments()];

    // Menu, filter
    render(new MenuView(), this.boardContainer);
    render(new FilterView(), this.boardContainer);

    // Container
    render(this.filmsContainer, this.boardContainer);

    // Main films list
    render(this.filmsList, this.filmsContainerElement);

    for (const film of this.boardFilms) {
      render(new FilmCardView(film), this.filmsList.getFilmsListContainer());
    }

    // Button "Show more"
    render(new ButtonShowMoreView(), this.filmsList.getElement());

    // // Top rated
    render(this.topRatedContainer, this.filmsContainerElement);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmCardView(this.boardFilms[i + 6]), this.topRatedContainer.getFilmsListContainer());// Временно [i + 6]
    }

    // // Most commented
    render(this.mostCommentedContainer, this.filmsContainerElement);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmCardView(this.boardFilms[i + 3]), this.mostCommentedContainer.getFilmsListContainer());// Временно [i + 3]
    }

    // Popup
    render(new PopupView(this.boardFilms[0], this.boardComments), this.boardContainer);
  };
}

