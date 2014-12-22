'use strict';

angular.module('simpleHome.index', ['ngRoute'])
.controller('ToolbarCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle();
  };
})
.controller('LeftSidenavCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('left').close();
  };
});