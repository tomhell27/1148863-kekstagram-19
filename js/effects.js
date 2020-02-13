'use strict';

//  effects
(function () {
  var currentEffect = 'none';
  var effects = document.querySelectorAll('.effects__label');
  for (var i = 0; i < effects.length; i++) {

    effects[i].addEventListener('click', function (e) {
      var newEffect = e.target.classList.item(1);

      window.openingClosing.imgEffect.classList.remove(currentEffect);
      currentEffect = newEffect;

      window.openingClosing.imgEffect.classList.add(newEffect);

      var formula = function (beggining, end) {
        return beggining + (end / 100) * window.slider.levelValue.value;
      };

      if (newEffect === 'effects__preview--chrome') {
        window.openingClosing.imgEffect.style.filter = 'grayscale(' + formula(0, 1) + ')';
      }

      if (newEffect === 'effects__preview--sepia') {
        window.openingClosing.imgEffect.style.filter = ('sepia(' + formula(0, 1) + ')');
      }

      if (newEffect === 'effects__preview--marvin') {
        window.openingClosing.imgEffect.style.filter = ('invert(' + formula(0, 100) + '%' + ')');
      }

      if (newEffect === 'effects__preview--phobos') {
        window.openingClosing.imgEffect.style.filter = ('blur(' + formula(0, 3) + 'px' + ')');
      }

      if (newEffect === 'effects__preview--heat') {
        window.openingClosing.imgEffect.style.filter = ('brightness(' + formula(1, 3) + ')');
      }

      if (newEffect === 'effects__preview--none') {
        window.openingClosing.pinForm.classList.add('hidden');
      } else {
        window.slider.pinForm.classList.remove('hidden');
      }
    });
  }
})();
