'use strict';

angular.module('simpleHome.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', function($rootScope, $scope, $location) {
	$rootScope.isHome = false;

	$scope.cfg1 = $rootScope.settings.cfg[0];
	$scope.cfg2 = $rootScope.settings.cfg[1];

	$scope.host1 = $scope.cfg1==undefined?'':$scope.cfg1.host;
	$scope.host2 = $scope.cfg2==undefined?'':$scope.cfg2.host;

	$scope.updateConfig = function() {
		// TODO validazione 

		if($scope.host1.substr($scope.host1.length - 1) != "/") {
			$scope.host1 += "/";
		}
		if($scope.host2.substr($scope.host2.length - 1) != "/") {
			$scope.host2 += "/";
		}
		$scope.cfg1.host = $scope.host1;
		$scope.cfg2.host = $scope.host2;

		$rootScope.settings.cfg[0] = $scope.cfg1;
		$rootScope.settings.cfg[1] = $scope.cfg2;

		var settings = { 'profile': $rootScope.settings.profile, 'cfg': [$rootScope.settings.cfg[0], $rootScope.settings.cfg[1]] }
		localStorage.setItem("settings", JSON.stringify(settings));


		if(settings.profile == 0) {
		    $rootScope.cfg.alias = settings.cfg[0].alias==undefined?'':settings.cfg[0].alias;
		    $rootScope.cfg.prot = settings.cfg[0].prot==undefined?'':settings.cfg[0].prot;
		    $rootScope.cfg.host = settings.cfg[0].host==undefined?'':settings.cfg[0].host;
			$rootScope.cfg.username = settings.cfg[0].username==undefined?'':settings.cfg[0].username;
			$rootScope.cfg.password = settings.cfg[0].password==undefined?'':settings.cfg[0].password;  
		} else {
		    $rootScope.cfg.alias = settings.cfg[1].alias==undefined?'':settings.cfg[1].alias;
		    $rootScope.cfg.prot = settings.cfg[1].prot==undefined?'':settings.cfg[1].prot;
		    $rootScope.cfg.host = settings.cfg[1].host==undefined?'':settings.cfg[1].host;
			$rootScope.cfg.username = settings.cfg[1].username==undefined?'':settings.cfg[1].username;
			$rootScope.cfg.password = settings.cfg[1].password==undefined?'':settings.cfg[1].password;  
		}

		$location.path('/');
	};

});