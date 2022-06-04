import dayjs from 'dayjs';

// Приводит в нужный формат дату и время
const humanizeDate = (date, format) => dayjs(date).format(format);

// Приводит в нужный формат длительность фильма из минут в часы и минуты
const humanizeFilmRuntime = (item) => {
  const hours = Math.floor(item / 60);
  const minutes = item - (60 * hours);

  return `${hours}h ${minutes}m`;
};

// Отсортировывает комментарии
const sortComments = (film, comments) => {
  const filmComments = film.comments;
  const sortedComments = [];

  for (const comment of comments) {
    filmComments.forEach((item) => {
      if (comment.id === item) {
        sortedComments.push(comment);
      }
    });
  }

  return sortedComments;
};

const isCtrlEnterPressed = (evt) => (evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey);

export {humanizeDate, humanizeFilmRuntime, sortComments, isCtrlEnterPressed};
