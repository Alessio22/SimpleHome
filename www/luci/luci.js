'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/luci', {
  	templateUrl: 'luci/luci.html',
  	controller: 'LuciCtrl as ctrl'
	});
}])

.controller('LuciCtrl', ['$rootScope','LuciService', function($rootScope, LuciService) {
	var ctrl = this;
	$rootScope.isHome = false;

	ctrl.luci = [];

	LuciService.getLuci(ctrl.luci);
	setTimeout(function(){
		LuciService.statoLuci(ctrl.luci);
	}, 1000);

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
