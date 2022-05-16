import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, humanizeFilmRuntime, sortComments, getClassForControlButton} from '../utils/films.js';

const POPUP_RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
const POPUP_COMMENT_DATE_FORMAT = 'YYYY/MM/DD h:mm';
const CONTROL_BUTTON_ACTIVE_CLASS = 'film-details__control-button--active';

const updateGenreTerm = (currentGenres) => (currentGenres.length > 1) ? 'Genres' : 'Genre';

const createGenreElements = (currentGenres) =>
  currentGenres.map((genre) => (
    `<span class="film-details__genre">${genre}</span>`)).join('');

const createCommentsList = (comments) =>
  comments.map(({author, comment, date, emotion}) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDate(date, POPUP_COMMENT_DATE_FORMAT)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`
  )).join('');

const createPopup = (film, allComments) => {
  const {filmInfo, comments, userDetails} = film;
  const popupComments = sortComments(film, allComments);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${filmInfo.poster}" alt="">

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
                <td class="film-details__cell">${humanizeDate(filmInfo.release.date, POPUP_RELEASE_DATE_FORMAT)}</td>
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
          <button type="button" class="film-details__control-button ${getClassForControlButton(userDetails.watchlist, CONTROL_BUTTON_ACTIVE_CLASS)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${getClassForControlButton(userDetails.alreadyWatched, CONTROL_BUTTON_ACTIVE_CLASS)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${getClassForControlButton(userDetails.favorite, CONTROL_BUTTON_ACTIVE_CLASS)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${createCommentsList(popupComments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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

export default class PopupView extends AbstractView {

  constructor(film, comments) {
    super();
    this.film = film;
    this.comments = comments;
  }

  get template() {
    return createPopup(this.film, this.comments);
  }

  setCloseBtnClickHandler = (callback) => {
    this._callback.closeBtnclick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.closeBtnclick();
  };

  setControlButtonClickHandler = (watchlistClick, watchedClick, favoriteClick) => {
    this._callback.watchlistClick = watchlistClick;
    this._callback.watchedClick = watchedClick;
    this._callback.favoriteClick = favoriteClick;

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      const target = evt.target;
      evt.preventDefault();

      target.classList.toggle(CONTROL_BUTTON_ACTIVE_CLASS);

      switch (target) {
        case this.element.querySelector('.film-details__control-button--watchlist'):
          this._callback.watchlistClick();
          break;
        case this.element.querySelector('.film-details__control-button--watched'):
          this._callback.watchedClick();
          break;
        case this.element.querySelector('.film-details__control-button--favorite'):
          this._callback.favoriteClick();
          break;
      }
    });
  };
}
