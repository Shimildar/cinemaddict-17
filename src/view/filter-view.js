import AbstractView from '../framework/view/abstract-view.js';
import {getFilterType} from '../utils/filter.js';

const createFilter = (films) => {
  const filter = getFilterType(films);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filter.watchlist.length}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filter.alreadyWatched.length}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filter.favorite.length}</span></a>
  </nav>`
  );
};

export default class FilterView extends AbstractView {

  constructor(films) {
    super();
    this.films = films;
  }

  get template() {
    return createFilter(this.films);
  }
}
