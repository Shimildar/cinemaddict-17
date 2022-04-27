import {createElement} from '../render.js';

const createExtraContainer = () => '<section class="films-list films-list--extra"></section>';

export default class ExtraContainerView {
  getTemplate() {
    return createExtraContainer();
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
