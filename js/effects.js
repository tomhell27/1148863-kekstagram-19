'use strict';

(function () {
  var currentEffect = 'none';
  var effects = document.querySelectorAll('.effects__label');

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
  form.addEventListener('submit', function (e) {
    window.upload(new FormData(form), function () {
      window.actions.modalPicture.classList.add('hidden');
    });
    e.preventDefault();

  });
  window.effects = {
    label: effects
  };
})();
