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
        <input type="text" defaultValue={recipe.title}></input>
        <input type="text" defaultValue={recipe.ingredients}></input>
        <textarea defaultValue={recipe.howTo}></textarea>
        <button>Spara</button>
      </div>
    </div>
  );
}
