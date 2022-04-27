import {createElement} from '../render.js';

const createFilmsListWrapper = () => '<div class="films-list__container"></div>';

export default class FilmsListWrapperView {
  getTemplate() {
    return createFilmsListWrapper();
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
