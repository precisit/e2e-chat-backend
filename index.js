var moment = require('moment');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3001;

var messages = [];

io.on('connection', function(socket) {
  console.log('New user connected: ' + socket.id);

  socket.on('disconnect', function() {
    console.log('User disconnected: ' + socket.id);
  });

  socket.emit('messageToClient', {
    time: moment().format('HH:mm:ss'),
    text: 'Welcome to the chat!'
  });

  socket.on('messageToServer', function(message) {
    message.time = moment().format('HH:mm:ss');
    console.log(message);
    io.sockets.emit('messageToClient', message);
  });
});

http.listen(port, function(){
  console.log('Server started on port: ' + port);
});
