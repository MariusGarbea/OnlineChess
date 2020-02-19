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
    }

    console.log('Connected players: ' + systemManager.getPlayers());
  });

  // Route for getting list of current players
  socket.on('/getPlayers', function(data, callback) {
    callback(systemManager.getPlayers());
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
