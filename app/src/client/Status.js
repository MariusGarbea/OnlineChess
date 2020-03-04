import React, { Component } from "react";
import "./app.css";
import Chess from "chess.js"; 

export default class Status extends Component { 
    constructor(props) {
        super(props);  
        this.state = {
            chess: props.chess_object, 
            status: 'Game begins', 
        }  
    }
 
    getHistory(){
        let arr = []; 
        let history = this.state.chess.history(); 
        for (var i = 0; i < history.length; i++){
            let row = ''; 
            if (i % 2 == 0){
                row = <div class='column'>{i}. 
                    <b>White </b> moves: {history[i]}{status}</div>
                this.state.status = '-> Awaiting for player 2 to move'; 
            } else {
                row = <div class='column'>{i}. <b>Black </b> moves: {history[i]}</div>    
                this.state.status = '-> Awaiting for player 1 to move'; 
            }
            arr.push(row); 
        }
        return arr; 
    }


  render() {
    let arr = this.getHistory(); 
    console.log(this.state.chess); 


    return (
    <div class="left">
        <div class='title'><b>HISTORY</b></div>
        <hr />
        <p class='green'><b>{this.state.status}</b></p>
        <div class='left_inner'>{arr.map(r => r)}</div>
      </div>);
  }



}