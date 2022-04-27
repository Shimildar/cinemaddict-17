import {createElement} from '../render.js';

const createFilmsMainContaner = () => '<section class="films"></section>';

export default class FilmsContainerView {
  getTemplate() {
    return createFilmsMainContaner();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
