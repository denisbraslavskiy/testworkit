'use strict';
var guitarshopApp = angular.module('guitarshopApp', [
  'ngRoute',
  'guitarshopControllers',
  'guitarshopServices',
  'ngFileUpload',
  'ngAnimate',
  'ui.bootstrap'

]);

guitarshopApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/guitars-list', {
        templateUrl: 'partials/guitars-list.html',
        controller: 'GuitarListCtrl'
      }).
      when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'GuitarDelCtrl',
      }).
      when('/guitars/:guitarId', {
        templateUrl: 'partials/guitar-detail.html',
        controller: 'GuitarDetailCtrl',
      }).
      when('/guitars/edit/:guitarId', {
        templateUrl: 'partials/guitar-edit.html',
        controller: 'GuitarEditCtrl',
      }).
      when('/guitars/add/newguitar', {
        templateUrl: 'partials/guitar-add.html',
        controller: 'GuitarAddController',
      }).
        when('/home', {
          templateUrl: 'partials/main.html',
          controller: 'SliderCtrl'
    }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
