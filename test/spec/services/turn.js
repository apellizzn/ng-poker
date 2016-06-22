'use strict';

describe('Service: Turn', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  var Turn;
  beforeEach(inject(function (_Turn_) {
    Turn = _Turn_;
  }));

  it('should do something', function () {
    expect(!!Turn).toBe(true);
  });

});
