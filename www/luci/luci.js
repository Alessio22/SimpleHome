'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/luci', {
  	templateUrl: 'luci/luci.html',
  	controller: 'LuciCtrl as ctrl',
		resolve: {
			luci: function(LuciService) {
				return LuciService.getLuci();
			}
		}
	});
}])

.controller('LuciCtrl', ['$rootScope','LuciService', 'luci', function($rootScope, LuciService, luci) {
	var ctrl = this;
	$rootScope.isHome = false;

	ctrl.luci = [];
	var response = x2js.xml_str2json(luci.data).response;
	for(var i=0; i<46; i++) {
		var desc = response["desc"+i];
		if(desc!="") {
			ctrl.luci.push({"id":i, "desc": desc, "stato": 0});
		}
	}

	LuciService.statoLuci(ctrl.luci);

	ctrl.camboStato = function(id) {
		LuciService.cambioStatoLuci(id);
		setTimeout(function(){
			LuciService.statoLuci(ctrl.luci);
		}, 1000);
	};

	$rootScope.$on('toolbar:refresh', function(e) {
		LuciService.statoLuci(ctrl.luci);
	});

}]);
