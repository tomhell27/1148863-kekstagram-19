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

  // лайки, описание, аватарка автора фотографии
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');


  // комментарии, количество, аватарки
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');

  // открываем-закрываем
  var closeButton = bigPicture.querySelector('.big-picture__cancel');
  /*
    var openPicture = document.querySelectorAll('.picture');
    openPicture[0].addEventListener('click', function () {
      bigPicture.classList.remove('hidden');

    });*/
  closeButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  // находим все комментарии ul
  var newComments = document.querySelector('.social__comments');

  // var openPicture = document.querySelectorAll('.picture');


  var createBigPicture = function (picture) {

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
    createBigPicture: createBigPicture
  };
})();

