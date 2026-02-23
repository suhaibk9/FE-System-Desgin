const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
// THis is the webhook Endpoint that the external server will call
app.post("/webhook", (req, res) => {
  console.log(req.body);
  res.send("Webhook received");
});
app.listen(3002, () => console.log("Listening on Port 3002"));
