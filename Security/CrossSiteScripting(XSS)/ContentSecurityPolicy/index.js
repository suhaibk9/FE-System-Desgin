const express = require("express");
const cors = require("cors");
const app = express();

// 1. GLOBAL SECURITY MIDDLEWARE (CSP)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self'; " + // BLOCK ATTACK: Only allows scripts from your own file (script.js), NO inline scripts allowed!
      "style-src 'self' 'unsafe-inline'; " + // Allow inline styles (for your CSS)
      "img-src 'self' data:; " + // Allow images from own server
      "connect-src 'self'", // BLOCK EXFILTRATION: Only allow fetch() to your own server, not attacker.com
  );
  next();
});

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  // Fix: Added the missing '/' before index.html
  res.sendFile(__dirname + "/index.html");
});

app.listen(3002, () => console.log("Running on Port 3002"));
