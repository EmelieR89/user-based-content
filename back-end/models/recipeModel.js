const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  createdBy: String,
  ingredients: [String],
  howTo: String,
  postDate: String,
});

module.exports = mongoose.model("Recipes", recipeSchema);
