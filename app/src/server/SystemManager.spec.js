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
  it('Validates pawn movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    expect(s.validateMove('abc', 'e4').status).toStrictEqual(0);
  });
  it('Validates pawn movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    expect(s.validateMove('abc', 'e3').status).toStrictEqual(0);
  });
  it('Validates rook movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'a4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'a1', to : 'a2'}).status).toStrictEqual(0);
  });
  it('Validates rook movement failure properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'a4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'a1', to : 'b1'}).status).toStrictEqual(1);
  });
  it('Validates bishop movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'e5');
    s.validateMove('abc', 'f4');
    s.validateMove('bcd', 'f5');
    expect(s.validateMove('abc', {from : 'f1', to : 'e2'}).status).toStrictEqual(0);
  });
  it('Validates bishop movement failure properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'e5');
    s.validateMove('abc', 'f4');
    s.validateMove('bcd', 'f5');
    expect(s.validateMove('abc', {from : 'f1', to : 'f2'}).status).toStrictEqual(1);
  });
  it('Validates knight movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    expect(s.validateMove('abc', {from : 'b1', to : 'c3'}).status).toStrictEqual(0);
  });
  it('Validates knight movement failure properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    expect(s.validateMove('abc', {from : 'b1', to : 'b3'}).status).toStrictEqual(1);
  });
  it('Validates king movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'e1', to : 'e2'}).status).toStrictEqual(0);
  });
  it('Validates king movement failure properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'e1', to : 'e4'}).status).toStrictEqual(1);
  });
  it('Validates queen movement properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'd4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'd1', to : 'd3'}).status).toStrictEqual(0);
  });
  it('Validates queen movement failure properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'd4');
    s.validateMove('bcd', 'e5');
    expect(s.validateMove('abc', {from : 'd1', to : 'd4'}).status).toStrictEqual(1);
  });
  it('Validates pawn capture properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'e4');
    s.validateMove('bcd', 'd5');
    expect(s.validateMove('abc', {from : 'e4', to : 'd5'}).status).toStrictEqual(0);
  });
  it('Validates general capture properly', () => {
    let s = new manager.SystemManager();
    s.addPlayer('bcd');
    s.addPlayer('abc');
    s.requestMatch('abc', 'bcd');
    s.acceptMatch('abc', 'bcd');
    s.validateMove('abc', 'f4');
    s.validateMove('bcd', 'd5');
    s.validateMove('abc', {from : 'f4', to : 'f5'});
    s.validateMove('bcd', 'a5');
    s.validateMove('abc', {from : 'f5', to : 'f6'});
    expect(s.validateMove('bcd', {from : 'g8', to : 'f6'}).status).toStrictEqual(0);
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
