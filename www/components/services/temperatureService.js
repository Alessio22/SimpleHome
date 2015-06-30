'use strict';

angular.module('simpleHome.temperatureService', [])
.factory('TemperatureService', ['$rootScope','$http', function($rootScope,$http) {
	return {
		stato: function(temperatura) {
			$("#refresh").addClass("fa-spin");
    	var promise = $http({
				method: 'POST',
				url: $rootScope.cfg.prot+$rootScope.cfg.host+'user/termo.xml',
				headers: {
			    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
			  }
			});
    	promise.success(function(data, status, headers, conf) {
				$("#refresh").removeClass("fa-spin");
				var response  = x2js.xml_str2json(data).response;
				temperatura.temperatura = response.temp0;
				temperatura.temperaturaSet = response.setpoint0;
		    return temperatura;
			});
	 		return promise;
   	},

		alza: function(temperaturaSet) {
			$("#refresh").addClass("fa-spin");
			var promise = $http({
				method: 'POST',
				url: $rootScope.cfg.prot+$rootScope.cfg.host+'user/termo.cgi?command=1&num_termo=0',
				headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
	  	promise.success(function(data, status, headers, conf) {
				$("#refresh").removeClass("fa-spin");
	    	return data;
			});
		 	return promise;
		},

		abbassa: function(temperaturaSet) {
			$("#refresh").addClass("fa-spin");
			var promise = $http({
				method: 'POST',
				url: $rootScope.cfg.prot+$rootScope.cfg.host+'user/termo.cgi?command=0&num_termo=0',
				headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
	  	promise.success(function(data, status, headers, conf) {
				$("#refresh").removeClass("fa-spin");
	    	return data;
			});
		 	return promise;
		}
	};
}]);
