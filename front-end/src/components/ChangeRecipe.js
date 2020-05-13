import React, { useEffect, useState } from "react";

export default function ChangeRecipe(props) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    let recipeId = props.location.id;
    console.log(recipeId + "här är id på sida två");
    fetch("http://localhost:4000/api/recipes/recipe/" + recipeId)
      .then((response) => response.json())
      .then((recipe) => {
        setRecipe(recipe);
      });
  }

  return (
    <div className="mainDiv">
      <div className="recipeDiv">
        <input type="text" value={recipe.title}></input>
        <h4>{recipe.title}</h4>
        <p>{recipe.ingredients}</p>
        <p>{recipe.howTo}</p>
      </div>
    </div>
  );
}
