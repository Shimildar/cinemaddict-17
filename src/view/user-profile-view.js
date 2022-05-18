import AbstractView from '../framework/view/abstract-view.js';

const MIN_FOR_NOVICE = 1;
const MAX_FOR_NOVICE = 10;
const MIN_FOR_FAN = 11;
const MAX_FOR_FAN = 20;
const MIN_FOR_MOVIE_BUFF = 21;

const createUserProfile = (films) => {
  let status;
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);

  if (watchedFilms.length >= MIN_FOR_NOVICE && watchedFilms.length <= MAX_FOR_NOVICE) {
    status = 'Novice';
  } else if (watchedFilms.length >= MIN_FOR_FAN && watchedFilms.length <= MAX_FOR_FAN) {
    status = 'Fan';
  } else if (watchedFilms.length >= MIN_FOR_MOVIE_BUFF) {
    status = 'Movie Buff';
  } else {
    status = '';
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class UserProfileView extends AbstractView {

  constructor(films) {
    super();
    this.films = films;
  }

  get template() {
    return createUserProfile(this.films);
  }
}
