const pageBody = document.querySelector('body');

const ExtraContainerTitles = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  RATING_DOWN: 'rating-sort'
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite'
};

const PopupDateFormat = {
  COMMENT: 'YYYY/MM/DD h:mm',
  FILM_RELEASE: 'DD MMMM YYYY'
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserStatus = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

export {ExtraContainerTitles, pageBody, SortType, FilterType, PopupDateFormat, UserAction, UpdateType, UserStatus};
