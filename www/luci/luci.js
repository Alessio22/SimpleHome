'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/luci', {
    templateUrl: 'luci/luci.html',
    controller: 'LuciCtrl'
  });
}])

.controller('LuciCtrl', function($rootScope, $scope, $http) {
	$scope.luci = [];
	var reqDescrizioni = {
		method: 'POST', 
		url: $rootScope.cfg.host+'user/luci_desc.xml',
		headers: {
	    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
	    }
	};
	$http(reqDescrizioni).success(function(data, status, headers, config) {
		var response  = x2js.xml_str2json(data).response;

		for(var i=0; i<46; i++) {
			var desc = response["desc"+i];
			if(desc!="") {
				$scope.luci.push({"id":i, "desc": desc, "stato": 0});
			}
		}

	  }).
	  error(function(data, status, headers, config) {
	  	alert('error');
	});

	setInterval(function(){
		var reqStato = {
			method: 'POST', 
			url: $rootScope.cfg.host+'user/luci.xml',
			headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		    }
		};
		$http(reqStato).success(function(data, status, headers, config) {
			var response  = x2js.xml_str2json(data).response;
			for(var i = 0;i < $scope.luci.length; i++){
				$scope.luci[i].stato = response.stato.charAt(i) == 1 ? 'md-primary' : '' ;
			}
		});
	}, 1000);

	$scope.camboStato = function(id) {
		var reqCambioStato = {
			method: 'POST', 
			url: $rootScope.cfg.host+'user/luci.cgi?luce='+id, 
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