'use strict';

var app = angular.module('circuit.helloworld', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
   
  .when('/login/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/logout/', {
    templateUrl: 'partials/login.html',
    controller: 'LogoutCtrl'
  })
  .when('/hello', {
    templateUrl: 'partials/hello.html',
    controller: 'HiCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });


  // configure html5 to get links working on jsfiddle

  $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

});


