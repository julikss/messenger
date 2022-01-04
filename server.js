'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const UserService = require('./services/UserService');
const mongoose = require("mongoose");
const authRouter = require('./public/js/signup-login/authRouter');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const userManager = new UserService();

//set static folder
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(jsonParser);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/auth', jsonParser, authRouter);


const botName = 'Messenger Bot';

// Run when client connects
io.on('connection', socket => {
    const { id } = socket;

    socket.on('joinRoom', ({ username, room }) => {
        const user = userManager.addUser({ id, username, room });
        socket.join(room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to Messanger!'));

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

const runServer = async() => {
    try {
        await mongoose.connect(`mongodb+srv://ulu:ul67d3@cluster0.xnfaj.mongodb.net/messager?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

runServer();