import {generateComment} from '../mock/comments.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: 500}, generateComment);

  get comments() {
    return this.#comments;
  }

  addComment = (update) => {

    this.#comments = [
      update,
      ...this.#comments,
    ];
  };

  deleteComment = (update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
  };
}
