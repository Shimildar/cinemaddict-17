import AbstractView from '../framework/view/abstract-view.js';
import {getFilterType} from '../utils/filter.js';

const createFilter = (films) => {
  const filter = getFilterType(films);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filter.WATCHLIST.length}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filter.WATCHED.length}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filter.FAVORITES.length}</span></a>
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

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    const target = evt.target;
    evt.preventDefault();

    if (target.matches('.main-navigation__item') || target.matches('.main-navigation__item-count')) {
      this.element.querySelectorAll('.main-navigation__item').forEach((item) => item.classList.remove('main-navigation__item--active'));
      target.closest('.main-navigation__item').classList.add('main-navigation__item--active');
    }
    this._callback.click(evt);
  };
}
