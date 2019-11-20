'use strict';

(function () {

  var ads;

  var xhr = new XMLHttpRequest();

  var url = 'https://js.dump.academy/keksobooking/data';
  xhr.responseType = 'json';
  xhr.open('GET', url);

  xhr.addEventListener('load', function () {
    ads = xhr.response;
    window.appdata = {
      'ads': ads
    };
  });

  xhr.send();

})();
