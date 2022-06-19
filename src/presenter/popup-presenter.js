import {render, remove, replace} from '../framework/render.js';
import {isEscPressed} from '../utils/films.js';
import PopupView from '../view/popup-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class PopupPresenter {
  #popupContainer = null;
  #scrollTopPosition = null;
  #popupFilm = null;
  #changeData = null;
  #controlButtonChange = null;

  #popupComponent = null;

  #commentsModel = null;

  constructor(popupContainer, commentsModel, changeData, controlButtonChange) {
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#controlButtonChange = controlButtonChange;

  }

  init = async (film) => {
    this.#popupFilm = film;

    await this.#commentsModel.init(this.#popupFilm);

    if (this.#popupComponent) {
      this.#scrollTopPosition = this.#popupComponent.element.scrollTop;
    }

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(this.#popupFilm, this.#commentsModel.comments);

    this.#popupComponent.setCloseBtnClickHandler(this.#removePopupFromPage);
    this.#popupComponent.setControlButtonClickHandler(this.#controlButtonChange);
    this.#popupComponent.setCommentAddHandler(this.#handleCommentAddClick);
    this.#popupComponent.setCommentDeleteHandler(this.#handleCommentDeleteClick);

    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (prevPopupComponent === null) {
      render(this.#popupComponent, this.#popupContainer);
      return;
    }

    if (this.#popupContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    this.#popupComponent.element.scrollTop = this.#scrollTopPosition;

    remove(prevPopupComponent);
  };

  setAborting = (actionType) => {
    let resetFormState;
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        resetFormState = () => {
          this.#popupComponent.updateElement({
            isDisabled: false
          });
        };
        this.#popupComponent.setButtonsShake(resetFormState);
        break;
      case UserAction.ADD_COMMENT:
        resetFormState =() => {
          this.#popupComponent.updateElement({
            isSaving: false
          });
        };
        this.#popupComponent.setFormShake(resetFormState);
        break;
      case UserAction.DELETE_COMMENT:
        resetFormState = () => {
          this.#popupComponent.updateElement({
            isDeleting: false
          });
        };
        this.#popupComponent.setDeleteButtonShake(resetFormState);
        break;
    }
  };

  setPopupUpdate = (actionType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#popupComponent.updateElement({
          userDetails: update.userDetails,
          isDisabled: false
        });
        break;
      case UserAction.ADD_COMMENT:
        this.#popupComponent.updateElement({
          popupComments: this.#commentsModel.comments,
          description: '',
          emoji: false,
          isSaving: false,
        });
        break;
      case UserAction.DELETE_COMMENT:
        this.#popupComponent.updateElement({
          popupComments: this.#commentsModel.comments,
          isDeleting: false,
        });
        break;
    }
  };

  resetView = () => {
    this.#removePopupFromPage();
  };

  #handleCommentAddClick = (update, comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update,
      comment
    );
  };

  #handleCommentDeleteClick = (commentId) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      { ...this.#popupFilm, comments: this.#popupFilm.comments.filter((comment) => comment !== commentId)},
      commentId
    );
  };

  #removePopupFromPage = () => {
    this.#popupContainer.classList.remove('hide-overflow');
    remove(this.#popupComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.#removePopupFromPage();
    }
  };
}
