import {generateComment} from '../mock/comments.js';

export class CommentsModel {
  comments = Array.from({length: 500}, generateComment);

  getComments = () => this.comments;
}
