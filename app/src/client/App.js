import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();

    this.username = null;
    this.registerUsername();

    /*
    // Connects app to sockets on the backend
    self.socket = io('http://localhost:3200');
    self.socket.on('connect', () => {
      console.log(`Connected. ID: ${self.socket.id}`);
    });

    // Handler for getting a game request
    self.socket.on('receiveRequest', (data) => {
      let res = confirm(`Player "${data.playerName}" would like to player a game!`);

      if (res) {
        self.socket.emit('/acceptMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      } else {
        self.socket.emit('/rejectMatch', {
          'p1': self.name,
          'p2': data.playerName
        });
      }
    });

    self.socket.on('rejected', (data) => {
      alert(`Player ${data.playerName} has rejected your game request :(`);
    });

    self.socket.on('accepted', (data) => {
      alert(`Player ${data.playerName} has accepted your game request!`);
    });

    self.socket.on('update', (data) => {
      console.log(data.fen);
    });

    // Example of registration of username
    let name = null;
    while (name == null) {
      name = prompt('Enter a username: ');
      if (name != null) {
        self.socket.emit('/register', {'name': name},
          function(resp) {
            if (resp) {
              alert('Name successfully registered!');
              self.name = name;
            } else {
              alert('Name registration failed :(');
              // TODO: When name registration fails
              // we need to re-prompt the user
            }
          }
        );
      }
    }

    // Example of getting list of players
    self.socket.emit('/getPlayers', {}, function(resp) {
      console.log(resp);
    });*/
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
        } else {
          alert('Name is already taken :( Try again');
          this.registerUsername();
        }
      })
      .catch((err) => {
        console.log('ERROR');
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
