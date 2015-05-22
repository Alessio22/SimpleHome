'use strict';

angular.module('simpleHome.onLoad', [])

.directive('onLoad', function() {
  return function($rootScope, elm, attrs) {
  	var settings = JSON.parse(localStorage.getItem("settings"))

  	$rootScope.cfg = {'host':'','username':'','password':''}
  	$rootScope.settings = { 'profile': $rootScope.profile, 'cfg': [{'host':'','username':'','password':''}, {'host':'','username':'','password':''}] }
  	if(settings) {
  		$rootScope.settings = settings
		    $rootScope.cfg.host = settings.cfg[settings.profile].host==undefined?'':settings.cfg[settings.profile].host;
			$rootScope.cfg.username = settings.cfg[settings.profile].username==undefined?'':settings.cfg[settings.profile].username;
			$rootScope.cfg.password = settings.cfg[settings.profile].password==undefined?'':settings.cfg[settings.profile].password;  

  	}

  };
});
