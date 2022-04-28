import ButtonShowMoreView from '../view/button-show-more-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import {render} from '../render.js';

const FILMS_LIST_COUNT = 5;
const TOP_RATED_LIST_COUNT = 2;
const MOST_COMMENTED_LIST_COUNT = 2;
const topRatedTitle = 'Top rated';
const mostCommentedTitle = 'Most commented';

export default class BoardPresenter {
  filmsContainer = new FilmsContainerView();
  filmsContainerElement = this.filmsContainer.getElement();
  filmsList = new FilmsListView();
  topRatedContainer = new ExtraContainerView();
  mostCommentedContainer = new ExtraContainerView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    // Menu, filter
    render(new MenuView(), this.boardContainer);
    render(new FilterView(), this.boardContainer);

    // Main films list
    render(this.filmsContainer, this.boardContainer);
    render(this.filmsList, this.filmsContainerElement);

    for (let i = 0; i < FILMS_LIST_COUNT; i++) {
      render(new FilmCardView(), this.filmsList.getFilmsListContainer());
    }

    // Button "Show more"
    render(new ButtonShowMoreView(), this.filmsList.getElement());

    // // Top rated
    render(this.topRatedContainer, this.filmsContainerElement);
    this.topRatedContainer.renderTitle(topRatedTitle);

    for (let i = 0; i < TOP_RATED_LIST_COUNT; i++) {
      render(new FilmCardView(), this.topRatedContainer.getFilmsListContainer());
    }

    // // Most commented
    render(this.mostCommentedContainer, this.filmsContainerElement);
    this.mostCommentedContainer.renderTitle(mostCommentedTitle);

    for (let i = 0; i < MOST_COMMENTED_LIST_COUNT; i++) {
      render(new FilmCardView(), this.mostCommentedContainer.getFilmsListContainer());
    }
  };
}

