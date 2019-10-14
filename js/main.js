'use strict';

var USER_MAX = 8;
var USER_MIN = 1;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var MIN_Y = 130;
var MAX_Y = 630;

var getPinParams = function () {
  var template = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var pin = template.cloneNode(true);
  var container = document.createElement('div');
  container.style.opacity = 0;
  container.style.left = 0;
  container.style.top = 0;
  container.appendChild(pin);
  document.body.appendChild(container);

  var size = {};
  size.width = container.querySelector('.map__pin').clientWidth;
  size.height = container.querySelector('.map__pin').clientHeight;
  document.body.removeChild(container);

  return size;
};

var params = getPinParams();
var pinWidth = params.width;
var pinHeight = params.height;

var minLocationY = MIN_Y + pinHeight;

var minLocationX = pinWidth / 2;
var maxLocationX = document.documentElement.clientWidth - pinWidth / 2;

var titles = ['Сдается милая уютная квартирка.',
  '7 причин снять эту квартиру!',
  'Отличный дворец по хорошей цене',
  'Сдается шикарное бунгало',
  'Потрясающая квартира без комиссии!',
  'Сдается впервые!',
  'Видовая квартира, панорамный вид!',
  'Современный дом!'];

var types = ['palace', 'flat', 'house', 'bungalo'];

var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var descriptions = ['Отличное предложение в одном из самых престижных районов Токио!',
  'Уникальное расположение дома — в самом сердце Токио! Есть все необходимое для комфортного проживания.',
  'Развитая инфраструктура района. Благоустроенная придомовая территория.',
  'Большая, светлая, уютная двухкомнатная квартира, с отличным ремонтом.',
  'Редкая возможность жить в красивой современной квартире и одновременно в окружении старинной архитектуры и духа старого Токио!'];

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomArr = function (arr) {
  var randomSort = function () {
    return Math.random() - 0.5;
  };
  arr.sort(randomSort);
  var length = getRandomNum(arr.length, 1);
  return arr.slice(0, length);
};

var createAd = function () {
  var ad = {};
  var checkout;
  var checkin = checkout = times[getRandomNum(times.length)];

  ad.author = {
    'avatar': 'img/avatars/user0' + getRandomNum(USER_MAX, USER_MIN) + '.png'
  };

  ad.location = {
    'x': getRandomNum(maxLocationX, minLocationX),
    'y': getRandomNum(MAX_Y, minLocationY)
  };

  ad.offer = {
    'title': titles[getRandomNum(titles.length)],
    'address': ad.location.x + ', ' + ad.location.y,
    'price': getRandomNum(5000),
    'type': types[getRandomNum(types.length)],
    'rooms': getRandomNum(100, 1),
    'guests': getRandomNum(3),
    'checkin': checkin,
    'checkout': checkout,
    'features': getRandomArr(features),
    'description': descriptions[getRandomNum(descriptions.length)],
    'photos': getRandomArr(photos)
  };

  return ad;
};


var getRandomNum = function (max, min) {
  if (min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Math.floor(Math.random() * max);

};

var createAds = function (num) {
  var ads = [];
  for (var i = 0; i < num; i++) {
    var ad = createAd();
    ads.push(ad);
  }
  return ads;
};

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

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var formFilters = document.querySelector('.map__filters');
setFormsDisabled();

// Уставновка обработчика на метку
var mainPin = document.querySelector('.map__pin--main');

// Заполнение адреса

var setAddress = function (e) {
  var addressElem = adForm.querySelector('#address');
  var top = parseInt(mainPin.style.top, 10);
  var left = parseInt(mainPin.style.left, 10);
  var _left = Math.round(left + pinWidth / 2);
  var _top;
  if (!e
    || e.type !== 'mousedown'
    || e.type !== 'mousemove') {

    _top = Math.round(top + pinHeight / 2);
  }

  if (e && e.type === 'mousedown'
    || e && e.type === 'mousemove') {
    _top = Math.round(top + pinHeight);
  }


  addressElem.value = _left + ', ' + _top;
};
setAddress();

var mouseDownPinHandler = function (e) {
  setPageActive();
  setAddress(e);
};
var keyDownPinHandler = function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    setPageActive();
    setAddress(e);
  }
};

mainPin.addEventListener('mousedown', mouseDownPinHandler);
mainPin.addEventListener('keydown', keyDownPinHandler);

// Валидация формы
function CustomValidation() {
  this.invalidities = [];
}
CustomValidation.prototype = {
  // invalidities: [],

  checkValidity: function (input) {
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


  },

  addInvalidity: function (message) {
    this.invalidities.push(message);
  },

  getInvalidities: function () {
    return this.invalidities.join('. ');
  },
  getInvaliditiesForHTML: function () {
    return this.invalidities.join('. <br>');
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

var roomsInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');

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
  'palace': {'min': 10000, 'max': 1000001}
};

var changePriceTypeHandler = function (e) {
  var target = e.target;
  var related = document.querySelector('#' + relationInputDic[target.id]);

  var priceElem = target.id === 'price' ? target : related;
  var typeElem = target.id === 'type' ? target : related;
  var getIsValid = function () {
    var price = parseInt(priceElem.value, 10);
    return (typePriceDic[typeElem.value]['min'] <= price
      && price < typePriceDic[typeElem.value]['max']);

  };
  var inputs = [];
  inputs.push(target, related);
  if (!getIsValid(target, related)) {

    showAllErrors(inputs);
    return;
  }
  removeAllErrors(inputs);
};
var changeTimeHandler = function (e) {
  var target = e.target;
  var related = document.querySelector('#' + relationInputDic[target.id]);
  if (target.value !== related.value) {
    related.value = target.value;
  }
};
var changeCapacityHandler = function (e) {
  var target = e.target;
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

  var inputs = [];
  inputs.push(target, related);
  if (!getIsValid(target, related)) {

    showAllErrors(inputs);
    return;
  }
  removeAllErrors(inputs);
};

roomsInput.addEventListener('change', changeCapacityHandler);
capacityInput.addEventListener('change', changeCapacityHandler);

timein.addEventListener('change', changeTimeHandler);
timeout.addEventListener('change', changeTimeHandler);

priceInput.addEventListener('change', changePriceTypeHandler);
typeInput.addEventListener('change', changePriceTypeHandler);

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
  validation.getInvalidities.bind(validation);
  input.addEventListener(eName, function () {

    validation.checkValidity(input);
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

// adForm.addEventListener('input', );

adForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var stopSubmit;

  _adFormElements.forEach(function (input) {

    // if (input.checkValidity() == false) {

    var validation = new CustomValidation(); // Создадим объект CustomValidation
    validation.checkValidity(input); // Выявим ошибки
    var message = validation.getInvalidities();
    // Получим все сообщения об ошибках

    if (message) {
      input.setCustomValidity(message); // Установим специальное сообщение об ошибке
      // console.log(message);
    } else {
      input.setCustomValidity('');
    }

    // Добавим ошибки в документ
    var customValidityMessageForHTML = validation.getInvaliditiesForHTML();
    input.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
    stopSubmit = true;
    // }

  });

  if (stopSubmit) {
    e.preventDefault();
  }

});
// Создание меток

var createMapPin = function (obj, template) {
  var elem = template.cloneNode(true);
  elem.style.left = obj.location.x - pinWidth / 2 + 'px';
  elem.style.top = obj.location.y - pinHeight + 'px';

  var elemImg = elem.querySelector('img');
  elemImg.src = obj.author.avatar;
  elemImg.alt = obj.offer.title;

  return elem;

};

var ads = createAds(USER_MAX);

var createMapPins = function () {
  var template = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var elem = createMapPin(ads[i], template);
    fragment.appendChild(elem);
  }

  document.querySelector('.map__pins').appendChild(fragment);
};
// Вызов метода создания меток
// createMapPins();

var getRightType = function (type) {
  var _type;
  switch (type) {
    case 'flat':
      _type = 'Квартира';
      break;

    case 'bungalo':
      _type = 'Бунгало';
      break;

    case 'house':
      _type = 'Дом';
      break;

    case 'palace':
      _type = 'Дворец';
      break;
  }
  return _type;
};

var getGuests = function (guests) {
  var _guests = ' для ';
  switch (guests) {
    case 0:
      _guests = ' не для гостей';
      break;

    case 1:
      _guests += 'одного гостя';
      break;

    case 2:
      _guests += 'двух гостей';
      break;

    default:
      _guests += 'любого числа гостей';
      break;
  }
  return _guests;
};

var getRooms = function (rooms) {
  var _rooms;
  switch (rooms) {
    case 1:
      _rooms = 'Одна комната';
      break;
    case 2:
      _rooms = 'Две комнаты';
      break;
    case 3:
      _rooms = 'Три комнаты';
      break;
    default:
      _rooms = 'Любое количество комнат(' + rooms + ')';
      break;
  }
  return _rooms;
};

var createFeatures = function (elem, arr) {

  var container = elem.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var selector = '.popup__feature--' + arr[i];
    var item = container.querySelector(selector);
    fragment.appendChild(item);
  }
  container.innerHTML = '';
  container.appendChild(fragment);

};

var createPhotos = function (elem, arr) {
  var container = elem.querySelector('.popup__photos');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var item = container.querySelector('img').cloneNode(true);
    item.src = arr[i];
    fragment.appendChild(item);
  }
  container.innerHTML = '';
  container.appendChild(fragment);
};


var createCard = function (obj) {
  var template = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var offer = obj.offer;
  var elem = template.cloneNode(true);

  var title = elem.querySelector('.popup__title');
  var address = elem.querySelector('.popup__text--address');
  var price = elem.querySelector('.popup__text--price');
  var type = elem.querySelector('.popup__type');
  var capacity = elem.querySelector('.popup__text--capacity');
  var time = elem.querySelector('.popup__text--time');
  var description = elem.querySelector('.popup__description');
  var avatar = elem.querySelector('.popup__avatar');

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = offer.price + '₽/ночь';
  type.textContent = getRightType(offer.type);
  capacity.textContent = getRooms(offer.rooms) + getGuests(offer.guests);

  time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  description.textContent = offer.description;

  createFeatures(elem, offer.features);
  createPhotos(elem, offer.photos);

  avatar.src = obj.author.avatar;


  return elem;
};

// Вызов метода отрисовки карточки
// map.insertBefore(createCard(ads[0]), document.querySelector('.map__filters-container'));

