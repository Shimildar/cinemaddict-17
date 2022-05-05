import {createElement} from '../render.js';

const createFooterStatistics = (count) => `<p>${count} movies inside</p>`;

export default class FooterStatisticsView {
  #element = null;

  constructor(count) {
    this.count = count;
  }

  get template() {
    return createFooterStatistics(this.count);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
