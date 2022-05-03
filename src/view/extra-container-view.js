import {createElement} from '../render.js';

const createExtraContainer = (titleText) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${titleText}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class ExtraContainerView {
  constructor(titleText) {
    this.titleText = titleText;
  }

  getTemplate() {
    return createExtraContainer(this.titleText);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getFilmsListContainer() {
    return this.element.querySelector('.films-list__container');
  }

  removeElement() {
    this.element = null;
  }
}
