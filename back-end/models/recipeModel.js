const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  content: String,
  postDate: String,
});

module.exports = mongoose.model("Recipes", recipeSchema);
