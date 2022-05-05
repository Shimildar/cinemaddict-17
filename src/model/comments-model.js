import {generateComment} from '../mock/comments.js';

export default class CommentsModel {
  #comments = Array.from({length: 500}, generateComment);

  get comments() {
    return this.#comments;
  }
}
