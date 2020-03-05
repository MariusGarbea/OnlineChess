import React, { Component } from 'react';
import './menu.css';

export default class Menu extends Component {

// Invite player
  requestPlayer = playerID => {
    alert(`Sending invitation to ${playerID}`);
    this.props.socket.emit('requestMatch', {'playerName': playerID});
  }

  render() {
    let playerList = this.props.players.filter(p => p != this.props.name).map(p => <li key={p} onClick={() => this.requestPlayer(p)}>{p}</li>);
    return (
      <div id="bck">
        <h2 id="title"> Online Chess </h2>
        <p> Welcome {this.props.name}! </p>
        <p> {playerList.length == 0 ? "Nobody is available to play :(" : "Challenge a player from the following list"} </p>
        <ul>
          {playerList}
        </ul>
      </div>
    )
  }

}
