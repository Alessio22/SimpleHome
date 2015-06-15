'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/luci', {
    	templateUrl: 'luci/luci.html',
    	controller: 'LuciCtrl',
    	resolve: {
        	luci: function(LuciService) {
            	return LuciService.getLuci();
			}
  		}
  	});
}])

.controller('LuciCtrl', ['$rootScope','$scope','LuciService','luci', function($rootScope, $scope, LuciService, luci) {
	$rootScope.isHome = false;
	$scope.luci = [];

	var data = luci.data;
	var response = x2js.xml_str2json(data).response;
	for(var i=0; i<46; i++) {
		var desc = response["desc"+i];
		if(desc!="") {
			$scope.luci.push({"id":i, "desc": desc, "stato": 0});
		}
	}
	LuciService.statoLuci($scope.luci);
	
	$scope.refresh = function() {
		LuciService.statoLuci($scope.luci);
	};

	$scope.camboStato = function(id) {
		LuciService.cambioStatoLuci(id);
		setTimeout(function(){
			LuciService.statoLuci($scope.luci);
		}, 1000);
	};

}]);

