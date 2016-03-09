(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('installation', {
        url: '/installation',
        templateUrl: 'app/js/counting-lines/counting-lines.html',
        controller: 'InstCountingLinesController'
      })
      $urlRouterProvider.otherwise('/installation');
  }
})();
