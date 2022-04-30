import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';

const generateAuthor = () => {
  const authors = [
    'Морозова Ульяна Марковна',
    'Денисова Мария Глебовна',
    'Новикова София Марковна',
    'Воронов Владислав Егорович',
    'Озерова Кира Егоровна',
    'Березина Сафия Владиславовна',
    'Савельев Александр Никитич',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentText = () => {
  const comments = [
    'Товарищи! сложившаяся структура организации представляет собой интересный эксперимент проверки направлений прогрессивного развития.',
    'Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.',
    'Значимость этих проблем настолько очевидна, что консультация с широким активом играет важную роль в формировании новых предложений.',
    'Значимость этих проблем настолько очевидна, что консультация с широким активом играет важную роль в формировании новых предложений.',
    'Если у вас есть какие то интересные предложения, обращайтесь! Студия Web-Boss всегда готова решить любую задачу.',
    'Равным образом консультация с широким активом требуют определения и уточнения модели развития.',
    'Не следует, однако забывать, что дальнейшее развитие различных форм деятельности способствует подготовки и реализации форм развития.',
    'Равным образом консультация с широким активом требуют определения и уточнения модели развития.',
    'Разнообразный и богатый опыт консультация с широким активом обеспечивает широкому кругу.',
    'Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития.',
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    'angry',
    'puke',
    'sleeping',
    'smile',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateCommentDate = () => {
  const maxYearGap = 6;
  const maxMonthGap = 5;
  const maxDayGap = 20;
  const maxHourGap = 23;
  const maxMinuteGap = 59;
  const yearsGap = getRandomInteger(0, maxYearGap);
  const monthsGap = getRandomInteger(0, maxMonthGap);
  const daysGap = getRandomInteger(0, maxDayGap);
  const hourGap = getRandomInteger(0, maxHourGap);
  const minuteGap = getRandomInteger(0, maxMinuteGap);
  const data = new Date(2015, 5, 23);

  return dayjs(data).add(yearsGap, 'year').add(monthsGap, 'month').add(daysGap, 'days').add(hourGap, 'hour').add(minuteGap, 'minute').toDate();
};

export const generateComment = (item, index) => ({
  id: index + 1,
  author: generateAuthor(),
  comment: generateCommentText(),
  date: generateCommentDate(),
  emotion: generateEmotion(),
});
