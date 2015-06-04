'use strict';

// Declare app level module which depends on views, and components
angular.module('simpleHome', [
  'ngRoute',
  'simpleHome.index',
  'simpleHome.home',
  'simpleHome.luci',
  'simpleHome.temperature',
  'simpleHome.settings',
  'simpleHome.version',
  'simpleHome.onLoad'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

var x2js = new X2JS();
if (typeof btoa === "undefined") {
    _keyStr = Base64._keyStr;
    btoa = Base64.encode;
    atob = Base64.decode;
}

window.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    alert('onDeviceReady');
    window.addEventListener("backbutton", onBackKeyDown, false); 
}

function onBackKeyDown(e) {
  alert('onBackKeyDown');
  if($rootScope.isHome) {
    e.preventDefault();
    navigator.notification.confirm("Are you sure you want to exit?", 
      onConfirm, "Confirmation", "Yes,No"); 
  } else {
    location.href = "#/home";
  }
}

function onConfirm(button) {
    if(button==2){
        return;
    }else{
        navigator.app.exitApp();
    }
}