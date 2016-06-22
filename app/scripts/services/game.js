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
      turnBet: {
        expect: [],
        amount: 0,
        max: 0,
        bets: []
      }
    };

    service.nextTurn = () => {
      service.turnBet = {
        amount: 0,
        max: 0,
        bets: []
      };
    };

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
      service.turnBet.bets.push(p);
      service.turnBet.amount += p.raise;
      if (service.turnBet.bets.length == service.playersNum()) {
        service.bet(service.turnBet.bets);
        service.nextTurn();
      }
    };

    service.bet = (bets) => {
      Players.bet(bets);
      service.turnBet.amount = lodash.sumBy(bets, (b) => b.raise);
      if(bets.every((b) => b.raise === bets[0].raise)) {
        service.revealCards(1);
      } else {
        // raise
      }
    };

    service.twoForEach = () =>
      lodash.pullAt(service.cards, lodash.range(service.playersNum() * 2));

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
