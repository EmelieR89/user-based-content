const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  createdBy: String,
  content: String,
  postDate: String,
});

module.exports = mongoose.model("Recipes", recipeSchema);
