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
io.on('connection', (socket) => {
  // Save the list of all connections to a variable
  sockets[socket.id] = socket;
  console.log('socket connected: ' + socket.id);

  socket.on('/register', function(data, callback) {
    console.log('register: ' + data.name);
    callback(systemManager.addPlayer(data.name));
    console.log('Connected players: ' + systemManager.getPlayers());
  });

  // When disconnect, delete the socket with the variable
  socket.on('disconnect', () => {
    console.log('socket diconnected: ' + socket.id);
    delete sockets[socket.id];
  });
});

// setup listening on the backend
app.listen(process.env.PORT || 3100, () => console.log(`Listening on port ${process.env.PORT || 3100}!`));
server.listen(3200);
