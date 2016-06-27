'use strict';

/**
 * @ngdoc service
 * @name fcApp.Turn
 * @description
 * # Turn
 * Factory in the fcApp.
 */
angular.module('fcApp')
  .factory('Turn', (lodash, Players) => {
    let service = {
      missingPlayers: [],
      totalBet: 0,
      maxBet: 0,
      bets: []
    };

    const RAISE = (bet) => bet.raise;

    service.get = () => service;

    service.getTotalBet = () => service.totalBet;

    service.onlyOneBet = () => service.bets.length === 1;

    service.clear = () => {
      service.amount = 0;
      service.bets = [];
      service.maxBet = 0;
      service.totalBet = 0;
      service.missingPlayers = Players.getCurrentPlayers();
    };

    service.reset = () => {
      service.amount = 0;
      service.bets = [];
      service.maxBet = 0;
      service.missingPlayers = Players.getCurrentPlayers();
    };

    service.hasTheSameBet = (bet) => bet.raise === service.bets[0].raise;

    service.validBets = () =>
      service.bets.every(service.hasTheSameBet)
      && lodash.isEmpty(service.missingPlayers);

    service.placeBets = () => {
      Players.bet(service.bets);
    };

    service.allowedToBet = (player) => {
      return (player.raise >= service.maxBet || player.fold)
      && Boolean(lodash.find(service.missingPlayers, { identifier: player.identifier }));
    };

    service.recordBet = (player) => {
      if(service.allowedToBet(player)) {
        lodash.remove(service.missingPlayers, Players.equals(player));
        if(!player.fold) {
          service.bets.push(player);
          service.totalBet += player.raise;
        }
        return true;
      } else {
        return false;
      }
    };

    // Public API here
    return service;
  });
