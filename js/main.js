'use strict';
var MESSAGES = ['Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '];

var NAMES = ['БёрдМэн', 'ПРаск0вья', 'Артём27', 'Крошка Енот', 'Joker', 'NoName', 'Darzzz', 'Freddie', 'Алина'];
var PICTURES_LENGTH = 25;
var AVATAR_NUMBER = 6;
var MESSAGE_NUMBER = 5;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var ONE_STEP = 25;
var MAX_HASHTAGS = 5;
var MAX_SYMBOLS = 20;
var currentEffect = 'none';
var body = document.querySelector('body');
body.classList.add('modal-open');

var similarListElement = document.querySelector('.pictures');

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


var createObjects = function (objectsNumber) {
  var arr = [];
  for (var i = 0; i <= objectsNumber - 1; i++) {
    var comment = createComments(randomNUMBER(1, MESSAGE_NUMBER));
    arr.push({
      url: 'photos/' + randomNUMBER(1, PICTURES_LENGTH) + '.jpg',
      description: 'Ну, как вам? Оцените!',
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
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
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

// открываем-закрываем форму

var modalOpen = document.querySelector('#upload-file');
var modalClose = document.querySelector('#upload-cancel');
var modalPicture = document.querySelector('.img-upload__overlay');
var modalHash = document.querySelector('.text__hashtags');
var modalComments = document.querySelector('.text__description');

var onModalEscPress = function (evt) {
  if (modalHash === document.activeElement || modalComments === document.activeElement) {
    return;
  } else {
    if (evt.key === ESC_KEY) {
      closeModal();
    }
  }
};


var openModal = function () {
  modalPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscPress);
};

var closeModal = function () {
  modalPicture.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscPress);
};

modalOpen.addEventListener('change', function () {
  openModal();
});

modalOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openModal();
  }
});

modalClose.addEventListener('click', function () {
  closeModal();

});

modalClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeModal();
  }
});

// эффекты для изображений

var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUpload = document.querySelector('.img-upload__preview');

// масштаб
scaleControlValue.value = '100%';
imgUpload.style.transform = 'scale(1)';


controlBigger.addEventListener('click', function () {
  if ((parseInt(scaleControlValue.value, 10) + ONE_STEP) >= 100) {
    imgUpload.style.transform = 'scale(' + 1 + ')';
    scaleControlValue.value = '100%';
  } else {
    imgUpload.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) + ONE_STEP) / 100) + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + ONE_STEP) + '%';
  }
});

controlSmaller.addEventListener('click', function () {
  if ((parseInt(scaleControlValue.value, 10) - ONE_STEP) <= ONE_STEP) {
    imgUpload.style.transform = 'scale(' + 0.25 + ')';
    scaleControlValue.value = '25%';
  } else {
    imgUpload.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) - ONE_STEP) / 100) + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) - ONE_STEP) + '%';
  }
});

// всякие там другие эффекты

var pinForm = document.querySelector('.img-upload__effect-level'); // вообще весь fieldset с ползунком
var effectPin = pinForm.querySelector('.effect-level__pin'); // ползунок
var levelValue = document.querySelector('.effect-level__value'); // значение ползунка
var levelLine = pinForm.querySelector('.effect-level__line');// линия ползунка
var imgEffect = imgUpload.querySelector('img'); // картинка, которую мы меняем


pinForm.classList.add('hidden');// прячем ползунок
var effects = document.querySelectorAll('.effects__label');

// слайдер


effectPin.addEventListener('mouseup', function () {

  var firstPoint = effectPin.offsetLeft; // положение ползунка относительно начала линии
  var computedStyle = getComputedStyle(levelLine); // Получаем стили шкалы
  var scaleWidth = parseInt(computedStyle.width, 10);// Узнаем длину шкалы
  levelValue.value = (Math.floor((firstPoint * 100) / scaleWidth)); // Меняем value
});

// добавляем эффекты и устанавливаем зависимость от положения ползунка

for (var i = 0; i < effects.length; i++) {

  effects[i].addEventListener('click', function (e) {
    var newEffect = e.target.classList.item(1);

    imgEffect.classList.remove(currentEffect);
    currentEffect = newEffect;

    imgEffect.classList.add(newEffect);
    scaleControlValue.value = '100%';
    imgUpload.style.transform = 'scale(1)';

    var formula = function (beggining, end) {
      return beggining + (end / 100) * levelValue.value;
    };

    if (newEffect === 'effects__preview--chrome') {
      imgEffect.style.filter = 'grayscale(' + formula(0, 1) + ')';
    }

    if (newEffect === 'effects__preview--sepia') {
      imgEffect.style.filter = ('sepia(' + formula(0, 1) + ')');
    }

    if (newEffect === 'effects__preview--marvin') {
      imgEffect.style.filter = ('invert(' + formula(0, 100) + '%' + ')');
    }

    if (newEffect === 'effects__preview--phobos') {
      imgEffect.style.filter = ('blur(' + formula(0, 3) + 'px' + ')');
    }

    if (newEffect === 'effects__preview--heat') {
      imgEffect.style.filter = ('brightness(' + formula(1, 3) + ')');
    }

    if (newEffect === 'effects__preview--none') {
      pinForm.classList.add('hidden');
    } else {
      pinForm.classList.remove('hidden');
    }
  });
}

// валидация хэштэгов

modalHash.addEventListener('input', function (evt) {
  var invalidMessage = [];
  var target = evt.target;


  var inputText = modalHash.value.toLowerCase().trim();

  var inputArray = inputText.split(/\s+/);

  var isStartNoHashing = inputArray.some(function (item) {
    return item[0] !== '#';
  });

  var isOnlyLaticeHashing = inputArray.some(function (item) {
    return item === '#';
  });

  var isManySymbolsHashing = inputArray.some(function (item) {
    return item.length > MAX_SYMBOLS;
  });

  var isNoSpaceHashing = inputArray.some(function (item) {
    return item.indexOf('#', 1) >= 1;
  });

  var isSomeSpecialSymbols = inputArray.some(function (item) {
    return item.slice(1).match(/^\w+$/);
  });

  if (!inputText) {
    return;
  }
  if (inputArray.length === 0) {
    return;
  }

  if (isStartNoHashing) {
    invalidMessage.push('Хэштэг должен начинаться с "#"!');
  }
  if (isOnlyLaticeHashing) {
    invalidMessage.push('Хэштэг не должен состоять только из "#"!');
  }
  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessage.push('Не более пяти хэштэгов!');
  }
  if (isManySymbolsHashing) {
    invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
  }

  if (isNoSpaceHashing) {
    invalidMessage.push('Хэштэги должны разделяться пробелами!');
  }

  var isRepeatHashing = inputArray.some(function (item, j, arr) {
    return arr.indexOf(item, j + 1) >= j + 1;
  });
  if (isRepeatHashing) {
    invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды!');
  }

  if (!isSomeSpecialSymbols) {
    invalidMessage.push('Хэштэг не может содержать спецсимволы!');
  }

  target.setCustomValidity(invalidMessage.join('\n'));

});


/*
// находим секцию,  показываем большую картинку

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// удаляем "Загрузить еще"
var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

// находим картинку
var bigPictureImage = document.querySelector('.big-picture__img');
bigPictureImage.querySelector('img').src = pictures[0].url;

// лайки, описание, аватарка автора фотографии
var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
bigPictureSocial.querySelector('.social__caption').textContent = pictures[0].description;
bigPictureSocial.querySelector('.likes-count').textContent = pictures[0].likes;

// комментарии, количество, аватарки
var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.querySelector('.comments-count').textContent = pictures[0].comments.length;
socialCommentCount.classList.add('hidden');

// находим все комментарии ul
var newComments = document.querySelector('.social__comments');

// находим все li
var newComment = document.querySelector('.social__comment');


var renderComment = function (picture) {
  var commentElement = newComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = picture.avatar;
  commentElement.querySelector('.social__picture').alt = picture.name;
  commentElement.querySelector('.social__text').textContent = picture.message;
  return commentElement;
};

var createComment = function (fragment) {

  for (var i = 0; i < pictures[0].comments.length; i++) {
    fragment.appendChild(renderComment(pictures[0].comments[i]));
  }
  return newComments.appendChild(fragment);
};

var fragmentComment = document.createDocumentFragment();

createComment(fragmentComment);
 var twoPoint = lineCoords.clientWidth + onePoint; // конец линии
*/
