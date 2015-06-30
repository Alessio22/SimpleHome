'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/temperature', {
    	templateUrl: 'temperature/temperature.html',
    	controller: 'TemperatureCtrl as ctrl'
  	});
}])

.controller('TemperatureCtrl', ['$rootScope', 'TemperatureService', function($root, TemperatureService) {
	var ctrl = this;

	$root.isHome = false;
	ctrl.temperatura = {
      temperatura: '',
      temperaturaSet: ''
  };

	TemperatureService.stato(ctrl.temperatura);

	ctrl.alza = function() {
		TemperatureService.alza();
		setTimeout(function(){
			ctrl.refresh();
		}, 500);
	};

	ctrl.abbassa = function() {
		TemperatureService.abbassa();
		setTimeout(function(){
				ctrl.refresh();
		}, 500);
	};

	ctrl.refresh = function() {
		TemperatureService.stato(ctrl.temperatura);
	};

}]);
