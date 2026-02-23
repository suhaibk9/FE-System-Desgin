const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
let data = "Initial Data";
let requestList = [];
app.get("/data", (req, res) => {
  if (req.query.data === data) {
    requestList.push(res);

    req.on("close", () => {
      requestList = requestList.filter((r) => r !== res);
    });
  } else {
    res.json({ msg: data });
  }
});
app.get("/updateData", (req, res) => {
  data = "Data Updated";
  requestList.forEach((res) => {
    res.json({
      msg: data,
    });
  });
  requestList = [];
  
});
app.listen(3000, (req, res) => {
  console.log("Listening on Port 3000");
});
