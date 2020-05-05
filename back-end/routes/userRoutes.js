const express = require("express");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/exercise", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const router = express.Router();

const users = [
  {
    id: 1,
    name: "David",
    age: 30,
  },

  {
    id: 2,
    name: "Christoffer",
    age: 58,
  },
  {
    id: 3,
    name: "Lisa",
    age: 28,
  },
];

// READ ALL
router.get("/api/users", function (req, res) {
  res.json(users);
});

module.exports = router;
