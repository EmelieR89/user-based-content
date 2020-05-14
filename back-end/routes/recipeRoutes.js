const express = require("express");
const RecipeModel = require("../models/recipeModel");

const router = express.Router();

// GET all recipes
router.get("/api/recipes", async function (req, res) {
  try {
    let recipes = await RecipeModel.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).send("Something went wrong. Message:", error);
  }
});

router.get("/api/recipes/recipe/:recipeId", async function (req, res) {
  const id = req.params.recipeId;
  console.log(id, "här är id i backend");
  try {
    const recipeWeEdit = await RecipeModel.findById(id);
    res.status(200).json(recipeWeEdit);
  } catch (error) {
    res.status(400).send("Something went wrong. Message:"); //error);
  }
});

//GET with user id
router.get("/api/recipes/:userId", async function (req, res) {
  const userId = req.params.userId;
  try {
    const userRecipes = await RecipeModel.find({
      createdBy: userId,
    }).exec();
    res.status(200).json(userRecipes);
  } catch (err) {
    console.log("Something went wrong");
  }
});

// POST new recipe
router.post("/api/recipes", async function (req, res) {
  const recipe = req.body;
  try {
    const recipeDoc = await new RecipeModel(recipe);
    const savedRecipeDoc = await recipeDoc.save();
    res.status(200).json(savedRecipeDoc); //send(JSON.stringify(savedRecipeDoc));
  } catch (error) {
    res.status(400).send("Something went wrong. Message:", error);
  }
});

// PUT update recipe
router.put("/api/recipes/:recipeId", async function (req, res, next) {
  const id = req.params.recipeId;
  console.log(id + "detta är id");
  
     await RecipeModel.findByIdAndUpdate(id, req.body /* title: req.body.title, ingredients: req.body.ingredients, howTo: req.body.howTo */, {
      useFindAndModify: false,
    })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "recipe changed",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

//DELETE recipe by id
router.delete("/api/recipes/:recipeId", async function (req, res, next) {
  const id = req.params.recipeId;
  await RecipeModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "recipe deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
