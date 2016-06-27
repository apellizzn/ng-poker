'use strict';

/**
 * @ngdoc directive
 * @name fcApp.directive:PlayTable
 * @description
 * # PlayTable
 */
angular.module('fcApp')
  .directive('playtable', function (lodash, Game, Turn) {
    return {
      templateUrl: 'views/playtable.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.players = [
          {
            identifier: 1,
            name: 'PromoArticle',
            fiches: 100
          },
          {
            identifier: 2,
            name: 'Exhibitor',
            fiches: 100
          }
        ];
        scope.players.forEach(Game.addPlayer);

        Game.reset();
        scope.turn = Turn.get();

        scope.$watchCollection(Game.getRevealedCards, function (newVal) {
          scope.revealed = newVal;
        });
      }
    };
  });
