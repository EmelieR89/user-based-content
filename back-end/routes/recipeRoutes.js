const express = require("express");
const RecipeModel = require("../models/recipeModel");
const { requireLogin } = require("../auth");

const router = express.Router();

// GET all recipes
router.get("/api/recipes", async function (req, res) {
  try {
    let recipes = await RecipeModel.find().populate('user');
    // recipes.forEach((recipe) => delete recipe.user.password)
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
      user: userId,
    }).populate('user').exec();
    
    console.log(userRecipes[0])
    // const recipe = {
    //   _id: 'äöaslkdjhasgd',
    //   title: String,
    //   ingredients: String,
    //   howTo: String,
    //   user: {
    //     _id: 'jahsbd8a7s6dfasdyvasd',
    //     name: 'Emelie',
    //   }
    // }
    
    // userRecipes.forEach((recipe) => delete recipe.user.password)
    

    res.status(200).json(userRecipes);
  } catch (err) {
    res.status(400).json({
      message: "recipe deleted",
      error: error,
    });
  }
});

// POST new recipe
router.post("/api/recipes", requireLogin, async function (req, res) {
  const recipe = req.body;
  recipe.user = req.session.userId
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
router.put("/api/recipes/:recipeId", requireLogin, async function (req, res) {
  const id = req.params.recipeId;
  
  await RecipeModel.findById(id)
    .exec()
    .then((recipe) => {
      console.log(recipe, req.session.userId)
      if (!recipe) {
        res.status(404).json('Recipe does not exist')
      }

      if (recipe.user == req.session.userId) {
        // update recipe
        recipe = new RecipeModel(Object.assign(recipe, req.body))
        console.log(recipe + " detta är det nya receptet");
        
        // save recipe
        recipe.save((err, recipe) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error });
          } else {
            res.status(200).json({
              message: "Recipe has been changed",
            });
          }

        })
      } else {
        res.status(403).json('Cannot update someone elses recipe')
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
});


router.delete("/api/recipes/:recipeId", requireLogin, async function (req, res) {
  const id = req.params.recipeId;

  try {
    const recipe = await RecipeModel.findById(id)
    console.log(recipe, req.session.userId)
    if (!recipe) {
      res.status(404).json('Recipe does not exist')
    }
    if (recipe.user == req.session.userId) {
      // delete recipe
      await RecipeModel.deleteOne({ _id: recipe._id })
      res.json('Recipe was deleted! Hooray!!')
    } else {
      res.status(403).json('Cannot delete other users recipe')
    }
  } catch(error) {
      console.log(error);
      res.status(500).json({ error });
  }
});

//DELETE recipe by id
/* router.delete("/api/recipes/:recipeId", requireLogin, async function (req, res) {
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
}); */

module.exports = router;
