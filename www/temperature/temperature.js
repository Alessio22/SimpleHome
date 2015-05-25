'use strict';

angular.module('simpleHome.temperature', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/temperature', {
    templateUrl: 'temperature/temperature.html',
    controller: 'TemperatureCtrl'
  });
}])

.controller('TemperatureCtrl', function($rootScope, $scope, $http) {

	function update() {
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
	}

	$rootScope.isHome = false;
	$scope.temperatura = "";
	$scope.temperaturaSet = "";

	update();

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
			setTimeout(function(){
				update();
			}, 500);
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
			setTimeout(function(){
				update();
			}, 500);
		}).
		error(function(data, status, headers, config) {
			alert('error');
		});
	};

	$scope.refresh = function() {
		update();
	};

});