'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/luci', {
    templateUrl: 'luci/luci.html',
    controller: 'LuciCtrl'
  });
}])

.controller('LuciCtrl', function($scope,$http) {
	$scope.luci = [];

	//$http.get('http://localhost:8000/data/luci_desc.xml').success(function(data, status, headers, config) {
	$http.get('http://edo.cloudns.pro/data/luci_desc.xml').success(function(data, status, headers, config) {
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
		$http.get(host+'luci.cgi?luce='+id).success(function(data, status, headers, config) {
			alert('asd');
			alert(data);
			$scope.data = data;
		  }).
		  error(function(data, status, headers, config) {
		  	alert('error');
		  });
	};

});