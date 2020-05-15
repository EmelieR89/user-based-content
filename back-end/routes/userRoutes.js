const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();

// GET all users
router.get("/api/users", async function (req, res) {
  try {
    let users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: "Could not get user",
    });
  }
});

// POST signup
router.post("/api/users/signup", async (req, res) => {
  await UserModel.find({ name: req.body.name })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "name already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new UserModel({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              password: hash,
            });
            await user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Could not create user",
                  error: err,
                });
              });
          }
        });
      }
    });
});

// POST Login
router.post("/api/users/login", async (req, res) => {
  await UserModel.find({ name: req.body.name })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: " Auth failed",
          });
        }
        if (result) {
          return res.status(200).json({
            message: "Auth successful",
            userId: user[0]._id,
            userName: user[0].name,
          });
        }
        res.status(401).json({
          message: " Auth failed",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

// // DELETE user
// router.delete("/api/users/:userId", async function (req, res) {
//   const id = req.params.userId;
//   await UserModel.deleteOne({ _id: id })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "user deleted",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error,
//       });
//     });
// });

module.exports = router;
