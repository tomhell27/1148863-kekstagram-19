
'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var imgForm = document.querySelector('#upload-select-image');
  var newImage = document.querySelector('.img-upload');
  var modalOpen = newImage.querySelector('#upload-file');
  var modalClose = newImage.querySelector('#upload-cancel');
  var modalPicture = newImage.querySelector('.img-upload__overlay');
  var modalHash = newImage.querySelector('.text__hashtags');
  var modalComments = newImage.querySelector('.text__description');
  var imgUpload = newImage.querySelector('.img-upload__preview');
  var imgEffect = imgUpload.querySelector('img');
  var body = document.querySelector('body');
  var scaleControlValue = document.querySelector('.scale__control--value');


  var onModalEscPress = function (evt) {
    if (modalHash === document.activeElement || modalComments === document.activeElement) {
      return;
    }
    if (evt.key === ESC_KEY) {
      closeModal();
    }
  };

  var openModal = function () {
    body.classList.add('modal-open');
    modalPicture.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscPress);
    scaleControlValue.value = '100%';
    modalHash.style = 'border: none';
    imgEffect.style.transform = 'scale(1)';
    imgEffect.style.filter = 'none';
    window.slider.pinForm.classList.add('hidden');
    modalHash.value = '';
    modalComments.value = '';
  };

  var closeModal = function () {
    imgForm.reset();
    body.classList.remove('modal-open');
    modalPicture.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };
  modalOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openModal();
    }
  });

  modalClose.addEventListener('click', function () {
    closeModal();
  });

  modalClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeModal();
    }
  });
  window.actions = {
    modalComments: modalComments,
    closeModal: closeModal,
    modalHash: modalHash,
    imgUpload: imgUpload,
    imgEffect: imgEffect,
    modalPicture: modalPicture,
    modalOpen: modalOpen,
    openModal: openModal,
    controlValue: scaleControlValue,
    imgForm: imgForm
  };
})();
