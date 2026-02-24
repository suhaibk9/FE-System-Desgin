const express = require("express");
const cors = require("cors");
const crypto = require("crypto"); // Built-in: Generates random strings
const fs = require("fs"); // Built-in: Reads files
const app = express();

app.use((req, res, next) => {
  // 1. Generate Nonce
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.nonce = nonce;

  // 2. Define CSP rules cleanly
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`, // Inject nonce here
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self'",
  ].join("; "); // This joins them into ONE valid string with no line breaks

  // 3. Set the Header
  res.setHeader("Content-Security-Policy", cspHeader);

  next();
});

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  // STEP 1: Read the file as text (instead of sending it directly)
  fs.readFile(__dirname + "/index.html", "utf8", (err, html) => {
    if (err) return res.status(500).send("Error loading file");

    // STEP 2: Inject the Nonce
    // We replace the placeholder {{nonce}} with the actual random string
    const finalHtml = html.replace("{{nonce}}", res.locals.nonce);

    // STEP 3: Send the modified HTML
    res.send(finalHtml);
  });
});

app.listen(3002, () => console.log("Running on Port 3002"));
