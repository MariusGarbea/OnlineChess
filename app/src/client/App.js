import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();

    // Set the inital state of the system
    this.state = {
      socket: io('http://localhost:3200'),
      username: null,
      game: null,
      myturn: false
    }

    // What to do when this socket connects
    this.state.socket.on('connect', () => {
      if (this.state.username) {
        this.state.socket.emit('bind', {name: this.state.username});
      }
    });

    // What to do when this socket receives a play request
    this.state.socket.on('receiveRequest', (data) => {
      let res = confirm(`Player "${data.playerName}" would like to player a game!`);

      if (res) {
        this.state.socket.emit('acceptMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      } else {
        this.state.socket.emit('rejectMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      }
    });

    // Alerts the player that their match was rejected
    this.state.socket.on('rejected', (data) => {
      alert(`Player ${data.playerName} has rejected your game request :(`);
    });

    // Alerts the player that their match was accepted
    this.state.socket.on('accepted', (data) => {
      alert(`Player ${data.playerName} has accepted your game request!`);
    });

    // Receives game updates
    this.state.socket.on('update', (data) => {
      let w = data.w;
      let b = data.b;
      let me = w == this.state.username ? 'w' : 'b';
      this.setState({
        myturn: me == data.current,
        game: data
      });
    });

    this.registerUsername();

    // For testing purposes and should probably be removed
    self.socket = this.state.socket;
  }

  /**
  Function to force a user to register their username
  */
  registerUsername() {
    let name = prompt('Enter a username: ');
    fetch(`/api/registerUsername?name=${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data['result']) {
          alert('Name successfully registered!');
          this.setState({
            username: name
          });
          this.state.socket.emit('bind', {name: this.state.username});
        } else {
          alert('Name is already taken :( Try again');
          this.registerUsername();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myTurn() {
    if (this.state.myturn) {
        return <p>It's your turn!</p>;
    }
    return <p>Waiting on opponent...</p>;
  }

  render() {
    return (
      <div className="central">
        <h2>Welcome {this.state.username}!</h2>
        {this.myTurn()}
        <Board app={this} />
      </div>
    );
  }

}
