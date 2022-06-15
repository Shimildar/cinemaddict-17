import ObservableModel from '../framework/observeble-model.js';


export default class CommentsModel extends ObservableModel {
  #filmsApiService = null;
  #comments = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    try {
      const comments = await this.#filmsApiService.getComments(film);
      this.#comments = comments.map(this.#adaptCommentToClient);
    } catch(err) {
      this.#comments = [];
    }
  };

  addComment = async (updateType, filmId, comment) => {

    try {
      const response = await this.#filmsApiService.addComment(filmId, comment);
      const updatedFilm = this._adaptFilmToClient(response.movie);
      this.#comments = response.comments.map((item) => this.#adaptCommentToClient(item));

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, updatedFilm, commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#filmsApiService.deleteComment(commentId);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptCommentToClient = (comment) => {
    const adaptedComment = {...comment};
    adaptedComment.date = adaptedComment.date !== null ? new Date(adaptedComment.date) : adaptedComment.date;

    return adaptedComment;
  };
}

