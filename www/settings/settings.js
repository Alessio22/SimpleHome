'use strict';

angular.module('simpleHome.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', function($rootScope, $scope, $animate) {
	$rootScope.isHome = false;

	$scope.cfg1 = $rootScope.settings.cfg[0];
	$scope.cfg2 = $rootScope.settings.cfg[1];

	$scope.updateConfig = function() {
		// TODO validazione 
		
		$rootScope.settings.cfg[0] = $scope.cfg1;
		$rootScope.settings.cfg[1] = $scope.cfg2;

		var settings = { 'profile': $rootScope.settings.profile, 'cfg': [$rootScope.settings.cfg[0], $rootScope.settings.cfg[1]] }
		localStorage.setItem("settings", JSON.stringify(settings));

		if(settings.profile == 0) {
		    $rootScope.cfg.host = settings.cfg[0].host==undefined?'':settings.cfg[0].host;
			$rootScope.cfg.username = settings.cfg[0].username==undefined?'':settings.cfg[0].username;
			$rootScope.cfg.password = settings.cfg[0].password==undefined?'':settings.cfg[0].password;  
		} else {
		    $rootScope.cfg.host = settings.cfg[1].host==undefined?'':settings[1].host;
			$rootScope.cfg.username = settings.cfg[1].username==undefined?'':settings.cfg[1].username;
			$rootScope.cfg.password = settings.cfg[1].password==undefined?'':settings.cfg[1].password;  
		}

	    $("#alert-success").show();
		$("#alert-success").delay(2000).fadeOut('slow');
	};

});