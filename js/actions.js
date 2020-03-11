
'use strict';

(function () {
  var newImage = document.querySelector('.img-upload');
  var modalOpen = newImage.querySelector('#upload-file');
  var modalClose = newImage.querySelector('#upload-cancel');
  var modalPicture = newImage.querySelector('.img-upload__overlay');
  var modalHash = newImage.querySelector('.text__hashtags');
  var modalComments = newImage.querySelector('.text__description');
  var imgUpload = newImage.querySelector('.img-upload__preview');
  var imgEffect = imgUpload.querySelector('img');

  var openModal = function () {
    modalPicture.classList.remove('hidden');
    document.addEventListener('keydown', window.utils.onModalEscPress);
    window.scale.controlValue.value = '100%';
    imgUpload.style.transform = 'scale(1)';
    imgEffect.style.filter = 'none';
    window.slider.pinForm.classList.add('hidden');
    modalHash.value = '';
    modalComments.value = '';
  };

  var closeModal = function () {
    modalPicture.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.onModalEscPress);
  };
  modalOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      openModal();
    }
  });

  modalClose.addEventListener('click', function () {
    closeModal();

  });

  modalClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
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
    openModal: openModal
  };
})();
