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

  beforeEach(inject(function (_Hand_) {
    Hand = _Hand_;

  }));
  describe('flush', () => {
    it('it works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
         jackOfSpades, tenOfSpades, kingOfHarts];
      expect(Hand.flush(okCards)).toEqual('S');

      const badCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
        jackOfSpades, kingOfHarts, jackOfHarts] ;
      expect(Hand.flush(badCards)).toBe(undefined);
    });
  });

  describe('straightFlush', () => {
    it('it works', () => {
      const okCards = [aceOfHarts, kingOfHarts, queenOfSpades, jackOfSpades,
         tenOfSpades,  nineOfSpades, eigthOfSpades];

      expect(Hand.straightFlush(okCards)).toBe(true);

      const badCards = [aceOfHarts, kingOfSpades, kingOfHarts, queenOfSpades,
        jackOfSpades,  eigthOfSpades, jackOfHarts];

      expect(Hand.straightFlush(badCards)).toBe(false);
    });
  });

  describe('royalFlush', () => {
    it('it works', () => {
      const okCards = [aceOfSpades, kingOfSpades, kingOfHarts, queenOfSpades,
         jackOfSpades, jackOfHarts, tenOfSpades];

      expect(Hand.royalFlush(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfHarts, queenOfSpades,
        jackOfSpades,  tenOfSpades, nineOfSpades];

      expect(Hand.royalFlush(badCards)).toBe(false);
    });
  });
});
