import dayjs from 'dayjs';
import {getRandomInteger, generateUniqCollection} from '../utils.js';

const generateFilmTitle = () => {
  const titles = [
    'Terminator',
    'Terminator 2',
    'Terminator 3',
    'Home alone',
    'Home alone 2',
    'Avatar',
    'Mad max',
    'Mad max 2',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateReleaseCountry = () => {
  const countries = [
    'Russia',
    'USA',
    'China',
    'Canada',
    'Germany',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateGenre = () => {
  const genres = [
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

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Steven Spielberg',
    'Stanley Kubrick',
    'Quentin Tarantino',
    'Martin Scorsese',
    'Christopher Nolan',
    'Alfred Hitchcock',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriter = () => {
  const writers = [
    'Asghar Farhadi',
    'Eric Roth',
    'Aaron Sorkin',
    'Woody Allen',
    'Lee Chang-dong',
    'Richard Linklater',
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateActor = () => {
  const actors = [
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

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

const generateReleaseDate = () => {
  const maxYearGap = 30;
  const maxMonthGap = 5;
  const maxDayGap = 20;
  const yearsGap = getRandomInteger(0, maxYearGap);
  const monthsGap = getRandomInteger(0, maxMonthGap);
  const daysGap = getRandomInteger(0, maxDayGap);
  const data = new Date(2015, 5, 23);

  return dayjs(data).subtract(yearsGap, 'year').add(monthsGap, 'month').add(daysGap, 'days').toDate();
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas recusandae saepe ut blanditiis, qui provident ex harum ipsa iusto animi quidem nam reprehenderit, corporis id quisquam repellendus soluta cupiditate. Rem?',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa fugiat sed placeat quis qui in odit doloribus aliquam harum, dolores voluptatibus impedit quisquam, veritatis quidem laudantium quam eaque! Id, architecto!',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos temporibus porro quam dolor doloribus officia exercitationem accusamus vitae, qui sit inventore, quasi minima modi aliquam nihil nobis rerum. Ex, magni!',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque mollitia modi unde illum, soluta accusamus, nemo totam nobis eius tempore repudiandae suscipit omnis aliquid eaque accusantium quaerat dignissimos ipsam aperiam!',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis quia quod libero voluptates temporibus adipisci voluptas, perferendis impedit error at culpa ut beatae, consequuntur ipsam. Nesciunt modi et fugit.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus architecto saepe dicta veniam reprehenderit consectetur, esse maxime nihil magnam, at modi quasi nostrum dolorum cupiditate quod cumque vero et itaque!',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe id praesentium, consequatur aut ad architecto repudiandae nulla facere vitae quod deleniti quo expedita maiores dolorem repellat ducimus eum cumque corrupti.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
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
  const writers = generateUniqCollection(Array.from({length: getRandomInteger(1, 4)}, generateWriter));
  const actors = generateUniqCollection(Array.from({length: getRandomInteger(3, 6)}, generateActor));
  const genre = generateUniqCollection(Array.from({length: getRandomInteger(1, 3)}, generateGenre));
  const comments = generateCommentsIdArray();

  return {
    id: index +1,
    comments,
    filmInfo: {
      title: generateFilmTitle(),
      alternativeTitle: 'alternative title',
      totalRating: getRandomInteger(0, 10),
      poster: generatePoster(),
      ageRating: getRandomInteger(0, 18),
      director: generateDirector(),
      writers,
      actors,
      release: {
        date: generateReleaseDate(),
        releaseCountry: generateReleaseCountry(),
      },
      runtime: getRandomInteger(90, 120),
      genre,
      description: generateDescription(),
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  };
};
