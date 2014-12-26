'use strict';

angular.module('simpleHome.onLoad', [])

.directive('onLoad', function() {
  return function($rootScope, elm, attrs) {
  	var cfg = JSON.parse(localStorage.getItem("cfg"))
  	$rootScope.cfg = {'host':'','username':'','password':''}
  	if(cfg) {
	    $rootScope.cfg.host = cfg.host==undefined?'':cfg.host;
		$rootScope.cfg.username = cfg.username==undefined?'':cfg.username;
		$rootScope.cfg.password = cfg.password==undefined?'':cfg.password;  	
  	}

  };
});
