const mongoose = require("mongoose");

let recipeSchema = mongoose.Schema({
  title: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  ingredients: String,
  howTo: String,
  postDate: String,
});

module.exports = mongoose.model("Recipes", recipeSchema);
