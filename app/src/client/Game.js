import React, { Component } from "react";
import "./app.css";
import Board from "./Board.js"

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