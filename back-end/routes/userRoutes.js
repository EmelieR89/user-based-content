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
    res.status(400).send("Something went wrong. Message:", error);
  }
});

// GET user with id
// router.get("/api/users/:userId", async function (req, res) {
//   const id = req.params.userId;
//   console.log("användar id : ", id);
//   try {
//     const userIdDoc = await UserModel.findById(id)
//       .populate("recipes")
//       .exec(function (err, user) {
//         if (err) {
//           console.log("FAIL:", err);
//         }
//         console.log("undefined?", user);
//         return user;
//       });
//     console.log("användare med recept : ",  userIdDoc);
//     res.status(200).json( userIdDoc);
//   } catch (error) {
//     res.status(400).send("Something went wrong. Message:");
//   }
// });

// //DELETE user by id
// router.delete("/api/users/:userId", async function (req, res, next) {
//   const id = req.params.userId;
//   try {
//     const res = await UserModel.findByIdAndDelete(id);
//     res.status(200).send("Has been deleted");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// POST signup
router.post("/api/users/signup", async (req, res, next) => {
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
                // console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                // console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

// POST sign in
router.post("/api/users/login", async (req, res, next) => {
  // console.log(req.body);

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
          // console.log(user, "Här är result");
          return res.status(200).json({
            message: "Auth successful",
            userId: user[0]._id,
          });
        }
        res.status(401).json({
          message: " Auth failed",
        });
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete user
router.delete("/api/users/:userId", async function (req, res, next) {
  const id = req.params.userId;
  await UserModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "user deleted",
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
