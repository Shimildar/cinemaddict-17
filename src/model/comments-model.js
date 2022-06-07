import Observable from '../framework/observable.js';


export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    try {
      const comments = await this.#commentsApiService.getComments(film);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }
  };

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

  #adaptToClient = (comment) => {
    const adaptedComment = {...comment};
    adaptedComment.date = adaptedComment.date !== null ? new Date(adaptedComment.date) : adaptedComment.date;

    return adaptedComment;
  };
}

