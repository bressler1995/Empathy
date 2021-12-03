const socket = io('http://localhost:3000', {'transports': ['websocket', 'polling']});
// const socket = io('http://54.218.29.145:3000', {'transports': ['websocket', 'polling']});

function emit_test() {
    socket.emit('message', "Lorem");
}

socket.on('message', function(msg) {
    console.log(msg);
});