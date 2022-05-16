import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const getFilterTypeCount = (films) => ({
  [FilterType.WATCHLIST]: films.filter((item) =>  item.userDetails.watchlist).length,
  [FilterType.HISTORY]: films.filter((item) => item.userDetails.alreadyWatched).length,
  [FilterType.FAVORITE]: films.filter((item) => item.userDetails.favorite).length
});

const createFilter = (films) => {
  const filter = getFilterTypeCount(films);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type=${FilterType.ALL}>All movies</a>
    <a href="#watchlist" class="main-navigation__item" data-filter-type data-filter-type=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${filter.watchlist}</span></a>
    <a href="#history" class="main-navigation__item" data-filter-type=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${filter.alreadyWatched}</span></a>
    <a href="#favorites" class="main-navigation__item" data-filter-type=${FilterType.FAVORITE}>Favorites <span class="main-navigation__item-count">${filter.favorite}</span></a>
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

  setFilterTypeChangeHandle = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    const target = evt.target;

    if (target.matches('.main-navigation__item') || target.matches('.main-navigation__item-count')) {
      evt.preventDefault();

      this.element.querySelectorAll('.main-navigation__item').forEach((item) => item.classList.remove('main-navigation__item--active'));
      target.closest('.main-navigation__item').classList.add('main-navigation__item--active');

      this._callback.filterTypeChange(target.dataset.filterType);
    }
  };
}
