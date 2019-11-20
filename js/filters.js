'use strict';

(function () {

  var pinWidth = window.pin.pinWidth;
  var minY = window.pin.minY;
  var maxY = window.pin.maxY;


  var getWithinMapArr = function (ads) {

    var adsCopy = ads.filter(function (ad) {
      var map = document.querySelector('.map');
      var maxLeft = parseInt(getComputedStyle(map).getPropertyValue('width'), 10) - pinWidth;
      var x = ad.location.x;
      var y = ad.location.y;

      if (x > maxLeft
          || x < pinWidth
          || y < minY
          || y > maxY) {

        return false;
      }

      return true;
    })
    .filter(function (ad) {
      if(ad.offer){
        return true;
      }
      return false;
    });

    return adsCopy;
  };


  var getRandomNum = function (max, min) {
    if (min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Math.floor(Math.random() * max);

  };


  var getRandomArr = function (arr) {
    var randomSort = function () {
      return Math.random() - 0.5;
    };
    arr.sort(randomSort);
    var length = getRandomNum(arr.length, 1);
    return arr.slice(0, length);
  };

  var getByHousingType = function (ads, type) {

      if(type === 'any') {
        return true;
      }

      var _ads = ads.filter(function(ad){
          return ad.offer.type === type;
      });

      return _ads;
  };

  window.filters = {
    'getRandomArr': getRandomArr,
    'getLimitedArr': window.pin.getLimitedArr,
    'getWithinMapArr': getWithinMapArr,
    'getByHousingType': getByHousingType
  };

})();
