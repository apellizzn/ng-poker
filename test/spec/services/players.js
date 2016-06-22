'use strict';

describe('Service: Players', function () {

  // load the service's module
  beforeEach(module('fcApp'));
  // instantiate service
  let Players;
  const player = {
    identifier: 1,
    name: 'foo',
    fiches: 78
  };
  const player2 = {
    identifier: 2,
    name: 'bar',
    fiches: 17
  };

  beforeEach(inject(function (_Players_) {
    Players = _Players_;
  }));

  describe('addPlayer', function () {
    it('adds a player', function () {
      expect(Players.addPlayer(player)).toEqual(player);
      expect(Players.players[0]).toEqual(player);
    });
  });

  describe('find', function () {
    it('finds a player by id', function () {
      Players.addPlayer(player);
      expect(Players.find(1)).toEqual(player);
    });
  });

  describe('bet', function () {
    it('reduce players fiches amount', function () {
      Players.addPlayer(player);
      Players.addPlayer(player2);
      let bet1 = player;
      bet1.raise = 2;
      let bet2 = player2;
      bet2.raise = 3;
      Players.bet([bet1, bet2]);
      expect(Players.find(1).fiches).toEqual(76);
      expect(Players.find(2).fiches).toEqual(14);
    });
  });

  describe('giveCards', function () {
    it('assigns 2 card to each player', function () {
      Players.addPlayer(player);
      Players.addPlayer(player2);
      Players.giveCards([
        { value: 1, type: 'H' }, { value: 2, type: 'F' },
        { value: 3, type: 'Q' }, { value: 4, type: 'D' }
      ]);
      expect(Players.find(1).cards).toEqual([{ value: 4, type: 'D' }, { value: 3, type: 'Q' }]);
      expect(Players.find(2).cards).toEqual([{ value: 2, type: 'F' }, { value: 1, type: 'H' }]);
    });
  });

});
