'use strict';

describe('Directive: card', function () {

  // load the directive's module
  beforeEach(module('fcApp'));

  var element,
    scope;

  beforeEach(inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject( ($compile) => {
    element = angular.element('<card></card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the card directive');
  }));
});
