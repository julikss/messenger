'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket => {
  socket.emit('message', 'Welcome to messenger');

  //broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  //runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || '3000';

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
