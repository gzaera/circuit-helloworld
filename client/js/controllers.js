'use strict';

/* Controllers */

angular.module('circuit.helloworld')
.controller ('InitCtrl',['$scope', function ($scope){

    if (typeof Circuit === 'undefined') {
        $scope.error = 'sdk.js missing. Include it from https://circuitsandbox.net/sdk.js';
    }

    if (!Circuit.isCompatible()) {
        $scope.error = 'Sorry, your browser is not supported. Chrome works :)';
    }


}]);

angular.module('circuit.helloworld')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$sce', function($rootScope, $scope, $location, $sce) {

    $scope.domain = 'circuitsandbox.net';
    $rootScope.localUser = null;
    $scope.email = 'graciela.zaera@unify.com';
    $scope.password = '';
    $scope.registrationState = Circuit.RegistrationState.Disconnected;
    var _isInitialized = false;

    $scope.conversations = [];

    $scope.login = function () {

      Circuit.logon($scope.email, $scope.password, $scope.domain).then(function (user) {
          $rootScope.localUser = user;
        }).then(function () {
          $scope.$apply();
          console.log('********** Login user: LocalUser '+ JSON.stringify($rootScope.localUser ));
          console.log('Changing view to /hello ');
          $location.path('/hello');

        }).catch(function(err) {
          if (err) { return alert('Error: ' + err.message); }
        });

      Circuit.addEventListener('registrationStateChange', function (evt) {
            $scope.$apply(function () {
              $scope.registrationState = evt.state;
              if (evt.state === Circuit.RegistrationState.Disconnected || evt.state === Circuit.RegistrationState.Terminated) {
                $scope.logout();
              }
            });
        });

      }


}]);

angular.module('circuit.helloworld')
.controller('HiCtrl', ['$scope', function($scope){
 
    $scope.message = 'Hello World!!!!!';


}]);


angular.module('circuit.helloworld')
.controller('LogoutCtrl', ['$scope', '$location', function($scope, $location){
 
 function logout (callback){
      $scope.localUser && $scope.localUser.logout();
      $scope.localUser = null;
      callback();
    }

    
  logout( function() {
      console.log('Changing view to /login ');
      $location.path('/login');
     
  });

}]);


