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
      window.scale.controlValue.value = '100%';
      window.actions.imgUpload.style.transform = 'scale(1)';
      window.slider.effectPin.style.left = '450px';
      window.slider.levelDeth.style.width = '100%';

      if (newEffect === 'effects__preview--chrome') {
        window.actions.imgEffect.style.filter = 'grayscale(' + 1 + ')';
      }

      if (newEffect === 'effects__preview--sepia') {
        window.actions.imgEffect.style.filter = ('sepia(' + 1 + ')');
      }

      if (newEffect === 'effects__preview--marvin') {
        window.actions.imgEffect.style.filter = ('invert(' + 100 + '%' + ')');
      }

      if (newEffect === 'effects__preview--phobos') {
        window.actions.imgEffect.style.filter = ('blur(' + 3 + 'px' + ')');
      }

      if (newEffect === 'effects__preview--heat') {
        window.actions.imgEffect.style.filter = ('brightness(' + 3 + ')');
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

  var onSuccess = function () {
    window.actions.modalPicture.classList.add('hidden');
    var successElement = success.cloneNode(true);
    main.appendChild(successElement);
    successElement.querySelector('.success__button').addEventListener('click', function () {
      successElement.remove();
    });
  };
  var onError = function () {
    window.actions.modalPicture.classList.add('hidden');
    var errorElement = error.cloneNode(true);
    main.appendChild(errorElement);
    errorElement.querySelector('.error__button').addEventListener('click', function () {
      errorElement.remove();
    });
  };
  form.addEventListener('submit', function (e) {
    window.backend.load(new FormData(form), onSuccess, onError, 'POST', window.constants.URL_GO);
    e.preventDefault();
  });


  window.effects = {
    label: effects,
    form: form
  };
})();
