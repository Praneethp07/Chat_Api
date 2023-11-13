const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const realTImeChatController  = require('../controller/realtimeChatController');
router.get('/',chatController.getAllOrganizations);
router.get('/:organizationId',chatController.getOrganization);
router.get('/:organizationId/members',chatController.getAllUsers);
router.get('/users',chatController.getAllUsers);
router.get('/user/:userId',chatController.getUserById);
router.get('/:organizationId/chatrooms/:chatroomID',chatController.getAllRooms);
router.get('/:organizationId/chatrooms/:chatroomID/:roomId',chatController.getChatRoomById);
router.get('/auth/globalchatrooms',chatController.getAllGlobalChatrooms);
router.get('/:organizationId/chatrooms/:chatroomID/:roomId/messages',chatController.getAllMessagesFromRoomId);
router.delete('/user/:userId',chatController.deleteUserById);
router.delete('/:organizationId/chatrooms/:chatroomID/:roomId/messages/:messageId',chatController.deleteMessageById);
router.put('/user',chatController.createUser);
router.put('/:organizationId/chatrooms/:chatroomID',chatController.createRoom);
router.put('/:organizationId',chatController.createOrganization);
router.put('/:organizationId/chatrooms/:chatroomID/:roomId/message',chatController.sendMessage);
router.post('/user',chatController.createUser);
router.post('/:organizationId/chatrooms/:chatroomID',chatController.createRoom);
router.post('/:organizationId',chatController.createOrganization);
router.post('/:organizationId/chatrooms/:chatroomID/:roomId/message',chatController.sendMessage);
module.exports = router;

//author:praneeth