import React, { useState, useEffect } from "react";

export default function MainContent() {
  const [recipes, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    fetch("http://localhost:4000/api/recipes")
      .then((response) => response.json())
      .then((recipes) => {
        setRecipe(recipes);
      });
  }

  return (
    <div className="mainDiv">
      {recipes.map((recipe, i) => (
        <div className="recipeMainDiv" key={i}>
          <h3 style={{ textAlign: "center" }}>{recipe.title}</h3>
          <u>Du behöver: </u>
          <p>{recipe.ingredients}</p>
          <u>Tillvägagångssätt: </u>
          <div>{recipe.howTo}</div>
        </div>
      ))}
    </div>
  );
}
