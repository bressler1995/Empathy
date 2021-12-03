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
  console.log('Empathy: Client Connected');
  console.log(socket.request.url);

  for(i=0; i < storage_message.length; i++) {
    let msgtosend = {  
        thememessage : storage_message[i],  
        thex : storage_message_x[i],
        they : storage_message_y[i]
    };  

    io.emit('message', msgtosend);
  }

  socket.on('disconnect', () => {
    console.log('Empathy: Client Disconnected');
  });

  socket.on('message', (msg) => {
    console.log('Message: ' + msg.thememessage + ", X: " +  msg.thex + ", Y: " +  msg.they);
    storage_message.push(msg.thememessage);
    storage_message_x.push(msg.thex);
    storage_message_y.push(msg.they);

    io.emit('message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});