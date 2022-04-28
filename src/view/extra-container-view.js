import {createElement} from '../render.js';

const createExtraContainer = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title"></h2>
    <div class="films-list__container">
    </div>
  </section>`
);

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

  getFilmsListContainer() {
    if (!this.element) {
      this.getElement();
    }

    return this.element.querySelector('.films-list__container');
  }

  renderTitle(title) {
    if (!this.element) {
      this.getElement();
    }

    const titleText = this.element.querySelector('.films-list__title');
    titleText.textContent = title;
  }

  removeElement() {
    this.element = null;
  }
}
