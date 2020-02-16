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
    * @param {boolean} Whether or not the request was agreed upon
    */
   requestMatch(p1, p2) {
     // TODO:
     // - Prompt player 2
     // - Receive response of player
     // - Return whether or not this match will be initiated

     return false;
   }

   /**
    Accepts a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    * @param {boolean} Whether or not the request was agreed upon
    */
   acceptMatch(p1, p2) {
     // todo

     return true;
   }

   /**
    Rejects a match request between two players
    * @param {Player} p1: The first player
    * @param {Player} p2: The second player
    * @param {boolean} Whether or not the request was agreed upon
    */
   rejectMatch(p1, p2) {
     // todo
     return false;
   }
}

module.exports = {
  SystemManager: SystemManager
};
