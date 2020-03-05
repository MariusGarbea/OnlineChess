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

    // Set the inital state of the system
    this.state = {
      username: '',
      players: ["Marius", "Hunter", "Minh"],
      gameAccepted: false,
      game: null,
      socket: null,
      myturn: false
    }

    this.registerUsername();

  }

  handleSocketConnection() {
     // Connects app to sockets on the backend
    this.state.socket = io('http://localhost:3200');

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
        this.setState({gameAccepted: true})
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
      this.setState({gameAccepted: true})
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

    // For testing purposes and should probably be removed
    self.socket = this.state.socket;
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
              <Board app={this} socket={this.state.socket} game={this.state.game}/>
            </Route>
          </Switch>
        </div>
      </Router>
  )}

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
}
