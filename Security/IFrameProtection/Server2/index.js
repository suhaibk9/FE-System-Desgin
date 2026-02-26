const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/iFrame1", (req, res) => {
  res.sendFile(__dirname + "/public/iFrame1.html");
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors none");
  res.cookie("sessionID", "12345", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  next();
});
app.get("/iFrame2", (req, res) => {
  res.sendFile(__dirname + "/public/iFrame2.html");
});
app.listen(3002, () => console.log("Server-2 listening on Port 3002"));
