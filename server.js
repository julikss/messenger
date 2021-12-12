const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const user = require('./public/js/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
mongoose.connect('mongodb://localhost:27017/');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket => {

    socket.emit('message', 'Welcome to messenger');

    //broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
});


app.post('/api/login', async(request, response) => {
    const { username, password } = request.body;

    const user1 = user.find({ username, password });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});