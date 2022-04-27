import ButtonShowMoreView from '../view/button-show-more-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title.js';
import FilmsListWrapperView from '../view/films-list-wrapper-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import MostCommentedTitleView from '../view/most-commented-title-view.js';
import TopRatedTitleView from '../view/top-rated-title-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  filmsContainer = new FilmsContainerView();
  filmsList = new FilmsListView();
  filmsListWrapper = new FilmsListWrapperView();
  topRatedContainer = new ExtraContainerView();
  mostCommentedContainer = new ExtraContainerView();
  topRatedList = new FilmsListWrapperView();
  mostCommentedList = new FilmsListWrapperView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    // Menu, filter
    render(new MenuView(), this.boardContainer);
    render(new FilterView(), this.boardContainer);

    // Main films list
    render(this.filmsContainer, this.boardContainer);
    render(this.filmsList, this.filmsContainer.getElement());
    render(new FilmsListTitleView(), this.filmsList.getElement());
    render(this.filmsListWrapper, this.filmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListWrapper.getElement());
    }

    // Button "Show more"
    render(new ButtonShowMoreView(), this.filmsList.getElement());

    // Top rated
    render(this.topRatedContainer, this.filmsContainer.getElement());
    render(new TopRatedTitleView(), this.topRatedContainer.getElement());
    render(this.topRatedList, this.topRatedContainer.getElement());

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.topRatedList.getElement());
    }

    // Most commented
    render(this.mostCommentedContainer, this.filmsContainer.getElement());
    render(new MostCommentedTitleView(), this.mostCommentedContainer.getElement());
    render(this.mostCommentedList, this.mostCommentedContainer.getElement());

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.mostCommentedList.getElement());
    }
  };
}
