import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Chess from "chess.js";

export default class App extends Component {
  state = { 
    username: null, 
    chess: null, 
  };

  componentDidMount() {
  
  }

  render() {
    /* Initialize a new game of chess here */ 
    this.chess = new Chess(); 
    return (
      <div>
        <p>Hello World!</p>
        
      </div>
    );
  }


  makeMove(move){
    this.chess.move(move); 
  }
}
