import {render, remove} from '../framework/render.js';
import {isEscPressed} from '../utils/common.js';
import {pageBody} from '../const.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmCardPresenter {
  #filmCardContainer = null;
  #changeData = null;
  #clearPopup = null;

  #filmCardComponent = null;
  #filmPopupComponent = null;

  #filmCard = null;
  #comments = null;
  #mode = Mode.DEFAULT;

  constructor(filmCardContainer, comments, changeData, clearPopup) {
    this.#filmCardContainer = filmCardContainer;
    this.#comments = comments;
    this.#changeData = changeData;
    this.#clearPopup = clearPopup;
  }

  init = (film) => {
    this.#filmCard = film;

    this.#filmCardComponent = new FilmCardView(film);

    this.#filmCardComponent.setClickHandler(this.#renderPopup);
    this.#filmCardComponent.setControlButtonClickHandler(this.#handleWatchlistClick, this.#handleWatchedClick, this.#handleFavoriteClick);

    render(this.#filmCardComponent, this.#filmCardContainer);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupFromPage();
    }
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#filmCard, userDetails: { watchlist: !this.#filmCard.userDetails.watchlist }});
  };

  #handleWatchedClick = () => {
    this.#changeData({...this.#filmCard, userDetails: { alreadyWatched: !this.#filmCard.userDetails.alreadyWatched }});
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#filmCard, userDetails: { favorite: !this.#filmCard.userDetails.favorite }});
  };

  #renderPopup = () => {
    this.#clearPopup();
    this.#mode = Mode.POPUP;

    this.#filmPopupComponent = new PopupView(this.#filmCard, this.#comments);
    this.#filmPopupComponent.setCloseBtnClickHandler(this.#removePopupFromPage);
    this.#filmPopupComponent.setControlButtonClickHandler(this.#handleWatchlistClick, this.#handleWatchedClick, this.#handleFavoriteClick);
    pageBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

    render(this.#filmPopupComponent, pageBody);
  };

  #removePopupFromPage = () => {
    pageBody.classList.remove('hide-overflow');
    remove(this.#filmPopupComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.#removePopupFromPage();
    }
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };
}