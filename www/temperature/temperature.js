'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/temperature', {
    	templateUrl: 'temperature/temperature.html',
    	controller: 'TemperatureCtrl',
    	resolve: {
        	temperatura: function(TemperatureService) {
            	return TemperatureService.stato();
			}
  		}
  	});
}])

.controller('TemperatureCtrl', ['$rootScope', '$scope', 'TemperatureService', 'temperatura', function($rootScope, $scope, TemperatureService, temperatura) {
	$rootScope.isHome = false;
	$scope.temperatura = "";
	$scope.temperaturaSet = "";

	var data = temperatura.data;
	var response  = x2js.xml_str2json(data).response;
	$scope.temperatura = response.temp0;
	$scope.temperaturaSet = response.setpoint0;

	TemperatureService.stato();

	$scope.alza = function() {
		TemperatureService.alza();
	};

	$scope.abbassa = function() {
		TemperatureService.abbassa();
	};

	$scope.refresh = function() {
		TemperatureService.stato();
	};

}]);