
import React, { Component } from "react";
export default class Square extends Component {
    constructor(props){
      super(props);
      this.state = {
        piece: this.props.piece, 
        activeColor: this.props.activeColor, 
        unactiveColor: '', 
      }
    }

    render() {

      // Set square color based on black or white 
      this.unactiveColor = (this.props.xPos + this.props.yPos) % 2 == 0 ? 'black' : 'white';
      const classes = `${this.unactiveColor}` 
  
      return(
        <div 
            // onClick={(e) => this.activate(e)} 
            // style={{backgroundColor:this.state.activeColor}} 
            className={classes}>
                {this.state.piece}
        </div>
      );
    }
  }