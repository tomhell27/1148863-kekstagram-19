'use strict';
(function () {
  var imageFilters = document.querySelector('.img-filters');
  var renderPicture = function (picture) {
    var pictureElement = window.creation.similarPictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');

    pictureImg.src = picture.url;
    pictureImg.addEventListener('click', function () {
      window.bigPicture.createBigPicture(picture);
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
