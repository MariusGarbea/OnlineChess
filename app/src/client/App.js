import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import io from 'socket.io-client';

import './app.css';
import Board from './Board';
import Menu from './Menu';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      players: ["Marius", "Hunter", "Minh"],
      gameAccepted: false
    }

  }

  handleSocketConnection(){
     // Connects app to sockets on the backend 
    self.socket = io('http://localhost:3200');
    self.socket.on('connect', () => {
      console.log(`Connected. ID: ${self.socket.id}`);
    });
    // Example of registration of username
    let name = prompt('Enter a username: ');
    self.socket.emit('/register', {'name': name}, resp => {
        if (resp) {
          alert('Name successfully registered!');
        } else {
          alert('Name registration failed. Name already exists.');
        }
      }
    );
    this.setState({name});

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
    // let name = null;
    // while (name == null) {
    //   name = prompt('Enter a username: ');
    //   if (name != null) {
    //     self.socket.emit('/register', {'name': name},
    //       function(resp) {
    //         if (resp) {
    //           alert('Name successfully registered!');
    //           self.name = name;
    //         } else {
    //           alert('Name registration failed :(');
    //           // TODO: When name registration fails
    //           // we need to re-prompt the user
    //         }
    //       }
    //     );
    //   }
    // }

    // Example of getting list of players
    self.socket.emit('/getPlayers', {}, resp => {
      console.log(resp);
      this.setState({players: resp});
    });
    setTimeout(() => {
      this.setState({gameAccepted: true})
    }, 2000)

  }

  componentDidMount() {
    this.handleSocketConnection(); 
  }

  render() {

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {this.state.gameAccepted ?
                <Redirect to="/game" />:
                <Menu name={this.state.name} players={this.state.players} />
              }
            </Route>
            <Route path="/game">
              <Board />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}
