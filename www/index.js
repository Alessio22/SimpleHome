'use strict';

angular.module('simpleHome.index', ['ngRoute'])
.controller('ToolbarCtrl', function($scope, $mdSidenav) {
  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle();
  };
})
.controller('LeftSidenavCtrl', function($scope, $mdSidenav) {
 	$scope.navigateTo = function(path) {
 		$mdSidenav('left').close();
		location.href = "#/"+path;
	}
});