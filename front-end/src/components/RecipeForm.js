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
    alert("Recipe has been created");
    history.push("/userpage");
  }

  return (
    <div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Logga ut
      </button>
      <div className="recipeform">
        <h2>Lägg till ett recept</h2>
        <input
          type="text"
          placeholder="title"
          onChange={(event) => setRecipeTitle(event.target.value)}
        ></input>
        <textarea
          type="text"
          placeholder="ingredienser"
          onChange={(event) => setIngredients(event.target.value)}
        ></textarea>
        <textarea
          placeholder="Hur"
          onChange={(event) => setHowTo(event.target.value)}
        ></textarea>
        <button onClick={createRecipe}>Skapa recept</button>
      </div>
    </div>
  );
}
