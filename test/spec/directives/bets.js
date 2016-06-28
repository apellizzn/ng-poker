'use strict';

describe('Directive: Bets', function () {

  // load the directive's module
  beforeEach(module('fcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-bets></-bets>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Bets directive');
  }));
});
