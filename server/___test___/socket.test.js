const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const messageArray = [
  {
    senderId: "1",
    receivedId: "2",
    message: "hello!",
  },
  {
    senderId: "1",
    receivedId: "2",
    message: "hello too!",
  },
];

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it("Should get message from server", (done) => {
    clientSocket.on("chatMessage", (message) => {
      expect(message).toBeInstanceOf(Array);
      expect(message[0]).toBeInstanceOf(Object);
      expect(message[0]).toHaveProperty("senderId", "1");
      expect(message[0]).toHaveProperty("receivedId", "2");
      expect(message[0]).toHaveProperty("message", "hello!");
      done();
    });
    serverSocket.emit("chatMessage", messageArray);
  });

  let socketid;

  it("Should send message from server", (done) => {
    serverSocket.on("chatMessage", (socket) => {
      socket({ senderId: "1", receivedId: "2", message: "hello!" });
    });
    clientSocket.emit("chatMessage", (arg) => {
      expect(arg).toBeInstanceOf(Object);
      expect(arg).toHaveProperty("senderId", "1");
      expect(arg).toHaveProperty("receivedId", "2");
      expect(arg).toHaveProperty("message", "hello!");
      done();
    });
  });
});
