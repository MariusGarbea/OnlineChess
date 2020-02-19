import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();

    self.socket = io('http://localhost:3200');
    self.socket.on('connect', () => {
      console.log(`Connected. ID: ${self.socket.id}`);
    });

    let name = prompt('Enter a username: ');
    self.socket.emit('/register', {'name': name},
      function(resp) {
        if (resp) {
          alert('Name successfully registered!');
        } else {
          alert('Name registration failed :(');
        }
      }
    );
  }

  render() {
    return (
      <Board />
    );
  }

}
