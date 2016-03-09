'use strict';

/*
  Containing both lines and points related to counting lines
*/

angular
  .module('app')
  .directive('cameraLine', function() {
    return {
      restrict: 'E',
      scope: {
        pointsArr: '='
      },
      template: '<canvas class="canvas-line" width="700" height="500"></canvas>',
      controller: function($scope, $element, $compile, $document) {

        console.log($scope);

        function isThisCameraIn() {
          return $element[0].id === 'camera-line-in';
        };

        // Grab context of canvas
        var canvas = document.getElementsByClassName('canvas-line');
        canvas = isThisCameraIn() ? canvas[1].getContext('2d') : canvas[0].getContext('2d');
        // Adding point for line
        function addPoint($event) {
          $event.stopPropagation();

          // Grab coordinates of click event
          var eventCoordinates = {
             x: $event.offsetX,
             y: $event.offsetY
          };

          // Stop if click didnt occur on canvas stroke
          if( ! canvas.isPointInStroke(eventCoordinates.x, eventCoordinates.y)) {
            return;
          }

          // Add point to collection
          $scope.pointsArr.push(eventCoordinates);

          $element.append(
            $compile(
              angular.element('<camera-line-point xpos="'+eventCoordinates.x+'" ypos="'+eventCoordinates.y+'"></camera-line-point>')
            )($scope)
          );
        };
        $scope.drawLine = function() {
          canvas.clearRect(0, 0, canvas.width, canvas.height);
          canvas.beginPath();
          for(var i = 1; i < $scope.pointsArr.length; i++) {
            canvas.moveTo($scope.pointsArr[i-1].x, $scope.pointsArr[i-1].y);
            canvas.lineTo($scope.pointsArr[i].x, $scope.pointsArr[i].y);
          }
          canvas.lineWidth = 4;
          canvas.strokeStyle = 'red';
          canvas.stroke();
        };

        // Listen to document for event to trigger on both directives since they are stacked on on another
        $document.on('tap click', addPoint);
      },
      link: function(scope, element) {


        scope.drawLine();
      }
    };

  })
  .directive('cameraLinePoint', function() {
    return {
      restrict: 'E',
      scope: {
        xpos: '=',
        ypos: '='
      },
      controller: function($scope) {

      },
      link: function(scope, element) {
        element.css({
          left: scope.xpos + 'px',
          top: scope.ypos + 'px'
        });

        element.on('touchstart mousedown', start);
        element.on('tap click', click);

        function start($event) {
          $event.stopPropagation();
          $event.preventDefault();

          element.on('touchmove mousemove', move);
          element.on('touchend mouseup', end);
        }
        function move($event) {
          $event.stopPropagation();
          console.log(element);

          var x = $event.clientX;
          var y = $event.clientY;

          element.css({
            left: x + 'px',
            top: y + 'px'
          });

        }
        function end($event) {
          $event.stopPropagation();

        }
        function click($event) {
          $event.stopPropagation();

        }
      }
    };
  });
