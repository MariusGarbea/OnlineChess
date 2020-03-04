import React, { Component } from "react";
import "./app.css";
import Chess from "chess.js"; 

export default class Status extends Component { 
    constructor(props) {
        super(props);  
        this.state = {
            chess: props.chess_object, 
            status:  'Let\'s begin! Player 1 starts the Game', 
        }  
    }
 
    getCurrentMove(){
        let arr = [];
        let chess_game = this.state.chess;
        let history = this.state.chess.history();
        let curr_status = '';
        let check_or_stale = '';
        let check_stale = false;

        if(chess_game.in_check()){
            check_or_stale = 'Check!';
            check_stale = true;
        }
        if(chess_game.in_checkmate()){
            check_or_stale = 'In Checkmate!';
            check_stale = true;
        }
        if(chess_game.in_stalemate()){
            check_or_stale = 'In Stalemate!';
            check_stale = true;
        }

        if (history.length >= 1){
            if (((history.length-1) % 2) == 0){
                if(check_stale){
                    curr_status = <div class='column'>
                    <b>Player 1 </b> moved to {history[history.length - 1]}{status} 
                    <div className='notif'>Player 2 is in {check_or_stale}</div></div>
                }
                else {
                    curr_status = <div class='column'>
                    <b>Player 1 </b> moved to {history[history.length - 1]}{status} {check_or_stale}</div>;
                }
                this.state.status = '→ Awaiting Move from Player 2'; 
            } else {
                if(check_stale){
                    curr_status = <div class='column'>
                    <b>Player 2 </b> moved to {history[history.length - 1]}{status} 
                    <div className='notif'>Player 1 is in {check_or_stale}</div></div>
                }
                else {
                    curr_status = <div class='column'>
                    <b>Player 2 </b> moved to {history[history.length - 1]}{status} {check_or_stale}</div>;
                }
                this.state.status = '→ Awaiting Move from Player 1'; 
            }   
        }  
        arr.push(curr_status);
        return arr;
    }


  render() {
    let arr = this.getCurrentMove(); 
    console.log(this.state.chess);

    return (
    <div class="left">
        <div class='title'><b>GAME STATUS</b></div>
        <hr />
        <p class='green'><b>{this.state.status}</b></p>
        <div class='left_inner'>{arr.map(r => r)}</div>
      </div>);
  }



}