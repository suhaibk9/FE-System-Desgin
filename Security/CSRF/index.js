const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();

// 1. Middleware to read the data from HTML forms
app.use(express.urlencoded({ extended: true }));

// 2. The "VIP Badge" (Session Cookie)
// We are setting SameSite to 'none' purely for this demo, 
// so you can see that ONLY the token protects us!
app.use(session({
  secret: 'super-secret-bank-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// 3. GENERATE THE SECRET HANDSHAKE
app.use((req, res, next) => {
  // If the user doesn't have a token yet, generate a random 16-character math code
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(16).toString('hex');
  }
  next();
});

// 4. SERVE THE BANK WEBSITE
app.get('/', (req, res) => {
  // Read our HTML file
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  // THE MAGIC INJECTION: We physically write the secret password into the HTML 
  // before we send it to the browser!
  html = html.replace('{{CSRF_TOKEN}}', req.session.csrfToken);
  
  res.send(html);
});

// 5. THE PROTECTED BANK ROUTE
app.post('/transfer', (req, res) => {
  const tokenFromForm = req.body.csrf_token;
  const realTokenOnServer = req.session.csrfToken;

  // THE BOUNCER CHECK
  if (!tokenFromForm || tokenFromForm !== realTokenOnServer) {
    console.log("❌ Blocked! Tokens did not match.");
    return res.status(403).send("CSRF ATTACK DETECTED! NO MONEY FOR YOU.");
  }

  // If we made it here, the token was valid!
  console.log("✅ Success! Tokens matched.");
  res.send(`Successfully transferred $${req.body.amount} to ${req.body.to}`);
});

app.listen(3000, () => {
  console.log('Bank Server running on http://localhost:3000');
});