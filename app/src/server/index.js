// initialize needed packages
const express = require('express');
const http = require('http');
const server = http.createServer(express);
const io = require('socket.io')(server);
const manager = require('./SystemManager');

// Setup system manager
let systemManager = new manager.SystemManager();

// create app
const app = express();
app.use(express.static('dist'));

// Handle for registering a username
app.get('/api/registerUsername', (req, res) => {
  res.json({result: systemManager.addPlayer(req.query.name)});
});

// create server for sockets
const sockets = {};
const socketToName = {};
const nameToSocket = {};
io.on('connection', (socket) => {
  // Save the list of all connections to a variable
  sockets[socket.id] = socket;
  console.log(`New socket connected: ${socket.id}`);

  // Handles the binding of sockets to names and name to sockets
  socket.on('bind', (data) => {
    systemManager.addPlayer(data.name);
    nameToSocket[data.name] = socket;
    socketToName[socket.id] = data.name;
    console.log(`Socket ID ${socket.id} is bound to ${data.name}`);
    socket.emit('updateName', {name: data.name});
    io.sockets.emit('playerList', {players: systemManager.getPlayers()});
  });

  // Handles socket disconnects
  socket.on('disconnect', () => {
    console.log(`${socket.id} has diconnected.`);
    if (socketToName[socket.id]) {
      systemManager.removePlayer(socketToName[socket.id]);
      console.log(`${socketToName[socket.id]} is no longer bound.`);
      delete socketToName[socket.id];
    }
    delete sockets[socket.id];
  });

  // Route for initiating a match request
  socket.on('requestMatch', function(data) {
    let p2 = data.playerName;

    console.log(`Player "${socketToName[socket.id]}" has requested Player "${p2}" for a match.`);

    let result = systemManager.requestMatch(socketToName[socket.id], p2);
    if (result) {
      nameToSocket[p2].emit('receiveRequest', {'playerName': socketToName[socket.id]});
    } else {
      console.log("Request has failed.");
    }
  });

  // Route for accepting a match request
  socket.on('acceptMatch', function(data) {
    let p2 = data.p2;
    let p1 = socketToName[socket.id];
    console.log(`Player "${p1}" has accepted Player "${p2}"'s request.`);

    // Update system manager information
    let game = systemManager.acceptMatch(p1, p2);

    // Propogate response to other player
    nameToSocket[p2].emit('accepted', {'playerName': p1});

    // Update both players with game state
    nameToSocket[p2].emit('update', game);
    socket.emit('update', game);
  });

  // Route for rejecting a match request
  socket.on('rejectMatch', function(data) {
    let p2 = data.p2;
    let p1 = socketToName[socket.id];
    console.log(`Player "${p1}" has rejected Player "${p2}"'s request.`);

    // Update system manager information
    systemManager.rejectMatch(p1, p2);

    // Propogate response to other player
    nameToSocket[p2].emit('rejected', {'playerName': p1});
  });

  // Route for getting list of current players
  socket.on('/getPlayers', function(data, callback) {
    let players = systemManager.getPlayers();
    console.log(`${socket.id} is requesting the player list`);
    callback(players);
  });

  // Make move
  socket.on('move', (data) => {
    let move = data;
    let player = socketToName[socket.id];
    let result = systemManager.validateMove(player, move);
    console.log(result);
    if (result) {
      let b = result['b'];
      let w = result['w'];
      nameToSocket[b].emit('update', result);
      nameToSocket[w].emit('update', result);
    }
  });
});

// setup listening on the backend
app.listen(process.env.PORT || 3100, () => console.log(`Listening on port ${process.env.PORT || 3100}!`));
server.listen(3200);
