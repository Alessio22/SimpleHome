'use strict';

angular.module('simpleHome.onLoad', [])

.directive('onLoad', function() {
  return function($rootScope, elm, attrs) {

  	var settings = JSON.parse(localStorage.getItem("settings"));

  	$rootScope.cfg = {'alias':'','prot':'','host':'','username':'','password':''};
  	$rootScope.settings = { 'profile': $rootScope.profile, 'cfg': [] };
  	if(settings) {
  		$rootScope.settings.cfg = [{'alias':'','prot':'','host':'','username':'','password':''}, {'alias':'','prot':'','host':'','username':'','password':''}];
  		$rootScope.settings = settings;
	    $rootScope.cfg.alias = settings.cfg[settings.profile].alias==undefined?'':settings.cfg[settings.profile].alias;
	    $rootScope.cfg.prot = settings.cfg[settings.profile].prot==undefined?'':settings.cfg[settings.profile].prot;
	    $rootScope.cfg.host = settings.cfg[settings.profile].host==undefined?'':settings.cfg[settings.profile].host;
		$rootScope.cfg.username = settings.cfg[settings.profile].username==undefined?'':settings.cfg[settings.profile].username;
		$rootScope.cfg.password = settings.cfg[settings.profile].password==undefined?'':settings.cfg[settings.profile].password;  

  	}

  };
});
