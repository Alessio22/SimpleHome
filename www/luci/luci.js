'use strict';

angular.module('simpleHome.luci', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/luci', {
  	templateUrl: 'luci/luci.html',
  	controller: 'LuciCtrl as ctrl'
	});
}])

.controller('LuciCtrl', ['$rootScope','LuciService', function($root, LuciService) {
	var ctrl = this;
	$root.isHome = false;

	ctrl.luci = [];

	LuciService.getLuci(ctrl.luci);
	setTimeout(function(){
		ctrl.refresh();
	}, 1000);

	ctrl.camboStato = function(id) {
		LuciService.cambioStatoLuci(id);
		setTimeout(function(){
			ctrl.refresh();
		}, 1000);
	};

	ctrl.refresh = function() {
		LuciService.statoLuci(ctrl.luci);
	};

}]);
