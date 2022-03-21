// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// const chatRouter = require("express").Router();
// const { Message } = require("../models");
// const messageArray = []

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("chatMessage", (message) => {
//     // message harus balikin object {receiverId, senderId, message}
//     Message.create(message)
//       .then((data) => {})
//       .catch((err) => console.log(err))
//     messageArray.push(message);
//     console.log(messageArray);
//     io.emit("chatMessage", messageArray);
//   });
// });

// module.exports = chatRouter;
