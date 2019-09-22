'use strict';

var USER_MAX = 8;
var USER_MIN = 1;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MIN_Y = 130;
var MAX_Y = 630;

var minLocationY = MIN_Y + PIN_HEIGHT;

var minLocationX = PIN_WIDTH / 2;
var maxLocationX = document.documentElement.clientWidth - PIN_WIDTH / 2;

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
  var _min = min ? min : 0;
  return Math.floor(Math.random() * (max - _min + 1)) + _min;
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
  elem.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  elem.style.top = obj.location.y - PIN_HEIGHT + 'px';

  var elemImg = elem.querySelector('img');
  elemImg.src = obj.author.avatar;
  elemImg.alt = obj.offer.title;

  return elem;

};

var createMapPins = function () {
  var ads = createAds(USER_MAX);
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
