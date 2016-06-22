'use strict';

describe('Service: Hand', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Hand;
  const aceOfSpades = { value: 0, type: 'S' };
  const kingOfSpades = { value: 12, type: 'S' };
  const queenOfSpades = { value: 11, type: 'S' };
  const jackOfSpades = { value: 10, type: 'S' };
  const tenOfSpades = { value: 9, type: 'S' };

  const aceOfHarts = { value: 0, type: 'H' };
  const kingOfHarts = { value: 12, type: 'H' };
  const jackOfHarts = { value: 10, type: 'H' };

  beforeEach(inject(function (_Hand_) {
    Hand = _Hand_;
  }));

  describe('flush', () => {
    it('it works', () => {
      const okCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
         jackOfSpades, tenOfSpades, kingOfHarts];
      expect(Hand.flush(okCards)).toBe(true);

      const badCards = [aceOfSpades, aceOfHarts, kingOfSpades, queenOfSpades,
        jackOfSpades, kingOfHarts, jackOfHarts] ;
      expect(Hand.flush(badCards)).toBe(false);
    });
  });

});
