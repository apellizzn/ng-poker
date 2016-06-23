'use strict';

describe('Service: Game', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Game;
  let Players;
  let Turn;
  const player = {
    id: 1,
    name: 'foo',
    fiches: '70'
  };

  beforeEach(inject( function(_Game_, _Players_, _Turn_) {
    Game = _Game_;
    Players = _Players_;
    Turn = _Turn_;
  }));

  describe('reset', () => {
    it('resets the game', () => {
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

  describe('placeBets', function () {
    it('calls the right methods', function () {
      spyOn(Turn, 'placeBets');
      spyOn(Game, 'revealCards');
      Game.placeBets();
      expect(Turn.placeBets).toHaveBeenCalled();
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
