const express = require("express");
const UserRouter = require("./user");
const AccountRouter = require("./account");
const app = express();
const router = express.Router();
router.use("/user", UserRouter);
router.use("/account", AccountRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

module.exports = router;