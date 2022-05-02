import {createElement} from '../render.js';
import {humanizeDate, humanizeFilmRuntime, cutTextLength} from '../utils.js';

const filmReleaseDateFormat = 'YYYY';
const descriptionMaxLength = 138;

const createFilmCard = (film) => {
  const {filmInfo, comments} = film;
  const releaseDate = humanizeDate(filmInfo.release.date, filmReleaseDateFormat);
  const filmRuntime = humanizeFilmRuntime(filmInfo.runtime);
  const description = cutTextLength(filmInfo.description, descriptionMaxLength);

  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
              <span class="film-card__year">${releaseDate}</span>
              <span class="film-card__duration">${filmRuntime}</span>
              <span class="film-card__genre">${filmInfo.genre}</span>
          </p>
          <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
    </article>`
  );
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCard(this.film);
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
