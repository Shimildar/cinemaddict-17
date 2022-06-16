import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortDateDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortRatingDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);

  return weight ?? dayjs(filmB.filmInfo.totalRating).diff(dayjs(filmA.filmInfo.totalRating));
};

const sortCommentCountDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.comments.length, filmB.comments.length);

  return weight ?? dayjs(filmB.comments.length).diff(dayjs(filmA.comments.length));
};

export {sortDateDown, sortRatingDown, sortCommentCountDown};
