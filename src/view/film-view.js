import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate, humanizeFilmRuntime} from '../utils/films.js';

const filmReleaseDateFormat = 'YYYY';
const descriptionMaxLength = 138;
const CONTROL_BUTTON_ACTIVE_CLASS = 'film-card__controls-item--active';

const cutTextLength = (text, maxLength) => (text.length > 140) ? text.slice(0, maxLength).concat('...') : text;

const createFilmCard = (film) => {
  const {id, filmInfo, comments, userDetails, isDisabled} = film;

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
          <img src="${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${cutTextLength(filmInfo.description, descriptionMaxLength)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist
          ${userDetails.watchlist ? CONTROL_BUTTON_ACTIVE_CLASS : ''}" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched
          ${userDetails.alreadyWatched ? CONTROL_BUTTON_ACTIVE_CLASS : ''}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite
          ${userDetails.favorite ? CONTROL_BUTTON_ACTIVE_CLASS : ''}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
        </div>
    </article>`
  );
};

export default class FilmView extends AbstractStatefulView {

  constructor(film) {
    super();
    this._state = FilmView.convertFilmToState(film);
  }

  get template() {
    return createFilmCard(this._state);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  };

  setControlButtonClickHandler = (callback) => {
    this._callback.controlButtonClick = callback;

    this.element.querySelector('.film-card__controls').addEventListener('click', (evt) => {
      evt.preventDefault();

      let update;
      switch (evt.target) {
        case this.element.querySelector('.film-card__controls-item--add-to-watchlist'):
          update = { ...FilmView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, watchlist: !this._state.userDetails.watchlist }};
          break;
        case this.element.querySelector('.film-card__controls-item--mark-as-watched'):
          update = { ...FilmView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, alreadyWatched: !this._state.userDetails.alreadyWatched }};
          break;
        case this.element.querySelector('.film-card__controls-item--favorite'):
          update = { ...FilmView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, favorite: !this._state.userDetails.favorite }};
          break;
      }

      this.updateElement({
        isDisabled: true
      });

      this._callback.controlButtonClick(update);
    });
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(FilmView.convertStateToFilm(this._state));
  };

  static convertFilmToState = (film) => ({...film,
    isDisabled: false,
  });

  static convertStateToFilm = (state) => {
    const film = {...state};

    delete film.isDisabled;

    return film;
  };
}
