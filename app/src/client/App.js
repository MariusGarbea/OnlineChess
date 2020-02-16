import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();

    self.socket = io('/socket');
  }

  render() {
    return (
      <Board />
    );
  }

}
