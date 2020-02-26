import React, { Component } from "react";
export default class Piece extends Component{
    constructor(props){
        super(props);
        this.state = {
            unicodeLabel: 
            this.convertStringToUnicode(this.props.label)
        }
    }

    convertStringToUnicode(label){
        let string_to_unicode = {
            'K': '♔', 'Q': '♕', 'R': '♖', 
            'B': '♗', 'N': '♘', 'P': '♙', 
            'k': '♚', 'q': '♛', 'r': '♜', 
            'b': '♝', 'n': '♞', 'p': '♟'
          }
        return string_to_unicode[label];
    }

    render(){
        return this.state.unicodeLabel;
    }
}
