
'use strict';

(function () {
  var getByHousingType = window.filters.getByHousingType;

  var clearMap = function () {
    var map = document.querySelector('.map');

  };



  var housingTypeElem = document.querySelector('#housing-type');

  housingTypeElem.addEventListener('change', housingTypeChangeHandler);

  var housingTypeChangeHandler = function(e){
    var elem = e.target;
    var value = e.target.options[e.target.selectedIndex].value;

    var ads = getByHousingType(window.appdata.ads, type);





  };
})();

