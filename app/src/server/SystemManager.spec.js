const manager = require('./SystemManager');

describe('systemManager functionality', () => {

  it('Adds a player into the list of the players', () => {
    let s = new manager.SystemManager();
    s.addPlayer("abc");
    expect(s.getPlayers()).toStrictEqual(['abc']);
  });

  it('Removes a player from the list of the players', () => {
    let s = new manager.SystemManager();
    s.addPlayer("abc");
    s.removePlayer("abc");
    expect(s.getPlayers()).toStrictEqual([]);
  });

  it('Doesnt add the same player twice', () => {
    let s = new manager.SystemManager();
    s.addPlayer("abc");
    expect(s.addPlayer("abc")).toStrictEqual(false);
  });

  it('Cannot remove a non-existant player', () => {
    let s = new manager.SystemManager();
    expect(s.removePlayer("abc")).toStrictEqual(false);
  });

  it('Returns the list of players', () => {
    let s = new manager.SystemManager();
    s.addPlayer('abc');
    s.addPlayer('bcd');
    expect(s.getPlayers()).toStrictEqual(['abc', 'bcd']);
  });
});


describe('systemManager team matching & play functionality', () => {
  it('Matches players correctly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('abc');
    s.addPlayer('bcd');
    expect(s.requestMatch('abc', 'bcd')).toStrictEqual(true);
  });
  it('Rejects matches if player 1 does not exist', () => {
    let s = new manager.SystemManager();
    s.addPlayer('abc');
    expect(s.requestMatch('abc', 'bcd')).toStrictEqual(false);
  });
  it('Rejects matches if player 1 does not exist', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    expect(s.requestMatch('abc', 'bcd')).toStrictEqual(false);
  });
  it('Rejects matches if player 1 is in a match', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.addPlayer('efg');
    expect(s.requestMatch('abc', 'efg')).toStrictEqual(false);
  });
  it('Rejects matches if player 2 is in a match', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.addPlayer('efg');
    s.validateMove('abc', 'e4');
    expect(s.requestMatch('efg', 'abc')).toStrictEqual(false);
  });
  it('Validates move properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    expect(s.validateMove('abc', 'e4').status).toStrictEqual(0);
  });
  it('Invalidates move properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', 'e4').status).toStrictEqual(1);
  });
  it('Rejects matches correctly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('abc');
    s.addPlayer('bcd');
    s.rejectMatch('abc', 'bcd');
    s.addPlayer('efg');
    expect(s.requestMatch('abc', 'efg')).toStrictEqual(true);
  });
});
