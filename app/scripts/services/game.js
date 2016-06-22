'use strict';

/**
 * @ngdoc service
 * @name fcApp.Game
 * @description
 * # Game
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Game', ($q, lodash, Players) => {
    const numbers = lodash.range(0, 13);
    let service = {
      revealed: [],
      cards: [],
      stateMachine: {
        start: 'setup',
        setup: 'bet',
        bet: 'turn',
        turn: ['bet', 'end'],
        end: 'start'
      },
      turnBet: []
    };

    service.reset = () => {
      service.state = 'setup';
      service.cards = lodash.union(
        lodash.map(numbers, (n) => { return { value: n, type: 'S' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'D' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'F' }; }),
        lodash.map(numbers, (n) => { return { value: n, type: 'H' }; })
      );
    };

    service.addPlayer = (ps) => Players.addPlayer(ps);

    service.findPlayer = (id) => Players.find(id);

    service.getCards = () => service.cards;

    service.getRevealedCards = () => service.revealed;

    service.addBet = (p) => {
      service.turnBet.push(p);
      if (service.turnBet.length > 1) {
        service.bet(service.turnBet[0], service.turnBet[1]);
        service.turnBet = [];
      }
    };

    service.bet = (p1, p2) => {
      Players.bet(p1, p2);
      service.revealCards(1);
    };

    service.giveCards = () => {
      if (service.cards.length < 4) { return; }
      service.cards = lodash.shuffle(service.cards);
      Players.giveCards(lodash.pullAt(service.cards, [0, 1, 2, 3]));
      service.revealCards(3);
      service.state = 'bet';
    };

    service.revealCards = (n) => {
      service.cards = lodash.shuffle(service.cards);
      var newCards = lodash.pullAt(service.cards, lodash.range(n));
      service.revealed = lodash.union(service.revealed, newCards);
    };

    return service;
  });
