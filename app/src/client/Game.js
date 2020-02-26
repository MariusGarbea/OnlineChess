import React, { Component } from "react";
import Board from './Board'
import "./app.css"; 

export default class Game extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Board className="chessboard"></Board>
    );
  }
}

