// initialize needed packages
const express = require('express');
const os = require('os');
const http = require('http');
const server = http.createServer(express);
const io = require('socket.io')(server);
const manager = require('./SystemManager');

// Setup system manager
let systemManager = new manager.SystemManager();

// create app
const app = express();
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({
    username: os.userInfo().username
}));

// create server for sockets
const sockets = {};
const socketToName = {};
const nameToSocket = {};
io.on('connection', (socket) => {
  // Save the list of all connections to a variable
  sockets[socket.id] = socket;
  console.log(`New socket connected: ${socket.id}`);

  // Register name route
  socket.on('/register', function(data, callback) {
    console.log(`${socket.id} is requesting name: ${data.name}`);

    // Send a response back to the client
    let success = systemManager.addPlayer(data.name);
    callback(success);

    // If registration was succesful, bind name to socket id
    // so that we can free name when disconnected
    if (success) {
      socketToName[socket.id] = data.name;
      nameToSocket[data.name] = socket;

      console.log(`Success! ${socket.id} is bound to ${data.name}`);
    }
  });

  // Route for getting list of current players
  socket.on('/getPlayers', function(data, callback) {
    let players = systemManager.getPlayers();
    console.log(`${socket.id} is requesting the player list`);
    callback(players);
  });

  // Route for initiating a match request
  socket.on('/requestMatch', function(data, callback) {
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
  socket.on('/acceptMatch', function(data, callback) {
    let p2 = data.p2;
    let p1 = socketToName[socket.id];
    console.log(`Player "${p1}" has accepted Player "${p2}"'s request.`);

    // Update system manager information
    systemManager.acceptMatch(p1, p2);

    // Propogate response to other player
    nameToSocket[p2].emit('accepted', {'playerName': p1});
  });

  // Route for rejecting a match request
  socket.on('/rejectMatch', function(data, callback) {
    let p2 = data.p2;
    let p1 = socketToName[socket.id];
    console.log(`Player "${p1}" has rejected Player "${p2}"'s request.`);

    // Update system manager information
    systemManager.rejectMatch(p1, p2);

    // Propogate response to other player
    nameToSocket[p2].emit('rejected', {'playerName': p1});
  });

  // Route for validating moves
  socket.on('/validateMove', function(data, callback) {

  });

  // When disconnect, delete the socket with the variable
  socket.on('disconnect', () => {
    console.log(`${socket.id} has diconnected.`);
    if (socketToName[socket.id]) {
      systemManager.removePlayer(socketToName[socket.id]);
      console.log(`${socketToName[socket.id]} is no longer bound.`);
      delete socketToName[socket.id];
    }
    delete sockets[socket.id];
  });
});

// setup listening on the backend
app.listen(process.env.PORT || 3100, () => console.log(`Listening on port ${process.env.PORT || 3100}!`));
server.listen(3200);
