'use strict';

describe('Service: Hand', () => {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Hand;

  const aceOfSpades = { value: 13, type: 'S' };
  const kingOfSpades = { value: 12, type: 'S'};
  const queenOfSpades = { value: 11, type: 'S' };
  const jackOfSpades = { value: 10, type: 'S' };
  const tenOfSpades = { value: 9, type: 'S' };
  const nineOfSpades = { value: 8, type: 'S' };
  const eigthOfSpades = { value: 7, type: 'S' };

  const aceOfHarts = { value: 13, type: 'H'};
  const kingOfHarts = { value: 12, type: 'H' };
  const jackOfHarts = { value: 10, type: 'H' };

  const aceOfDiamonds = { value: 13, type: 'D' };
  const kingOfDiamonds = { value: 12, type: 'D' };

  const aceOfFlowers = { value: 13, type: 'F' };
  const queenOfFlowers = { value: 11, type: 'F' };

  const notFound = { found: false, points: 0 };

  beforeEach(inject((_Hand_) => {
    Hand = _Hand_;

  }));
  describe('flush', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades,
        queenOfSpades,
        jackOfSpades, tenOfSpades, kingOfHarts
      ];
      expect(Hand.flush(okCards)).toEqual({
        found: true,
        points: 55,
        type: 'S'
      });

      const badCards = [aceOfSpades, aceOfHarts, kingOfSpades,
        queenOfSpades,
        jackOfSpades, kingOfHarts, jackOfHarts
      ];
      expect(Hand.flush(badCards)).toEqual({
        found: false,
        points: 0,
        type: null
      });
    });
  });

  describe('straightFlush', () => {
    it('works', () => {
      const okCards = [aceOfHarts, kingOfHarts, queenOfSpades,
        jackOfSpades,
        tenOfSpades, nineOfSpades, eigthOfSpades
      ];

      expect(Hand.straightFlush(okCards)).toEqual({ found: true, points: 38 });

      const badCards = [aceOfHarts, kingOfSpades, kingOfHarts,
        queenOfSpades,
        jackOfSpades, eigthOfSpades, jackOfHarts
      ];

      expect(Hand.straightFlush(badCards)).toEqual(notFound);
    });
  });

  describe('royalFlush', () => {
    it('works', () => {
      const okCards = [aceOfSpades, kingOfSpades, kingOfHarts,
        queenOfSpades,
        jackOfSpades, jackOfHarts, tenOfSpades
      ];

      expect(Hand.royalFlush(okCards)).toEqual({ found: true, points: 100 });

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        queenOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.royalFlush(badCards)).toEqual(notFound);
    });
  });

  describe('fourOfAKind', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, aceOfDiamonds,
        aceOfFlowers,
        jackOfSpades, jackOfHarts, tenOfSpades
      ];

      expect(Hand.fourOfAKind(okCards)).toEqual({
        found: true,
        points: 52
      });

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        queenOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.fourOfAKind(badCards)).toEqual(notFound);

    });
  });

  describe('fullHouse', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades,
        kingOfDiamonds,
        kingOfHarts, jackOfHarts, tenOfSpades
      ];

      expect(Hand.fullHouse(okCards)).toEqual({ found: true, points: 62 });

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        kingOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.fullHouse(badCards)).toEqual(notFound);
    });
  });

  describe('straight', () => {
    it('works', () => {
      const okCards = [aceOfHarts, kingOfDiamonds, queenOfFlowers,
        jackOfSpades,
        tenOfSpades, nineOfSpades, eigthOfSpades
      ];

      expect(Hand.straight(okCards)).toEqual({ found: true, points: 63 });

      const badCards = [aceOfHarts, kingOfSpades, kingOfHarts,
        queenOfSpades,
        jackOfSpades, eigthOfSpades, jackOfHarts
      ];

      expect(Hand.straight(badCards)).toEqual(notFound);
    });
  });

  describe('threeOfAKind', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, aceOfDiamonds,
        kingOfDiamonds,
        jackOfSpades, jackOfHarts, tenOfSpades
      ];

      expect(Hand.threeOfAKind(okCards)).toEqual({ found: true, points: 39 });

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        queenOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.threeOfAKind(badCards)).toEqual(notFound);
    });
  });

  describe('twoPairs', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        kingOfDiamonds,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.twoPairs(okCards)).toEqual({ found: true, points: 50 });

      const badCards = [aceOfSpades, kingOfHarts, kingOfDiamonds,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.twoPairs(badCards)).toEqual(notFound);
    });
  });

  describe('onePair', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfHarts,
        queenOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.onePair(okCards)).toEqual({ found: true, points: 26 });

      const badCards = [aceOfSpades, kingOfHarts, queenOfSpades,
        jackOfSpades, tenOfSpades, nineOfSpades
      ];

      expect(Hand.onePair(badCards)).toEqual(notFound);
    });
  });

  describe('hightCard', () => {
    it('works', () => {
      const cards = [aceOfHarts, kingOfDiamonds, queenOfFlowers,
        jackOfSpades,
        tenOfSpades, nineOfSpades, eigthOfSpades
      ];

      expect(Hand.hightCard(cards)).toEqual({ found: true, points: 55 });
    });
  });

  describe('bestHandFor', () => {
    it('works', () => {
      const cards = [aceOfHarts, aceOfDiamonds, queenOfSpades,
        jackOfSpades,
        tenOfSpades
      ];
      const player = {
        cards: [eigthOfSpades, nineOfSpades]
      };

      const result = Hand.bestHandFor(cards, player.cards);
      expect(result.royalFlush).toEqual(notFound);
      expect(result.straightFlush).toEqual({ found: true, points: 38 });
      expect(result.fourOfAKind).toEqual(notFound);
      expect(result.fullHouse).toEqual(notFound);
      expect(result.flush).toEqual({ found: true, points: 45, type: 'S' });
      expect(result.straight).toEqual({ found: true, points: 38 });
      expect(result.threeOfAKind).toEqual(notFound);
      expect(result.twoPairs).toEqual(notFound);
      expect(result.onePair).toEqual({ found: true, points: 26 });
      expect(result.hightCard).toEqual({ found: true, points: 56 });
    });
  });
});
