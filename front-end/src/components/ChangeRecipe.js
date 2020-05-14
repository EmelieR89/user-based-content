import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

export default function ChangeRecipe(props) {
  const [recipe, setRecipe] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeHowTo, setRecipeHowTo] = useState([]);

  const history = useHistory();
  let recipeId = props.location.id;



  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    console.log(recipeId + "här är id på sida två");
    fetch("http://localhost:4000/api/recipes/recipe/" + recipeId)
      .then((response) => response.json())
      .then((recipe) => {
        setRecipe(recipe);
      });
  }

  function saveRecipe() {
    console.log(recipeId + "här är id i saverecipe");
    console.log(recipeTitle + "detta är recipetitle");
    console.log(recipeHowTo + "detta är howto");
    
    
    const recipeUpdated = recipe
    recipeUpdated.title = recipeTitle
    recipeUpdated.ingredients = recipeIngredients
    recipeUpdated.howTo = recipeHowTo
    
    fetch("http://localhost:4000/api/recipes/" + recipeId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeUpdated),
      }).then((response) => {
      if (response.status === 200) {
        alert("receptet har ändrats")
        history.push("/userpage")
      }
      if (response.status === 400) {
        console.log("funkar inte att ändra");
      }
    });
  }  


  return (
    <div className="mainDiv">
      <div className="recipeDiv">
        <input type="text" defaultValue={recipe.title} onChange={event => setRecipeTitle(event.target.value)}></input>
        <input type="text" defaultValue={recipe.ingredients} onChange={event => setRecipeIngredients(event.target.value)}></input>
        <textarea defaultValue={recipe.howTo} onChange={event => setRecipeHowTo(event.target.value)}></textarea>
        <button onClick={() => {saveRecipe(recipeId)}}>Spara</button>
      </div>
    </div>
  );
}
