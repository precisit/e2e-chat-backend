// Connect to the server
// NOTE: You might have to change the address/port number depending on your server
// You can also use: var socket = io();
var socket = io.connect('http://localhost:3001');

var sendButton = document.getElementById('send');
var messageInput = document.getElementById('message');
var messageList = document.getElementById('messages');

// Handlers for sending messages to server
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(e) {
  // Enter key pressed
  if (e.keyCode == 13) {
    sendMessage();
  }
});

// Handler for receiving messages from server
socket.on('newMessage', receiveMessage);

function sendMessage() {
  // Do nothing if the input field is empty
  if (messageInput.value.length == 0) {
    return;
  }

  // Send the message to the server
  socket.emit('newMessage', messageInput.value);

  // Clear the input field
  messageInput.value = '';
}

function receiveMessage(message) {
  // Create a string containing the formatted message with time and message text
  var formattedMessage = message.time + ' - ' + message.text;

  // Create a <li> element node
  var listItem = document.createElement('li');
  // Create a text node containing the formatted message
  var listItemText = document.createTextNode(formattedMessage);

  // Append the text node to the <li> element node...
  listItem.appendChild(listItemText);
  // ... and append the <li> element node to the message list
  messageList.appendChild(listItem);
}
