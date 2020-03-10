'use strict';
(function () {
  var body = document.querySelector('body');
  body.classList.add('modal-open');
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content;
  var filterDefault = window.bigPicture.imageFilters.querySelector('#filter-default');
  var filterRandom = window.bigPicture.imageFilters.querySelector('#filter-random');
  var filterDiscussed = window.bigPicture.imageFilters.querySelector('#filter-discussed');
  var filtersButtons = window.bigPicture.imageFilters.querySelectorAll('.img-filters__button');

  filtersButtons.forEach(function (e) {
    e.addEventListener('click', function () {
      var filtersButtonActive = window.bigPicture.imageFilters.querySelector('.img-filters__button--active');
      filtersButtonActive.classList.remove('img-filters__button--active');
      e.classList.add('img-filters__button--active');
    });
  });

  var updatePhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.bigPicture.render(arr[i]));
    }
    var filterPhotos = document.querySelectorAll('.picture');
    filterPhotos.forEach(function (e) {
      similarListElement.removeChild(e);
    });
    similarListElement.appendChild(fragment);
  };

  var successHandler = function (photos) {
    var photosSortRandom = photos.slice(0, window.constants.RANDOM_PHOTOS_NUMBER);

    updatePhotos(photos);
    filterDefault.focus();
    filterDefault.addEventListener('click', window.debounce(function () {
      updatePhotos(photos);
    }));

    filterDiscussed.addEventListener('click', window.debounce(function () {
      var photosDiscussed = photos.slice(0).sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length < second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      updatePhotos(photosDiscussed);
    }));

    filterRandom.addEventListener('click', window.debounce(function () {
      var photosRandom = photosSortRandom.sort(function () {
        return Math.random() - 0.5;
      });
      updatePhotos(photosRandom);
    }));
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

