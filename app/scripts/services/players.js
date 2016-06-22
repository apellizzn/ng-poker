'use strict';

/**
 * @ngdoc service
 * @name fcApp.players
 * @description
 * # players
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Players', (lodash) => {
    var service = {};
    service.players = [];

    service.getPlayersCount = () => service.players.length;

    service.addPlayer = (newPlayer) => {
      service.players.push(newPlayer);
      return newPlayer;
    };

    service.find = (id) => {
      return lodash.find(service.players, (p) => {
        return p.identifier === id;
      });
    };

    service.bet = (bets) => {
      service.players = service.players.map((player) => {
        const playerBet = lodash.find(bets, { identifier: player.identifier });
        if (playerBet) {
          player.fiches -= playerBet.raise;
        }
        return player;
      });
    };

    service.giveCards = (newCards) => {
      lodash.forEach(service.players, (player) => {
        player.cards = [newCards.pop(), newCards.pop()];
      });
    };

    return service;
  });
