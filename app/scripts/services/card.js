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
    var people = { 0: 'A', 10: 'J', 11: 'Q', 12: 'K' };
    var readableTypes = {
      H: 'heart',
      S: 'spade',
      F: 'flower',
      D: 'diamond'
    };

    service.isSuit = (value) => Boolean(people[value]);

    service.toClass = (type) => readableTypes[type];

    service.toHuman = (value) => people[value] || value + 1;

    return service;
  });
