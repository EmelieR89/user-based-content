const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  content: String,
  postDate: String,
});

module.exports = mongoose.model('recipes', recipeSchema)