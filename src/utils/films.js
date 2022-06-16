import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const humanizeDate = (date, format) => dayjs(date).format(format);

const humanizeCommentDate = (date) => dayjs(date).fromNow();

const humanizeFilmRuntime = (runTime, format) => dayjs.duration(runTime, 'minutes').format(format);

const isCtrlEnterPressed = (evt) => (evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey);
const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {humanizeDate, humanizeFilmRuntime, isCtrlEnterPressed, isEscPressed, humanizeCommentDate};
