const mongoose = require('mongoose');
const { Socket } = require('socket.io');
require('dotenv').config();
const URI = process.env.MONGODB_URI
mongoose.connect(URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});

const messageSchema = new mongoose.Schema({
  _id:String,
  sender: String,
  receiver: String,
  text: String,
  timestamp: Date,
});

const roomSchema = new mongoose.Schema({
  _id:String,
  chatroomsID:String,
  name: String,
  users: [String],
  messages: [messageSchema],
});

const organizationSchema = new mongoose.Schema({
  _id: String,
  organizationName: String,
  description: String,
  members: [String],
  chatroomsid:String,
});

const userSchema = new mongoose.Schema({
  _id: String,
  chatrooms: [String],
  userId: String,
  username: String,
  email: String,
  socketId:String,
});

// Define the global chatrooms collection based on organization _id
const globalChatroomsSchema = new mongoose.Schema({
  _id: String,
  chatrooms: [roomSchema],
});

// Create models for your collections
const Message = mongoose.model('Message', messageSchema);
const Room = mongoose.model('Room', roomSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const User = mongoose.model('User', userSchema);
const GlobalChatrooms = mongoose.model('GlobalChatrooms', globalChatroomsSchema);

module.exports = { Message, Room, Organization, User, GlobalChatrooms };
