import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate, humanizeFilmRuntime, isCtrlEnterPressed} from '../utils/films.js';
import {getRandomInteger} from '../utils/common.js';
import {PopupDateFormat} from '../const.js';
import he from 'he';

const CONTROL_BUTTON_ACTIVE_CLASS = 'film-details__control-button--active';

const updateGenreTerm = (currentGenres) => (currentGenres.length > 1) ? 'Genres' : 'Genre';

const createGenreElements = (currentGenres) =>
  currentGenres.map((genre) => (
    `<span class="film-details__genre">${genre}</span>`)).join('');

const createCommentsList = (comments) =>
  comments.map(({id, author, comment, date, emotion}) => (
    `<li class="film-details__comment" data-comment-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDate(date, PopupDateFormat.COMMENT)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`
  )).join('');

const getEmodji = (emoji) => (emoji) ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : '';

const createPopup = (film) => {
  const {filmInfo, userDetails, emoji, description, popupComments} = film;
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
                <td class="film-details__cell">${humanizeFilmRuntime(filmInfo.runtime)}</td>
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
          <button type="button" class="film-details__control-button ${userDetails.watchlist ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${userDetails.alreadyWatched ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${userDetails.favorite ? CONTROL_BUTTON_ACTIVE_CLASS : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${popupComments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${createCommentsList(popupComments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${getEmodji(emoji)}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${description}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${inputChecked('smile')}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${inputChecked('sleeping')}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${inputChecked('puke')}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${inputChecked('angry')}>
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

  constructor(film, comments) {
    super();
    this._state = PopupView.convertFilmToState(film, comments);

    this.#setInnerHandlers();
  }

  get template() {
    return createPopup(this._state);
  }

  setControlButtonClickHandler = (callback) => {
    this._callback.controlButtonClick = callback;

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      evt.preventDefault();
      const scrollPosition = this.element.scrollTop;

      switch (evt.target) {
        case this.element.querySelector('.film-details__control-button--watchlist'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, watchlist: !this._state.userDetails.watchlist }
          });
          break;
        case this.element.querySelector('.film-details__control-button--watched'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, alreadyWatched: !this._state.userDetails.alreadyWatched }
          });
          break;
        case this.element.querySelector('.film-details__control-button--favorite'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, favorite: !this._state.userDetails.favorite }
          });
          break;
      }
      this._callback.controlButtonClick({...PopupView.convertStateToFilm(this._state)});
      this.element.scrollTop = scrollPosition;
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
    const scrollPosition = this.element.scrollTop;
    const target = evt.target.value;

    this.updateElement({
      emoji: target
    });

    this.element.scrollTop = scrollPosition;
  };

  #descriptionInputHandler = (evt) => {
    const scrollPosition = this.element.scrollTop;

    this._setState({
      description: evt.target.value
    });

    this.element.scrollTop = scrollPosition;
  };

  #commentAddHandler = (evt) => {
    if(!this._state.emoji || this._state.description === '') {
      return;
    }

    if (isCtrlEnterPressed(evt)) {
      evt.preventDefault();
      const scrollPosition = this.element.scrollTop;

      const newComment = {
        id: getRandomInteger(550, 1000),
        author: 'Диванный критик',
        comment: evt.target.value,
        date: new Date(),
        emotion: this._state.emoji
      };

      this.updateElement({
        popupComments: [...this._state.popupComments, newComment],
        description: '',
        emoji: false
      });

      this.element.scrollTop = scrollPosition;

      const update = {...PopupView.convertStateToFilm(this._state), comments: [...this._state.comments, newComment.id]};
      this._callback.commentFormSubmit(update, newComment);
    }
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;

    const currentId = evt.target.closest('.film-details__comment').dataset.commentId;
    const comment = this._state.popupComments.find((item) => item.id === +currentId);
    const updatedComments = this._state.comments.filter((item) => item !== +currentId);
    const update = {...PopupView.convertStateToFilm(this._state), comments: updatedComments};

    this.updateElement({
      comments: updatedComments,
      popupComments: this._state.popupComments.filter((item) => item !== comment)
    });

    this._callback.deleteClick(update, comment);
    this.element.scrollTop = scrollPosition;
  };

  static convertFilmToState = (film, popupComments) => ({...film, emoji: false, description: '', popupComments});

  static convertStateToFilm = (state) => {
    const film = {...state};

    delete film.emoji;
    delete film.description;
    delete film.popupComments;

    return film;
  };
}
