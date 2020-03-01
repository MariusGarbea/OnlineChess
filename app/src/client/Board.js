import React, { Component } from "react";
import "./app.css";
import Piece from "./Piece";
import Square from "./Square";
import Chess from "chess.js";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.setInitBoardPieces(),  
      // , currentPlayer: Player, 
    };
  }
  
  /**
   * Creates Pieces for initial board
   * @return {list} board: 2d list with 32 pieces
   */
  setInitBoardPieces() {
    let p1Pieces = [
      ["r", "n", "b", "k", "q", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"]
    ];
    let p2Pieces = [
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];
    let board = [];

    // create piece with respective label and store into board
    for (let i = 0; i < 8; i++) {
      let columns = [];
      for (let j = 0; j < 8; j++) {
        if (i < 2) {
          columns[j] = <Piece label={p1Pieces[i][j]}></Piece>;
        }
        if (i > 5) {
          columns[j] = <Piece label={p2Pieces[i - 6][j]}></Piece>;
        }
      }
      board[i] = columns;
    }
    return board;
  }

  activate(e, i, j){
    console.log(e,i,j);
  }

  /**
   * Creates list of Squares
   */
  renderBoard() {
    let squares = []; 
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let square = (
          <div onClick={(e) => this.activate(e, i, j)}>
          <Square key={i + ',' + j}
            xPos={i} 
            yPos={j} 
            activeColor={null} 
            piece={this.state.board[i][j]}>
          </Square></div> 
        );
        squares.push(square);

      }
    }
    return squares; 
  }

  render() {
    return <div className="chessboard">{this.renderBoard()}</div>;
  }
}

