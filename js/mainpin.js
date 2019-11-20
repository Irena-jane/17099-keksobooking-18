'use strict';

(function () {

  var mainPin = window.page.mainPin;
  var setAddress = window.page.setAddress;
  var minY = window.appdata.min_y;
  var maxY = window.appdata.max_y;

  var map = window.page.map;

  var mainPinWidth = parseInt(getComputedStyle(mainPin).getPropertyValue('width'), 10);

  var mouseDownHandler = function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };


    var mouseMoveHandler = function (eMove) {
      eMove.preventDefault();

      var shift = {
        x: startCoords.x - eMove.clientX,
        y: startCoords.y - eMove.clientY
      };

      startCoords = {
        x: eMove.clientX,
        y: eMove.clientY
      };
      var left = mainPin.offsetLeft - shift.x;
      var top = mainPin.offsetTop - shift.y;

      if (top < minY) {
        top = minY;
      }

      if (top > maxY) {
        top = maxY;
      }

      if (left < 0) {
        left = 0;
      }
      var maxLeft = parseInt(getComputedStyle(map).getPropertyValue('width'), 10) - mainPinWidth;

      if (left > maxLeft) {
        left = maxLeft;
      }

      mainPin.style.left = left + 'px';
      mainPin.style.top = top + 'px';
      setAddress(eMove);
    };

    var mouseUpHandler = function (eUp) {
      eUp.preventDefault();
      setAddress(eUp);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseUp', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  mainPin.addEventListener('mousedown', mouseDownHandler);

})();
