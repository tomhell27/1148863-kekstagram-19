'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  var bigPictureImage = document.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');

  var closeButton = bigPicture.querySelector('.big-picture__cancel');
  var onPictureEscapePress = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      closeBigPicture();
    }
  };
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscapePress());
  };

  closeButton.addEventListener('click', function () {
    closeBigPicture();
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      closeBigPicture();
    }
  });
  var newComments = document.querySelector('.social__comments');
  var createBigPicture = function (picture) {
    bigPicture.classList.remove('hidden');
    bigPicture.tabindex = 0;
    bigPicture.focus();
    bigPictureImage.querySelector('img').src = picture.url;
    bigPictureSocial.querySelector('.social__caption').textContent = picture.description;
    bigPictureSocial.querySelector('.likes-count').textContent = picture.likes;
    socialCommentCount.querySelector('.comments-count').textContent = picture.comments.length;
    newComments.innerHTML = '';
    for (var i = 0; i < window.constants.MAX_COMMENTS; i++) {
      newComments.innerHTML +=
        '<li class="social__comment">' + '<img class="social__picture" src="' + picture.comments[i].avatar + '" alt="' + picture.comments[i].name + '" width="35" height="35">' + '<p class="social__text">' + picture.comments[i].message + '</p>' + '</li >';
    }

  };
  window.bigPicture = {
    createBigPicture: createBigPicture,
    onPictureEscapePress: onPictureEscapePress
  };
})();

