'use strict';

(function () {

  var adForm = window.page.adForm;

  function CustomValidation() {
    this.invalidities = [];
  }
  CustomValidation.prototype = {

    checkValidity: function (input, e) {
      var validity = input.validity;
      // console.log('from checkValidity ' + input.id + ' ', validity);

      if (validity.valueMissing) {
        this.addInvalidity('Обязательное поле');
      }

      if (validity.tooShort) {
        var minL = input.getAttribute('minlength');
        var str = input.value;
        this.addInvalidity('Минимальное число символов не меньше ' + minL + '. Не хватает ' + (minL - str.length));
      }

      if (validity.tooLong) {
        var maxL = input.getAttribute('maxlength');
        this.addInvalidity('Максимальное число символов не больше ' + maxL);
      }

      if (validity.rangeOverflow) {
        var max = input.getAttribute('max');
        this.addInvalidity('Максимальное значение поля не больше ' + max);
      }

      if (validity.rangeUnderflow) {
        var min = input.getAttribute('min');
        this.addInvalidity('Минимальное значение поля не меньше ' + min);
      }

      if (input.id === 'price' || input.id === 'type') {
        var isValidPrice = changePriceTypeHandler(e, input);
        if (!isValidPrice) {
          this.addInvalidity('Несовпадение по типу и цене');
        }
      }

      if (input.id === 'room_number' || input.id === 'capacity') {
        var isValidCapacity = changeCapacityHandler(e, input);
        if (!isValidCapacity) {
          this.addInvalidity('Несовпадение количества комнат и гостей');
        }
      }


    },

    addInvalidity: function (message) {
      this.invalidities.push(message);
    },

    getInvalidities: function () {
      return this.invalidities.join('. ');
    }

  };


  var showError = function (input) {
    input.classList.add('show-error');
  };
  var removeError = function (input) {
    input.classList.remove('show-error');
  };
  var showAllErrors = function (arr) {
    arr.forEach(function (input) {
      showError(input);
    });
  };
  var removeAllErrors = function (arr) {

    arr.forEach(function (input) {
      removeError(input);
    });
  };

  var relationInputDic = {
    'room_number': 'capacity',
    'timein': 'timeout',
    'type': 'price',
    'capacity': 'room_number',
    'timeout': 'timein',
    'price': 'type'
  };

  var roomsCapacityDic = {
    '100': ['0'],
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3']
  };

  var typePriceDic = {
    'bungalo': {'min': 0, 'max': 1000},
    'flat': {'min': 1000, 'max': 5000},
    'house': {'min': 5000, 'max': 10000},
    'palace': {'min': 10000, 'max': 1000000}
  };

  var checkErrorsRelatedInputs = function (target, related, getIsValid) {

    var inputs = [];
    inputs.push(target, related);
    if (!getIsValid(target, related)) {

      showAllErrors(inputs);
      return false;
    }
    related.setCustomValidity('');
    removeAllErrors(inputs);
    return true;
  };

  var changePriceTypeHandler = function (e, input) {
    var target = e.type === 'submit' ? input : e.target;
    var related = document.querySelector('#' + relationInputDic[target.id]);

    var priceElem = target.id === 'price' ? target : related;
    var typeElem = target.id === 'type' ? target : related;

    var typeValue = typeElem.options[typeElem.selectedIndex].value;
    priceElem.setAttribute('min', typePriceDic[typeValue]['min']);
    priceElem.setAttribute('placeholder', typePriceDic[typeValue]['min']);
    priceElem.setAttribute('max', typePriceDic[typeValue]['max']);

    var getIsValid = function () {
      var price = parseInt(priceElem.value, 10);
      return (typePriceDic[typeElem.value]['min'] < price
        && price <= typePriceDic[typeElem.value]['max']);

    };

    return checkErrorsRelatedInputs(target, related, getIsValid);
  };

  var changeCapacityHandler = function (e, input) {
    var target = e.type === 'submit' ? input : e.target;
    var related = document.querySelector('#' + relationInputDic[target.id]);

    var getIsValid = function () {
      var isValid = false;
      var roomsVal = target.id === 'room_number' ? target.value : related.value;
      var capacityVal = related.id === 'capacity' ? related.value : target.value;


      var values = roomsCapacityDic[roomsVal];
      values.forEach(function (item) {
        if (item === capacityVal) {
          isValid = true;
        }
      });

      return isValid;
    };
    return checkErrorsRelatedInputs(target, related, getIsValid);
  };

  // Обработчики полей времени
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var changeTimeHandler = function (e) {
    var target = e.target;
    var related = document.querySelector('#' + relationInputDic[target.id]);
    if (target.value !== related.value) {
      related.value = target.value;
    }
  };

  timein.addEventListener('change', changeTimeHandler);
  timeout.addEventListener('change', changeTimeHandler);

  var adFormElements = [].slice.call(adForm.elements);
  var _adFormElements = adFormElements.filter(function (item) {
    if (item.tagName !== 'FIELDSET'
      && item.tagName !== 'BUTTON') {
      return true;
    }
    return false;
  });

  _adFormElements.forEach(function (input) {
    var eName = 'input';
    if (input.tagName === 'SELECT') {
      eName = 'change';
    }
    var validation = new CustomValidation();
    validation.getInvalidities(validation);
    input.addEventListener(eName, function (e) {

      validation.checkValidity(input, e);
      var message = validation.getInvalidities();
      if (message) {
        input.setCustomValidity(message);
        validation.invalidities = [];
      } else {
        input.setCustomValidity('');
        validation.invalidities = [];

      }

    });

  });

  adForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;

    _adFormElements.forEach(function (input) {

      var validation = new CustomValidation(); // Создадим объект CustomValidation
      validation.checkValidity(input, e); // Выявим ошибки
      var message = validation.getInvalidities();
      // Получим все сообщения об ошибках

      if (message) {
        input.setCustomValidity(message); // Установим специальное сообщение об ошибке

      } else {
        input.setCustomValidity('');

      }

    });

    if (form.checkValidity()) {
      form.submit();
    }

  });

})();
