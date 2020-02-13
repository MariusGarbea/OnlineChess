import React, { Component } from "react";
import "./app.css";
import Chess from "chess.js";

export default class Board extends Component {
  state = {
    chess: null, // a chess object
    ascii: null, // ascii string representation of the game
    board: null, // matrix representation of the game
    gameStatus: "" // string message that output game status
  };

  /**
   * Create an empty chessboard filled with empty squares.
   * @param {number} numrows: number of rows for a matrix
   * @param {numer} numcols: number of rows for a matrix
   * @param {any} initial: default value to fill in the matrix
   * @return {array} arr: a 8 x 8 matrix that represent the chess board
   */
  createEmptyMatrix(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
      var columns = [];
      for (var j = 0; j < numcols; ++j) {
        columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
  }

  /**
   * Converts a FEN notation to a 2D Board matrix
   * @param {string} fen: the fen representation of chess
   * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
   */
  initializeBoard(fen) {
    // Take only the first part of the FEN representation
    // E.g: rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR
    let whitespace = fen.substr(0, fen.indexOf(" "));
    let rows = whitespace.split("/").slice(0, 8);

    // For each row of the FEN representation, parse empty spaces
    // and convert them to 'X' to represent the empty space
    rows.forEach((row, i) => {
      let newRow = "";
      for (let i = 0; i < row.length; i++) {
        if (isNaN(row[i])) {
          newRow += row[i];
        } else {
          let empty = "X".repeat(parseInt(row[i]));
          newRow += empty;
        }
      }
      rows[i] = newRow;
    });

    // For each row, return the board
    rows.forEach((row, i) => {
      row = [...row];
      console.log(row);
      row.forEach((col, j) => {
        this.board[i][j] = col;
      });
    });
  }

  /** Generate JSX component of the board */
  tableBoard() {
    let squares = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.board[i][j];
        let square = "";
        if (piece != "X") {
          square = <div class="black">{piece}</div>;
        } else {
          square = <div class="black"></div>;
        }
        squares.push(square);
      }
    }
    return squares;
  }

  render() {
    // Initialize a new chess game.
    this.chess = new Chess();

    // Parse the initial FEN representation.
    this.board = this.createEmptyMatrix(8, 8, "X");
    this.initializeBoard(this.chess.fen());
    let squares = this.tableBoard();

    // Read in the move here
    return <div class="chessboard">{squares.map(square => square)}</div>;
  }

  /**
   *
   * @param {str} move: a string representation of a move (e.g 'e4')
   * @param {str} ascii: the ascii representation of a game
   */
  validateMove(move, ascii) {
    this.chess.move(move);
    this.ascii = this.chess.ascii();
    if (this.chess.in_threefold_repetition()) {
      this.gameStatus = "Drawn due to threefold repetition";
    } else if (this.chess.insufficient_material()) {
      this.gameStatus = "Drawn due to insufficient material";
    } else if (this.chess.game_over()) {
      this.gameStatus = "Checkmate!";
    } else if (ascii == this.ascii) {
      this.gameStatus = "Invalid move!";
    } else {
      this.gameStatus = "Valid move!";
      this.initializeBoard(this.chess.fen());
    }
  }
}
