'use strict';

angular.module('simpleHome.toolbarLabel', [])

.directive('toolbar', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      icon: '@',
      label: '@',
      refresh: '@'
    },
    templateUrl: '/components/toolbar/template.html',
    controller: function($scope) {
      $scope.clickRefresh = function() {
        $rootScope.$broadcast('toolbar:refresh');
      };
    }
  };
}]);
