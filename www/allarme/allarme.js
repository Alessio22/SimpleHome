angular.module('simpleHome.allarme', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/allarme', {
    	templateUrl: 'allarme/allarme.html',
    	controller: 'AllarmeCtrl as ctrl',
			resolve: {
				allarme: function(AllarmeService) {
					return AllarmeService.stato({statoArea8: 0, statoAreaP18: 0, statoAreaP28: 0});
				}
			}
  	});
}])

.controller('AllarmeCtrl', ['$rootScope','AllarmeService', '$http', 'allarme', function($rootScope, AllarmeService, $http, allarme) {
  var ctrl = this;
	$rootScope.isHome = false;

  ctrl.allarme = {
    statoArea8: 0,
    statoAreaP18: 0,
    statoAreaP28: 0
  };

	var json = x2js.xml_str2json(allarme.data);
	if(json) {
    var response = json.response;
		ctrl.allarme.statoArea8 = response.statoArea8 == 1;
		ctrl.allarme.statoAreaP18 = response.statoAreaP18 == 1;
		ctrl.allarme.statoAreaP28 = response.statoAreaP28 == 1;
	}

  AllarmeService.stato(ctrl.allarme);

	$http({
		method: 'POST',
		url: "http://"+$rootScope.cfg.host+'user/zone_intr.xml',
		headers: {
			'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
		}
	}).success(function(data, status, headers, conf) {
		var jsonZone = x2js.xml_str2json(data);
		if(jsonZone) {
			console.log(jsonZone.response);
			ctrl.statoZone = jsonZone.response;
		}
	});

	$rootScope.$on('toolbar:refresh', function(e) {
		$("#modalLoading").modal("show");
		AllarmeService.stato(ctrl.allarme);
	});

  ctrl.camboStato = function(id) {
		AllarmeService.cambioStato(id);
		setTimeout(function(){
			AllarmeService.stato(ctrl.allarme);
		}, 1000);
	};

}]);
