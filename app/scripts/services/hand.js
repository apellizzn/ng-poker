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

    const straight = (cards, type) => {
      var start = true;
      var count = 0;
      const filtered = lodash.filter(
        cards,
        (c) => type ? c.type === type : true
      );
      for (var i = 0; i < filtered.length; i++) {
        if(start){
          count = 1;
          start = false;
        }
        else if (filtered[i].value === filtered[i - 1].value) { continue; }
        else if (filtered[i].value === filtered[i - 1].value - 1) {
          count ++;
        }
        else {
          count = 0;
          start = true;
        }
      }
      return count >= 5;
    };

    const royal = (cards, type) => {
      return lodash.startsWith(
        lodash.reduce(
          lodash.filter(
            cards,
            (c) => type ? c.type === type : true
          ),
          (s, card) => s += Card.toHuman(card.value),
          ''
        ),
        'AKQJ10'
      );
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

    service.bestHandFor = (table) => (player) => {
      const cards = lodash.sortBy(
        lodash.union(player.cards, table),
        Card.byValue
      );

      return service.royalFlush(cards)
           || service.straightFlush(cards)
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
