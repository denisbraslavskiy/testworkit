'use strict';

var guitarshopServices = angular.module('guitarshopServices', ['ngResource']);

guitarshopServices.factory('Guitar', ['$resource',
  function($resource){
     return $resource('/api/guitars/:id',{id:'@id'},{
         update: {
             method: 'PUT'
         }
     });
  }]);
  guitarshopServices.factory('GuitarAdd', ['$resource',
    function($resource){
       return $resource('/api/guitars/:id');
    }]);
