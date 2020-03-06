import React, { Component } from "react";
import "./app.css";
import Chess from "chess.js";

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chess: props.chess_object,
            status: '',  // 'Let\'s begin! Player 1 starts the Game',
            history: [],
            game: null
        };
    }

    getCurrentMove() {
      if (this.state.chess && this.state.game) {
        let arr = [];
        let chess_game = this.state.chess;
        let history = this.state.history; // this.state.chess.history();
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

        if (history.length > 0) {
          if(check_stale){
              curr_status = <div class='column'>
              <b>{this.state.game[this.state.game.current]} </b> moved to {history[history.length - 1]}{status}
              <div className='notif'>{this.state.game[this.state.game.current]} is in {check_or_stale}</div></div>;
          }
          else {
              curr_status = <div class='column'>
              <b>{this.state.game[this.state.game.current]} </b> moved to {history[history.length - 1]}{status} {check_or_stale}</div>;
          }
        }


        /*

        if (history.length >= 1){
            if (((history.length-1) % 2) == 0){
                if(check_stale){
                    curr_status = <div class='column'>
                    <b>{this.state.game.w}</b> moved to {history[history.length - 1]}{status}
                    <div className='notif'>{this.state.game.b} is in {check_or_stale}</div></div>;
                }
                else {
                    curr_status = <div class='column'>
                    <b>{this.state.game.w} </b> moved to {history[history.length - 1]}{status} {check_or_stale}</div>;
                }
                this.state.status = `→ Awaiting Move from ${this.state.game.b}`;
            } else {
                if(check_stale){
                    curr_status = <div class='column'>
                    <b>{this.state.game.b} </b> moved to {history[history.length - 1]}{status}
                    <div className='notif'>{this.state.game.w} is in {check_or_stale}</div></div>;
                }
                else {
                    curr_status = <div class='column'>
                    <b>{this.state.game.b} </b> moved to {history[history.length - 1]}{status} {check_or_stale}</div>;
                }
                this.state.status = `→ Awaiting Move from ${this.state.game.w}`;
            }
        }*/

        arr.push(curr_status);
        return arr;
      }
      return [];
    }


  render() {
    const chess = this.props.chess_object;

    let arr = this.getCurrentMove();

    this.state.chess = chess;
    this.state.history = this.props.history;
    this.state.game = this.props.game;

    if (this.state.game) {
      this.state.status = `→ Awaiting Move from ${this.state.game[this.state.game.current]}`;
    }

    return (
    <div class="left">
        <div class='title'><b>GAME STATUS</b></div>
        <hr />
        <p class='green'><b>{this.state.status}</b></p>
        <div class='left_inner'>{arr.map(r => r)}</div>
      </div>);
  }



}
