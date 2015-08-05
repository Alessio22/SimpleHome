angular.module('simpleHome.allarmeService', [])
.factory('AllarmeService', ['$rootScope','$http', function($rootScope, $http) {
	return {
    stato: function(allarme) {
      var promise = $http({
        method: 'POST',
        url: "http://"+$rootScope.cfg.host+'user/aree_intr.xml',
        // url: '/data/aree_intr.xml',
        headers: {
            'Authorization': 'Basic ' + btoa($rootScope.cfg.username+":"+$rootScope.cfg.password)
        }
      });
      promise.success(function(data, status, headers, conf) {
				var json = x2js.xml_str2json(data);
				if(json) {
					var response = json.response;
					allarme.statoArea8 = response.statoArea8 == 1;
					allarme.statoAreaP18 = response.statoAreaP18 == 1;
					allarme.statoAreaP28 = response.statoAreaP28 == 1;
				}
				setTimeout(function(){
		      $("#modalLoading").modal("hide");
		    }, 500);
        return data;
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
