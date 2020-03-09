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
      players: [],
      gameAccepted: false,
      game: null,
      socket: io('http://localhost:3200'),
      myturn: false,
      history: [],
      requests: []
    };
  }

  handleSocketConnection() {
    // What to do when this socket connects
    this.state.socket.on('connect', () => {
      if (this.state.username) {
        this.state.socket.emit('bind', {name: this.state.username});
      }
    });

    // What to do when this socket receives a play request
    this.state.socket.on('receiveRequest', (data) => {
      let rs = this.state.requests;
      rs.push(data.playerName);
      this.setState({
        requests: rs
      });
    });

    // Alerts the player that their match was rejected
    this.state.socket.on('rejected', (data) => {
      alert(`Player ${data.playerName} has rejected your game request :(`);
    });

    // Alerts the player that their match was accepted
    this.state.socket.on('accepted', (data) => {
      alert(`Player ${data.playerName} has accepted your game request!`);
      this.setState({gameAccepted: true});
    });

    // Receives game updates
    this.state.socket.on('update', (data) => {
      this.setState({gameAccepted: true});
      let w = data.result.w;
      let b = data.result.b;
      let me = w == this.state.username ? 'w' : 'b';
      this.setState({
        myturn: me == data.result.current,
        game: data.result,
      });
      if (data.move) {
        this.setState({
          history: this.state.history.concat({'player': data.player, 'move': data.move})
        });
      }
    });

    this.state.socket.on('updateName', (data) => {
      this.setState({
        username: data.name
      });
    });

    this.state.socket.on('playerList', (data) => {
      this.setState({
        players: data.players
      });
    });
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
                <Menu name={this.state.username} players={this.state.players} socket={this.state.socket} requests={this.state.requests}/>
              }
            </Route>
            <Route path="/game">
              <Board app={this} socket={this.state.socket} game={this.state.game} username={this.state.username} gameHistory={this.state.history}/>
            </Route>
          </Switch>
        </div>
      </Router>
  );}
}
