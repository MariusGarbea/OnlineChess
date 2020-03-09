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
  it('Rejects matches correctly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('abc');
    s.addPlayer('bcd');
    s.rejectMatch('abc', 'bcd');
    s.addPlayer('efg');
    expect(s.requestMatch('abc', 'efg')).toStrictEqual(true);
  });
});
