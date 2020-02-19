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
    self.socket.emit('/register', {name: 'test'},
      function(resp) {
        console.log(resp);
      }
    );
  }

  render() {
    return (
      <Board />
    );
  }

}
