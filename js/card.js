'use strict';

(function () {


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

  window.card = {'createCard': createCard};

})();
