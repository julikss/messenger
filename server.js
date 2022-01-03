'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const UserService = require('./services/UserService');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const userManager = new UserService();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


const botName = 'Messenger Bot';

// Run when client connects
io.on('connection', socket => {
  const { id } = socket;

  socket.on('joinRoom', ({ username, room }) => {
    const user = userManager.addUser({ id, username, room });
    socket.join(room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(room).emit('roomUsers', {
      room,
      users: userManager.getRoomUsers(room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = userManager.getUser(id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userManager.removeUser(id);

    if (user) {
      const { room } = user;
      io.to(room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(room).emit('roomUsers', {
        room,
        users: userManager.getRoomUsers(room)
      });
    }
  });
});

const PORT = process.env.PORT || '3000';

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
