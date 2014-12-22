'use strict';

// Declare app level module which depends on views, and components
angular.module('simpleHome', [
  'ngMaterial',
  'ngRoute',
  'simpleHome.index',
  'simpleHome.home',
  'simpleHome.luci',
  'simpleHome.settings',
  'simpleHome.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Authorization'] = 'Basic OjE0MTE=';
    }
]);

var x2js = new X2JS();
var host = "http://edo.cloudns.pro/";