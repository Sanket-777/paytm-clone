const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { mongoose } = require("mongoose");
const router = express.Router();

// const transferBody =  zod.object({
//     to : zod.string(),
//     amount : zod.number()
// })
// router to get the balance
router.get("/balance", authMiddleware, async (req, res) => {
  //req -> token
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

//router to transfer the balance
router.put("/transfer", authMiddleware, async (req, res) => {
  const currsession = await mongoose.startSession(); // staring a session

  currsession.startTransaction(); // starting a transaction in session

  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(currsession);

  if (!account) {
    // checking if the sufficiant balance exists or not
    await currsession.abortTransaction();
    return res.status(400).json({
      message: "Account Doest Exists!",
    });
  }

  if (account.balance < amount) {
    // checking if the sufficiant balance exists or not
    await currsession.abortTransaction();
    return res.json({
      message: "Insufficiant balance !",
    });
  }

  const toAccount = await Account.findOne({
    // checking the recievers account
    userId: to,
  }).session(currsession);

  if (!toAccount) {
    await currsession.abortTransaction();
    return res.status(400).json({
      message: " Invalid Account !",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(currsession); //deducting the amount

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(currsession); //adding the amount to the recieves account

  await currsession.commitTransaction(); // commiting the transaction saves the data

  res.json({
    message: "Transaction Successfull!",
  });
});

module.exports = router;
