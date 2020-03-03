'use strict';

(function () {
  window.actions.modalHash.addEventListener('input', function (evt) {
    var invalidMessage = [];
    var target = evt.target;


    var inputText = window.actions.modalHash.value.toLowerCase().trim();

    var inputArray = inputText.split(/\s+/);

    var isStartNoHashing = inputArray.some(function (item) {
      return item[0] !== '#';
    });

    var isOnlyLaticeHashing = inputArray.some(function (item) {
      return item === '#';
    });

    var isManySymbolsHashing = inputArray.some(function (item) {
      return item.length > window.constants.MAX_SYMBOLS;
    });

    var isNoSpaceHashing = inputArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    var isSomeSpecialSymbols = inputArray.some(function (item) {
      return item.slice(1).match(/^\w+$/);
    });

    if (!inputText) {
      return;
    }
    if (inputArray.length === 0) {
      return;
    }

    if (isStartNoHashing) {
      invalidMessage.push('Хэштэг должен начинаться с "#"!');
    }
    if (isOnlyLaticeHashing) {
      invalidMessage.push('Хэштэг не должен состоять только из "#"!');
    }
    if (inputArray.length > window.constants.MAX_HASHTAGS) {
      invalidMessage.push('Не более пяти хэштэгов!');
    }
    if (isManySymbolsHashing) {
      invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
    }

    if (isNoSpaceHashing) {
      invalidMessage.push('Хэштэги должны разделяться пробелами!');
    }

    var isRepeatHashing = inputArray.some(function (item, j, arr) {
      return arr.indexOf(item, j + 1) >= j + 1;
    });
    if (isRepeatHashing) {
      invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды!');
    }

    if (!isSomeSpecialSymbols) {
      invalidMessage.push('Хэштэг не может содержать спецсимволы!');
    }

    target.setCustomValidity(invalidMessage.join('\n'));

  });

  window.actions.modalComments.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > window.constants.MAX_COMMENTS_SYMBOLS) {
      target.setCustomValidity('Комментарий не должен быть длиннее ' + window.constants.MAX_COMMENTS_SYMBOLS + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
