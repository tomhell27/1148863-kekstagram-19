'use strict';

// slider
(function () {
  var pinForm = document.querySelector('.img-upload__effect-level'); // вообще весь fieldset с ползунком
  var effectPin = pinForm.querySelector('.effect-level__pin'); // ползунок
  var levelValue = document.querySelector('.effect-level__value'); // значение ползунка
  var levelLine = pinForm.querySelector('.effect-level__line');// линия ползунка


  effectPin.addEventListener('mouseup', function () {

    var firstPoint = effectPin.offsetLeft; // положение ползунка относительно начала линии
    var computedStyle = getComputedStyle(levelLine); // Получаем стили шкалы
    var scaleWidth = parseInt(computedStyle.width, 10);// Узнаем длину шкалы
    levelValue.value = (Math.floor((firstPoint * 100) / scaleWidth)); // Меняем value
  });
  window.slider = {
    pinForm: pinForm,
    levelValue: levelValue
  };
})();
