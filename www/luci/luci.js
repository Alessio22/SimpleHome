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
	var req = {
		method: 'GET', 
		url: $rootScope.cfg.host+'user/luci_desc.xml', 
		headers: {
	    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
	    }
	};
	$http(req).success(function(data, status, headers, config) {
		var response  = x2js.xml_str2json(data).response;

		for(var i=0; i<46; i++) {
			var desc = response["desc"+i];
			if(desc!="") {
				$scope.luci.push({"id":i, "desc": desc});
			}
		}

	  }).
	  error(function(data, status, headers, config) {
	  	alert('error');
	});

	$scope.change = function(id) {
		req = {
			method: 'GET', 
			url: $rootScope.cfg.host+'user/luci.cgi?luce='+id, 
			headers: {
		    	'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)	
		    }
		};
		$http(req).success(function(data, status, headers, config) {
			alert('asd');
			alert(data);
			$scope.data = data;
		  }).
		  error(function(data, status, headers, config) {
		  	alert('error');
		  });
	};

});