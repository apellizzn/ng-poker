'use strict';

/**
 * @ngdoc service
 * @name fcApp.Hand
 * @description
 * # Hand
 * Factory in the fcApp.
 */
angular.module('fcApp')
  .factory('Hand', (lodash, Card) => {
    let service = {};

    const straight = (cards) => {
      // TODO : check for consecutive values
    };

    service.straightFlush = (cards) => {
      return straight(cards) && service.flush(cards);
    };

    service.flush = (cards) => {
      return Boolean(
        lodash.find(
          lodash.groupBy(cards, Card.byType),
          (value) => value.length >= 5
        )
      );
    };

    service.bestHandFor = (table) => (player) => {
      const cards = lodash.union(player.cards, table);

      return //service.royalFlush(cards)
          straightFlush(cards)
      //   || fourOfAKind(cards)
      //   || fullHouse(cards)
        || service.flush(cards);
      //   || threeOfAKind(cards)
      //   || TwoPairs(cards)
      //   || onePair(cards)
      //   || hightCard(cards)
    };

    return service;
  });
