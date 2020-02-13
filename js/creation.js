'use strict';

// creation
(function () {
  var body = document.querySelector('body');
  body.classList.add('modal-open');

  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createComments = function (commentsNumber) {
    var arr = [];
    for (var i = 0; i <= commentsNumber - 1; i++) {
      arr.push({
        avatar: 'img/avatar-' + window.utils.randomNUMBER(1, window.constants.AVATAR_NUMBER) + '.svg',
        message: window.constants.MESSAGES[window.utils.randomNUMBER(1, window.constants.MESSAGE_NUMBER)],
        name: window.constants.NAMES[window.utils.randomNUMBER(1, (window.constants.NAMES.length - 1))]
      }
      );
    }
    return arr;
  };

  var createObjects = function (objectsNumber) {
    var arr = [];
    for (var i = 0; i <= objectsNumber - 1; i++) {
      var comment = createComments(window.utils.randomNUMBER(1, window.constants.MESSAGE_NUMBER));
      arr.push({
        url: 'photos/' + window.utils.randomNUMBER(1, window.constants.PICTURES_LENGTH) + '.jpg',
        description: 'Ну, как вам? Оцените!',
        likes: window.utils.randomNUMBER(1, window.constants.PICTURES_LENGTH),
        comments: comment
      }

      );
    }
    return arr;
  };

  var pictures = createObjects(window.constants.PICTURES_LENGTH);

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

  window.creation = {
    pictures: pictures
  };
})();
