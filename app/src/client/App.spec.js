import { createEmptyMatrix } from './App.mock.js';

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
  // console.log(emptyBoard); 
  // console.log(createEmptyMatrix(8,8,0)); 
    expect(createEmptyMatrix(8,8,0)).toStrictEqual(emptyBoard);    
  });


  // it('Initial peace allotment', () => {

  // })
});
