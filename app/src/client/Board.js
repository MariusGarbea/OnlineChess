import React, { Component } from 'react';
import './app.css';
import Chess from "chess.js";

export default class Board extends Component {
  state = { 
    chess: null, 
    ascii: null, 
    board: null, 
    gameStatus: '', 
  };
  
  createEmptyMatrix(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
  }

  initializeBoard(fen){
    let whitespace = fen.substr(0,fen.indexOf(' ')); 
    let rows = whitespace.split('/').slice(0,8); 

    // 4p3: convert FEN move to 4 empty space + pawn + 3 empty space 
    rows.forEach((row,i) => {
      let newRow = ''; 
      for (let i = 0; i < row.length; i++){
        if (isNaN(row[i])){
          newRow += row[i]; 
        } else {
          let empty = 'X'.repeat(parseInt(row[i])); 
          newRow += empty; 
        }
      }
       rows[i] = newRow; 
    });

    rows.forEach((row, i) => {
      row = [...row]; 
      console.log(row); 
      row.forEach((col, j) => {
        this.board[i][j] = col; 
      })
    })
    console.log(this.board); 
 }

  render() {
    this.chess = new Chess(); 
    this.board = this.createEmptyMatrix(8,8,'X'); 
    this.initializeBoard(this.chess.fen()); 
    this.validateMove('f3', this.ascii); 
    return (
      <div>
        <p>Chess Board</p>
      </div>
    );
  }

  validateMove(move, boardStr){
    this.chess.move(move); 
    this.ascii = this.chess.ascii(); 
    if (this.chess.in_threefold_repetition()){
      this.gameStatus = 'Drawn due to threefold repetition';  
    } else if (this.chess.insufficient_material()){
      this.gameStatus = 'Drawn due to insufficient material'; 
    } else if (this.chess.game_over()){
      this.gameStatus = 'Checkmate!'; 
    } else if (boardStr == this.ascii){
      this.gameStatus = 'Invalid move!'; 
    } else {
      this.gameStatus = 'Valid move!'; 
      this.initializeBoard(this.chess.fen()); 
    }
  }
}
