'use strict';
(function () {
  var imageFilters = document.querySelector('.img-filters');
  var renderPicture = function (picture) {
    var pictureElement = window.creation.similarPictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');

    pictureImg.src = picture.url;
    var openBigPicture = function () {
      window.bigPicture.create(picture);
    };
    pictureImg.addEventListener('click', function () {
      openBigPicture();
    });
    pictureImg.parentElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.constants.ENTER_KEY) {
        openBigPicture();
      }
    });

    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    imageFilters.classList.remove('img-filters--inactive');
    return pictureElement;
  };
  window.render = {
    picture: renderPicture,
    imageFilters: imageFilters
  };
})();
