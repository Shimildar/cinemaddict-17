const getFilterType = (films) => {
  const WATCHLIST = films.filter((item) =>  item.userDetails.watchlist);
  const WATCHED = films.filter((item) => item.userDetails.alreadyWatched);
  const FAVORITES = films.filter((item) => item.userDetails.favorite);

  return {
    ALL: films,
    WATCHLIST,
    WATCHED,
    FAVORITES
  };
};

export {getFilterType};
