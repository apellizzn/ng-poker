'use strict';

describe('Directive: PlayTable', function () {

  // load the directive's module
  beforeEach(module('fcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-play-table></-play-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the PlayTable directive');
  }));
});
