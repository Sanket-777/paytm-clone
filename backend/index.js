// backend/index.js
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors()); // adding cross origin
app.use(express.json()); // adding body parser

app.get("/", (req, res) => {
  res.json("hello");
});

app.use("/api/v1", mainRouter); // routing everthing coming from this /api/v1   to mainRouter
console.log("Server is Running  !");
app.listen(3000);
