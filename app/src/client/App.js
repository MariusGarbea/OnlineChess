import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Chess from "chess.js";

export default class App extends Component {
  state = { 
    chess: null, 
    ascii: null, 
    gameStatus: 'Player move', 
  };

  componentDidMount() {
  
  }

  render() {
    /* Initialize a new game of chess here */ 
    this.chess = new Chess(); 
    this.validateMove('f3', this.ascii); 
    this.fenParser(); 
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

  /** Parse FEN notation in chess */
  fenParser(){
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
    let board = Array.matrix(8,8,0);
    console.log(board); 

  }

  
}
