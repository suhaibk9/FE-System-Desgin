const express = require("express");
const http2 = require("node:http2");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "cert.key")),
  cert: fs.readFileSync(path.join(__dirname, "cert.crt")),
  allowHTTP1: true, // fallback to HTTP/1.1 if client doesn't support HTTP/2
};

http2.createSecureServer(options, app).listen(8443, () => {
  console.log("🚀 HTTP/2 Server is running!");
  console.log("👉 Go to: https://localhost:8443");
});
