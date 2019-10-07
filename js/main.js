'use strict';

var USER_MAX = 8;
var USER_MIN = 1;

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

document.querySelector('.map').classList.remove('map--faded');

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

createMapPins();

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
var map = document.querySelector('.map');
map.insertBefore(createCard(ads[0]), document.querySelector('.map__filters-container'));
