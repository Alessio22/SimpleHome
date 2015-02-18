'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/temperature', {
    templateUrl: 'temperature/temperature.html',
    controller: 'TemperatureCtrl'
  });
}])

.controller('TemperatureCtrl', function($rootScope, $scope, $http) {
	if($rootScope.timerLuci) {
		clearInterval($rootScope.timerLuci);
	}
	if($rootScope.timerTemperature) {
		clearInterval($rootScope.timerTemperature);
	}

	$rootScope.isHome = false;
	$scope.temperatura = "";
	$scope.temperaturaSet = "";
	
	$rootScope.timerTemperature = setInterval(function(){
		console.log("setInterval temperature");
		var reqStato = {
			method: 'POST', 
			url: $rootScope.cfg.host+'user/termo.xml',
			headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
		};
		$http(reqStato).success(function(data, status, headers, config) {
			var response  = x2js.xml_str2json(data).response;
			$scope.temperatura = response.temp0;
			$scope.temperaturaSet = response.setpoint0;
		});
	}, 1000);

	$scope.alza = function() {
		var reqCambioStato = {
			method: 'POST', 
			url: $rootScope.cfg.host+'user/termo.cgi?command=1&num_termo=0', 
			headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)	
		    }
		};
		$http(reqCambioStato).success(function(data, status, headers, config) {
			console.log(data);
		}).
		error(function(data, status, headers, config) {
			alert('error');
		});
	};

	$scope.abbassa = function() {
		var reqCambioStato = {
			method: 'POST', 
			url: $rootScope.cfg.host+'user/termo.cgi?command=0&num_termo=0', 
			headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)	
		    }
		};
		$http(reqCambioStato).success(function(data, status, headers, config) {
			console.log(data);
		}).
		error(function(data, status, headers, config) {
			alert('error');
		});
	};

});