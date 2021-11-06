const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.request.url);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var clients = io.sockets.clients();
    console.log(clients);
  });

  socket.on('chat_message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat_message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});