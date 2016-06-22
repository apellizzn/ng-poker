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

    service.get = () => service;

    service.reset = () => {
      service.amount = 0;
      service.maxBet = 0;
      service.bets = [];
      service.missingPlayers = Players.getCurrentPlayers();
    };

    service.validBets = () =>
      service.bets.every((b) => b.raise === service.bets[0].raise)
      && service.missingPlayers.length === 0;


    service.placeBets = () => {
      Players.bet(service.bets);
      service.totalBet = lodash.sumBy(service.bets, (b) => b.raise);
    };

    service.allowedToBet = (player) => {
      return player.raise >= service.maxBet
      && Boolean(lodash.find(service.missingPlayers, { identifier: player.identifier }));
    };

    service.acceptBet = (player) => {
      if(service.allowedToBet(player)) {
        lodash.remove(
          service.missingPlayers,
          (p) => p.identifier === player.identifier
        );
        service.bets.push(player);
        service.totalBet += player.raise;
        return true;
      } else {
        return false;
      }
    };

    // Public API here
    return service;
  });
