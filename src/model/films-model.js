import {generateFilm} from '../mock/films.js';


export class FilmsModel {
  films = Array.from({length: 30}, generateFilm);

  getFilms = () => this.films;
}
