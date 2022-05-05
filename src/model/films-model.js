import {generateFilm} from '../mock/films.js';


export default class FilmsModel {
  #films = Array.from({length: 32}, generateFilm);

  get films() {
    return this.#films;
  }
}
