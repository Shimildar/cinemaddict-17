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

export {ExtraContainerTitles, pageBody, SortType, FilterType};
