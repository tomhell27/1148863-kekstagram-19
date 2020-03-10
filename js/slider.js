'use strict';

// slider
(function () {

  var pinForm = document.querySelector('.img-upload__effect-level');
  var effectPin = pinForm.querySelector('.effect-level__pin');
  var levelValue = document.querySelector('.effect-level__value');
  var levelDeth = document.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords.x - moveEvt.clientX;
      startCoords = {
        x: moveEvt.clientX,
      };

      var firstPoint = effectPin.offsetLeft;

      effectPin.style.left = (firstPoint - shift) + 'px';

      if ((firstPoint - shift) <= 0) {
        effectPin.style.left = 0 + 'px';
      }
      if ((firstPoint - shift) >= window.constants.LEVEL_WIDTH) {
        effectPin.style.left = window.constants.LEVEL_WIDTH + 'px';
      }

      var oneStep = window.constants.LEVEL_WIDTH / window.constants.WIDTH_PERSENT;

      levelValue.value = Math.floor(firstPoint / oneStep);
      levelDeth.style.width = (Math.floor(firstPoint / oneStep) + '%');

      var formula = function (beggining, end) {
        return beggining + (end / window.constants.WIDTH_PERSENT) * levelValue.value;
      };

      var imgEffectClassList = window.actions.imgEffect.classList;

      var changeEffect = function (effect) {
        var style = '';
        switch (effect) {
          case 'effects__preview--chrome': style = 'grayscale(' + formula(0, 1) + ')';
            break;
          case 'effects__preview--sepia': style = 'sepia(' + formula(0, 1) + ')';
            break;
          case 'effects__preview--marvin': style = 'invert(' + formula(0, 100) + '%' + ')';
            break;
          case 'effects__preview--phobos': style = 'blur(' + formula(0, 3) + 'px' + ')';
            break;
          case 'effects__preview--heat': style = 'brightness(' + formula(1, 3) + ')';

        }
        return style;
      };

      if (window.actions.imgEffect.classList[0] === imgEffectClassList[0]) {
        window.actions.imgEffect.style.filter = changeEffect(imgEffectClassList[0]);
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
