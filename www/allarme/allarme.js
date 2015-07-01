'use strict';

angular.module('simpleHome.allarme', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/allarme', {
    	templateUrl: 'allarme/allarme.html',
    	controller: 'AllarmeCtrl as ctrl'
  	});
}])

.controller('AllarmeCtrl', ['$rootScope','AllarmeService', function($rootScope, AllarmeService) {
  var ctrl = this;
	$rootScope.isHome = false;

  ctrl.allarme = {
    statoArea8: 0,
    statoAreaP18: 0,
    statoAreaP28: 0
  };

  AllarmeService.stato(ctrl.allarme);

	$rootScope.$on('toolbar:refresh', function(e) {
		AllarmeService.stato(ctrl.allarme);
	});

  ctrl.camboStato = function(id) {
		AllarmeService.cambioStato(id);
		setTimeout(function(){
			AllarmeService.stato(ctrl.allarme);
		}, 1000);
	};

}]);
