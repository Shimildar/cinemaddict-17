import {createElement} from '../render.js';

const createExtraContainer = (titleText) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${titleText}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class ExtraContainerView {
  #element = null;

  constructor(titleText) {
    this.titleText = titleText;
  }

  get template() {
    return createExtraContainer(this.titleText);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get filmsListContainer() {
    return this.#element.querySelector('.films-list__container');
  }

  removeElement() {
    this.#element = null;
  }
}
