const chess = require('chess.js'); 

let chessObject = new chess.Chess(); 

function createEmptyMatrix(numrows, numcols, initial) {
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

function initializeBoard() {
    let board = createEmptyMatrix(8, 8, 0); 

    // Take only the first part of the FEN representation
    // E.g: rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR
    let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; 
    let whitespace = fen.substr(0, fen.indexOf(" "));
    let rows = whitespace.split("/").slice(0, 8);

    // For each row of the FEN representation, parse empty spaces
    // and convert them to 'X' to represent the empty space
    rows.forEach((row, i) => {
      let newRow = "";
      for (let i = 0; i < row.length; i++) {
        if (isNaN(row[i])) {
          newRow += row[i];
        } else {
          let empty = "X".repeat(parseInt(row[i]));
          newRow += empty;
        }
      }
      rows[i] = newRow;
    });

    // For each row, return the board
    rows.forEach((row, i) => {
      row = [...row];
      row.forEach((col, j) => {
        board[i][j] = col;
      });
    });
    return board; 
}



export { createEmptyMatrix, initializeBoard, chessObject}; 