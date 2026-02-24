const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");

  // SECURE CSP: We allow our inline script (via nonce)
  // BUT we do NOT allow 'unsafe-eval'.
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'self' 'nonce-${nonce}';`, // Note: No 'unsafe-eval' here!
  );

  fs.readFile(__dirname + "/index.html", "utf8", (err, html) => {
    if (err) return res.send("Error");
    res.send(html.replace("{{nonce}}", nonce));
  });
});

app.listen(3002, () => console.log("Server running on port 3002"));
