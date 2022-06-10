import dayjs from 'dayjs';

// Приводит в нужный формат дату и время
const humanizeDate = (date, format) => dayjs(date).format(format);

// Приводит в нужный формат длительность фильма из минут в часы и минуты
const humanizeFilmRuntime = (item) => {
  const hours = Math.floor(item / 60);
  const minutes = item - (60 * hours);

  return `${hours}h ${minutes}m`;
};

const isCtrlEnterPressed = (evt) => (evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey);
const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {humanizeDate, humanizeFilmRuntime, isCtrlEnterPressed, isEscPressed};
