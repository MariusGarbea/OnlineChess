const chess = require('chess.js');

const moveStatus = {
    OK: 0,
    INFEASIBLE: 1,
    NOTPAIRED: 2
};

const gameStates = {
  NORMAL: 0,
  CHECK: 1,
  CHECKMATE: 2,
  STALEMATE: 3
};


class SystemManager {

  constructor() {
    this.connectedPlayers = new Set();
    this.matchTable = {};
    this.gameTable = {};
  }

  /**
   * Attempts to add a player to the connected player set
   * @param {Player} p: The player to be added
   * @return {boolean} true if successful, false if name exists
   */
  addPlayer(p) {
    if (this.connectedPlayers.has(p)) {
      return false;
    } else {
      this.connectedPlayers.add(p);
      return true;
    }
  }

  /**
   * Attempts to remove a player to the connected player set
   * @param {Player} p: The player to be removed
   * @return {boolean} true if successful, false if name not in our list
   */
  removePlayer(p) {
    if (this.connectedPlayers.has(p)) {
      this.connectedPlayers.delete(p);
      delete this.gameTable[[p, this.matchTable[p]]];
      delete this.gameTable[[this.matchTable[p], p]];
      delete this.matchTable[p];
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the connected player set as an array
   * @return {Array} the list of connected players
   */
   getPlayers() {
     return [...this.connectedPlayers];
   }

   /**
    Initiates a match request between two players
    * @param {Player} p1: The first player (assumed to be initiating request)
    * @param {Player} p2: The second player
    * @return {boolean} Whether or not the request was agreed upon
    */
   requestMatch(p1, p2) {
     // Fail if p1 is not still connected
     if (!this.connectedPlayers.has(p1)) {
       return false;
     }

     // Fail if p2 is not still connected
     if (!this.connectedPlayers.has(p2)) {
       return false;
     }

     // Fail if p1 is already in a match
     if (p1 in this.matchTable) {
       return false;
     }

     // Fail if p2 is already in a match
     if (p2 in this.matchTable) {
       return false;
     }

     return true;
   }

   /**
    Accepts a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    * @return {boolean} Whether or not the request was agreed upon
    */
   acceptMatch(p1, p2) {
     // Match p1 to p2
     this.matchTable[p1] = p2;

     // Match p2 to p1
     this.matchTable[p2] = p1;

     // Initialize chess game
     this.gameTable[[p1,p2]] = {
       w: p2,
       b: p1,
       current: 'w',
       game: new chess.Chess(),
       status: null
     };
     this.gameTable[[p1,p2]].fen = this.gameTable[[p1,p2]].game.fen();
     this.gameTable[[p1,p2]].history = this.gameTable[[p1,p2]].game.history();

     // Return game board
     return this.gameTable[[p1,p2]];
   }

   /**
    Rejects a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    */
   rejectMatch(p1, p2) {

   }


   /**
    * Do pawn promotion here
    * @param {Move} m: The move that is being attempted
    */
   handlePromotion(game, m){
    let fen = game.fen(); 
    let whitespace = fen.substr(0, fen.indexOf(" "));
    let rest_of_fen = fen.substr(fen.indexOf(" "), fen.length-1); 
    let rows = whitespace.split("/").slice(0, 8); 
    let index = (m['color'] == 'w') ? 1 : 6; 

    // Parse string to array here to remove the pawn 
    let old_row = rows[index]; 
    let old_row_str = ""; 
    for (let i = 0; i < old_row.length; i++) {
      if (isNaN(old_row[i])) {
        old_row_str+= old_row[i];
      } else {
        let empty = "X".repeat(parseInt(old_row[i]));
        old_row_str += empty;
      }
    } 
    let k = parseInt(m['column']); 
    let new_row = old_row_str.substring(0, k) + 'X' + old_row_str.substring(k + 1); 

    // Reconvert array to FEN string notation 
    let count = 0; 
    let new_row_string = ""; 
    for (let i = 0; i < new_row.length; i++){
      if (new_row[i] == 'X'){
        count +=1; 
      } else {
        if (count > 0){
          new_row_string += count.toString(); 
        }
        count = 0; 
        new_row_string += new_row[i]; 
      }
    }
    
    rows[index] = new_row_string; 
    fen = rows.join("/") + rest_of_fen; 
    return fen; 
   }

   /**
    Validates whether a move is possible
    * @param {Player} p: The player attempting to move
    * @param {Move} m: The move that is being attempted
    * @return {int}: Returns an int correponding to moveStatus code
    */
   validateMove(p, m) {
     let p2 = this.matchTable[p];
     let label = null;
     if (this.gameTable[[p,p2]]) {
       label = [p,p2];
     } else if (this.gameTable[[p2,p]]) {
       label = [p2,p];
     } else {
       return null;
     }

     let result = "";
     let fen = ""; 
     if (m['color'] == 'w' || m['color'] == 'b'){
      result = this.gameTable[label].game.put({ type: 'q', color: m['color']}, m['to']);  
      fen = this.handlePromotion(this.gameTable[label].game, m); 
    } else {
       result = this.gameTable[label].game.move(m);
       fen =  this.gameTable[label].game.fen(); 
     }
    
     // If pawn promotion is valid or a move is valid, update the game 
     if (result) {
        this.gameTable[label].status = moveStatus.OK;
        if (this.gameTable[label].current == 'w')
          this.gameTable[label].current = 'b';
        else
          this.gameTable[label].current = 'w';
      } else {
        this.gameTable[label].status = moveStatus.INFEASIBLE;
      }
      this.gameTable[label].fen = fen;
      this.gameTable[label].history = this.gameTable[label].game.history(); 
    
    //  if (result) {
    //    this.gameTable[label].status = moveStatus.OK;
    //    this.gameTable[label].fen = fen;
    //    this.gameTable[label].history = this.gameTable[label].game.history();
    //    if (this.gameTable[label].current == 'w')
    //       this.gameTable[label].current = 'b';
    //    else
    //       this.gameTable[label].current = 'w';
    //  } else {
    //    this.gameTable[label].status = moveStatus.INFEASIBLE;
    //  }
     return this.gameTable[label];
   }
}

module.exports = {
  SystemManager: SystemManager,
  GameStates: gameStates,
  MoveStatus: moveStatus,
};
