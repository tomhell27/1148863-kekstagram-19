'use strict';

// slider
(function () {

  var pinForm = document.querySelector('.img-upload__effect-level'); // вообще весь fieldset с ползунком
  var effectPin = pinForm.querySelector('.effect-level__pin'); // ползунок
  var levelValue = document.querySelector('.effect-level__value'); // значение ползунка
  var levelDeth = document.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords.x - moveEvt.clientX;
      // console.log(shift);
      startCoords = {
        x: moveEvt.clientX,
      };

      var firstPoint = effectPin.offsetLeft; // положение ползунка относительно начала линии

      // console.log(firstPoint);
      effectPin.style.left = (firstPoint - shift) + 'px';

      if ((firstPoint - shift) <= 0) {
        effectPin.style.left = 0 + 'px';
      }
      if ((firstPoint - shift) >= window.constants.LEVEL_WIDTH) {
        effectPin.style.left = window.constants.LEVEL_WIDTH + 'px';
      }

      var oneStep = window.constants.LEVEL_WIDTH / window.constants.WIDTH_PERSENT;

      levelValue.value = Math.floor(firstPoint / oneStep); // значение ползунка = к-ло шагов
      levelDeth.style.width = (Math.floor(firstPoint / oneStep) + '%'); // Заполняем шкалу желтеньким

      var formula = function (beggining, end) {
        return beggining + (end / window.constants.WIDTH_PERSENT) * levelValue.value;
      };

      if (window.actions.imgEffect.classList[0] === 'effects__preview--chrome') {
        window.actions.imgEffect.style.filter = 'grayscale(' + formula(0, 1) + ')';
      }

      if (window.actions.imgEffect.classList[0] === 'effects__preview--sepia') {
        window.actions.imgEffect.style.filter = ('sepia(' + formula(0, 1) + ')');
      }

      if (window.actions.imgEffect.classList[0] === 'effects__preview--marvin') {
        window.actions.imgEffect.style.filter = ('invert(' + formula(0, 100) + '%' + ')');
      }

      if (window.actions.imgEffect.classList[0] === 'effects__preview--phobos') {
        window.actions.imgEffect.style.filter = ('blur(' + formula(0, 3) + 'px' + ')');
      }

      if (window.actions.imgEffect.classList[0] === 'effects__preview--heat') {
        window.actions.imgEffect.style.filter = ('brightness(' + formula(1, 3) + ')');
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.slider = {
    pinForm: pinForm,
    levelValue: levelValue,
    effectPin: effectPin,
    levelDeth: levelDeth
  };
})();

