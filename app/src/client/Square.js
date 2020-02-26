
import React, { Component } from "react";
export default class Square extends Component {
    constructor(props){
      super(props);
      this.state = {
        piece: this.props.piece
      }
    }
  
    render() {
      // set color based on square location
      const color = (this.props.xPos + this.props.yPos) % 2 == 0 ? 'black' : 'white';
  
      return(
        <div className={color}>{this.state.piece}</div>
      );
    }
  }