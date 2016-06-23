'use strict';

describe('Service: Hand', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Hand;
  const aceOfSpades = { value: 13, type: 'S' };
  const kingOfSpades = { value: 12, type: 'S' };
  const queenOfSpades = { value: 11, type: 'S' };
  const jackOfSpades = { value: 10, type: 'S' };
  const tenOfSpades = { value: 9, type: 'S' };
  const nineOfSpades = { value: 8, type: 'S' };
  const eigthOfSpades = { value: 7, type: 'S' };

  const aceOfHarts = { value: 13, type: 'H' };
  const kingOfHarts = { value: 12, type: 'H' };
  const jackOfHarts = { value: 10, type: 'H' };

  const aceOfDiamonds = { value: 13, type: 'D' };
  const kingOfDiamonds = { value: 12, type: 'D' };

  const aceOfFlowers = { value: 13, type: 'F' };
  const queenOfFlowers = { value: 11, type: 'F' };


  beforeEach(inject(function (_Hand_) {
    Hand = _Hand_;

  }));
  describe('flush', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
         jackOfSpades, tenOfSpades, kingOfHarts];
      expect(Hand.flush(okCards)).toEqual('S');

      const badCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
        jackOfSpades, kingOfHarts, jackOfHarts] ;
      expect(Hand.flush(badCards)).toBe(undefined);
    });
  });

  describe('straightFlush', () => {
    it('works', () => {
      const okCards = [aceOfHarts, kingOfHarts, queenOfSpades, jackOfSpades,
         tenOfSpades,  nineOfSpades, eigthOfSpades];

      expect(Hand.straightFlush(okCards)).toBe(true);

      const badCards = [aceOfHarts, kingOfSpades, kingOfHarts, queenOfSpades,
        jackOfSpades,  eigthOfSpades, jackOfHarts];

      expect(Hand.straightFlush(badCards)).toBe(false);
    });
  });

  describe('royalFlush', () => {
    it('works', () => {
      const okCards = [aceOfSpades, kingOfSpades, kingOfHarts, queenOfSpades,
         jackOfSpades, jackOfHarts, tenOfSpades];

      expect(Hand.royalFlush(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts, queenOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.royalFlush(badCards)).toBe(false);
    });
  });

  describe('fourOfAKind', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, aceOfDiamonds, aceOfFlowers,
         jackOfSpades, jackOfHarts, tenOfSpades];

      expect(Hand.fourOfAKind(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts, queenOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.fourOfAKind(badCards)).toBe(false);

    });
  });

  describe('fullHouse', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades, kingOfDiamonds,
         kingOfHarts, jackOfHarts, tenOfSpades];

      expect(Hand.fullHouse(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts, kingOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.fullHouse(badCards)).toBe(false);
    });
  });

  describe('straight', () => {
    it('works', () => {
      const okCards = [aceOfHarts, kingOfDiamonds, queenOfFlowers, jackOfSpades,
         tenOfSpades,  nineOfSpades, eigthOfSpades];

      expect(Hand.straight(okCards)).toBe(true);

      const badCards = [aceOfHarts, kingOfSpades, kingOfHarts, queenOfSpades,
        jackOfSpades,  eigthOfSpades, jackOfHarts];

      expect(Hand.straight(badCards)).toBe(false);

    });
  });

  describe('threeOfAKind', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, aceOfDiamonds, kingOfDiamonds,
         jackOfSpades, jackOfHarts, tenOfSpades];

      expect(Hand.threeOfAKind(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts, queenOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.threeOfAKind(badCards)).toBe(false);
    });
  });

  describe('twoPairs', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfHarts, kingOfDiamonds,
         jackOfSpades, tenOfSpades, nineOfSpades];

      expect(Hand.twoPairs(okCards)).toBe(true);

      const badCards = [aceOfSpades, kingOfHarts, kingOfDiamonds,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.twoPairs(badCards)).toBe(false);
    });
  });

  describe('onePair', () => {
    it('works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfHarts, queenOfSpades,
         jackOfSpades, tenOfSpades, nineOfSpades];

      expect(Hand.onePair(okCards)).toBe(true);

      const badCards = [aceOfSpades, kingOfHarts, queenOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.onePair(badCards)).toBe(false);
    });
  });

  describe('hightCard', () => {
    it('works', () => {
      const cards = [aceOfHarts, kingOfDiamonds, queenOfFlowers, jackOfSpades,
         tenOfSpades,  nineOfSpades, eigthOfSpades];

      expect(Hand.hightCard(cards)).toEqual([aceOfHarts, kingOfDiamonds,
        queenOfFlowers, jackOfSpades, tenOfSpades]);
    });
  });

  describe('bestHandFor', () => {
    it('works', () => {
      const cards = [aceOfHarts, kingOfHarts, queenOfSpades, jackOfSpades,
        tenOfSpades];
      const player = {
        cards: [eigthOfSpades, nineOfSpades]
      };
      // expect(Hand.bestHandFor(cards)(player)).toEqual({});
    });
  });
});
