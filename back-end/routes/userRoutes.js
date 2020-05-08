const express = require("express");
const UserModel = require("../models/userModel");

const router = express.Router();

// READ ALL
router.get("/api/users", function (req, res) {
  res.json(users);
});

// Get user with id
router.get("/api/users/:userId", async function (req, res) {
  const id = req.params.userId;
  try {
    const userIdDoc = await UserModel.findByI(id);
    console.log(userIdDoc, "Här är vi");
    res.status(200).json(userIdDoc);
  } catch (error) {
    res.status(400).send("Something went wrong. Message:", error);
  }
});

// POST user
router.post("/api/users", async function (req, res, next) {
  const user = req.body;
  const userDoc = await new UserModel(user);
  const savedUserDoc = await userDoc.save();
  res.send(JSON.stringify(savedUserDoc));
});

module.exports = router;
