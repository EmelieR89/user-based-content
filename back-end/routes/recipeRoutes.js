const express = require("express");
const RecipeModel = require("../models/recipeModel");

const router = express.Router();

// GET all recipes
router.get("/api/recipes", async function (req, res) {
  try {
    let recipes = await RecipeModel.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({
      message: "could not find recipes",
      error: error,
    });
  }
});

// GET specific recipe by Id
router.get("/api/recipes/recipe/:recipeId", async function (req, res) {
  const id = req.params.recipeId;
  try {
    const recipeWeEdit = await RecipeModel.findById(id);
    res.status(200).json(recipeWeEdit);
  } catch (error) {
    res.status(400).json({
      message: "Could not get recipe",
      error: error,
    });
  }
});

//GET recipes for one specific user.
router.get("/api/recipes/:userId", async function (req, res) {
  const userId = req.params.userId;
  try {
    const userRecipes = await RecipeModel.find({
      createdBy: userId,
    }).exec();
    res.status(200).json(userRecipes);
  } catch (err) {
    res.status(400).json({
      message: "recipe deleted",
      error: error,
    });
  }
});

// POST new recipe
router.post("/api/recipes", async function (req, res) {
  const recipe = req.body;
  try {
    const recipeDoc = await new RecipeModel(recipe);
    const savedRecipeDoc = await recipeDoc.save();
    res.status(200).json(savedRecipeDoc);
  } catch (error) {
    res.status(400).json({
      message: "Recipe has not been created",
      error: error,
    });
  }
});

// PUT update recipe
router.put("/api/recipes/:recipeId", async function (req, res) {
  const id = req.params.recipeId;
  await RecipeModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Recipe has been changed",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
});

//DELETE recipe by id
router.delete("/api/recipes/:recipeId", async function (req, res) {
  const id = req.params.recipeId;
  await RecipeModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Recipe has been deleted.",
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
