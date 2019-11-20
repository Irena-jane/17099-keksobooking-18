'use strict';

(function () {

  var ads;

  var getWithinMapArr = window.filters.getWithinMapArr;

  var xhr = new XMLHttpRequest();

  var url = 'https://js.dump.academy/keksobooking/data';
  xhr.responseType = 'json';
  xhr.open('GET', url);

  xhr.addEventListener('load', function () {
    ads = xhr.response;
    var loyalAds = getWithinMapArr(ads);
    // console.log(loyalAds);
    window.appdata = {
      'ads': loyalAds

    };
  });

  xhr.send();

})();
