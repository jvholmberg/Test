'use strict';

angular.module('app')

.controller('InstCountingLinesController', function ($scope) {

    // Arrays containing points
    $scope.inPoints = [];
    $scope.outPoints = [];

    // Initial points for respective <camera-line>
    $scope.inPoints.push({x: 0, y: 150});
    $scope.inPoints.push({x: 700, y: 150});
    $scope.outPoints.push({x: 0, y: 350});
    $scope.outPoints.push({x: 700, y: 350});

    // Get <camera-lines> from DOM
    var cameraLineIn = angular.element(document.getElementById('camera-line-in'));
    var cameraLineOut = angular.element(document.getElementById('camera-line-out'));

    console.log(cameraLineOut);

});
