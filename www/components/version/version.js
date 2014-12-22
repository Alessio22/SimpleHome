'use strict';

angular.module('simpleHome.version', [
  'simpleHome.version.interpolate-filter',
  'simpleHome.version.version-directive'
])

.value('version', '0.1');
