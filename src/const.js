const pageBody = document.querySelector('body');

const extraContainerTitles = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date-sort',
  RATING: 'rating-sort'
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite'
};

export {extraContainerTitles, pageBody, SortType, FilterType};
