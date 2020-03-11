'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var URL_GO = 'https://js.dump.academy/kekstagram';
  var currentEffect = 'none';
  var effects = document.querySelectorAll('.effects__label');
  var main = document.querySelector('main');
  var success = document.querySelector('#success')
    .content
    .querySelector('.success');
  var error = document.querySelector('#error')
    .content
    .querySelector('.error');
  var body = document.querySelector('body');

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
    if (evt.key === ESC_KEY) {
      closeSuccess();
    }
  };

  var closeSuccess = function () {
    body.classList.remove('modal-open');
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
    if (evt.key === ESC_KEY) {
      closeError();
    }
  };

  var closeError = function () {
    body.classList.remove('modal-open');
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
    window.actions.imgForm.reset();
    window.actions.modalPicture.classList.add('hidden');
    main.appendChild(successElement);
    document.addEventListener('keydown', onSuccesslEscPress);
  };


  var onError = function (errorMessage) {
    window.actions.modalPicture.classList.add('hidden');
    main.appendChild(errorElement);
    document.addEventListener('keydown', onErrorlEscPress);

    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    document.addEventListener('click', function () {
      node.remove();
    });
  };

  form.addEventListener('submit', function (e) {
    window.backend.upload(new FormData(form), onSuccess, onError, 'POST', URL_GO);
    e.preventDefault();
  });


  window.effects = {
    label: effects,
    form: form
  };
})();
