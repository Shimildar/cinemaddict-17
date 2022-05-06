import {createElement} from '../render.js';

const createFilmsMainContaner = () => '<section class="films"></section>';

export default class FilmsContainerView {
  #element = null;

  get template() {
    return createFilmsMainContaner();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  createClickListener(cb) {
    this.#element.addEventListener('click', cb);
  }

  removeElement() {
    this.#element = null;
  }
}

