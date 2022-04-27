import {createElement} from '../render.js';

const createTopRatedTitle = () => '<h2 class="films-list__title">Top rated</h2>';

export default class TopRatedTitleView {
  getTemplate() {
    return createTopRatedTitle();
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
