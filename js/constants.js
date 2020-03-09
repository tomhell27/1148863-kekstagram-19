
'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var AVATAR_NUMBER = 6;
  var MESSAGE_NUMBER = 5;
  var ONE_STEP = 25;
  var MAX_HASHTAGS = 5;
  var MAX_COMMENTS = 5;
  var MAX_SYMBOLS = 20;
  var MAX_COMMENTS_SYMBOLS = 140;
  var LEVEL_WIDTH = 450;
  var WIDTH_PERSENT = 100;
  var STATUS = 200;
  var TIMEOUT = 1000;
  var RANDOM_PHOTOS_NUMBER = 10;
  var ZERO = 0;
  var STEP = 10;
  var DEBOUNCE_INTERVAL = 500;
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_GO = 'https://js.dump.academy/kekstagram';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.constants = {
    AVATAR_NUMBER: AVATAR_NUMBER,
    MESSAGE_NUMBER: MESSAGE_NUMBER,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    ONE_STEP: ONE_STEP,
    MAX_HASHTAGS: MAX_HASHTAGS,
    MAX_SYMBOLS: MAX_SYMBOLS,
    LEVEL_WIDTH: LEVEL_WIDTH,
    WIDTH_PERSENT: WIDTH_PERSENT,
    URL: URL,
    URL_GO: URL_GO,
    MAX_COMMENTS: MAX_COMMENTS,
    STATUS: STATUS,
    TIMEOUT: TIMEOUT,
    MAX_COMMENTS_SYMBOLS: MAX_COMMENTS_SYMBOLS,
    FILE_TYPES: FILE_TYPES,
    ZERO: ZERO,
    RANDOM_PHOTOS_NUMBER: RANDOM_PHOTOS_NUMBER,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    STEP: STEP
  };
})();
