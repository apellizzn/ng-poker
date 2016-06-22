'use strict';

describe('Service: Card', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  var Card;
  beforeEach(inject(function (_Card_) {
    Card = _Card_;
  }));

  describe('toClass', function () {
    it('returns the right class', function () {
      expect(Card.toClass('H')).toEqual('heart');
    });
  });

  describe('toHuman', function () {
    it('returns the right value', function () {
      expect(Card.toHuman(10)).toEqual('J');
      expect(Card.toHuman(2)).toEqual(3);
    });
  });

  describe('isSuit', function () {
    it('returns the right value', function () {
      expect(Card.isSuit('10')).toBe(true);
      expect(Card.isSuit(2)).toBe(false);
    });
  });

});
