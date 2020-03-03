import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();

    this.socket = io('http://localhost:3200');

    // What to do when this socket connects
    this.socket.on('connect', () => {
      if (this.username) {
        this.socket.emit('bind', {name: this.username});
      }
    });

    // What to do when this socket receives a play request
    this.socket.on('receiveRequest', (data) => {
      let res = confirm(`Player "${data.playerName}" would like to player a game!`);

      if (res) {
        self.socket.emit('acceptMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      } else {
        self.socket.emit('rejectMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      }
    });

    // Alerts the player that their match was rejected
    this.socket.on('rejected', (data) => {
      alert(`Player ${data.playerName} has rejected your game request :(`);
    });

    // Alerts the player that their match was accepted
    this.socket.on('accepted', (data) => {
      alert(`Player ${data.playerName} has accepted your game request!`);
    });

    this.username = null;
    this.registerUsername();

    // For testing purposes and should probably be removed
    self.socket = this.socket;
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
          this.username = name;
          this.socket.emit('bind', {name: this.username});
        } else {
          alert('Name is already taken :( Try again');
          this.registerUsername();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="central">
         <Board />
      </div>

    );
  }

}
