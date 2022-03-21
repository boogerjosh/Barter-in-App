require("dotenv").config();
const express = require("express");
const app = express();
// const server = require("http").createServer(app);
// const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandling");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);



// const messageArray = [];
// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("chatMessage", (message) => {
//     messageArray.push(message);
//     console.log(messageArray)
//     io.emit("getMessage", messageArray);
//   });
// });


// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
// exports.server = http.listen(port);
module.exports = app;

