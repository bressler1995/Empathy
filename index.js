const express = require('express');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});

let storage_message = [];
let storage_message_x = [];
let storage_message_y = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.request.url);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg.thememessage);
    console.log('message: ' + msg.thex);
    console.log('message: ' + msg.they);
    storage_message.push(msg.thememessage);

    io.emit('message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});