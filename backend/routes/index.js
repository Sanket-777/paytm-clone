const express = require("express");
const UserRouter = require("./user");
const app  = express();


const router = express.Router();
app.use("/user",UserRouter)

module.exports = router;


