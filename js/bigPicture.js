'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var ZERO = 0;
  var MESSAGE_NUMBER = 5;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var closeButton = bigPicture.querySelector('.big-picture__cancel');
  var commentsNumber = MAX_COMMENTS;
  var imageFilters = document.querySelector('.img-filters');
  var body = document.querySelector('body');
  var similarPictureTemplate = document.querySelector('#picture').content;

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');

    pictureImg.src = picture.url;
    var openBigPicture = function () {
      createBigPicture(picture);
      document.addEventListener('keydown', onPictureEscapePress);
    };
    pictureImg.addEventListener('click', function () {
      openBigPicture();
    });
    pictureImg.parentElement.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        openBigPicture();
      }
    });

    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    imageFilters.classList.remove('img-filters--inactive');
    return pictureElement;
  };

  var onPictureEscapePress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPictureEscapePress);
  };

  closeButton.addEventListener('click', function () {
    closeBigPicture();
  });

  closeButton.addEventListener('keydown', function (e) {
    if (e.key === ENTER_KEY) {
      closeBigPicture();
    }
  });

  var createBigPicture = function (picture) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    var picComments = picture.comments.slice();
    bigPicture.tabindex = ZERO;
    bigPicture.focus();
    bigPictureImage.querySelector('img').src = picture.url;
    bigPictureSocial.querySelector('.social__caption').textContent = picture.description;
    bigPictureSocial.querySelector('.likes-count').textContent = picture.likes;

    var newComment = bigPictureSocial.querySelector('.social__comment');
    var newComments = bigPictureSocial.querySelector('.social__comments');
    var spliceNumber = ZERO;
    newComments.querySelectorAll('.social__comment').forEach(function (e) {
      newComments.removeChild(e);
    });
    var renderComments = function (comment) {
      var commentElement = newComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      return commentElement;
    };

    var createComment = function (data) {
      var pageComment = data.length + spliceNumber;
      socialCommentCount.textContent = pageComment + ' из ' + picture.comments.length + ' комментариев ';
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(renderComments(data[i]));
      }
      if (pageComment >= picture.comments.length) {
        commentsLoader.classList.add('visually-hidden');
      } else {
        commentsLoader.classList.remove('visually-hidden');
      }
      return newComments.appendChild(fragment);
    };
    createComment(picComments.splice(ZERO, commentsNumber));

    commentsLoader.addEventListener('click', window.debounce(function () {
      spliceNumber += MESSAGE_NUMBER;
      createComment(picComments.splice(ZERO, commentsNumber));
    }));
  };

  window.bigPicture = {
    create: createBigPicture,
    render: renderPicture,
    imageFilters: imageFilters
  };
})();
