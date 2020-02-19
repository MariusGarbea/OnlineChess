const moveStatus = {
    OK: 0,
    BOUNDARY: 1,
    OCCUPIED: 2,
    INFEASIBLE: 3
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

     // TODO: Place code about requesting p2 here
     let resp = false;

     return resp;
   }

   /**
    Accepts a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    * @return {boolean} Whether or not the request was agreed upon
    */
   acceptMatch(p1, p2) {
     // todo

     return true;
   }

   /**
    Rejects a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    * @return {boolean} Whether or not the request was agreed upon
    */
   rejectMatch(p1, p2) {
     // todo
     return false;
   }

   /**
    Validates whether a move is possible
    * @param {Player} p: The player attempting to move
    * @param {Move} m: The move that is being attempted
    * @param {Piece} piece: The piece that is to be moved
    * @return {int}: Returns an int correponding to moveStatus code
    */
   validateMove(p, m, piece) {

     return moveStatus.INFEASIBLE;
   }

   /**
   Applies a move
   * @param {Player} p: The player attempting to move
   * @param {Move} m: The move that is being attempted
   * @param {Piece} piece: The piece that is to be moved
   * @return {int}: Returns an int correponding to gameStates code
    */
   makeMove(p, m, piece) {
     return gameStates.NORMAL;
   }
}

module.exports = {
  SystemManager: SystemManager,
  GameStates: gameStates,
  MoveStatus: moveStatus,
};
