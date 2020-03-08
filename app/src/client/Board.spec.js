import { createEmptyMatrix, initializeBoard, chessObject } from './BoardMock.js';

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

  it('Rook movement (success)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'a2', to: 'a4'}); 
    let secondMove = chessObject.move({from: 'a7', to: 'a5'}); 
    let thirdMove = chessObject.move({from: 'a1', to: 'a3'}); 
    expect(thirdMove).toBeTruthy();
  }); 

  it('Rook movement (failure)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'b2', to: 'b4'}); 
    let secondMove = chessObject.move({from: 'a7', to: 'a5'}); 
    let thirdMove = chessObject.move({from: 'a1', to: 'b2'}); 
    expect(thirdMove).toBeNull();
  }); 

  it('Bishop movement (success)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'd2', to: 'd4'}); 
    let secondMove = chessObject.move({from: 'a7', to: 'a5'}); 
    let thirdMove = chessObject.move({from: 'c1', to: 'f4'}); 
    expect(thirdMove).toBeTruthy();
  }); 


  it('Knight movement (success)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'b1', to: 'c3'}); 
    expect(firstMove).toBeTruthy(); 
  }); 

  it('Knight movement (failure)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'b1', to: 'b3'}); 
    expect(firstMove).toBeNull(); 
  });  

  it('Queen movement (succes)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'd2', to: 'd4'}); 
    let secondMove = chessObject.move({from: 'a7', to: 'a5'}); 
    let thirdMove = chessObject.move({from: 'd1', to: 'd3'}); 
    expect(thirdMove).toBeTruthy(); 
  }); 

  it('Queen movement (success)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'd1', to: 'd4'}); 
    expect(firstMove).toBeNull(); 
  });

  it('King movement (succes)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'a7', to: 'a5'}); 
    let thirdMove = chessObject.move({from: 'e1', to: 'e2'}); 
    expect(thirdMove).toBeTruthy(); 
  }); 

  it('King movement (failure)', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e1', to: 'e2'}); 
    expect(firstMove).toBeNull(); 
  });

}); 