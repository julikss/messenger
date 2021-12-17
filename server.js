const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require("mongoose");
const authRouter = require('./public/js/authRouter');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/auth", authRouter);

//run when client connects
io.on('connection', socket => {

    socket.emit('message', 'Welcome to messenger');

    //broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })
});

const PORT = 3000 || process.env.PORT;

const runServer = async() => {
    try {
        await mongoose.connect(`mongodb+srv://ulu:ul67d3@cluster0.xnfaj.mongodb.net/messager?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

runServer();