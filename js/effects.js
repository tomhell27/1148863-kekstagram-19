'use strict';

(function () {
  var currentEffect = 'none';
  var effects = document.querySelectorAll('.effects__label');
  var main = document.querySelector('main');
  var success = document.querySelector('#success')
    .content
    .querySelector('.success');
  var error = document.querySelector('#error')
    .content
    .querySelector('.error');

  for (var i = 0; i < effects.length; i++) {

    effects[i].addEventListener('click', function (e) {
      var newEffect = e.target.classList.item(1);
      window.actions.imgEffect.classList.remove(currentEffect);
      currentEffect = newEffect;
      window.actions.imgEffect.classList.add(newEffect);
      window.slider.effectPin.style.left = '450px';
      window.slider.levelDeth.style.width = '100%';

      if (newEffect === 'effects__preview--chrome') {
        window.actions.imgEffect.style.filter = 'grayscale(1)';
      }

      if (newEffect === 'effects__preview--sepia') {
        window.actions.imgEffect.style.filter = ('sepia(1)');
      }

      if (newEffect === 'effects__preview--marvin') {
        window.actions.imgEffect.style.filter = ('invert(100%)');
      }

      if (newEffect === 'effects__preview--phobos') {
        window.actions.imgEffect.style.filter = ('blur(3px)');
      }

      if (newEffect === 'effects__preview--heat') {
        window.actions.imgEffect.style.filter = ('brightness(3)');
      }

      if (newEffect === 'effects__preview--none') {
        window.slider.pinForm.classList.add('hidden');
        window.actions.imgEffect.style.filter = 'none';
      } else {
        window.slider.pinForm.classList.remove('hidden');
      }

    });
  }
  var form = document.querySelector('.img-upload__form');
  var successElement = success.cloneNode(true);
  var errorElement = error.cloneNode(true);
  var successButton = successElement.querySelector('.success__button');
  var errorButton = errorElement.querySelector('.error__button');

  var onSuccesslEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      closeSuccess();
    }
  };

  var closeSuccess = function () {
    successElement.remove();
    document.removeEventListener('keydown', onSuccesslEscPress);
  };

  successButton.addEventListener('click', function () {
    closeSuccess();
  });

  document.addEventListener('click', function () {
    closeSuccess();
  });

  var onErrorlEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      closeError();
    }
  };

  var closeError = function () {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorlEscPress);
  };

  errorButton.addEventListener('click', function () {
    closeError();
  });

  document.addEventListener('click', function () {
    closeError();
  });


  var onSuccess = function () {
    window.actions.modalPicture.classList.add('hidden');
    main.appendChild(successElement);
    document.addEventListener('keydown', onSuccesslEscPress);
  };


  var onError = function () {
    window.actions.modalPicture.classList.add('hidden');
    main.appendChild(errorElement);
    document.addEventListener('keydown', onErrorlEscPress);
  };

  form.addEventListener('submit', function (e) {
    window.backend.upload(new FormData(form), onSuccess, onError, 'POST', window.constants.URL_GO);
    e.preventDefault();
  });


  window.effects = {
    label: effects,
    form: form
  };
})();
