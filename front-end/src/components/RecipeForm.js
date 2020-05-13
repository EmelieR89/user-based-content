import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export default function RecipeForm() {
  const { userData } = useContext(UserContext);

  let [recipeTitle, setRecipeTitle] = useState([]);
  let [recipeIngredients, setIngredients] = useState([]);
  let [recipeHowTo, setHowTo] = useState([]);
  const history = useHistory();

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
    });
    redirectToUserPage();
  }

  function redirectToUserPage() {
    history.push("/userpage");
  }

  function addIngredients() {}

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
