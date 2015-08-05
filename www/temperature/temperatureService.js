'use strict';

angular.module('simpleHome.temperatureService', [])
.factory('TemperatureService', ['$rootScope','$http', function($rootScope,$http) {
	return {
		stato: function(temperatura) {
    	var promise = $http({
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/termo.xml',
				headers: {
			    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
			  }
			});
    	promise.success(function(data, status, headers, conf) {
				var json = x2js.xml_str2json(data);
				if(json) {
					var response = json.response;
				  temperatura.temperatura = response.temp0;
				  temperatura.temperaturaSet = response.setpoint0;
				}
				setTimeout(function(){
		      $("#modalLoading").modal("hide");
		    }, 500);
		    return data;
			});
	 		return promise;
   	},

		alza: function(temperaturaSet) {
			var promise = $http({
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/termo.cgi?command=1&num_termo=0',
				headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
	  	promise.success(function(data, status, headers, conf) {
	    	return data;
			});
		 	return promise;
		},

		abbassa: function(temperaturaSet) {
			var promise = $http({
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/termo.cgi?command=0&num_termo=0',
				headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
	  	promise.success(function(data, status, headers, conf) {
	    	return data;
			});
		 	return promise;
		}
	};
}]);
