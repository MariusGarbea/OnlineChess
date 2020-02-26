import React, { Component } from "react";
import "./app.css";
import Piece from './Piece' 
import Square from './Square' 
import Chess from "chess.js";

export default class Board extends Component{
  constructor(props){
      super(props);
      this.state = {
          board: this.setInitBoardPieces()
          // , currentPlayer: Player
      }
  }
  /**
   * Creates Pieces for initial board
   * @return {list} board: 2d list with 32 pieces
   */
  setInitBoardPieces(){
    // lists for player1 pieces & player2 pieces
    let p1Pieces = [['r','n','b','k','q','b','n','r'],['p','p','p','p','p','p','p','p']];
    let p2Pieces = [['P','P','P','P','P','P','P','P'],['R','N','B','Q','K','B','N','R']];
    let board = [];

    // create piece with respective label and store into board
    for(let i = 0; i < 8; i++){
        let columns = [];
        for(let j = 0; j < 8; j++){
            if (i < 2) {
                columns[j] = <Piece label={p1Pieces[i][j]}></Piece>;
            }
            if (i > 5){
                columns[j] = <Piece label={p2Pieces[i-6][j]}></Piece>;
            }
        }
        board[i] = columns;
    }
    return board;
  }

  /**
   * Creates list of Squares
   */
  renderBoard(){
    let squares = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let square = <Square xPos={i} yPos={j} piece={this.state.board[i][j]}></Square>; 
            squares.push(square);
        }
    }
    return squares;
}

  render(){
      return (<div className="chessboard">{this.renderBoard()}</div>);
  }
}


// export default class Board extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chess: null, // a chess object
//       ascii: null, // ascii string representation of the game
//       board: null, // matrix representation of the game
//       gameStatus: "", // string message that output game status
//     };
//   }

//   /**
//    * Create an empty chessboard filled with empty squares.
//    * @param {number} numrows: number of rows for a matrix
//    * @param {numer} numcols: number of rows for a matrix
//    * @param {any} initial: default value to fill in the matrix
//    * @return {array} arr: a 8 x 8 matrix that represent the chess board
//    */
//   createEmptyMatrix(numrows, numcols, initial) {
//     var arr = [];
//     for (var i = 0; i < numrows; ++i) {
//       var columns = [];
//       for (var j = 0; j < numcols; ++j) {
//         columns[j] = initial;
//       }
//       arr[i] = columns;
//     }
//     return arr;
//   }

//   /**
//    * Converts a FEN notation to a 2D Board matrix
//    * @param {string} fen: the fen representation of chess
//    * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
//    */
//   initializeBoard(fen) {
//     // Take only the first part of the FEN representation
//     // E.g: rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR
//     let whitespace = fen.substr(0, fen.indexOf(" "));
//     let rows = whitespace.split("/").slice(0, 8);

//     // For each row of the FEN representation, parse empty spaces
//     // and convert them to 'X' to represent the empty space
//     rows.forEach((row, i) => {
//       let newRow = "";
//       for (let i = 0; i < row.length; i++) {
//         if (isNaN(row[i])) {
//           newRow += row[i];
//         } else {
//           let empty = "X".repeat(parseInt(row[i]));
//           newRow += empty;
//         }
//       }
//       rows[i] = newRow;
//     });

//     // For each row, return the board
//     rows.forEach((row, i) => {
//       row = [...row];
//       console.log(row);
//       row.forEach((col, j) => {
//         this.state.board[i][j] = col;
//       });
//     });
//   }

//   /** Generate JSX component of the board */
//   tableBoard() {
//     let string_to_unicode = {
//       'K': '♔', 'Q': '♕', 'R': '♖', 
//       'B': '♗', 'N': '♘', 'P': '♙', 
//       'k': '♚', 'q': '♛', 'r': '♜', 
//       'b': '♝', 'n': '♞', 'p': '♟'
//     }
//     let squares = [];
//     for (let i = 0; i < 8; i++) {
//       for (let j = 0; j < 8; j++) {
//         let piece = string_to_unicode[this.state.board[i][j]];
//         let square = "";
//         if (piece != 'X'){
//           if ((i+j) % 2 == 0){
//             square = <span class="black">{piece}</span>;
//           }
//           else{
//             square = <div class="white">{piece}</div>;
//           }
//         } else {
//           if ((i+j) % 2 == 0){
//             square = <div class="black"></div>;
//           }
//           else{
//             square = <div class="white"></div>;
//           }
//         }
//         squares.push(square);
//       }
//     }
//     return squares;
//   }

//   render() {
//     // Initialize a new chess game.
//     this.state.chess = new Chess();

//     // Parse the initial FEN representation.
//     this.state.board = this.createEmptyMatrix(8, 8, "X");
//     this.initializeBoard(this.state.chess.fen());
//     let squares = this.tableBoard();

//     // Read in the move here
//     return <div class="chessboard">{squares.map(square => square)}</div>;
//   }

//   /**
//    *
//    * @param {str} move: a string representation of a move (e.g 'e4')
//    * @param {str} ascii: the ascii representation of a game
//    */
//   validateMove(move, ascii) {
//     this.state.chess.move(move);
//     this.state.ascii = this.state.chess.ascii();
//     if (this.state.chess.in_threefold_repetition()) {
//       this.state.gameStatus = "Drawn due to threefold repetition";
//     } else if (this.state.chess.insufficient_material()) {
//       this.state.gameStatus = "Drawn due to insufficient material";
//     } else if (this.state.chess.game_over()) {
//       this.state.gameStatus = "Checkmate!";
//     } else if (ascii == this.state.ascii) {
//       this.state.gameStatus = "Invalid move!";
//     } else {
//       this.state.gameStatus = "Valid move!";
//       this.initializeBoard(this.state.chess.fen());
//     }
//   }
// }
