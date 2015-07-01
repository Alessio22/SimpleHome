'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/temperature', {
    	templateUrl: 'temperature/temperature.html',
    	controller: 'TemperatureCtrl as ctrl'
  	});
}])

.controller('TemperatureCtrl', ['$rootScope', 'TemperatureService', function($rootScope, TemperatureService) {
	var ctrl = this;

	$rootScope.isHome = false;
	ctrl.temperatura = {
      temperatura: '',
      temperaturaSet: ''
  };

	TemperatureService.stato(ctrl.temperatura);

	ctrl.alza = function() {
		TemperatureService.alza();
		setTimeout(function(){
  		TemperatureService.stato(ctrl.temperatura);
		}, 500);
	};

	ctrl.abbassa = function() {
		TemperatureService.abbassa();
		setTimeout(function(){
  		TemperatureService.stato(ctrl.temperatura);
		}, 500);
	};

	$rootScope.$on('toolbar:refresh', function(e) {
		TemperatureService.stato(ctrl.temperatura);
	});

}]);
