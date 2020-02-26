import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';
import Game from './Game';

export default class App extends Component {

  constructor() {
    super();

    // self.socket = io('http://localhost:3200');
    // self.socket.on('connect', () => {
    //   console.log(`Connected. ID: ${self.socket.id}`);
    // });

    // // Example of registration of username
    // let name = prompt('Enter a username: ');
    // self.socket.emit('/register', {'name': name},
    //   function(resp) {
    //     if (resp) {
    //       alert('Name successfully registered!');
    //     } else {
    //       alert('Name registration failed :(');
    //     }
    //   }
    // );

    // // Example of getting list of players
    // self.socket.emit('/getPlayers', {}, function(resp) {
    //   console.log(resp);
    // });

  }

  render() {
    return (
      <div className="central">
         <Game/>
      </div>
     
    );
  }

}
