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
      template:
          '<span class={{side}}>'
          + '<div>'
          + '<card value="card.value" type="card.type" ng-repeat="card in player.cards"></card>'
          + '</div>'
          + '<div class="center">'
          + '<h4>{{player.name}} - {{player.fiches}}</h4>'
          + '<input ng-model="amount"></input><button ng-click="raise()">Rise</button>'
          + '<button>Check</button>'
          + '<button ng-click="fold()">Fold</button>'
          + '</div>'
          + '<span>',
      scope: {
        name: '@',
        fiches: '@',
        side: '@',
        identifier: '@'
      },
      restrict: 'E',
      link: function postLink(scope) {
        Game.addPlayer({
          name: scope.name,
          fiches: Number(scope.fiches),
          identifier: Number(scope.identifier)
        });
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
