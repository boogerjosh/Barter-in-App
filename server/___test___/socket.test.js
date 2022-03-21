// const io = require("socket.io-client");
// const server = require("../socketConfig");
// describe("Suite of unit tests", function () {
//   //ngejalain servernya
//   server.attach(3000);
//   // let sender;
//   // let receiver;
//   let socket;

//   beforeEach(function (done) {
//     // Setup
//     socket = io.connect("http://localhost:3000", {
//       "reconnection delay": 0,
//       "reopen delay": 0,
//       "force new connection": true,
//     });

//     socket.on("connect", function () {
//       console.log("worked...");
//       done();
//     });
//     socket.on("disconnect", function () {
//       console.log("disconnected...");
//     });
//   });

//   afterEach(function (done) {
//     // Cleanup
//     if (socket.connected) {
//       console.log("disconnecting...");
//       socket.disconnect();
//     } else {
//       // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
//       console.log("no connection to break...");
//     }
//     done();
//   });

//   describe("Chat tests", function () {
//     test("Sending message to the chat", (done) => {
//       const data = {
//         roomName: "Teknologi Informasi",
//         sender: "Budi",
//         message: "test message",
//         name: "Irham",
//       };

//       socket.emit("send-message", data);

//       socket.on("room-detail", (dataRes) => {
//         expect(dataRes).toBeInstanceOf(Object);
//         expect(dataRes).toHaveProperty("name");
//         done();
//       });
//     });

//     test("Show typing message", (done) => {
//       let payload = {
//         room: "Teknologi Informasi",
//         name: "Budi",
//       };
//       socket.emit("typing-start", payload);

//       socket.on("typing-start", (data) => {
//         expect(data.name).toBe(payload.name);
//         done();
//       });
//     });
//   });
// });

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

// with { "type": "module" } in your package.json
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");

// describe("my awesome project", () => {
//   let io, serverSocket, clientSocket;

//   beforeAll((done) => {
//     const httpServer = createServer();
//     io = new Server(httpServer);
//     httpServer.listen(() => {
//       const port = httpServer.address().port;
//       clientSocket = new Client(`http://localhost:${port}`);
//       io.on("connection", (socket) => {
//         serverSocket = socket;
//       });
//       clientSocket.on("connect", done);
//     });
//   });

//   afterAll(() => {
//     io.close();
//     clientSocket.close();
//   });

//   test("should work", (done) => {
//     clientSocket.on("hello", (arg) => {
//       expect(arg).toBe("world");
//       done();
//     });
//     serverSocket.emit("hello", "world");
//   });

//   test("should work (with ack)", (done) => {
//     serverSocket.on("hi", (cb) => {
//       cb("hola");
//     });
//     clientSocket.emit("hi", (arg) => {
//       expect(arg).toBe("hola");
//       done();
//     });
//   });
// });

// const io = require("socket.io-client");
// const http = require("http");
// const ioBack = require("socket.io");

// let socket;
// let httpServer;
// let httpServerAddr;
// let ioServer;

// /**
//  * Setup WS & HTTP servers
//  */
// beforeAll((done) => {
//   httpServer = http.createServer().listen();
//   httpServerAddr = httpServer.listen().address();
//   ioServer = ioBack(httpServer);
//   done();
// });

// /**
//  *  Cleanup WS & HTTP servers
//  */
// afterAll((done) => {
//   ioServer.close();
//   httpServer.close();
//   done();
// });

// /**
//  * Run before each test
//  */
// beforeEach((done) => {
//   // Setup
//   // Do not hardcode server port and address, square brackets are used for IPv6
//   socket = io.connect(
//     `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
//     {
//       "reconnection delay": 0,
//       "reopen delay": 0,
//       "force new connection": true,
//       transports: ["websocket"],
//     }
//   );
//   socket.on("connect", () => {
//     done();
//   });
// });

// /**
//  * Run after each test
//  */
// afterEach((done) => {
//   // Cleanup
//   if (socket.connected) {
//     socket.disconnect();
//   }
//   done();
// });

// describe("basic socket.io example", () => {
//   test("should communicate", (done) => {
//     // once connected, emit Hello World
//     ioServer.emit("echo", "Hello World");
//     socket.once("echo", (message) => {
//       // Check that the message matches
//       expect(message).toBe("Hello World");
//       done();
//     });
//     ioServer.on("connection", (mySocket) => {
//       expect(mySocket).toBeDefined();
//     });
//   });
//   test("should communicate with waiting for socket.io handshakes", (done) => {
//     // Emit sth from Client do Server
//     socket.emit("examlpe", "some messages");
//     // Use timeout to wait for socket.io server handshakes
//     setTimeout(() => {
//       // Put your server side expect() here
//       done();
//     }, 50);
//   });
// });
