import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Chess from "chess.js";

export default class App extends Component {
  state = { 
    chess: null, 
    ascii: null, 
    gameStatus: 'Player move', 
    board: null, 
  };

  componentDidMount() {
    Array.matrix = function(numrows, numcols, initial){
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
    this.board = Array.matrix(8,8,'X'); 
    this.chess = new Chess(); 
    this.board = this.initializeBoard(this.chess.fen(), this.board); 

  }

  initializeBoard(fen, board){
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
    })    
    rows.forEach((row, i) => {
      row = [...row]; 
      row.forEach((col, j) => {
        board[i][j] = col; 
      })
    })
    return board; 
 }

  render() {
    /* Initialize a new game of chess here */ 
    // this.validateMove('f3', this.ascii); 
    return (
      <div>
        <p>Chess Board</p>
      </div>
    );
  }

  /** Function to validate move and update the board */
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
      console.log(boardStr); 
      this.gameStatus = 'Invalid move!'; 
    } else {
      this.gameStatus = 'Valid move!'; 
    }
  }


}
