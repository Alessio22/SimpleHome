'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope","$http", function($scope,$http) {
	
  $scope.cucina = function() {
		var req = {
			 method: 'GET',
			 url: 'http://192.168.0.252/user/luci.cgi?luce=2',
			 headers: {
			   'Authorization': 'Basic OjE0MTE='
			 },
		}
		//$http.post('http://192.168.0.252/user/luci.cgi?luce=2')
		$http(req).success(function(data, status, headers, config) {
			alert('asd');
		    // this callback will be called asynchronously
		    // when the response is available
		  }).
		  error(function(data, status, headers, config) {
		  	alert('error');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};

}]);