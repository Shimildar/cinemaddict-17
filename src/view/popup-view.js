import {createElement} from '../render.js';
import {humanizeDate, humanizeFilmRuntime, sortComments} from '../utils.js';

const POPUP_RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
const POPUP_COMMENT_DATE_FORMAT = 'YYYY/MM/DD h:mm';

const updateGenreTerm = (currentGenres) => (currentGenres.length > 1) ? 'Genres' : 'Genre';

const createGenreElements = (currentGenres) => {
  let genresCollection = '';

  currentGenres.forEach((item) => {
    genresCollection += `<span class="film-details__genre">${item}</span>`;
  });

  return genresCollection;
};

const createCommentsList = (comments) => {
  let commentsList = '';

  comments.forEach(({author, comment, date, emotion}) => {

    const commentDate = humanizeDate(date, POPUP_COMMENT_DATE_FORMAT);

    commentsList += (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`);
  });

  return commentsList;
};

const getClassForControlButton = (option) => (option) ? 'film-details__control-button--active' : '';

const createPopup = (film, allComments) => {
  const {filmInfo, comments, userDetails} = film;
  const popupComments = sortComments(film, allComments);
  const popupFilmDate = humanizeDate(filmInfo.release.date, POPUP_RELEASE_DATE_FORMAT);
  const filmRunTime = humanizeFilmRuntime(filmInfo.runtime);
  const genreTerm = updateGenreTerm(filmInfo.genre);
  const genres = createGenreElements(filmInfo.genre);
  const commentsList = createCommentsList(popupComments);
  const watchlistControlStatus = getClassForControlButton(userDetails.watchlist);
  const watchedControlStatus = getClassForControlButton(userDetails.alreadyWatched);
  const favoriteControlStatus = getClassForControlButton(userDetails.favorite);

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
                <td class="film-details__cell">${popupFilmDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmRunTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreTerm}</td>
                <td class="film-details__cell">
                  ${genres}
              </tr>
            </table>

            <p class="film-details__film-description">
            ${filmInfo.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${watchlistControlStatus} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${watchedControlStatus} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteControlStatus} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${commentsList}
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

export default class PopupView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createPopup(this.film, this.comments);
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
