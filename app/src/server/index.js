// initialize needed packages
const express = require('express');
const os = require('os');
const http = require('http');
const server = http.createServer(express);
const io = require('socket.io')(server);
const manager = require('./SystemManager');

// Setup system manager
let systemManager = new manager.SystemManager();
console.log('Connected players: ' + systemManager.getPlayers());

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
  console.log('socket connected: ' + socket.id);

  // Adding a name registration route
  socket.on('/register', function(data, callback) {
    console.log('Attempting to register: ' + data.name);

    // Send a response back to the client
    let success = systemManager.addPlayer(data.name);
    callback(success);

    // If registration was succesful, bind name to socket id
    // so that we can free name when disconnected
    if (success) {
      socketToName[socket.id] = data.name;
      nameToSocket[data.name] = socket;
    }

    console.log('Connected players: ' + systemManager.getPlayers());
  });

  // Route for getting list of current players
  socket.on('/getPlayers', function(data, callback) {
    callback(systemManager.getPlayers());
  });

  // Route for initiating a match request
  socket.on('/requestMatch', function(data, callback) {
    let p2 = data.playerName;

    console.log(`Player "${socketToName[socket.id]}" has requested Player "${p2}" for a match.`);

    result = systemManager.requestMatch(socketToName[socket.id], p2);
    if (result) {
      nameToSocket[p2].emit('test', {'playerName': socketToName[socket.id]});
    } else {
      console.log("Request has failed.");
    }
  });

  // Route for accepting a match request
  socket.on('/acceptMatch', function(data, callback) {
    let p2 = data.p2;
    console.log(`Player "${socketToName[socket.id]}" has accepted Player "${p2}"'s request.`);
  });

  // Route for rejecting a match request
  socket.on('/rejectMatch', function(data, callback) {
    let p2 = data.p2;
    console.log(`Player "${socketToName[socket.id]}" has rejected Player "${p2}"'s request.`);
  });

  // When disconnect, delete the socket with the variable
  socket.on('disconnect', () => {
    console.log('socket diconnected: ' + socket.id);
    if (socketToName[socket.id]) {
      systemManager.removePlayer(socketToName[socket.id]);
      delete socketToName[socket.id];
    }
    delete sockets[socket.id];
  });
});

// setup listening on the backend
app.listen(process.env.PORT || 3100, () => console.log(`Listening on port ${process.env.PORT || 3100}!`));
server.listen(3200);
