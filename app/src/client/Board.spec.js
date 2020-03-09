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

  it('Pawn capture', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'd7', to: 'd5'}); 
    let thirdMove = chessObject.move({from: 'e4', to: 'd5'}); 
    expect(thirdMove).toBeTruthy(); 
  });

  it('Pawn capture', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'd7', to: 'd5'}); 
    let thirdMove = chessObject.move({from: 'e4', to: 'd5'}); 
    let expectedPawns_afterCapture = 7; 
    let actualPawns_afterCapture = (chessObject.fen().match(/p/g)).length;  
    expect(thirdMove).toBeTruthy(); 
    expect(expectedPawns_afterCapture).toStrictEqual(actualPawns_afterCapture); 
  });

  it('General capture', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'g7', to: 'g6'}); 
    let thirdMove = chessObject.move({from: 'd1', to: 'h5'}); 
    let fourthMove = chessObject.move({from: 'f7', to: 'f6'}); 
    let fifthMove = chessObject.move({from: 'h5', to: 'g6'}); 
    let expectedPawns_afterCapture = 7; 
    let actualPawns_afterCapture = (chessObject.fen().match(/p/g)).length;  
    expect(fifthMove).toBeTruthy(); 
    expect(expectedPawns_afterCapture).toStrictEqual(actualPawns_afterCapture); 
  });

  it('General capture', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'e2', to: 'e4'}); 
    let secondMove = chessObject.move({from: 'g7', to: 'g6'}); 
    let thirdMove = chessObject.move({from: 'd1', to: 'h5'}); 
    let fourthMove = chessObject.move({from: 'f7', to: 'f6'}); 
    let fifthMove = chessObject.move({from: 'h5', to: 'g6'}); 
    let expectedPawns_afterCapture = 7; 
    let actualPawns_afterCapture = (chessObject.fen().match(/p/g)).length;  
    expect(fifthMove).toBeTruthy(); 
    expect(expectedPawns_afterCapture).toStrictEqual(actualPawns_afterCapture); 
  });


  it('Checkmate', () => {
    chessObject.reset(); 
    let firstMove = chessObject.move({from: 'f2', to: 'f3'}); 
    let secondMove = chessObject.move({from: 'e7', to: 'e5'}); 
    let thirdMove = chessObject.move({from: 'g2', to: 'g4'}); 
    let fourthMove = chessObject.move({from: 'd8', to: 'h4'}); 
    expect(chessObject.in_checkmate()).toBe(true); 
  }); 

  it('Stalemate', () => {
    chessObject.reset(); 
    let moves = [
      'e3', 'a5', 'Qh5', 'Ra6', 'Qxa5', 'h5', 'Qxc7', 
      'Rah6', 'h4', 'f6', 'Qxd7', 'Kf7', 'Qxb7', 'Qd3', 
      'Qxb8', 'Qh7', 'Qxc8', 'Kg6', 'Qe6'];  

      moves.forEach(move => {
        chessObject.move(move); 
      }); 
    expect(chessObject.in_stalemate()).toBe(true); 
  });
}); 