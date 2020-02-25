'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = window.constants.TIMEOUT;


  window.backend = {

    load: function (data, onSuccess, onError, method, url) {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
        if (xhr.status !== window.constants.STATUS) {
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

    }
  };

})();
