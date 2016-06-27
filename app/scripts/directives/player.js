'use strict';

/**
 * @ngdoc directive
 * @name fcApp.directive:player
 * @description
 * # player
 */
angular.module('fcApp')
  .directive('player', (lodash, Game) => {
    return {
      templateUrl: 'views/player.html',
      scope: {
        name: '@',
        fiches: '@',
        side: '@',
        identifier: '@'
      },
      restrict: 'E',
      link: function postLink(scope) {
        scope.amount = 5;
        scope.player = Game.findPlayer(Number(scope.identifier));

        scope.raise = () => {
          Game.addBet(lodash.merge(scope.player, { raise: Number(scope.amount) }));
        };

        scope.fold = () => {
          Game.addBet(lodash.merge(scope.player, { fold: true }));
        };

      }
    };
  });
