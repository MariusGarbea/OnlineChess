
import Chess from "chess.js";

// Initialize functions here 
let chess = new Chess(); 


export default function createEmptyMatrix(numrows, numcols, initial) {
  var arr = [];
  for (var i = 0; i < numrows; ++i) {
    var columns = [];
    for (var j = 0; j < numcols; ++j) {
      columns[j] = initial;
    }
    arr[i] = columns;
  }
  return arr;
}


export { createEmptyMatrix }; 