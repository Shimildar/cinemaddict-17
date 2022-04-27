import {createElement} from '../render.js';

const createFilmsList = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
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

  removeElement() {
    this.element = null;
  }
}
