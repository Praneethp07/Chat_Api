const { Server } = require('socket.io');
const server =  require('./server.js');
// const { onlineUsers }  = require('./../controller/chatController.js');
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
});
const connectedUsers = new Map(); // Key: userId, Value: socket instance

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle the initial user connection and associate the socket with the user
  socket.on('initialize', (userId) => {
    connectedUsers.set(userId, socket);
  });

  socket.on('message', (message, toUserId) => {
    // Handle incoming messages from the sender
    console.log(`Received message from ${socket.id}: ${message}`);
    
    // Find the socket of the recipient user and send the message
    const recipientSocket = connectedUsers.get(toUserId);
    if (recipientSocket) {
      recipientSocket.emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    // Handle user disconnection and remove the socket association
    connectedUsers.forEach((userSocket, userId) => {
      if (userSocket === socket) {
        connectedUsers.delete(userId);
      }
    });
  });
});

//testing