const { Message, Room, Organization, User, GlobalChatrooms } = require('../model/chatModel');
const { UUID } = require('mongodb');
const mongoose = require('mongoose');


const getOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);
    res.json({ success: true, organization });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const createOrganization = async (req, res) => {
    try {
        const { organizationId } = req.params.organizationId;
        const {Name,desc,members} = req.body; 
        // Create a new message
        const newOrganization = new Organization({
          _id: new mongoose.Types.ObjectId(),
          Name,
          desc,
          members,
          chatroomsid: organizationId,
        });
    
        // Save the message to the database
        await newOrganization.save();

        res.json({ success: true, message: 'organization created successfully', newOrganization });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};


const sendMessage = async (req, res) => {
    try {
      const {sender, receiver, text } = req.body;
      const roomId = req.params.roomId;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      // Create a new message
      const newMessage = new Message({
        _id: new mongoose.Types.ObjectId(),
        sender,
        receiver,
        text,
        timestamp: new Date(),
      });
  
      // Save the message to the database
      await newMessage.save();
  
      // Update the room's messages array with the new message
      room.messages.push(newMessage._id);
      await room.save();
  
      res.json({ success: true, message: 'Message sent successfully', newMessage });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { chatrooms, userId, username, email, socketId } = req.body;
    const newUser = new User({ chatrooms, userId, username, email, socketId });
    await newUser.save();
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getChatRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
  
const getAllGlobalChatrooms = async (req, res) => {
  try {
    const chatrooms = await GlobalChatrooms.find();
    res.json({ success: true, chatrooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllMessagesFromRoomId = async (req, res) => {
  try {
      const roomId = req.params.roomId;
      const organizationId = req.params.organizationId;
      // Fetch the room, assuming you are using Mongoose
      const room = await Room.findById(roomId);

      if (!room) {
          return res.status(404).json({ success: false, error: "Room not found" });
      }

      // Extract message IDs from the room
      const messageIds = room.messages.map(message => message._id);
      const messagesPromises = messageIds.map(messageId => Message.findById(messageId));
      const messages = await Promise.all(messagesPromises);

      res.json({ success: true, messages });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

  

const deleteMessageById = async (req, res) => {
    try {
      const messageId = req.params.messageId;
      await Message.deleteOne({ _id: messageId });
      res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
const deleteRoomById = async (req, res) => {
    try{
        const roomId = req.params.roomId;
        await Room.findByIdAndDelete(roomId);
        res.json({ success: true, message: 'Room deleted successfully' });
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
};

const createRoom = async (req, res) => {
    try {
      const organizationId = req.params.organizationId;
      const { name, users } = req.body;
      const newRoom = new Room({
        _id:new mongoose.Types.ObjectId(),
        chatroomsID:organizationId,
        name:name, 
        users:users,
        messages:[]
      }); // Omit _id, MongoDB will create it automatically
      await newRoom.save();
      res.json({ success: true, message: 'Room created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
const getAllOrganizations = async(req,res)=>{
    try {
        const organizations = await Organization.find();
        res.json({ success: true, organizations });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};

module.exports = {
  createOrganization,
  getUserById,
  deleteMessageById,
  getAllMessagesFromRoomId,
  sendMessage,
  createRoom,
  deleteRoomById,
  getAllRooms,
  getAllGlobalChatrooms,
  createUser,
  deleteUserById,
  getAllUsers,
  getOrganization,
  getChatRoomById,
  getAllOrganizations
};
