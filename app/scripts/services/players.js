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

    service.addPlayer = (newPlayer) => {
      service.players.push(newPlayer);
      return newPlayer;
    };

    service.find = (id) => {
      return lodash.find(service.players, (p) => {
        return p.identifier === id;
      });
    };

    service.bet = (aP1, aP2) => {
      var p1 = lodash.find(service.players, (p) => p.identifier === aP1.identifier);
      var p2 = lodash.find(service.players, (p) => p.identifier === aP2.identifier);
      p1.fiches -= aP1.raise;
      p2.fiches -= aP2.raise;
      service.players = [p1, p2];
    };

    service.giveCards = (newCards) => {
      service.players[0].cards = lodash.take(newCards, 2);
      service.players[1].cards = lodash.takeRight(newCards, 2);
    };

    return service;
  });
