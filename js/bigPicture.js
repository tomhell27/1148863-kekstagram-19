'use strict';

(function () {
  // находим секцию,  показываем большую картинку

  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  // удаляем "Загрузить еще"
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  // находим картинку
  var bigPictureImage = document.querySelector('.big-picture__img');
  bigPictureImage.querySelector('img').src = window.creation.pictures[0].url;

  // лайки, описание, аватарка автора фотографии
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  bigPictureSocial.querySelector('.social__caption').textContent = window.creation.pictures[0].description;
  bigPictureSocial.querySelector('.likes-count').textContent = window.creation.pictures[0].likes;

  // комментарии, количество, аватарки
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.querySelector('.comments-count').textContent = window.creation.pictures[0].comments.length;
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

    for (var i = 0; i < window.creation.pictures[0].comments.length; i++) {
      fragment.appendChild(renderComment(window.creation.pictures[0].comments[i]));
    }
    return newComments.appendChild(fragment);
  };

  var fragmentComment = document.createDocumentFragment();
  createComment(fragmentComment);

})();

