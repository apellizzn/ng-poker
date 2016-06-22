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
          + '<input ng-model="raise"></input><button ng-click="bet()">Rise</button>'
          + '<button>Check</button>'
          + '<button>Fold</button>'
          + '</div>'
          + '<span>',
      scope: {
        name: '@',
        fiches: '@',
        side: '@',
        identifier: '@'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.raise = 5;
        scope.bet = () => {
          Game.addBet(lodash.merge(scope.player, { raise: Number(scope.raise) }));
        };
        Game.addPlayer({
          name: scope.name,
          fiches: scope.fiches,
          identifier: scope.identifier
        });
        scope.player = Game.findPlayer(scope.identifier);
      }
    };
  });
