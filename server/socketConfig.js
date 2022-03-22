const io = require("socket.io")();

// io.on("connection", (socket) => {
//   // all socket listener here
//   socket.on("send-message", (data) => {
//     io.emit("room-detail", data);
//   });
//   socket.on("typing-start", (data) => {
//     io.emit("typing-start", data);
//   });
// });
const messageArray = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chatMessage", (message) => {
    messageArray.unshift(message);
    console.log(messageArray);
    socket.broadcast.emit("getMessage", messageArray);
  });  
  socket.on("firstConnect", () => {
    socket.emit("getMessage", messageArray);
  })
});

module.exports = io;
