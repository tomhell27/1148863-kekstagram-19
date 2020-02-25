'use strict';
(function () {
  var body = document.querySelector('body');
  body.classList.add('modal-open');

  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content;

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').addEventListener('click', function () {
      window.bigPicture.createBigPicture(picture);
    });
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    node.addEventListener('click', function () {
      node.remove();
    });
  };

  window.backend.load('', successHandler, errorHandler, 'GET', window.constants.URL);

  window.creation = {
    similarPictureTemplate: similarPictureTemplate
  };

})();
