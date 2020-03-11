'use strict';

(function () {
  var STATUS = 200;
  var TIMEOUT = 10000;

  var goBackend = function (data, onSuccess, onError, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
      if (xhr.status !== STATUS) {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Не удалось выполнить за ' + xhr.timeout + 'мс');
    });


    xhr.open(method, url);
    xhr.send(data);

  };

  window.backend = {

    load: goBackend,
    upload: goBackend
  };

})();
