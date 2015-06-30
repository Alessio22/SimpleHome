'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('simpleHome', [
  'ngRoute',
  'simpleHome.home',
  'simpleHome.luci',
  'simpleHome.temperature',
  'simpleHome.allarme',
  'simpleHome.settings',
  'simpleHome.version',
  'simpleHome.onLoad',
  'simpleHome.luciService',
  'simpleHome.temperatureService',
  'simpleHome.allarmeService'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  }
]);

// For resolve
app.run(['$rootScope', function($root) {
  $root.$on('$routeChangeStart', function(e, curr, prev) {
    if (curr.$$route && curr.$$route.resolve) {
      $("#modalLoading").modal("show");
    }
  });
  $root.$on('$routeChangeSuccess', function(e, curr, prev) {
      setTimeout(function(){
        $("#modalLoading").modal("hide");
    }, 500);
  });
}]);

// For XML to JSON
var x2js = new X2JS();

// For base64
if (typeof btoa === "undefined") {
    _keyStr = Base64._keyStr;
    btoa = Base64.encode;
    atob = Base64.decode;
}

// For bootstrap material
$.material.init();
