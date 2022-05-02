import dayjs from 'dayjs';
import {getRandomInteger, generateUniqCollection, getRandomElement} from '../utils.js';

const randomTitles = [
  'Terminator',
  'Terminator 2',
  'Terminator 3',
  'Home alone',
  'Home alone 2',
  'Avatar',
  'Mad max',
  'Mad max 2'
];

const randomCountries = [
  'Russia',
  'USA',
  'China',
  'Canada',
  'Germany',
];

const randomGenres = [
  'Comedy',
  'Action',
  'Horror',
  'Drama',
  'Vestern',
  'History',
  'Documental',
  'Musical',
  'Family',
  'Criminal',
  'Fantazy',
];

const randomDirectors = [
  'Steven Spielberg',
  'Stanley Kubrick',
  'Quentin Tarantino',
  'Martin Scorsese',
  'Christopher Nolan',
  'Alfred Hitchcock',
];

const randomWriters = [
  'Asghar Farhadi',
  'Eric Roth',
  'Aaron Sorkin',
  'Woody Allen',
  'Lee Chang-dong',
  'Richard Linklater',
];

const randomActors = [
  'Marlon Brando',
  'Jack Nicholson',
  'James Stewart',
  'Humphrey Bogart',
  'Spencer Tracy',
  'Henry Fonda',
  'Robert De Niro',
  'Gary Cooper',
  'Charles Chaplin',
  'Anthony Hopkins',
  'John Wayne',
];


const randomPosters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];


const randomDescriptions = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. qui in odit doloribus aliquam harum, dolores voluptatibus impedit quisquam, veritatis quidem laudantium quam eaque! Id, architecto!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos temporibus porro quam dolor doloribus officia exercitationem accusamus vitae, qui sit inve magni!',
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque mollitia modi unde illum, soluta accusamus, nemo totam nobis eius tempore repudiandae suscipit omnis aliquid eaque accusantium quaerat dignissimos ipsam aperiam!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis quia quod libero voluptates temporibus adipisci voluptas, perferendis impedit error at culpa ut beatae, consequuntur ipsam. Nesciunt modi et fugit.',
  'Lorem iit amet consectetur adipisicing elit. Doloribus architecto saepe dicta veniam reprehenderit consectetur, esse maxime nihil magnam, at modi quasi nostrum dolorum cupiditate quod cumque vero et itaque!',
  'Lorem ipsum dolor, sit amet consectetur adipisicing entium, consequatur aut ad architecto repudiandae nulla facere vitae quod deleniti quo expedita maiores dolorem repellat ducimus eum cumque corrupti.',
];

const generateDate = () => {
  const maxYearGap = 30;
  const maxMonthGap = 5;
  const maxDayGap = 20;
  const yearsGap = getRandomInteger(0, maxYearGap);
  const monthsGap = getRandomInteger(0, maxMonthGap);
  const daysGap = getRandomInteger(0, maxDayGap);
  const data = new Date(2015, 5, 23);

  return dayjs(data).subtract(yearsGap, 'year').add(monthsGap, 'month').add(daysGap, 'days').toDate();
};

const generateCommentsIdArray = () => {
  const commentsIdArray = [];
  const maxLength = getRandomInteger(5, 30);
  let id = 0;

  for (let i = 1; i < maxLength; i++) {
    id += i;
    commentsIdArray.push(id);
  }

  return commentsIdArray;
};

export const generateFilm = (item, index) => {
  const writers = generateUniqCollection(Array.from({length: getRandomInteger(1, 4)}, () => getRandomElement(randomWriters)));
  const actors = generateUniqCollection(Array.from({length: getRandomInteger(3, 6)}, () => getRandomElement(randomActors)));
  const genre = generateUniqCollection(Array.from({length: getRandomInteger(1, 3)}, () => getRandomElement(randomGenres)));

  return {
    id: index +1,
    comments: generateCommentsIdArray(),
    filmInfo: {
      title: getRandomElement(randomTitles),
      alternativeTitle: 'alternative title',
      totalRating: getRandomInteger(0, 10),
      poster: getRandomElement(randomPosters),
      ageRating: getRandomInteger(0, 18),
      director: getRandomElement(randomDirectors),
      writers,
      actors,
      release: {
        date: generateDate(),
        releaseCountry: getRandomElement(randomCountries),
      },
      runtime: getRandomInteger(90, 120),
      genre,
      description: getRandomElement(randomDescriptions),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateDate(),
      favorite: Boolean(getRandomInteger(0, 1))
    }
  };
};
