'use strict';

angular.module('simpleHome.toolbar', [])

.directive('toolbar', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      icon: '@',
      label: '@',
      refresh: '@',
      image: '@'
    },
    templateUrl: 'components/toolbar/toolbar.html',
    controller: function($scope) {
      $scope.clickRefresh = function() {
        $rootScope.$broadcast('toolbar:refresh');
      };
    }
  };
}]);
