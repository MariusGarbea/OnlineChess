import React, { Component } from "react";
import "./app.css";

export default class Game extends Component {
  constructor(props){
    super(props);
  }

  start(){
    // TODO
  }

  processMove(){
    // TODO
  }

  declareWinner(){
    // TODO
  }

  end(){
    // TODO
  }
  render(){
    return(
      <Board className="chessboard"></Board>
    );
  }
}

class Board extends Component{
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

class Square extends Component {
  constructor(props){
    super(props);
    this.state = {
      piece: this.props.piece
    }
  }

  render() {
    // set color based on square location
    const color = (this.props.xPos + this.props.yPos) % 2 == 0 ? 'black' : 'white';

    return(
      <div className={color}>{this.state.piece}</div>
    );
  }
}

class Piece extends Component{
    constructor(props){
        super(props);
        this.state = {
            unicodeLabel: 
            this.convertStringToUnicode(this.props.label)
        }
    }

    convertStringToUnicode(label){
        let string_to_unicode = {
            'K': '♔', 'Q': '♕', 'R': '♖', 
            'B': '♗', 'N': '♘', 'P': '♙', 
            'k': '♚', 'q': '♛', 'r': '♜', 
            'b': '♝', 'n': '♞', 'p': '♟'
          }
        return string_to_unicode[label];
    }

    render(){
        return this.state.unicodeLabel;
    }
}

// TODO
// class Move extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       fromSquare = Square,
//       toSquare = Square
//     }
//   }
// }



