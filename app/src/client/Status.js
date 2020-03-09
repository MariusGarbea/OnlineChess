import React, { Component } from "react";
import "./status.css";
import Chess from "chess.js";

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chess: props.chess_object,
            status: '',  // 'Let's begin! Player 1 starts the Game',
            history: [],
            game: null
        };
    }

  render() {
    const chess = this.props.chess_object;

    this.state.chess = chess;
    this.state.game = this.props.game;

    console.log(this.props.history)
    if (this.state.game) {
      this.state.status = `Awaiting Move from ${this.state.game[this.state.game.current]}`;
    }

    let chess_game = this.state.chess;
    let curr_status = '';
    let check_or_stale = '';
    let check_stale = false;
    if (this.state.chess && this.state.game) {
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
    }

    return (
      <div className="left">
        <div className='title'><b>GAME STATUS</b></div>
        <hr/>
        <p className='green'><b>{this.state.status}</b></p>
        <div className='left-inner'>
          {this.props.history.map((x, idx) => <div className='column' key={idx}><b>{x.player}</b> moved from {x.move.from} to {x.move.to}</div>)}
        </div>
        {check_stale ? <div className='notif'><b>{this.state.game[this.state.game.current]}</b> is in {check_or_stale}</div> : null}
      </div>
    );
  }
}
