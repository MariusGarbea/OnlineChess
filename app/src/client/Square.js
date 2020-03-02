import React, { Component } from "react";
import "./app.css";

export default class Square extends Component {
  constructor(props){
    super(props);
  }

  render() {
    // set color based on square location
    const color = (this.props.xPos + this.props.yPos) % 2 == 0 ? 'black' : 'white';

    return(
      <div className={color} onClick={this.props.onClick}>{this.props.piece}</div>
    );
  }
}