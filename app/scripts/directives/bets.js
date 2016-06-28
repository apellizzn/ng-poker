'use strict';

/**
 * @ngdoc directive
 * @name fcApp.directive:Bets
 * @description
 * # Bets
 */
angular.module('fcApp')
  .directive('bets', (Bets) => {
    return {
      templateUrl: 'views/bets.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.$watchCollection(Bets.get, (newVal) => {
          scope.bets = newVal;
        });
        scope.clear = () => Bets.clear();
      }
    };
  });
