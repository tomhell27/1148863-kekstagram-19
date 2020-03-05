
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var modalOpen = document.querySelector('#upload-file');
  var modalClose = document.querySelector('#upload-cancel');
  var modalPicture = document.querySelector('.img-upload__overlay');
  var modalHash = document.querySelector('.text__hashtags');
  var modalComments = document.querySelector('.text__description');
  var imgUpload = document.querySelector('.img-upload__preview');
  var imgEffect = imgUpload.querySelector('img');
  var previewImg = document.querySelectorAll('.effects__preview');
  var createPreview = function (img) {
    previewImg.forEach(function (e) {
      e.style.backgroundImage = 'url(' + img + ')';
    });
  };

  modalOpen.addEventListener('change', function () {
    var file = modalOpen.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgEffect.src = reader.result;
        createPreview(reader.result);
      });
      reader.readAsDataURL(file);
    }
  });
  var openModal = function () {
    modalPicture.classList.remove('hidden');
    document.addEventListener('keydown', window.utils.onModalEscPress);
    window.scale.controlValue.value = '100%';
    imgUpload.style.transform = 'scale(1)';
    imgEffect.classList = 'none';
    imgEffect.style.filter = 'none';
    window.slider.pinForm.classList.add('hidden');
    modalHash.value = '';
    modalComments.value = '';
  };

  var closeModal = function () {
    modalPicture.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.onModalEscPress);
  };

  modalOpen.addEventListener('change', function () {
    openModal();
  });

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
    modalPicture: modalPicture
  };
})();

