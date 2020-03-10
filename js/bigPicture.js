'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var commentsNumber = window.constants.MAX_COMMENTS;
  var socialCommentCount = document.querySelector('.social__comment-count');
  var closeButton = bigPicture.querySelector('.big-picture__cancel');

  var onPictureEscapePress = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      closeBigPicture();
    }
  };
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscapePress);
  };

  closeButton.addEventListener('click', function () {
    closeBigPicture();
  });

  closeButton.addEventListener('keydown', function (e) {
    if (e.key === window.constants.ENTER_KEY) {
      closeBigPicture();
    }
  });

  var createBigPicture = function (picture) {
    document.addEventListener('keydown', onPictureEscapePress);
    var picComments = picture.comments.slice();
    bigPicture.classList.remove('hidden');
    bigPicture.tabindex = window.constants.ZERO;
    bigPicture.focus();
    bigPictureImage.querySelector('img').src = picture.url;
    bigPictureSocial.querySelector('.social__caption').textContent = picture.description;
    bigPictureSocial.querySelector('.likes-count').textContent = picture.likes;

    var newComment = bigPictureSocial.querySelector('.social__comment');
    var newComments = bigPictureSocial.querySelector('.social__comments');
    var spliceNumber = window.constants.ZERO;
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
    createComment(picComments.splice(window.constants.ZERO, commentsNumber));

    commentsLoader.addEventListener('click', window.debounce(function () {
      spliceNumber += window.constants.MESSAGE_NUMBER;
      createComment(picComments.splice(window.constants.ZERO, commentsNumber));
    }));
  };

  window.bigPicture = {
    create: createBigPicture,
    EscapePress: onPictureEscapePress
  };
})();
