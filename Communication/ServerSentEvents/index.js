const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
let count = 0;
app.get("/sse", (req, res) => {
  //This means that the response is a stream of events
  res.setHeader("Content-Type", "text/event-stream");
  //This means that the response is not cached
  res.setHeader("Cache-Control", "no-cache");
  //This means that the response is not compressed
  res.setHeader("Connection", "keep-alive");
  const intervalId = setInterval(() => {
    res.write(`data: Count: ${count++}\n\n`);
  }, 1000);
  req.on("close", () => {
    clearInterval(intervalId);
  });
});
app.listen(3001, (req, res) => {
  console.log("SSE Listening on Port 3001");
});
