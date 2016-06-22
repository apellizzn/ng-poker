'use strict';

/**
 * @ngdoc directive
 * @name fcApp.directive:card
 * @description
 * # card
 */
angular.module('fcApp')
  .directive('card', function (Card) {
    return {
      scope: {
        value: '=',
        type: '='
      },
      template:
      '<span ng-switch on="isSuit()">'
      + '<section ng-switch-when="true" ng-class="class" value={{displayValue}}>'
        + '<div class="card__inner card__inner--centered">'
          + '<div class="middle-height">'
            + '{{ displayValue }}'
          + '</div>'
        + '</section>'
      + '<section ng-switch-default ng-class="class" value={{displayValue}}>'
         + '<div class="card__inner card__inner--centered">'
  			   + '<div class="card__column">'
  			     +	'<div class="card__symbol"></div>'
  			     + '<div class="card__symbol"></div>'
           + '</div></div>'
         + '</section>'
      +'</span>',

      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.class = 'card card--' + Card.toClass(scope.type);
        scope.displayValue = Card.toHuman(scope.value);
        scope.isSuit = function () {
          return Card.isSuit(scope.value);
        }
      },
    };
  });
