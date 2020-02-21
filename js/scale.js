'use strict';

(function () {
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  scaleControlValue.value = '100%';
  window.actions.imgUpload.style.transform = 'scale(1)';


  controlBigger.addEventListener('click', function () {
    if ((parseInt(scaleControlValue.value, 10) + window.constants.ONE_STEP) >= 100) {
      window.actions.imgUpload.style.transform = 'scale(' + 1 + ')';
      scaleControlValue.value = '100%';
    } else {
      window.actions.imgUpload.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) + window.constants.ONE_STEP) / 100) + ')';
      scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + window.constants.ONE_STEP) + '%';
    }
  });

  controlSmaller.addEventListener('click', function () {
    if ((parseInt(scaleControlValue.value, 10) - window.constants.ONE_STEP) <= window.constants.ONE_STEP) {
      window.actions.imgUpload.style.transform = 'scale(' + 0.25 + ')';
      scaleControlValue.value = '25%';
    } else {
      window.actions.imgUpload.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) - window.constants.ONE_STEP) / 100) + ')';
      scaleControlValue.value = (parseInt(scaleControlValue.value, 10) - window.constants.ONE_STEP) + '%';
    }
  });
  window.scale = {
    controlValue: scaleControlValue
  };
})();

