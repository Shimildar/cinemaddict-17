import {createElement} from '../render.js';

const createButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView {
  #element = null;

  get template() {
    return createButtonShowMore();
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
