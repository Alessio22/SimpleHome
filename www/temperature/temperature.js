'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/temperature', {
    	templateUrl: 'temperature/temperature.html',
    	controller: 'TemperatureCtrl as ctrl',
      resolve: {
        temperatura: function(TemperatureService) {
          return TemperatureService.stato({temperatura: '', temperaturaSet: ''});
        }
      }
  	});
}])

.controller('TemperatureCtrl', ['$rootScope', 'TemperatureService', 'temperatura', function($rootScope, TemperatureService, temperatura) {
	var ctrl = this;
	$rootScope.isHome = false;

  ctrl.temperatura = {
      temperatura: '',
      temperaturaSet: ''
  };
  var response = x2js.xml_str2json(temperatura.data).response;
  ctrl.temperatura.temperatura = response.temp0;
  ctrl.temperatura.temperaturaSet = response.setpoint0;

	TemperatureService.stato(ctrl.temperatura);

	ctrl.alza = function() {
		TemperatureService.alza();
		setTimeout(function(){
  		TemperatureService.stato(ctrl.temperatura);
		}, 1000);
	};

	ctrl.abbassa = function() {
		TemperatureService.abbassa();
		setTimeout(function(){
  		TemperatureService.stato(ctrl.temperatura);
		}, 1000);
	};

	$rootScope.$on('toolbar:refresh', function(e) {
		TemperatureService.stato(ctrl.temperatura);
	});

}]);
