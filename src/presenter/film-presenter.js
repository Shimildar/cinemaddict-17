import {render, remove, replace} from '../framework/render.js';
import {isEscPressed} from '../utils/films.js';
import {pageBody} from '../const.js';
import FilmView from '../view/film-view.js';
import PopupView from '../view/popup-view.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #filmCardContainer = null;
  #changeData = null;
  #clearPopup = null;

  #filmCardComponent = null;
  #filmPopupComponent = null;

  #filmCard = null;
  #commentsModel = null;
  #mode = Mode.DEFAULT;

  constructor(filmCardContainer, commentsModel, changeData, clearPopup) {
    this.#filmCardContainer = filmCardContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#clearPopup = clearPopup;
  }

  get popupComments() {
    return this.#commentsModel.comments;
  }

  init = (film) => {
    this.#filmCard = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmView(film);

    this.#filmCardComponent.setClickHandler(this.#renderPopup);
    this.#filmCardComponent.setControlButtonClickHandler(this.#handleControlButtonClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmCardContainer);
      return;
    }

    if (this.#filmCardContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  setControlButtonsAborting = () => {
    if (this.#mode === Mode.POPUP) {
      const resetPopupFormState = () => {
        this.#filmPopupComponent.updateElement({
          isDisabled: false
        });
      };
      this.#filmPopupComponent.setButtonsShake(resetPopupFormState);
    }

    const resetFilmFormState = () => {
      this.#filmCardComponent.updateElement({
        isDisabled: false,
      });
    };

    this.#filmCardComponent.shake(resetFilmFormState);
  };

  setSaveAborting = () => {
    const resetFormState = () => {
      this.#filmPopupComponent.updateElement({
        isSaving: false
      });
    };
    this.#filmPopupComponent.setFormShake(resetFormState);
  };

  setDeleteAborting = () => {
    const resetFormState = () => {
      this.#filmPopupComponent.updateElement({
        isDeleting: false
      });
    };
    this.#filmPopupComponent.setDeleteButtonShake(resetFormState);
  };

  setPopupUpdate = (actionType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmPopupComponent.updateElement({
          userDetails: update.userDetails,
          isDisabled: false
        });
        break;
      case UserAction.ADD_COMMENT:
        this.#filmPopupComponent.updateElement({
          popupComments: this.popupComments,
          description: '',
          emoji: false,
          isSaving: false,
        });
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPopupComponent.updateElement({
          popupComments: this.popupComments,
          isDeleting: false,
        });
        break;
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupFromPage();
    }
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #handleControlButtonClick = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      update
    );
  };

  #renderPopup = async () => {
    this.#clearPopup();
    this.#mode = Mode.POPUP;
    await this.#commentsModel.init(this.#filmCard);

    this.#filmPopupComponent = new PopupView(this.#filmCard, this.popupComments);
    this.#filmPopupComponent.setCloseBtnClickHandler(this.#removePopupFromPage);
    this.#filmPopupComponent.setControlButtonClickHandler(this.#handleControlButtonClick);
    this.#filmPopupComponent.setCommentAddHandler(this.#handleCommentAddClick);
    this.#filmPopupComponent.setCommentDeleteHandler(this.#handleCommentDeleteClick);

    pageBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    render(this.#filmPopupComponent, pageBody);
  };

  #handleCommentAddClick = (filmId, comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      filmId,
      comment
    );
  };

  #handleCommentDeleteClick = (commentId) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      { ...this.#filmCard, comments: this.#filmCard.comments.filter((comment) => comment !== commentId)},
      commentId
    );
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
}
