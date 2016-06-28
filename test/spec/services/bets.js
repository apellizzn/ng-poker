'use strict';

describe('Service: Bets', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  var Bets;
  beforeEach(inject(function (_Bets_) {
    Bets = _Bets_;
  }));

  it('should do something', function () {
    expect(!!Bets).toBe(true);
  });

});
