
import React, { Component } from "react";
export default class Square extends Component {
    constructor(props){
      super(props);
      this.state = {
        piece: this.props.piece
      }
    }

    activate(e){
        console.log('this is being clicked!!!', this.props.xPos, this.props.yPos); 
    }
  
    render() {
      // set color based on 
      const color = (this.props.xPos + this.props.yPos) % 2 == 0 ? 'black' : 'white';
  
      return(
        <div onClick={(e) => this.activate(e)} className={color}>{this.state.piece}</div>
      );
    }
  }