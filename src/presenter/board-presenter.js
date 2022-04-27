import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListWrapperView from '../view/films-list-wrapper-view.js';
import FilterView from '../view/filter-view.js';
import MenuView from '../view/menu-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  filmsContainer = new FilmsContainerView();
  filmsList = new FilmsListView();
  filmsListWrapper = new FilmsListWrapperView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new MenuView(), this.boardContainer);
    render(new FilterView(), this.boardContainer);
    render(this.filmsContainer, this.boardContainer);
    render(this.filmsList, this.filmsContainer.getElement());
    render(this.filmsListWrapper, this.filmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListWrapper.getElement());
    }

    render(new ButtonShowMoreView(), this.filmsList.getElement());
  };
}
