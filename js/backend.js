'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = window.constants.TIMEOUT;

  var goBackend = function (method, url, data) {
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {

    load: function (onLoad, onError) {
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
        if (xhr.status !== window.constants.STATUS) {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      goBackend('GET', window.constants.URL, '');
    },

    upload: function (data, onSuccess) {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });
      goBackend('POST', window.constants.URL_GO, data);
    },
  };

})();
