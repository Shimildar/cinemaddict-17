import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateUniqCollection = (collection) => {
  const mySet = new Set(collection);
  const uniqArray = Array.from(mySet);

  return uniqArray;
};

const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');

const humanizePopupReleaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');

const humanizeCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD h:mm');

const humanizeFilmRuntime = (item) => {

  let minutes = item;
  let hours = 0;

  if (minutes >= 60) {
    for (let i = 1; minutes >= 60; i++) {
      minutes-= 60;
      hours = i;
    }
  }

  const runtime = `${hours}h ${minutes}m`;

  return runtime;
};

const updateGenreTerm = (genreArray) => (genreArray.length > 1) ? 'Genres' : 'Genre';

const createCommentsPopup = (filmItem, commentsCollection) => {
  const popupComments = [];
  const filmComments = filmItem.comments;

  for (const comment of commentsCollection) {
    filmComments.forEach((item) => {
      if (comment.id === item) {
        popupComments.push(comment);
      }
    });
  }

  return popupComments;
};

const createGenreElements = (genresArray) => {
  let genresCollection = '';

  genresArray.forEach((item) => {
    genresCollection += `<span class="film-details__genre">${item}</span>`;
  });

  return genresCollection;
};

const createCommentsList = (commentsArray) => {
  let commentsList = '';

  commentsArray.forEach(({author, comment, date, emotion}) => {
    const commentDate = humanizeCommentDate(date);
    commentsList += `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  });

  return commentsList;
};

export {getRandomInteger, humanizeFilmReleaseDate, humanizeFilmRuntime, generateUniqCollection, humanizePopupReleaseDate, updateGenreTerm, createCommentsPopup, createGenreElements, createCommentsList};


