'use strict'

var guitarshopControllers = angular.module('guitarshopControllers', []);



//SLIDER controller
guitarshopControllers.controller('SliderCtrl', ['$scope',
function($scope){
  $scope.carousel = {
    interval: 5000,
    slides: [
      {image: 'background/ESP-LTD-Series-Guitars-2014.jpg'},
      {image: 'background/ads.jpg'},
      {image: 'background/ESP-E-II-Series-2014.jpg'},
    ]
  };
}]);


//HEADER controller
guitarshopControllers.controller('HeaderController', ['$scope', '$location',
function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);



// DELETE controller
guitarshopControllers.controller('GuitarDelCtrl', ['$scope',  'Guitar', '$window', '$route', '$interval',
  function($scope, Guitar, $route, $window, $interval) {
      $scope.guitars = Guitar.query();
      $scope.deleteGuitar=function(guitar){
              guitar.$delete(function(){

                  $scope.guitars = Guitar.query();


                //location.reload(true);
              });
            }
          }]);


// GET all controller
guitarshopControllers.controller('GuitarListCtrl', ['$scope', 'Guitar',
  function($scope, Guitar) {
      $scope.guitars = Guitar.query();
      //$scope.orderProp = 'age';
  }]);


//GET one controller
  guitarshopControllers.controller('GuitarDetailCtrl', ['$scope', '$routeParams', 'Guitar',
  function($scope, $routeParams, Guitar) {
      $scope.guitar = Guitar.get({id:$routeParams.guitarId}, function(guitar) {
      $scope.mainImageUrl = guitar.images[0];
        });
      $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);



//PUT controller
guitarshopControllers.controller('GuitarEditCtrl', ['$scope', '$routeParams',  'Guitar', 'Upload', '$timeout',
function($scope, $routeParams, Guitar, Upload, $timeout) {
  var alertmessage = function(alertType,errorMessage){
  //reset
  $scope.showError = false;
  $scope.doFade = false;
  $scope.alertType = alertType;
  $scope.showError = true;
  $scope.errorMessage = errorMessage;
  $timeout(function(){
    $scope.doFade = true;
  }, 5000);
};
    $scope.guitar = Guitar.get({id:$routeParams.guitarId});
    $scope.upload = function (file) {
        Upload.upload({
            url: '/file-upload',
            data: {file: file},
        }).success(function(data, status, headers, config) {
            $scope.guitar.images = 'images/' + data;
            alertmessage('alert alert-success','Image successfull upload');
           });
          };
    $scope.updateGuitar=function(){
        $scope.guitar.$update( function(data){
          if (data['status'] == "error"){
                 alertmessage('alert alert-danger','Error update ');
          } else {
                alertmessage('alert alert-success','Successfull update');
          }
      });
    };
}]);

//ADD controller
  guitarshopControllers.controller('GuitarAddController', [ '$scope',  'GuitarAdd', 'Upload', '$http', '$timeout',
  function($scope,GuitarAdd, Upload, $http, $timeout){
    var alertmessage = function(alertType,errorMessage){
    //reset
    $scope.showError = false;
    $scope.doFade = false;
    $scope.alertType = alertType;
    $scope.showError = true;
    $scope.errorMessage = errorMessage;
    $timeout(function(){
      $scope.doFade = true;
    }, 5000);
  };

      $scope.showError = false;
      $scope.doFade = false;
      $scope.guitarname = true;
      $scope.guitarid = true;
      $scope.guitar = new GuitarAdd();
      $scope.upload = function (file) {
          Upload.upload({
              url: '/file-upload',
              data: {file: file},
          }).success(function(data, status, headers, config) {
              if (data['status'] == "error"){
                alertmessage('alert alert-danger','Error upload image');
              } else {
              $scope.guitar.images = 'images/' + data;
              alertmessage('alert alert-success','Image successfull upload');
            }
             });
            };
      $scope.addGuitar = function(){
        $scope.guitarname = $scope.guitar.name;
        $scope.guitarid = $scope.guitar.id;
        if($scope.guitar.price){$scope.guitar.price = '$'+$scope.guitar.price};
        if (!$scope.guitar.images) {
          $scope.guitar.images = 'img/no_image_available.png'
        };
        if(!$scope.guitarname) {
          $scope.guitarname = false;

        }
        else if (!$scope.guitarid) {
          $scope.guitarid=false;
        }
        else{
          $scope.guitar.$save(function(data){
            if (data['status'] == "error"){
              if(data['code'] == 11000) alert('Guitar with this '+data['message'].split('index: ')[1].split('_1')[0]+' already exists.');
                alertmessage('alert alert-danger','Guitar validation failed' );

            } else {
                alertmessage('alert alert-success','Guitar successfull create');
            }
        });
      }
    };
}]);
