'use strict';

/**
 * @ngdoc service
 * @name fcApp.Game
 * @description
 * # Game
 * Service in the fcApp.
 */
angular.module('fcApp')
  .factory('Game', ($q, lodash, Players, Turn, Hand) => {
    const numbers = lodash.range(1, 14);
    let service = {
      revealed: [],
      cards: []
    };

    const options = ['royalFlush','straightFlush','fourOfAKind','fullHouse','flush',
      'straight', 'threeOfAKind', 'twoPairs', 'onePair', 'hightCard']

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

    service.computeWinner = () => {
      const players = Players.getPlayers().map((player) => {
        return {
          player: player,
          hand: Hand.bestHandFor(service.revealed, player.cards)
        };
      });
      let winner;
      lodash.find(options, (option) => {
        const candidates = lodash.filter(players, (player) => player.hand[option].found);
        if(candidates.length > 0) {
          winner = lodash.maxBy(candidates, (c) => c.hand[option].points);
          return true;
        }
      });
      return winner;
    };

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
