'use strict';

/**
 * @ngdoc overview
 * @name mapDataScanaduApp
 * @description
 * # mapDataScanaduApp
 *
 * Main module of the application.
 */
angular
  .module('mapDataScanaduApp', [
    'ngAnimate',
    'ngRoute',
    'datamaps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/globe.html',
        controller: 'GlobeCtrl',
        controllerAs: 'vm'
      })
      .when('/globeMap', {
        templateUrl: 'views/globe.html',
        controller: 'GlobeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
