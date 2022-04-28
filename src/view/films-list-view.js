import {createElement} from '../render.js';

const createFilmsList = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class FilmsListView {
  getTemplate() {
    return createFilmsList();
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

  removeElement() {
    this.element = null;
  }
}
