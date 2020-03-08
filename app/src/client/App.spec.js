import { createEmptyMatrix, initializeBoard } from './App.mock.js';

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
    
  })
});
