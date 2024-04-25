const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { MONGO_URI } = require("../config");
const { authMiddleware } = require("../middleware/authMiddelware");
const { Accounts } = require("../db");

const client = new MongoClient(MONGO_URI);
const accounts = client.db("user").collection("accounts");


router.get("/balance", authMiddleware, async (req, res) => {
    try {
        console.log("req", req.body);
        const account = await Accounts.findOne({
            userId: req.body.userId,
        });
        res.status(200).json({
            balance: account.balance,
        });
    } catch (error) {
        console.log("error", error);
        res.json({ message: " signup Internal Server Error", data: error });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const { to, amount } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        // Fetch the accounts within the transaction
        const account = await Accounts.findOne({ userId: req.body.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            console.log("Insufficient balance")
            return res.status(400).json({
                message: "Insufficient balance/Invalid account",
            });
        }
        const toAccount = await Accounts.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account",
            });

        }

        // let cursor = await Accounts.find({
        //   userId: { $in: [data.userId, data.to] },
        // });

        // for await (const doc of cursor) console.log(doc);

        // Perform the transfer
        await Accounts.updateOne({ userId: req.body.userId }, { $inc: { balance: -amount } }).session(session);
        await Accounts.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        console.log("done")

        res.status(200).json({
            message: "Transaction successful",
        });
    } catch (error) {
        console.error("Transaction Aborted", error);
        res.status(400).json({
            message: "transfer error",
        });
    }
});

module.exports = router;
