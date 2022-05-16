const pageBody = document.querySelector('body');

const extraContainerTitles = {
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

export {extraContainerTitles, pageBody, SortType, FilterType};
