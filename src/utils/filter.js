import {FilterType} from '../const.js';

const getFilterType = (films) => ({
  [FilterType.WATCHLIST]: films.filter((item) =>  item.userDetails.watchlist),
  [FilterType.HISTORY]: films.filter((item) => item.userDetails.alreadyWatched),
  [FilterType.FAVORITE]: films.filter((item) => item.userDetails.favorite)
});

export {getFilterType};
