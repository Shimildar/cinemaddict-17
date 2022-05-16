import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, humanizeFilmRuntime, getClassForControlButton} from '../utils/films.js';

const filmReleaseDateFormat = 'YYYY';
const descriptionMaxLength = 138;
const CONTROL_BUTTON_ACTIVE_CLASS = 'film-card__controls-item--active';

const cutTextLength = (text, maxLength) => (text.length > 140) ? text.slice(0, maxLength).concat('...') : text;

const createFilmCard = (film) => {
  const {id, filmInfo, comments, userDetails} = film;

  return (
    `<article class="film-card" id="${id}">
        <a class="film-card__link">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
              <span class="film-card__year">${humanizeDate(filmInfo.release.date, filmReleaseDateFormat)}</span>
              <span class="film-card__duration">${humanizeFilmRuntime(filmInfo.runtime)}</span>
              <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${cutTextLength(filmInfo.description, descriptionMaxLength)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getClassForControlButton(userDetails.watchlist, CONTROL_BUTTON_ACTIVE_CLASS)}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getClassForControlButton(userDetails.alreadyWatched, CONTROL_BUTTON_ACTIVE_CLASS)}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${getClassForControlButton(userDetails.favorite, CONTROL_BUTTON_ACTIVE_CLASS)}" type="button">Mark as favorite</button>
        </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {

  constructor(film) {
    super();
    this.film = film;
  }

  get template() {
    return createFilmCard(this.film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setControlButtonClickHandler = (watchlistClick, watchedClick, favoriteClick) => {
    this._callback.watchlistClick = watchlistClick;
    this._callback.watchedClick = watchedClick;
    this._callback.favoriteClick = favoriteClick;

    this.element.querySelector('.film-card__controls').addEventListener('click', (evt) => {
      const target = evt.target;
      evt.preventDefault();

      target.classList.toggle(CONTROL_BUTTON_ACTIVE_CLASS);

      switch (target) {
        case this.element.querySelector('.film-card__controls-item--add-to-watchlist'):
          this._callback.watchlistClick();
          break;
        case this.element.querySelector('.film-card__controls-item--mark-as-watched'):
          this._callback.watchedClick();
          break;
        case this.element.querySelector('.film-card__controls-item--favorite'):
          this._callback.favoriteClick();
          break;
      }
    });
  };
}
