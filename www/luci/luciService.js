'use strict';

angular.module('simpleHome.luciService', [])
.factory('LuciService', ['$rootScope','$http', function($rootScope,$http) {
	return {
  	getLuci: function() {
    	var promise = $http({
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/luci_desc.xml',
				headers: {
			  	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
    	promise.success(function(data, status, headers, conf) {
				return data;
    	});
  		return promise;
 		},

		statoLuci: function(luci) {
			$("#refresh").addClass("fa-spin");
			var promise = $http( {
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/luci.xml',
				headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
			});
	  	promise.success(function(data, status, headers, conf) {
	  		var response  = x2js.xml_str2json(data).response;
				for(var i = 0;i < luci.length; i++){
					luci[i].stato = response.stato.charAt(i);
				}
				$("#refresh").removeClass("fa-spin");
	    	return luci;
			});
		 	return promise;
		},

		cambioStatoLuci: function(id) {
			var promise = $http({
				method: 'POST',
				url: "http://"+$rootScope.cfg.host+'user/luci.cgi?luce='+id,
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
