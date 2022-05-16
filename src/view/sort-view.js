import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSort = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {

  get template() {
    return createSort();
  }

  setSortTypeChangeHandle = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    const target = evt.target;

    if (target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.element.querySelectorAll('.sort__button').forEach((item) => item.classList.remove('sort__button--active'));
    target.classList.add('sort__button--active');
    this._callback.sortTypeChange(target.dataset.sortType);
  };
}
