'use strict';

(function () {

  var mainPin = window.page.mainPin;

  var ads = window.appdata.ads;
  var createCard = window.card.createCard;
  var mapPins = window.pin.mapPins;
  var map = window.page.map;
  var pageActivate = window.page.activate;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var popupClose = function () {
    var popup = map.querySelector('.popup');
    if (!popup) {
      return;
    }
    map.removeChild(popup);
    popup.removeEventListener('click', clickPinHandler);
    document.removeEventListener('keydown', escapePopupHandler);
  };

  var popupOpen = function (pin) {
    var index = mapPins.indexOf(pin);
    var mapLastElem = document.querySelector('.map__filters-container');
    var popup = createCard(ads[index]);
    map.insertBefore(popup, mapLastElem);
    var closePopupBtn = popup.querySelector('.popup__close');

    closePopupBtn.addEventListener('click', clickClosePopupHandler);
    document.addEventListener('keydown', escapePopupHandler);
  };

  var clickClosePopupHandler = function () {
    popupClose();
  };
  var escapePopupHandler = function (e) {
    var popup = e.target.closest('.popup');
    if (e.keyCode === ESC_KEYCODE) {
      popupClose(popup);
    }
  };

  var clickPinHandler = function (e) {
    popupClose();
    var pin = e.target.closest('.map__pin');
    popupOpen(pin);
  };

  mapPins.forEach(function (pin) {
    pin.addEventListener('click', clickPinHandler);
  });


  popupOpen(mapPins[0]);


  var mouseDownPinHandler = function (e) {
    pageActivate(e);
  };
  var keyDownPinHandler = function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      pageActivate(e);
    }
  };


  // Уставновка обработчика на метку

  mainPin.addEventListener('mousedown', mouseDownPinHandler);
  mainPin.addEventListener('keydown', keyDownPinHandler);


})();
