import React, { Component } from "react";
import "./app.css";
import Chess from "chess.js";
import Status from './Status';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.createEmptyMatrix(8, 8, "X"),
      myturn: false,
      history: [],
      socket: props.socket,
      game: props.game
    };
  }

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
      row.forEach((col, j) => {
        this.state.board[i][j] = col;
      });
    });
  }

  /**
   * This function allows move a piece from one square to another
   * @param {string} piece: name of the piece that moves
   * @param {*} i the row number
   * @param {*} j the column number
   */
  getMove(piece, i, j) {
    if (this.state.myturn) {
      let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      let row = ['8', '7', '6', '5', '4', '3', '2', '1'];
      let move = col[j] + row[i];
      this.state.history.push(move);
      if (this.state.history.length == 2) {
        let move1 = this.state.history[0];
        let move2 = this.state.history[1];
        this.state.socket.emit('move', {from: move1, to: move2});
        this.setState({
          history: []
        });
      }
    }
  }

  /** Generate JSX component of the board */
  tableBoard() {
    let string_to_unicode = {
      'K': '♔', 'Q': '♕', 'R': '♖',
      'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜',
      'b': '♝', 'n': '♞', 'p': '♟'
    };
    let squares = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.state.board[i][j];
        let img = string_to_unicode[piece];
        let square = "";
        if (piece != 'X'){
          if ((i+j) % 2 == 0){
            square = <span onClick={(e) => this.getMove(piece, i, j)} class="black">{img}</span>;
          }
          else{
            square = <div onClick={(e) => this.getMove(piece, i, j)} class="white">{img}</div>;
          }
        } else {
          if ((i+j) % 2 == 0){
            square = <div onClick={(e) => this.getMove('', i, j)} class="black"></div>;
          }
          else{
            square =  <div onClick={(e) => this.getMove('', i, j)} class="white"></div>;
          }
        }
        squares.push(square);
      }
    }
    return squares;
  }

  render() {
    const app = this.props.app;

    if (app.state.game) {
      this.initializeBoard(app.state.game.fen);
      this.state.myturn = app.state.myturn;
    }

    this.state.squares = this.tableBoard();
    return (
      <div>
        <div>
        <Status chess_object={this.state.chess}/>
        </div>
        <div class="chessboard">
          {this.state.squares.map(square => square)}
        </div>
      </div>
    );
  }


}
