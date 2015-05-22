'use strict';

angular.module('simpleHome.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($rootScope, $scope) {
	$rootScope.isHome = true;
	$scope.profilo = $rootScope.settings.profile;
	$scope.cfg = $rootScope.settings.cfg;

	$scope.change = function() {
		$rootScope.settings.profile = $scope.profilo;

		var settings = { 'profile': $rootScope.settings.profile, 'cfg': [$rootScope.settings.cfg[0], $rootScope.settings.cfg[1]] }
		localStorage.setItem("settings", JSON.stringify(settings));

  		if(settings.profile == 0) {
		    $rootScope.cfg.host = settings.cfg[0].host==undefined?'':settings.cfg[0].host;
			$rootScope.cfg.username = settings.cfg[0].username==undefined?'':settings.cfg[0].username;
			$rootScope.cfg.password = settings.cfg[0].password==undefined?'':settings.cfg[0].password;  
		} else {
		    $rootScope.cfg.host = settings.cfg[1].host==undefined?'':settings.cfg[1].host;
			$rootScope.cfg.username = settings.cfg[1].username==undefined?'':settings.cfg[1].username;
			$rootScope.cfg.password = settings.cfg[1].password==undefined?'':settings.cfg[1].password;  
		}
	};

});