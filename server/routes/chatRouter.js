const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const chatRouter = require("express").Router();
const { Message } = require("../models");

io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.on("chatMessage", (message) => {
    // message harus balikin object {receiverId, senderId, message}
    messageArray.push(message);
    console.log(messageArray);
    io.emit("chatMessage", messageArray);
  });
});

module.exports = chatRouter;
