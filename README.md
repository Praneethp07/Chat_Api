# Chat API

This repository contains the source code for a Chat API built with Node.js and Express.

## Overview

The Chat API provides endpoints for managing organizations, users, chat rooms, and messages in a real-time chat application.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Praneethp07/Chat_Api.git

    Install dependencies:

    bash

npm install

Start the server:

bash

    npm start

    The server will run on http://localhost:3000 by default.

API Endpoints
Organizations

    GET /api/organizations/
        Retrieve a list of all organizations.

    GET /api/organizations/:organizationId
        Retrieve information about a specific organization.

    GET /api/organizations/:organizationId/members
        Retrieve all users in a specific organization.

    ...

Users

    GET /api/users
        Retrieve a list of all users.

    GET /api/user/:userId
        Retrieve information about a specific user.

    PUT /api/user
        Create a new user.

    POST /api/user
        Create a new user.

    DELETE /api/user/:userId
        Delete a user by ID.

Chat Rooms

    GET /api/:organizationId/chatrooms/:chatroomID
        Retrieve all rooms in a specific organization.

    GET /api/:organizationId/chatrooms/:chatroomID/:roomId
        Retrieve information about a specific chat room.

    PUT /api/:organizationId/chatrooms/:chatroomID
        Create a new chat room.

    POST /api/:organizationId/chatrooms/:chatroomID/:roomId/message
        Send a message to a specific chat room.

    DELETE /api/:organizationId/chatrooms/:organizationId/messages/:messageId
        Delete a message by ID.

Global Chat Rooms

    GET /api/auth/globalchatrooms
        Retrieve all global chat rooms.

Authentication

    GET /
        Authentication endpoint providing login information.

Configuration

    The server runs on port 3000 by default. You can configure the port using the PORT environment variable.

Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
License

This project is licensed under the MIT License.
