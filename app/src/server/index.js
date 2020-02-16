// initialize needed packages
const express = require('express');
const os = require('os');
const http = require('http');
const io = require('socket.io');
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
const server = http.createServer(express);
const socket = io(server);
socket.on('connection', function(s) {
  console.log('a user connected');
  s.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

// setup listening on the backend
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
server.listen(8000);
