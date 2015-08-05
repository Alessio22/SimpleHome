'use strict';

angular.module('simpleHome.onLoad', [])

.directive('onLoad', function() {
  return function($rootScope, elm, attrs) {

  	// controllo del tasto back
  	document.addEventListener("deviceready", onDeviceReady, false);
  	function onDeviceReady() {
  	  document.addEventListener("backbutton", onBackKeyDown, false);
  	}
  	function onBackKeyDown(e) {
  	  if($rootScope.isHome == true) {
  	    e.preventDefault();
  	    navigator.app.exitApp();
  	  } else {
  	  	window.history.back();
  	  }
  	}

  	var settings = JSON.parse(localStorage.getItem("settings"));

  	$rootScope.cfg = {'alias':'','host':'','username':'','password':''};
  	$rootScope.settings = { 'profile': $rootScope.profile, 'cfg': [] };
  	if(settings) {
  		$rootScope.settings.cfg = [{'alias':'','host':'','username':'','password':''}, {'alias':'','host':'','username':'','password':''}];
  		$rootScope.settings = settings;
	    $rootScope.cfg.alias = settings.cfg[settings.profile].alias==undefined?'':settings.cfg[settings.profile].alias;
	    $rootScope.cfg.host = settings.cfg[settings.profile].host==undefined?'':settings.cfg[settings.profile].host;
  		$rootScope.cfg.username = settings.cfg[settings.profile].username==undefined?'':settings.cfg[settings.profile].username;
  		$rootScope.cfg.password = settings.cfg[settings.profile].password==undefined?'':settings.cfg[settings.profile].password;
  	}
  };
});
