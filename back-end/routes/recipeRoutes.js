const express = require("express");
const recipeModel = require('../models/recipeModel')

const router = express.Router();

const recipes = [
  {
    id: 1,
    title: "hej",
    content: "ett bra recept!"
  },
  {
    id: 2,
    title: "hejsan",
    content: "ett ännu bättre"
  }
]

// READ ALL
router.get("/api/recipes", function (req, res) {
  res.json(recipes);
});

module.exports = router;
