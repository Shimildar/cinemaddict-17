import {generateFilm} from '../mock/films.js';
import {generateComment} from '../mock/comments.js';

class FilmsModel {
  films = Array.from({length: 30}, generateFilm);

  getFilms = () => this.films;
}

class CommentsModel {
  comments = Array.from({length: 500}, generateComment);

  getComments = () => this.comments;
}

export {FilmsModel, CommentsModel};
