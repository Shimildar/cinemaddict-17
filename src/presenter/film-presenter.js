import {render, remove, replace} from '../framework/render.js';
import FilmView from '../view/film-view.js';

export default class FilmPresenter {
  #filmCardContainer = null;
  #controlButtonChange = null;
  #openPopup = null;

  #filmCardComponent = null;

  #filmCard = null;

  constructor(filmCardContainer, controlButtonChange, openPopup) {
    this.#filmCardContainer = filmCardContainer;
    this.#controlButtonChange = controlButtonChange;
    this.#openPopup = openPopup;
  }

  init = (film) => {
    this.#filmCard = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmView(this.#filmCard);

    this.#filmCardComponent.setClickHandler(this.#openPopup);
    this.#filmCardComponent.setControlButtonClickHandler(this.#controlButtonChange);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmCardContainer);
      return;
    }

    if (this.#filmCardContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  setAborting = () => {
    const resetFilmFormState = () => {
      this.#filmCardComponent.updateElement({
        isDisabled: false,
      });
    };

    this.#filmCardComponent.shake(resetFilmFormState);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };
}
