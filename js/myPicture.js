'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewImg = document.querySelectorAll('.effects__preview');
  var createPreview = function (img) {
    previewImg.forEach(function (e) {
      e.style.backgroundImage = 'url(' + img + ')';
    });
  };

  window.actions.modalOpen.addEventListener('change', function () {
    var file = window.actions.modalOpen.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        window.actions.imgEffect.src = reader.result;
        createPreview(reader.result);
      });
      reader.readAsDataURL(file);
      window.actions.openModal();
    } else {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
      node.style.position = 'absolute';
      node.style.left = '0';
      node.style.right = '0';
      node.style.fontSize = '25px';

      node.textContent = 'Неверный формат документа! Используйте формат gif, jpg, png или jpeg';
      document.body.insertAdjacentElement('afterbegin', node);

      document.addEventListener('click', function () {
        node.remove();
      });
    }
  });
})();
