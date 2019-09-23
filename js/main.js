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


createMapPins(ads);

var createCard = function (obj) {
  var template = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var offer = obj.offer;

  var elem = template.cloneNode(true);

  elem.querySelector('.popup__title').textContent = offer.title;
  elem.querySelector('.popup__text--address').textContent = offer.address;
  elem.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';

  elem.querySelector('.popup__type').textContent = getRightType(offer.type);

  elem.querySelector('.popup__text--capacity').textContent = 0;

  elem.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  var featuresContainer = elem.querySelector('.popup__features');
  //var featuresElems = elem.querySelectorAll('.popup__feature');
  var featuresElems = [];
  //featuresContainer.innerHTML = "";
  var _features = offer.features;
  console.log("offer.features", offer.features);
  for (var i = 0; i < _features.length; i++) {

    featuresElems.push(featuresContainer.querySelector('.popup__feature--' + _features[i]));
  }
  featuresContainer.innerHTML = "";
  for(var k = 0; k < featuresElems.length; k++){
    featuresContainer.appendChild(featuresElems[k]);
  }

  elem.querySelector('.popup__description').textContent = offer.description;

  var _photos = offer.photos;
  console.log("offer.photos", offer.photos);
  var photosContainer = elem.querySelector('.popup__photos');

  //photosContainer.innerHTML = "";
  for (var j = 0; j < _photos.length; j++) {
  var photoElem = photosContainer.firstChild.cloneNode(true);
    photoElem.src = _photos[j];
    photosContainer.appendChild(photoElem);
  }
  //photosContainer.remove(photosContainer.firstChild);
  elem.querySelector('.popup__avatar').src = obj.author.avatar;


  return elem;
};
var map = document.querySelector('.map');
map.insertBefore(createCard(ads[0]), document.querySelector('.map__filters-container'));
