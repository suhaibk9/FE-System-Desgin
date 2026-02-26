const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/example1", (req, res) => {
  res.sendFile(__dirname + "/public/index1.html");
});
app.get("/example2", (req, res) => {
  res.sendFile(__dirname + "/public/index2.html");
});
app.listen(3001, () => console.log("Server-1 listening on Port 3001"));
