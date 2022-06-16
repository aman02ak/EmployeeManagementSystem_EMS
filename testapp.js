const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));

// General Call
app.get("/", (req, res) => {
  console.log("Welcome onboard! Start Working");
  res.send("Welcome onboard! Start Working");
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(`Server not running '404'`);
  }
});
