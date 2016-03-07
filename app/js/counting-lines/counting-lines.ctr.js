(function() {
  'use strict';

  angular
    .module('app')
    .controller('CountingLinesController', CountingLinesController)
    .directive('draggable', Draggable);

  CountingLinesController.$inject = ['$scope', '$compile'];

  function CountingLinesController($scope, $compile) {
    // Collections of points
    $scope.pointsIn = [];
    $scope.pointsOut = [];
    // Grab wrapper in DOM
    var wrapper = angular.element(document.querySelector('.camera-wrapper'));
    // Grab reference to context of canvas (canvasIn, CanvasOut)
    var canvasIn = document.getElementById('canvas-in');
    canvasIn = canvasIn.getContext('2d');
    var canvasOut = document.getElementById('canvas-out');
    canvasOut = canvasOut.getContext('2d');

    function init() {

      addPoint('in', 0, 150);
      addPoint('in', 500, 150);
      addPoint('out', 0, 350);
      addPoint('out', 500, 350);
      drawLine(canvasIn, $scope.pointsIn);
      drawLine(canvasOut, $scope.pointsOut);
    }
    $scope.checkLines = function($event) {
      console.log($event);
      var x = $event.offsetX;
      var y = $event.offsetY;
      console.log({x: x, y: y});
      if(canvasIn.isPointInStroke(x, y)) {
        wrapper.append($compile(angular.element('<span class="point point-in" xpos="'+x+'" ypos="'+y+'" draggable></span>'))($scope));
      } else if(canvasOut.isPointInStroke(x, y)) {
        wrapper.append($compile(angular.element('<span class="point point-out" xpos="'+x+'" ypos="'+y+'" draggable></span>'))($scope));
      }
    };
    function drawLine(canvas, collection) {
        canvas.clearRect(0, 0, canvas.width, canvas.height);
        canvas.beginPath();
        for(var i = 1; i < collection.length; i++) {
          canvas.moveTo(collection[i-1].x, collection[i-1].y);
          canvas.lineTo(collection[i].x, collection[i].y);
        }
        canvas.lineWidth = 3;
        canvas.strokeStyle = 'red';
        canvas.stroke();
      }
    function addPoint(type, x, y) {
      if(type === 'in') {
        $scope.pointsIn.push({x: x, y: y});
      } else if(type === 'out') {
        $scope.pointsOut.push({x: x, y: y});
      }
    }
    init();
  }

  Draggable.$inject = [];

  function Draggable() {
    return {
      restrict: 'A',
      scope: {
        xpos: '=',
        ypos: '='
      },
      controller: function() {

      },
      link: function($scope, $element) {
        console.log('link');
        console.log($scope);
        $element.css({
          left: $scope.xpos + 'px',
          top: $scope.ypos + 'px'
        });
      }
    };
  }

})();
