'use strict';

angular.module('simpleHome.allarmeService', [])
.factory('AllarmeService', ['$rootScope','$http', function($rootScope, $http) {
	return {
    stato: function(allarme) {
			/*
      $("#refresh").addClass("fa-spin");
      var promise = $http({
        method: 'POST',
        url: $rootScope.cfg.prot+$rootScope.cfg.host+'user/aree_intr.xml',
        headers: {
            'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
        }
      });
      promise.success(function(data, status, headers, conf) {
				console.log(data);
        $("#refresh").removeClass("fa-spin");
        var response = x2js.xml_str2json(data).response
				console.log(response);
        allarme.statoArea8 = response.statoArea8;
        allarme.statoAreaP18 = response.statoAreaP18;
        allarme.statoAreaP28 = response.statoAreaP28;
				console.log(allarme);
        return allarme;
      });
      return promise;
			*/
			return allarme;
    },

    cambioStato: function(id) {
      var promise = $http({
        method: 'POST',
        url: $rootScope.cfg.prot+$rootScope.cfg.host+'user/statoAree.cgi?statoArea='+id,
        headers: {
          'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
        }
      });
      promise.success(function(data, status, headers, conf) {
        return data;
      });
      return promise;
    }
  };
}]);
