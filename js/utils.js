'use strict';

(function () {
  var body = document.querySelector('body');
  body.classList.add('modal-open');

  var randomNUMBER = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var onModalEscPress = function (evt) {
    if (window.actions.modalHash === document.activeElement || window.actions.modalComments === document.activeElement) {
      return;
    } else {
      if (evt.key === window.constants.ESC_KEY) {
        window.actions.closeModal();
      }
    }
  };

  window.utils = {
    onModalEscPress: onModalEscPress,
    randomNUMBER: randomNUMBER
  };
})();
