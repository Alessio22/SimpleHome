'use strict';

angular.module('simpleHome.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', function($rootScope, $scope, $mdToast, $animate) {
	$scope.cfg = $rootScope.cfg;

	$scope.updateConfig = function() {
		// TODO validazione 
		
		$rootScope.cfg.host = $scope.cfg.host;
		$rootScope.cfg.username = $scope.cfg.username;
		$rootScope.cfg.password = $scope.cfg.password;

		localStorage.setItem("cfg", JSON.stringify($rootScope.cfg));

		$mdToast.show(
	      $mdToast.simple()
	        .content('Salvato')
	        .hideDelay(2000)
	    );

	};

});