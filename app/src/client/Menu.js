import React, { Component } from 'react';
import './menu.css';

export default class Menu extends Component {

// Invite player
  requestPlayer = playerID => {
    alert(`Sending invitation to ${playerID}`);
    this.props.socket.emit('requestMatch', {'playerName': playerID});
  }

  acceptRequest(playerID) {
    this.props.socket.emit('acceptMatch', {
      'p1': this.props.name,
      'p2': playerID
    });
  }

  registerUsername() {
    let name = document.getElementById('name').value;
    fetch(`/api/registerUsername?name=${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data == ''){
          alert('Please enter a name!');
        } else if (data['result']) {
          alert('Name successfully registered!');
          this.props.socket.emit('bind', {name: name});
        } else {
          alert('Name is already taken :( Try again');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let playerList = this.props.players.filter(p => p != this.props.name && this.props.name).map(p => <li key={p} onClick={() => this.requestPlayer(p)}>{p}</li>);
    let requestList = this.props.requests.filter(p => p != this.props.name && this.props.name).map(p => <li key={p} onClick={() => this.acceptRequest(p)}>{p}</li>);
    return (
      <div id="bck">
        <h2 id="title"> Online Chess </h2>
        <p> Welcome!</p>
        <p> Current Version of the Game : v1.0.1 (<a href="https://github.com/MariusGarbea/OnlineChess/blob/master/README.md">Changelog</a>) </p>
        <label>Name: </label>
        <input type="text" id="name" name="name" />
        <input type="submit" onClick={() => this.registerUsername()} />
        <p> {playerList.length == 0 ? "Nobody is available to play :(" : "Challenge a player from the following list"} </p>
        <ul>
          {playerList}
        </ul>
        <p>Requests:</p>
        <ul>
          {requestList}
        </ul>
      </div>
    )
  }

}
