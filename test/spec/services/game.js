'use strict';

describe('Service: Game', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Game;
  let Players;
  const player = {
    id: 1,
    name: 'foo',
    fiches: '70'
  };

  beforeEach(inject( function(_Game_, _Players_) {
    Game = _Game_;
    Players = _Players_;
  }));

  describe('reset', () => {
    it('rests the game', () => {
      Game.reset();
      expect(Game.cards.length).toEqual(52);
      expect(Game.cards.filter((c) => c.type === 'S').length).toEqual(13);
      expect(Game.cards.filter((c) => c.type === 'D').length).toEqual(13);
      expect(Game.cards.filter((c) => c.type === 'H').length).toEqual(13);
      expect(Game.cards.filter((c) => c.type === 'F').length).toEqual(13);
    });
  });

  describe('addPlayer', () => {
    it('adds a new player', () => {
      spyOn(Players, 'addPlayer');
      Game.addPlayer(player);
      expect(Players.addPlayer).toHaveBeenCalledWith(player);
    });
  });

  describe('findPlayer', () => {
    it('finds the player', () => {
      spyOn(Players, 'find');
      Game.findPlayer(1);
      expect(Players.find).toHaveBeenCalledWith(1);
    });
  });

  describe('bet', function () {
    it('calls the right methods', function () {
      spyOn(Players, 'bet');
      spyOn(Game, 'revealCards');
      Game.bet([player, player]);
      expect(Players.bet).toHaveBeenCalledWith([player, player]);
      expect(Game.revealCards).toHaveBeenCalledWith(1);
    });
  });

  describe('giveCards', function () {
    it('calls the right methods', function () {
      Game.reset();
      spyOn(Players, 'giveCards');
      spyOn(Game, 'revealCards');
      Game.giveCards();
      expect(Players.giveCards).toHaveBeenCalled();
      expect(Game.revealCards).toHaveBeenCalledWith(3);
    });
  });
});
