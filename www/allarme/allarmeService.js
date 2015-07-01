'use strict';

angular.module('simpleHome.allarmeService', [])
.factory('AllarmeService', ['$rootScope','$http', function($rootScope, $http) {
	return {
    stato: function(allarme) {
      $("#refresh").addClass("fa-spin");
      var promise = $http({
        method: 'POST',
        url: "http://"+$rootScope.cfg.host+'user/aree_intr.xml',
        // url: '/data/aree_intr.xml',
        headers: {
            'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
        }
      });
      promise.success(function(data, status, headers, conf) {
        $("#refresh").removeClass("fa-spin");
        var response = x2js.xml_str2json(data).response
        allarme.statoArea8 = response.statoArea8 == 1;
        allarme.statoAreaP18 = response.statoAreaP18 == 1;
        allarme.statoAreaP28 = response.statoAreaP28 == 1;
        return allarme;
      });
      return promise;
    },

    cambioStato: function(id) {
      var promise = $http({
        method: 'POST',
        url: "http://"+$rootScope.cfg.host+'user/statoAree.cgi?statoArea='+id,
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
