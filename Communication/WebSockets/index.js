const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("node:http");
const app = express();

app.use(express.static(__dirname));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Connection Established");
  socket.on("message", (msg) => {
    console.log("Message: " + msg);
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("Connection Closed");
  });
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
