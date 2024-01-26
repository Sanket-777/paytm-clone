// backend/index.js
const express = require("express");
const cors = require('cors')
const mainRouter = require("./routes/index");


const app = express();

app.use(cors()) // adding cross origin
app.use(exppress.json()) // adding body parser 

app.use("/api/v1", mainRouter); // routing everthing coming from this /api/v1   to mainRouter

app.listen(3000);
