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
  DEFAULT: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite'
};

const PopupDateFormat = {
  COMMENT: 'YYYY/MM/DD h:mm',
  FILM_RELEASE: 'DD MMMM YYYY'
};

export {ExtraContainerTitles, pageBody, SortType, FilterType, PopupDateFormat};
