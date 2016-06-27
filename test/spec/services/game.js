'use strict';

describe('Service: Game', function () {

  // load the service's module
  beforeEach(module('fcApp'));

  // instantiate service
  let Game;
  let Players;
  let Turn;
  let Hand;

  const notFound = { found: false, points: 0 };
  const player = {
    identifier: 1,
    cards: 1,
    name: 'foo',
    fiches: '70'
  };

  beforeEach(inject( function(_Game_, _Players_, _Turn_, _Hand_) {
    Game = _Game_;
    Players = _Players_;
    Turn = _Turn_;
    Hand = _Hand_;
  }));

  describe('reloadDeck', () => {
    it('resets the deck', () => {
      Game.reloadDeck();
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
    beforeEach(() => {
      Game.reloadDeck();
    });
    describe('when there still cards to reveal', () => {
      it('place bets, reveal one card and go to next turn', () => {
        spyOn(Turn, 'placeBets');
        spyOn(Game, 'revealCards');
        spyOn(Game, 'nextTurn');
        Game.placeBets();
        expect(Turn.placeBets).toHaveBeenCalled();
        expect(Game.revealCards).toHaveBeenCalledWith(1);
        expect(Game.nextTurn).toHaveBeenCalled();
      });
    });
    describe('when 5 cards are revealed', () => {
      it('place btes, compute winner, assign the prize and reset the game', () => {
        spyOn(Turn, 'placeBets');
        spyOn(Game, 'computeWinner').and.returnValue(player);
        spyOn(Turn, 'getTotalBet').and.returnValue(10);
        spyOn(Players, 'prize');
        spyOn(Game, 'reset');
        Game.revealCards(5);
        Game.placeBets();
        expect(Turn.placeBets).toHaveBeenCalled();
        expect(Game.computeWinner).toHaveBeenCalled();
        expect(Players.prize).toHaveBeenCalledWith(1, 10);
        expect(Game.reset).toHaveBeenCalled();
      });
    });
  });

  describe('reset', () => {
    it('reloads the deck ,  give cards and calls the next turn', () => {
      spyOn(Game, 'reloadDeck');
      spyOn(Game, 'giveCards');
      spyOn(Game, 'nextTurn');
      Game.reset();
      expect(Game.reloadDeck).toHaveBeenCalled();
      expect(Game.giveCards).toHaveBeenCalled();
      expect(Game.nextTurn).toHaveBeenCalled();
    });
  });
  describe('giveCards', function () {
    it('calls the right methods', function () {
      Game.reloadDeck();
      spyOn(Players, 'giveCards');
      spyOn(Game, 'revealCards');
      Game.giveCards();
      expect(Players.giveCards).toHaveBeenCalled();
      expect(Game.revealCards).toHaveBeenCalledWith(3);
    });
  });

  describe('computeWinner', function () {
    const playerMocks = [
      player,
      {
        identifier: 2,
        cards: 2
      }
    ];
    describe('when royalFlush against straightFlush', () => {
      it('returns royalFlush', function () {
        Game.reset();
        spyOn(Players, 'getPlayers').and.returnValue(playerMocks);
        spyOn(Hand, 'bestHandFor').and.callFake((c, p) => {
          if(p === 1) {
            return { royalFlush: { found: true, points: 100 } };
          } else {
            return { royalFlush: notFound, straightFlush: { found: true, points: 10 } };
          }
        });
        expect(Game.computeWinner().identifier).toEqual(player.identifier);
      });
    });
    describe('when straightFlush against straightFlush', () => {
      it('returns bigger one', function () {
        Game.reset();
        spyOn(Players, 'getPlayers').and.returnValue(playerMocks);
        spyOn(Hand, 'bestHandFor').and.callFake((c, p) => {
          if(p === 1) {
            return { royalFlush: notFound, straightFlush: { found: true, points: 20 }};
          } else {
            return { royalFlush: notFound, straightFlush: { found: true, points: 10 } };
          }
        });
        expect(Game.computeWinner().identifier).toEqual(player.identifier);
      });
    });
  });
});
