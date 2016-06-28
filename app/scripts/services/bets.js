'use strict';

/**
 * @ngdoc service
 * @name fcApp.Bets
 * @description
 * # Bets
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Bets',  () => {
    let service = {};
    service.bets = [];

    service.logBet = (bet) => service.bets.push(bet);
    service.get = ()  => service.bets;
    service.clear = ()  => { service.bets = [] };

    return service;
  });
