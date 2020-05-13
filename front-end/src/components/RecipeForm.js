import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export default function RecipeForm() {
  let [recipeTitle, setRecipeTitle] = useState([]);
  let [recipeIngredients, setIngredients] = useState([]);
  let [recipeHowTo, setHowTo] = useState([]);

  const { userData } = useContext(UserContext);

  function createRecipe() {
    console.log(userData);
    let recipe = {
      title: recipeTitle,
      createdBy: userData.id,
      ingredients: recipeIngredients,
      howTo: recipeHowTo,
    };

    fetch("http://localhost:4000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    }).then((response) => {
      alert("Receptet har lagts till");
    });
  }

  return (
    <form className="recipeform">
      <input
        type="text"
        placeholder="title"
        onChange={(event) => setRecipeTitle(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="ingredienser"
        onChange={(event) => setIngredients(event.target.value)}
      ></input>
      <textarea
        rows="10"
        columns="10"
        placeholder="Hur"
        onChange={(event) => setHowTo(event.target.value)}
      ></textarea>
      <button onClick={createRecipe}>Skapa recept</button>
    </form>
  );
}
