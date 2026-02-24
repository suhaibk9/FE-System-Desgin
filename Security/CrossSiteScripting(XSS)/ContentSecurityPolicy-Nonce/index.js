const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      // FIX 1: removed semicolon after 'self'
      // FIX 2: fixed spelling 'nonde' -> 'nonce'
      "script-src 'self' 'nonce-randomNonce'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "connect-src 'self'",
    ].join("; "), // Joins them correctly with semicolons
  );
  next();
});

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  // Fix: Added the missing '/' before index.html
  res.sendFile(__dirname + "/index.html");
});

app.listen(3002, () => console.log("Running on Port 3002"));
