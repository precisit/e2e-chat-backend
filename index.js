var moment = require('moment');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3001;

// Start the HTTP server
http.listen(port, function(){
  console.log('Server started on port: ' + port);
});

// Start listening to socket connections
io.on('connection', function(socket) {
  console.log('New user connected: ' + socket.id);

  socket.on('disconnect', function() {
    console.log('User disconnected: ' + socket.id);
  });

  // Send a welcome message to the client
  socket.emit('newMessage', {
    time: moment().format('HH:mm:ss'),
    text: 'Welcome to the chat!'
  });

  // When a new message is received from the client...
  socket.on('newMessage', function(messageText) {
    // ... add the current time...
    var message = {
      time: moment().format('HH:mm:ss'),
      text: messageText
    };

    console.log(message);

    // ... and forward it to all connected clients
    io.sockets.emit('newMessage', message);
  });
});
