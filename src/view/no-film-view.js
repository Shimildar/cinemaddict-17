import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoFilmMessageType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

const createNoFilmMessage = (filterType) => {
  const noFilmMessage = NoFilmMessageType[filterType];

  return `
    <section class="films">
    <section class="films-list">
    <h2 class="films-list__title">${noFilmMessage}</h2>
    </section>
    </section>`;
};

export default class NoFilmMessageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmMessage(this.#filterType);
  }
}
