import {getRandomInteger} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';

const DESCRIPTIONS = [
  'Гуляю',
  'Бегаю',
  'Прыгаю',
  'Завтракаю',
  'Путешествую',
  'Учу прыгать малышню',
  'Гуляем с Муркой',
  'Драка с Рудольфом'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Барсик',
  'Мурка',
  'Тефтель',
  'Гуляшь',
  'Сима',
  'Кекс',
  'Рудольф'
];

const OBJECT_COUNT = 25;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getPhotoID = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 25);
const getNumberPhoto = createRandomIdFromRangeGenerator(1, 25);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: getPhotoID(),
  url: `photos/${ getNumberPhoto() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComments)
});

const arrayPhotos = Array.from({length: OBJECT_COUNT}, createPhotoDescription);

export {arrayPhotos};
