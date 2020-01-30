'use strict';
var MESSAGES = ['Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '];

var NAMES = ['БёрдМэн', 'ПРаск0вья', 'Артём27', 'Крошка Енот', 'Joker', 'NoName', 'Darzzz', 'Freddie', 'Алина'];
var PICTURES_LENGTH = 25;
var AVATAR_NUMBER = 6;
var MESSAGE_NUMBER = 5;

var similarListElement = document.querySelector('.pictures');
document.querySelector('.pictures__title').classList.remove('visually-hidden');

var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var randomNUMBER = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createComments = function (commentsNumber) {
  var arr = [];
  for (var i = 0; i <= commentsNumber - 1; i++) {
    arr.push({
      avatar: 'img/avatar-' + randomNUMBER(1, AVATAR_NUMBER) + '.svg',
      message: MESSAGES[randomNUMBER(1, MESSAGE_NUMBER)],
      name: NAMES[randomNUMBER(1, (NAMES.length - 1))]
    }
    );
  }
  return arr;
};

var comment = createComments(randomNUMBER(1, AVATAR_NUMBER));

var createObjects = function (objectsNumber) {
  var arr = [];
  for (var i = 0; i <= objectsNumber - 1; i++) {
    arr.push({
      url: 'photos/' + randomNUMBER(1, PICTURES_LENGTH) + '.jpg',
      description: '...',
      likes: randomNUMBER(1, PICTURES_LENGTH),
      comments: comment
    }

    );
  }
  return arr;
};

var pictures = createObjects(PICTURES_LENGTH);

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  return pictureElement;
};

var createFragment = function (fragment) {

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  return similarListElement.appendChild(fragment);
};

var fragmentDocument = document.createDocumentFragment();

createFragment(fragmentDocument);
