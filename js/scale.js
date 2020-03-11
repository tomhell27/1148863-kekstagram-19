'use strict';

(function () {
  var ONE_STEP = 25;
  var WIDTH_PERSENT = 100;
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  window.actions.controlValue.value = '100%';
  window.actions.imgEffect.style.transform = 'scale(1)';


  controlBigger.addEventListener('click', function () {
    if ((parseInt(window.actions.controlValue.value, 10) + ONE_STEP) >= WIDTH_PERSENT) {
      window.actions.imgEffect.style.transform = 'scale(1)';
      window.actions.controlValue.value = '100%';
    } else {
      window.actions.imgEffect.style.transform = 'scale(' + ((parseInt(window.actions.controlValue.value, 10) + ONE_STEP) / WIDTH_PERSENT) + ')';
      window.actions.controlValue.value = (parseInt(window.actions.controlValue.value, 10) + ONE_STEP) + '%';
    }
  });

  controlSmaller.addEventListener('click', function () {
    if ((parseInt(window.actions.controlValue.value, 10) - ONE_STEP) <= ONE_STEP) {
      window.actions.imgEffect.style.transform = 'scale(0.25)';
      window.actions.controlValue.value = '25%';
    } else {
      window.actions.imgEffect.style.transform = 'scale(' + ((parseInt(window.actions.controlValue.value, 10) - ONE_STEP) / WIDTH_PERSENT) + ')';
      window.actions.controlValue.value = (parseInt(window.actions.controlValue.value, 10) - ONE_STEP) + '%';
    }
  });
})();

