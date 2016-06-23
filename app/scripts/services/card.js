'use strict';

/**
 * @ngdoc service
 * @name fcApp.Card
 * @description
 * # Card
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Card', () => {
    var service = {};
    const suites = { 13: 'A', 10: 'J', 11: 'Q', 12: 'K' };
    const readableTypes = {
      H: 'heart',
      S: 'spade',
      F: 'flower',
      D: 'diamond'
    };

    service.byValue = (card) => card.value;

    service.byType = (card) => card.type;

    service.isSuit = (value) => Boolean(suites[value]);

    service.toClass = (type) => readableTypes[type];

    service.toHuman = (value) => suites[value] || value + 1;

    return service;
  });
