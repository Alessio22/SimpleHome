'use strict';

angular.module('simpleHome.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($rootScope, $scope) {
	if($rootScope.timerTemperature) {
		clearInterval($rootScope.timerTemperature);
	}
	if($rootScope.timerLuci) {
		clearInterval($rootScope.timerLuci);
	}
	
	$rootScope.isHome = true;

	$scope.navigateTo = function(path) {
		location.href = "#/"+path;
	}
});