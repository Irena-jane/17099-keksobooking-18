'use strict';

(function () {


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

  window.appdata = {'ads': createAds(USER_MAX),
    'min_y': MIN_Y,
    'max_y': MAX_Y,
    'max_x': maxLocationX,
    'pinWidth': pinWidth,
    'pinHeight': pinHeight
  };

})();
