import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate, humanizeFilmRuntime, isCtrlEnterPressed, humanizeCommentDate} from '../utils/films.js';
import {PopupDateFormat} from '../const.js';
import he from 'he';

const CONTROL_BUTTON_ACTIVE_CLASS = 'film-details__control-button--active';
const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

const updateGenreTerm = (currentGenres) => (currentGenres.length > 1) ? 'Genres' : 'Genre';

const createGenreElements = (currentGenres) =>
  currentGenres.map((genre) => (
    `<span class="film-details__genre">${genre}</span>`)).join('');

const createCommentsList = (comments, isDeleting) =>
  comments.map(({id, author, comment, date, emotion}) => (
    `<li class="film-details__comment" data-comment-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
          <button class="film-details__comment-delete" ${isDeleting === id ? 'disabled' : ''}>${isDeleting === id ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
      </li>`
  )).join('');

const getEmodji = (emoji) => (emoji) ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : '';

const createPopup = (film) => {
  const {filmInfo, userDetails, emoji, description, popupComments, isSaving, isDisabled, isDeleting} = film;
  const inputChecked = (emotion) => (emoji === emotion) ? 'checked' : '';

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

            <p class="film-details__age">+${filmInfo.ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(filmInfo.release.date, PopupDateFormat.FILM_RELEASE)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${humanizeFilmRuntime(filmInfo.runtime, filmInfo.runtime > 60 ? 'H[h] m[m]' : 'm[m]')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${updateGenreTerm(filmInfo.genre)}</td>
                <td class="film-details__cell">
                  ${createGenreElements(filmInfo.genre)}
              </tr>
            </table>

            <p class="film-details__film-description">
            ${filmInfo.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${userDetails.watchlist ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
          <button type="button" class="film-details__control-button ${userDetails.alreadyWatched ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--watched" id="watched" name="watched" ${isDisabled ? 'disabled' : ''}>Already watched</button>
          <button type="button" class="film-details__control-button ${userDetails.favorite ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--favorite" id="favorite" name="favorite" ${isDisabled ? 'disabled' : ''}>Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${popupComments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${createCommentsList(popupComments, isDeleting)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${getEmodji(emoji)}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isSaving ? 'disabled' : ''}>${description}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${inputChecked('smile')} ${isSaving ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${inputChecked('sleeping')} ${isSaving ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${inputChecked('puke')} ${isSaving ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${inputChecked('angry')} ${isSaving ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class PopupView extends AbstractStatefulView {

  constructor(film, popupComments) {
    super();
    this._state = PopupView.convertFilmToState(film, popupComments);

    this.#setInnerHandlers();
  }

  get template() {
    return createPopup(this._state);
  }

  setControlButtonClickHandler = (callback) => {
    this._callback.controlButtonClick = callback;

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== 'BUTTON') {
        return;
      }

      let update;

      switch (evt.target) {
        case this.element.querySelector('.film-details__control-button--watchlist'):
          update = { ...this._state, userDetails: { ...this._state.userDetails, watchlist: !this._state.userDetails.watchlist }};
          break;
        case this.element.querySelector('.film-details__control-button--watched'):
          update = { ...this._state, userDetails: { ...this._state.userDetails, alreadyWatched: !this._state.userDetails.alreadyWatched }};
          break;
        case this.element.querySelector('.film-details__control-button--favorite'):
          update = { ...this._state, userDetails: { ...this._state.userDetails, favorite: !this._state.userDetails.favorite }};
          break;
      }

      this.updateElement({
        isDisabled: true
      });

      this._callback.controlButtonClick({...PopupView.convertStateToFilm(update)});

    });
  };

  setCloseBtnClickHandler = (callback) => {
    this._callback.closeBtnclick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  setCommentAddHandler = (callback) => {
    this._callback.commentFormSubmit = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#commentAddHandler);
  };

  setCommentDeleteHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button) => button.addEventListener('click', this.#commentDeleteClickHandler));
  };

  setButtonsShake = (callback) => {
    this.element.querySelector('.film-details__controls').classList.add(SHAKE_CLASS_NAME);

    setTimeout(() => {
      this.element.querySelector('.film-details__controls').classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  setFormShake = (callback) => {
    this.element.querySelector('.film-details__new-comment').classList.add(SHAKE_CLASS_NAME);

    setTimeout(() => {
      this.element.querySelector('.film-details__new-comment').classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  setDeleteButtonShake = (callback) => {
    this.element.querySelector(`[data-comment-id = "${this._state.isDeleting}"]`).classList.add(SHAKE_CLASS_NAME);

    setTimeout(() => {
      this.element.querySelector(`[data-comment-id = "${this._state.isDeleting}"]`).classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
    this.setCloseBtnClickHandler(this._callback.closeBtnclick);
    this.setCommentAddHandler(this._callback.commentFormSubmit);
    this.setCommentDeleteHandler(this._callback.deleteClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((input) => input.addEventListener('click', this.#confirmEmojiHandler));
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeBtnclick();
  };

  #confirmEmojiHandler = (evt) => {
    const target = evt.target.value;

    this.updateElement({
      emoji: target
    });
  };

  #descriptionInputHandler = (evt) => {
    this._setState({
      description: evt.target.value
    });
  };

  #commentAddHandler = (evt) => {
    if(!this._state.emoji || this._state.description === '') {
      return;
    }

    if (isCtrlEnterPressed(evt)) {
      evt.preventDefault();

      const newCommentComponent = {
        comment: evt.target.value,
        emotion: this._state.emoji
      };

      this.updateElement({
        isSaving: true
      });

      this._callback.commentFormSubmit(this._state.id, newCommentComponent);
    }
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();

    const commentId = evt.target.closest('.film-details__comment').dataset.commentId;

    this.updateElement({
      isDeleting: commentId
    });

    this._callback.deleteClick(commentId);
  };

  static convertFilmToState = (film, popupComments) => ({...film,
    popupComments,
    emoji: false,
    description: '',
    isSaving: false,
    isDisabled: false,
    isDeleting: false
  });

  static convertStateToFilm = (state) => {
    const film = {...state};

    delete film.emoji;
    delete film.description;
    delete film.popupComments;
    delete film.isSaving;
    delete film.isDisabled;
    delete film.isDeleting;

    return film;
  };
}
