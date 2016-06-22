'use strict';

/**
 * @ngdoc directive
 * @name fcApp.directive:PlayTable
 * @description
 * # PlayTable
 */
angular.module('fcApp')
  .directive('playtable', function (lodash, Game) {
    return {
      template:
      '<div>'
        + '<deck></deck>'
        + '<div>'
        + '<card value="card.value" type="card.type" ng-repeat="card in revealed"></card>'
        + '</div>'
        + '<player identifier=1 side="left" fiches=100 name="PromoArticle"></player>'
        + '<player identifier=2 side="right" fiches=100 name="Exhibitor"></player>'
      + '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        Game.reset();
        Game.giveCards();
        scope.$watchCollection(Game.getRevealedCards, function (newVal, oldVal) {
          scope.revealed = newVal;
        });
        // scope.turn = function () {
        //   scope.revealed = lodash.concat([], scope.revealed, Game.revealCards(1));
        // };
      }
    };
  });
