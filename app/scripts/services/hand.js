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

    const NOT_FOUND = { found: false, points: 0 };

    const nOfAKind = (n) => (cards) => {
      const found = lodash.find(
        lodash.groupBy(cards, Card.byValue),
        (value) => value.length === n
      );
      return {
        found: Boolean(found),
        points: lodash.sumBy(found, Card.byValue)
      };
    };

    const byTypeOrTrue = (type) =>
      type ? (card) => card.type === type : () => true;

    const straight = (cards, type) => {
      const filtered = lodash.uniqBy(
        lodash.filter(cards, byTypeOrTrue(type)),
        Card.byValue
      );
      let result = [];
      for (var i = 0; i < filtered.length; i++) {
        if(result.length === 5) { break; }
        else if(i + 1 < filtered.length && filtered[i].value === filtered[i + 1].value + 1){
          result.push(filtered[i]);
        } else if( i > 0 && filtered[i].value === filtered[i - 1].value - 1){
          result.push(filtered[i]);
        } else {
          result = [];
        }
      }
      const found = result.length >= 5;
      return {
        found: found,
        points: found ? lodash.sumBy(result, Card.byValue) : 0
      };
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

    service.fullHouse = (cards) => {
      const threeOfAKind = service.threeOfAKind(cards);
      const onePair = service.onePair(cards);
      const found = threeOfAKind.found && onePair.found;
      return found ? { found: true, points: threeOfAKind.points + onePair.points }
        : NOT_FOUND;
    };

    service.twoPairs = (cards) => {
      let filtered = lodash.filter(
          lodash.groupBy(cards, Card.byValue),
          (value) => value.length === 2
      );
      filtered = lodash.reduce(filtered, (css, cs) => lodash.concat(css, cs));
      if(filtered && filtered.length === 4) {
        return {
          found: true,
          points: lodash.sumBy(filtered, Card.byValue)
        };
      } else {
        return NOT_FOUND;
      }
    };

    service.straightFlush = (cards) => {
      const flush = service.flush(cards);
      return flush.found ? straight(cards, flush.type) : NOT_FOUND;
    };

    service.royalFlush = (cards) => {
      const flush = service.flush(cards);
      if (Boolean(flush.found)
        && straight(cards, flush.type).found
        && royal(cards, flush.type)) {
        return { found: true, points: 100 };
      } else {
        return NOT_FOUND;
      }
    };

    service.flush = (cards) => {
      const found = lodash.find(
          lodash.groupBy(cards, Card.byType),
          (value) => value.length >= 5
        );
      return {
        found: Boolean(found),
        points: found ? lodash.sumBy(found, Card.byValue) : 0,
        type: found ? found[0].type : null
      };
    };

    service.hightCard = (cards) => {
      return {
        found: true,
        points: lodash.sumBy(lodash.take(cards, 5), Card.byValue)
      };
    };

    service.bestHandFor = (table, playerCards) => {
      const cards = lodash.sortBy(
        lodash.union(playerCards, table),
        Card.byDescValue
      );

      return {
        royalFlush: service.royalFlush(cards),
        straightFlush: service.straightFlush(cards),
        fourOfAKind: service.fourOfAKind(cards),
        fullHouse: service.fullHouse(cards),
        flush: service.flush(cards),
        straight: service.straight(cards),
        threeOfAKind: service.threeOfAKind(cards),
        twoPairs: service.twoPairs(cards),
        onePair: service.onePair(cards),
        hightCard: service.hightCard(cards)
      };
    };

    return service;
  });
