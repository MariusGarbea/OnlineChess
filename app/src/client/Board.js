import React, { Component } from "react";
import "./app.css";
import Piece from "./Piece.js"
import Square from "./Square.js"


export default class Board extends Component{
  constructor(props){
      super(props);
      this.state = {
          board: this.setInitBoardPieces(),
          // bool checking 2 clicked squares for movement
          squareOneFound: false,
          squareTwoFound: false,
          // var to track square piece & position for movement
          fromSquarePiece: null,
          toSquarePiece: null,
          fromSquareXPos: 1,
          toSquareXPos: 1,
          fromSquareYPos: 1,
          toSquareYPos: 1
          // , currentPlayer: Player
      };
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
              if (i > 1 && i < 6){
                  columns[j] = null;
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
              let square = <Square 
                  onClick={() => this.saveSquare(i, j, this.state.board[i][j])}
                  xPos={i} yPos={j} piece={this.state.board[i][j]}></Square>; 
              squares.push(square);
          }
      }
      return squares;
  }

  // Registers square click and saves square location & piece on square
  saveSquare(i, j, myPiece){
      // if square 1 and sqaure 2 have not been found 
      if(!this.state.squareOneFound && !this.state.squareTwoFound){
          // save piece into moveSqaureOne and set square 1 found to true
          this.setState({
              fromSquarePiece: myPiece,
              fromSquareXPos: i,
              fromSquareYPos: j,
              squareOneFound: true
          }, function () {
              this.processMove();
          });
      }
      // if sqaure 1 has been found but square 2 has not been found
      if(this.state.squareOneFound && !this.state.squareTwoFound){
          // save piece into toSquarePiece
          this.setState({
              toSquarePiece: myPiece,
              toSquareXPos: i,
              toSquareYPos: j,
              squareTwoFound: true
          }, function () {
              this.processMove();
          });
      }
  }

  // Conducts move & changes board state if move is valid
  processMove(){
      // if two sqaures have been selected - reset squares
      if(this.state.squareOneFound && this.state.squareTwoFound){
          this.setState({
              squareOneFound: false,
              squareTwoFound: false
          });
      }
      // MOVE VALIDATION
      // if move is valid & if 2 different squares have been selected
      if( (this.state.squareOneFound && this.state.squareTwoFound) 
      && !((this.state.toSquareXPos == this.state.fromSquareXPos) 
          && (this.state.toSquareYPos == this.state.fromSquareYPos)) ){

          let copyValues = this.state.board.slice();
          // set to square = piece in from square
          copyValues[this.state.toSquareXPos][this.state.toSquareYPos] = null;
          copyValues[this.state.toSquareXPos][this.state.toSquareYPos] = 
              this.state.fromSquarePiece;
          console.log(copyValues);
          // set from square = null
          copyValues[this.state.fromSquareXPos][this.state.fromSquareYPos] = null;
          // save state for board
          this.setState({
              board: copyValues,
          });
      }
  }
  // TODO
  tryPromote(){

  }

  render(){
      return (<div className="chessboard">{this.renderBoard()}</div>);
  }
}