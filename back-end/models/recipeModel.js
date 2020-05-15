const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  createdBy: String,
  ingredients: String,
  howTo: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model("recipes", recipeSchema);
