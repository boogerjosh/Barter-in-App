require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandling");
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// module.exports = app;

const messageArray = []
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chatMessage", (message) => {
    messageArray.push(message);
    console.log(messageArray);
    io.emit("chatMessage", messageArray);
  });
});

