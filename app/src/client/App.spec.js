import { createEmptyMatrix, initializeBoard, chessObject } from './App.mock.js';

describe('Board.js Test Suite', () => {
  it('Board Layout Size', () => {
    let emptyBoard = [ 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
  ]; 
    expect(createEmptyMatrix(8,8,0)).toStrictEqual(emptyBoard);    
  });


  it('Initial peace allotment', () => {
     let board = initializeBoard(); 
     let black_pieces = [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']; 
     let black_pawn =  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']; 
     let white_pieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];  
     let white_pawn =  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']; 
     expect(board[0]).toStrictEqual(black_pieces);    
     expect(board[1]).toStrictEqual(black_pawn);    
     expect(board[6]).toStrictEqual(white_pawn);    
     expect(board[7]).toStrictEqual(white_pieces);    
  }); 

  it('Pawn movement (success)', () => {
    chessObject.reset(); 
    let actualMove = chessObject.move({from: 'e2', to: 'e3'}); 
    expect(actualMove).toBeTruthy();
  }); 

  it('Pawn movement (failure)', () => {
    chessObject.reset(); 
    let actualMove = chessObject.move({from: 'e2', to: 'e7'}); 
    expect(actualMove).toBeNull();
  })

  it('Pawn movement (failure)', () => {
    chessObject.reset(); 
    let actualMove = chessObject.move({from: 'e2', to: 'e7'}); 
    expect(actualMove).toBeNull();
  }); 

  it('Double pawn movement (success)', () => {
    chessObject.reset(); 
    let actualMove = chessObject.move({from: 'e2', to: 'e4'}); 
    expect(actualMove).toBeTruthy();
  }); 

  it('Double pawn movement (failure)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'e4', to: 'e6'}); 
    expect(secondMove).toBeNull();
  }); 

}); 