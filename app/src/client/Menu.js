import React, { Component } from 'react';

export default class Menu extends Component {

  render() {
    return (
      <div>
        <h2> Online Chess </h2>
        <p> Welcome {this.props.name} </p>
        <p> Challenge a player from the following list </p>
        <ul>
          {this.props.players.filter(p => p != this.props.name).map(p => <li key={p}>{p}</li>)}
        </ul>
      </div>
    )
  }

}
