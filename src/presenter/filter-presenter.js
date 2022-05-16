import {render, remove, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #changeData = null;

  #filterComponent = null;

  #films = null;

  constructor(filterContainer, changeData) {
    this.#filterContainer = filterContainer;
    this.#changeData = changeData;
  }

  init = (films) => {
    this.#films = films;

    const prevfilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(films);
    this.#filterComponent.setClickHandler(this.#handleWatchlistClick);

    if (prevfilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    if (this.#filterContainer.contains(prevfilterComponent.element)) {
      replace(this.#filterContainer, prevfilterComponent);
    }

    remove(prevfilterComponent);
  };

  #handleWatchlistClick = () => {
    this.#changeData();
  };

  destroy = () => {
    remove(this.#filterComponent);
  };

}
