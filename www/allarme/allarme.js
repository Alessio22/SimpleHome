'use strict';

angular.module('simpleHome.allarme', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/allarme', {
    	templateUrl: 'allarme/allarme.html',
    	controller: 'AllarmeCtrl as ctrl'
  	});
}])

.controller('AllarmeCtrl', ['$rootScope','AllarmeService', function($root, AllarmeService) {
  var ctrl = this;
	$root.isHome = false;

  ctrl.allarme = {
    statoArea8: 0,
    statoAreaP18: 0,
    statoAreaP28: 0
  };

  AllarmeService.stato(ctrl.allarme);

  ctrl.refresh = function() {
		AllarmeService.stato(ctrl.allarme);
	};

  ctrl.camboStato = function(id) {
		AllarmeService.cambioStato(id);
		setTimeout(function(){
			AllarmeService.stato();
		}, 1000);
	};

}]);
