const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const router = express.Router();
//User
const User = require("../db");
const { validateData } = require("../middleware/validationMiddleware");
const { authMiddleware } = require("../middleware/authMiddelware");
const {
  userRegistrationSchema,
  userLoginSchema,
  userUpdateSchema,
} = require("../zodSchema/userSchema");
const jwt = require("jsonwebtoken");
const constant = require("../config");

router.post(
  "/signup",
  validateData(userRegistrationSchema),
  async (req, res) => {
    try {
      const isUserPresent = await User.findOne({ userName: req.body.userName });
      console.log("isUserPresent", isUserPresent);
      if (isUserPresent) {
        return res.json({
          message: "User already present",
        });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
        });

        //password hash
        var hashedPassword = await newUser.createHash(req.body.password);
        newUser.password_hash = hashedPassword;
        const result = await newUser.save();
        const userId = result._id;

        //token generation
        console.log("userId", userId.toString());
        const token = jwt.sign(userId.toString(), constant.JWT_SECRET);
        res.json({
          message: "User created successfully",
          token: token,
        });
      }
    } catch (error) {
      console.log("error", error);
      res.json({ message: " signup Internal Server Error", data: error });
    }
  }
);

router.post("/signin", validateData(userLoginSchema), async (req, res) => {
  try {
    // Find username
    let user = await User.findOne({ userName: req.body.userName });
    if (user === null) {
      return res.status(400).json({
        message: "User not found.",
      });
    } else {
      //validate password
      const validateResult = await user.validatePassword(req.body.password);
      console.log("validateResult", validateResult);
      if (validateResult) {
        return res.status(200).json({
          message: "User Successfully Logged In",
        });
      } else {
        return res.status(400).json({
          message: "Incorrect Password",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.json({ message: " signin Internal Server Error", data: error });
  }
});

router.post(
  "/update",
  authMiddleware,
  validateData(userUpdateSchema),
  async (req, res) => {
    try {
      // Find username
      const data = req.body;
      console.log("req", data);
      const o_id = new ObjectId(data.userId);
      console.log("o_id", o_id);
      const updateObj = {};

      if (data.firstName) {
        updateObj.firstName = data.firstName;
      }
      if (data.lastName) {
        updateObj.lastName = data.lastName;
      }
      if (data.password) {
        const newUser = new User();
        const hashedPassword = await newUser.createHash(data.password);
        updateObj.password_hash = hashedPassword;
      }
      let result = await User.findByIdAndUpdate(o_id, updateObj);
      if (result) {
        res.json({ message: "User updated", data: result });
      } else {
        console.log("useruser", result);
        res.json({ message: "Invalid user", data: user });
      }
    } catch (error) {
      console.log("error", error);
      res.json({ message: " update Internal Server Error", data: error });
    }
  }
);

router.get("/bulk", async (req, res) => {
  try {
    // Find username
    const filter = req.query.filter;
    let result = await User.find({
      $or: [{ firstName: filter }, { lastName: filter }],
    });
      // res.json({ message: "Friends no found", data: {
      //     firstName : result.firstName,
      //     lastName: result.lastName,
      //     _id: result._id
      // } });
      res.json({
        user: result.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        })),
      });
    
  } catch (error) {
    console.log("error", error);
    res.json({ message: " bulk Internal Server Error", data: error });
  }
});
module.exports = router;
