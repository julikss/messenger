const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when client connects
io.on('connect', socket => {
  console.log('New client connected...')
})

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => `Server is running at ${PORT}`);
