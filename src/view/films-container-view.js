import AbstractView from '../framework/view/abstract-view.js';

const createFilmsMainContaner = () => '<section class="films"></section>';

export default class FilmsContainerView extends AbstractView {

  get template() {
    return createFilmsMainContaner();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}

