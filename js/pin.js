'use strict';

(function () {

  var ads = window.appdata.ads;

  var pinWidth = window.appdata.pinWidth;
  var pinHeight = window.appdata.pinHeight;

  var createMapPin = function (obj, template) {
    var elem = template.cloneNode(true);
    elem.style.left = obj.location.x - pinWidth / 2 + 'px';
    elem.style.top = obj.location.y - pinHeight + 'px';

    var elemImg = elem.querySelector('img');
    elemImg.src = obj.author.avatar;
    elemImg.alt = obj.offer.title;

    return elem;

  };


  var createMapPins = function () {
    var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var elem = createMapPin(ads[i], template);
      fragment.appendChild(elem);
    }

    var mapPinsContainer = document.querySelector('.map__pins');
    mapPinsContainer.appendChild(fragment);

    var pins = [].slice.call(mapPinsContainer.querySelectorAll('.map__pin'));

    return pins.filter(function (pin) {
      return !pin.classList.contains('map__pin--main');
    });

  };

  // Вызов метода создания меток
  var mapPins = createMapPins();

  window.pin = {
    'mapPins': mapPins
  };

})();
