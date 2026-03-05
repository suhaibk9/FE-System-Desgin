const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();

// ============================================================
// 1. STATIC ASSETS — Cache-Control: max-age (365 days)
//    Browser downloads once, then serves from disk cache.
//    Won't even appear in the Network tab for a full year.
// ============================================================
app.use(
  "/static",
  express.static(path.join(__dirname, "public"), {
    maxAge: "365d", // Cache-Control: max-age=31536000
    immutable: true, // Tells browser: "This file will NEVER change"
  }),
);

// ============================================================
// 2. HTML PAGE — ETag + Last-Modified (304 Not Modified)
//    Browser sends If-None-Match / If-Modified-Since headers.
//    Server checks, and if nothing changed, returns 304 (no body).
// ============================================================
const APP_VERSION = "v1.0.5";
const lastModifiedDate = new Date("2025-03-01T00:00:00Z");

app.get("/", (req, res) => {
  const etag = `"${APP_VERSION}"`;

  // --- ETag Check ---
  // Browser sends: If-None-Match: "v1.0.5"
  // If it matches our current version, nothing changed → 304
  if (req.headers["if-none-match"] === etag) {
    console.log("ETag matched! Sending 304 Not Modified");
    return res.status(304).end();
  }

  // --- Last-Modified Check (fallback) ---
  // Browser sends: If-Modified-Since: Sat, 01 Mar 2025 00:00:00 GMT
  const ifModifiedSince = req.headers["if-modified-since"];
  if (ifModifiedSince) {
    const browserDate = new Date(ifModifiedSince);
    if (browserDate >= lastModifiedDate) {
      console.log("Last-Modified matched! Sending 304 Not Modified");
      return res.status(304).end();
    }
  }

  // --- First visit or content changed → send full response ---
  console.log("Sending full HTML response with ETag and Last-Modified");
  res
    .set("Cache-Control", "no-cache") // Always revalidate with the server
    .set("ETag", etag) // The content's unique fingerprint
    .set("Last-Modified", lastModifiedDate.toUTCString()) // Time-based fallback
    .send(`
      <!DOCTYPE html>
      <html>
      <head><title>HTTP Caching Demo</title></head>
      <body>
        <h1>HTTP Caching Demo (${APP_VERSION})</h1>
        <p>This HTML uses <strong>ETag</strong> and <strong>Last-Modified</strong> headers.</p>
        <p>Refresh the page and check the Network tab — you'll see a <strong>304 Not Modified</strong>.</p>
        <hr>
        <h2>Endpoints to test:</h2>
        <ul>
          <li><a href="/static/style.css">/static/style.css</a> — Cached for 365 days (from disk cache)</li>
          <li><a href="/">/</a> — ETag + Last-Modified (304 handshake)</li>
          <li><a href="/api/user/balance">/api/user/balance</a> — no-store (never cached)</li>
        </ul>
      </body>
      </html>
    `);
});

// ============================================================
// 3. SENSITIVE API — Cache-Control: no-store
//    Browser is FORBIDDEN from caching this response.
//    Pressing Back button forces a fresh network call.
// ============================================================
app.get("/api/user/balance", (req, res) => {
  console.log("Sensitive API hit — serving fresh data with no-store");
  res
    .set("Cache-Control", "no-store") // NEVER cache this. Not in memory, not on disk.
    .json({
      userId: "u1",
      name: "Sarah Chen",
      balance: (Math.random() * 10000).toFixed(2), // Random balance to prove it's fresh
      timestamp: new Date().toISOString(),
    });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(3001, () => {
  console.log("HTTP Caching Demo running at http://localhost:3001");
  console.log("");
  console.log("Endpoints:");
  console.log(
    "  GET /                   → ETag + Last-Modified (304 handshake)",
  );
  console.log(
    "  GET /static/style.css   → max-age=365d, immutable (disk cache)",
  );
  console.log("  GET /api/user/balance   → no-store (never cached)");
});
