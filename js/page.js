'use strict';

(function () {

  var pinWidth = window.pin.pinWidth;
  var pinHeight = window.pin.pinHeight;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFilters = document.querySelector('.map__filters');

  var mainPin = document.querySelector('.map__pin--main');

  var getAllFormsFields = function () {
    var fields = [].slice.call(adForm.querySelectorAll('fieldset'));
    var filterFields = [].slice.call(formFilters.querySelectorAll('fieldset'));
    var filterSelects = [].slice.call(formFilters.querySelectorAll('select'));
    var _fields = fields.concat(filterFields, filterSelects);
    return _fields;
  };
  var setFormsDisabled = function () {
    adForm.classList.add('ad-form--disabled');
    var fields = getAllFormsFields();
    fields.forEach(function (elem) {
      elem.setAttribute('disabled', '');
    });
  };
  // Активация/дезактивация формы и страницы
  var setFormsActive = function () {
    adForm.classList.remove('ad-form--disabled');
    var fields = getAllFormsFields();
    fields.forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var setPageDisabled = function () {
    map.classList.add('map--faded');
    setFormsDisabled();
  };
  var setPageActive = function () {
    map.classList.remove('map--faded');
    setFormsActive();
  };


  // Заполнение адреса


  var setAddress = function (e) {
    var addressElem = adForm.querySelector('#address');
    var top = parseInt(mainPin.style.top, 10);
    var left = parseInt(mainPin.style.left, 10);
    var _left = Math.round(left + pinWidth / 2);
    var _top;
    if (!e) {
      _top = Math.round(top + pinHeight / 2);
      // console.log('from !e ', _top);
    }

    if (e) {
      _top = Math.round(top + pinHeight);
      // console.log('from e ', _top);
    }

    addressElem.value = _left + ', ' + _top;
  };

  setFormsDisabled();
  setAddress();


  window.page = {
    'map': map,
    'adForm': adForm,
    'activate': function (e) {
      setPageActive();
      setAddress(e);
    },
    'setPageDisabled': setPageDisabled,
    'setAddress': setAddress,
    'mainPin': mainPin
  };

})();
