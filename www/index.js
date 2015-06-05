'use strict';

angular.module('simpleHome.index', ['ngRoute'])
.controller('ToolbarCtrl', function($rootScope) {

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

});