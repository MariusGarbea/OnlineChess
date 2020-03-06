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
    this.busyPlayers = new Set();
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
      if (this.matchTable[p] && !this.busyPlayers.has(p)) {
        this.busyPlayers.add(p);
      }
      return true;
    }
  }

  /**
   * Attempts to remove a player to the connected player set
   * @param {Player} p: The player to be removed
   * @return {boolean} true if successful, false if name not in our list
   */
  removePlayer(p) {

    if (this.busyPlayers.has(p)) {
      this.busyPlayers.delete(p);
    }

    if (this.connectedPlayers.has(p)) {
      this.connectedPlayers.delete(p);
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

     // Fail if p1 is busy
     if (this.busyPlayers.has(p1)) {
       return false;
     }

     // Fail if p2 is busy
     if (this.busyPlayers.has(p2)) {
       return false;
     }

     // Mark both players as busy
     this.busyPlayers.add(p1);
     this.busyPlayers.add(p2);

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

     // Return game board
     return this.gameTable[[p1,p2]];
   }

   /**
    Rejects a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    */
   rejectMatch(p1, p2) {
     if (this.busyPlayers.has(p1)) {
       this.busyPlayers.delete(p1);
     }

     if (this.busyPlayers.has(p2)) {
       this.busyPlayers.delete(p2);
     }
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
     if (this.gameTable[[p,p2]]) {;
       label = [p,p2];
     } else if (this.gameTable[[p2,p]]) {
       label = [p2,p];
     } else {
       return null;
     }

     let result = this.gameTable[label].game.move(m);
     if (result) {
       this.gameTable[label].status = moveStatus.OK;
       this.gameTable[label].fen = this.gameTable[label].game.fen();
       if (this.gameTable[label].current == 'w')
          this.gameTable[label].current = 'b';
       else
          this.gameTable[label].current = 'w';
     } else {
       this.gameTable[label].status = moveStatus.INFEASIBLE;
     }

     return this.gameTable[label];
   }
}

module.exports = {
  SystemManager: SystemManager,
  GameStates: gameStates,
  MoveStatus: moveStatus,
};
