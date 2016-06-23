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

    const nOfAKind = (n) => (cards) =>
      Boolean(lodash.find(
        lodash.groupBy(cards, Card.byValue),
        (value) => value.length === n
      ));

    const byTypeOrTrue = (type) =>
      type ? (card) => card.type === type : () => true;

    const straight = (cards, type) => {
      const filtered = lodash.uniq(
        lodash.filter(cards, byTypeOrTrue(type)),
        Card.byValue
      );
      return lodash.some(
        lodash.chunk(
          lodash.compact(lodash.at(filtered, [0,4,1,5,2,6])),
          2
        ),
        (pair) => pair[0].value - 4 === pair[1].value
      );
    };

    const royal = (cards, type) => {
      return lodash.startsWith(
        lodash.reduce(
          lodash.filter(cards, byTypeOrTrue(type)),
          (s, card) => s += Card.toHuman(card.value),
          ''
        ),
        'AKQJ10'
      );
    };

    service.straight = (cards) => straight(cards);

    service.fourOfAKind = nOfAKind(4);

    service.threeOfAKind = nOfAKind(3);

    service.onePair = nOfAKind(2);

    service.fullHouse = (cards) =>
      service.threeOfAKind(cards) && service.onePair(cards);

    service.twoPairs = (cards) => {
      return lodash.filter(
          lodash.groupBy(cards, Card.byValue),
          (value) => value.length === 2
      ).length == 2;
    };

    service.straightFlush = (cards) => {
      const type = service.flush(cards);
      return Boolean(type) && straight(cards, type);
    };

    service.royalFlush = (cards) => {
      const type = service.flush(cards);
      return Boolean(type) && straight(cards, type) && royal(cards, type);
    };

    service.flush = (cards) => {
      let x = lodash.find(
          lodash.groupBy(cards, Card.byType),
          (value) => value.length >= 5
        );
      return x && x[0].type;

    };

    service.hightCard = (cards) => {
      return lodash.take(cards, 5);
    };

    service.bestHandFor = (table) => (player) => {
      const cards = lodash.sortBy(
        lodash.union(player.cards, table),
        Card.byDescValue
      );

      return service.royalFlush(cards)
           || service.straightFlush(cards)
           || service.fourOfAKind(cards)
           || service.fullHouse(cards)
           || service.flush(cards)
           || service.straight(cards)
           || service.threeOfAKind(cards)
           || service.twoPairs(cards)
           || service.onePair(cards)
           || service.hightCard(cards);
    };

    return service;
  });
