'use strict';

(function () {

  var mainPin = window.page.mainPin;

  // var ads = window.appdata.ads;
  var createCard = window.card.createCard;
  var map = window.page.map;
  var pageActivate = window.page.activate;

  //var getRandomArr = window.filters.getRandomArr;
  var getLimitedArr = window.filters.getLimitedArr;


  var createMapPins = window.pin.createMapPins;
  var mapPins;
  var isActivated = false;

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
    if (pin.classList.contains('map__pin--main')) {
      return;
    }

    var ads = window.appdata.ads || ads;

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


  var mapPinsActivate = function () {
    if (isActivated) {
      return;
    }
    isActivated = true;
    var ads = getLimitedArr(window.appdata.ads);

    mapPins = createMapPins(ads);
    mapPins.forEach(function (pin) {
      pin.addEventListener('click', clickPinHandler);
    });

    popupOpen(mapPins[0]);
  };

  var mouseDownPinHandler = function (e) {
    pageActivate(e);
    mapPinsActivate(mapPins);
  };
  var keyDownPinHandler = function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      pageActivate(e);
      mapPinsActivate(mapPins);
    }
  };


  // Уставновка обработчика на метку

  mainPin.addEventListener('mousedown', mouseDownPinHandler);
  mainPin.addEventListener('keydown', keyDownPinHandler);

  window.map = {
    'clickPinHandler': clickPinHandler,
    'mapPins': mapPins
  };

})();
