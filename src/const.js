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
  INIT: 'INIT',
};

const UserStatus = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

const ShakeElementType = {
  CONTROL_BUTTONS: 'CONTROL_BUTTONS',
  ADD_COMMENTS_BLOCK: 'ADD_COMMENTS_BLOCK',
  DELETE_COMMENTS_BLOCK: 'DELETE_COMMENTS_BLOCK'
};

const UiBlockerTimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const PopupMode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export {ExtraContainerTitles, SortType, FilterType, PopupDateFormat, UserAction, UpdateType, UserStatus, ShakeElementType, UiBlockerTimeLimit, PopupMode};
