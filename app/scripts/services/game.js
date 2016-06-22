'use strict';

/**
 * @ngdoc service
 * @name fcApp.Game
 * @description
 * # Game
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Game', ($q, lodash, Players, Turn) => {
    const numbers = lodash.range(0, 13);
    let service = {
      revealed: [],
      cards: []
    };

    service.nextTurn = () => Turn.reset();

    service.reset = () => {
      service.cards = lodash.union(
        lodash.map(numbers, (n) => { return { value: n, type: 'S' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'D' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'F' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'H' }; })
      );
      service.nextTurn();
    };

    service.playersNum = () => Players.getPlayersCount();

    service.addPlayer = (ps) => Players.addPlayer(ps);

    service.findPlayer = (id) => Players.find(id);

    service.getCards = () => service.cards;

    service.getRevealedCards = () => service.revealed;

    service.addBet = (p) => {
      if(Turn.recordBet(p)) {
        return Turn.validBets() ? service.placeBets() : false;
      } else {
        return false;
      }
    };

    service.computeWinner = () => {};

    service.placeBets = () => {
      Turn.placeBets();
      service.revealCards(1);
      if(service.revealed.length == 5) {
        service.computeWinner();
      } else {
        service.nextTurn();
      }
    };

    service.twoForEach = () => {
      return lodash.pullAt(service.cards, lodash.range(service.playersNum() * 2));
    };

    service.giveCards = () => {
      if (service.cards.length < 4) { return; }
      service.cards = lodash.shuffle(service.cards);
      Players.giveCards(service.twoForEach());
      service.revealCards(3);
    };

    service.revealCards = (n) => {
      service.cards = lodash.shuffle(service.cards);
      var newCards = lodash.pullAt(service.cards, lodash.range(n));
      service.revealed = lodash.union(service.revealed, newCards);
    };

    return service;
  });
