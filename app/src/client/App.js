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

  componentDidMount() {
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

    // Example of getting list of players
    self.socket.emit('/getPlayers', {}, resp => {
      console.log(resp);
      this.setState({players: resp});
    });
    setTimeout(() => {
      this.setState({gameAccepted: true})
    }, 2000)
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
