const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
let data = "Initial Data";
app.get("/data", (req, res) => {
  res.json({
    msg: data,
  });
});
app.get("/updateData", (req, res) => {
  data = "Data Updated";
  res.send("Done with the Update");
});
app.listen(3000, (req, res) => {
  console.log("Listening on Port 3000");
});
