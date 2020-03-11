'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_SYMBOLS = 20;
  window.actions.modalHash.addEventListener('input', function (evt) {
    var invalidMessages = [];
    var inputText = window.actions.modalHash.value.toLowerCase().trim();
    var inputArray = inputText.split(' ');
    var target = evt.target;

    if (!inputText.length) {
      target.setCustomValidity('');
      window.actions.modalHash.style = 'border: none';
      return;
    }
    var isStartNoHashing = inputArray.some(function (item) {
      return item[0] !== '#';
    });

    var isOnlyLaticeHashing = inputArray.some(function (item) {
      return item === '#';
    });

    var isManySymbolsHashing = inputArray.some(function (item) {
      return item.length > MAX_SYMBOLS;
    });

    var isNoSpaceHashing = inputArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    var isSomeSpecialSymbols = inputArray.some(function (item) {
      return item.slice(1).match(/^\w+$/);
    });

    var isRepeatHashing = inputArray.some(function (item, j, arr) {
      return arr.indexOf(item, j + 1) >= j + 1;
    });

    if (isStartNoHashing) {
      invalidMessages.push('Хэштэг должен начинаться с "#"!');
    }
    if (isOnlyLaticeHashing) {
      invalidMessages.push('Хэштэг не должен состоять только из "#"!');
    }
    if (inputArray.length > MAX_HASHTAGS) {
      invalidMessages.push('Не более пяти хэштэгов!');
    }
    if (isManySymbolsHashing) {
      invalidMessages.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
    }

    if (isNoSpaceHashing) {
      invalidMessages.push('Хэштэги должны разделяться пробелами!');
    }

    if (isRepeatHashing) {
      invalidMessages.push('Один и тот же хэш-тег не может быть использован дважды!');
    }

    if (!isSomeSpecialSymbols) {
      invalidMessages.push('Хэштэг не может содержать спецсимволы!');
    }
    target.setCustomValidity(invalidMessages.join('\n'));

    if (invalidMessages.length > 0) {
      window.actions.modalHash.style = 'border: 3px solid tomato';
    } else {
      window.actions.modalHash.style = 'border: none';
    }
  });
})();
