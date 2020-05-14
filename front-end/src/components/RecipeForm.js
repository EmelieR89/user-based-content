import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export default function RecipeForm() {
  const { userData } = useContext(UserContext);

  let [recipeTitle, setRecipeTitle] = useState([]);
  let [recipeIngredients, setIngredients] = useState([]);
  let [recipeHowTo, setHowTo] = useState([]);
  let [currentIngredient, setcurrentIngredient] = useState([])
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

  function addIngredients(){
    let ingredients = recipeIngredients
    ingredients.push(currentIngredient)
    setIngredients(ingredients)
    console.log(recipeIngredients);
    
  }

  return (
    <div className="recipeform">
      <h2>Lägg till ett recept</h2>
      <input
        type="text"
        placeholder="title"
        onChange={(event) => setRecipeTitle(event.target.value)}
      ></input>
      <input
        // value={currentIngredient}
        type="text"
        placeholder="ingredienser"
        onChange={(event) => setcurrentIngredient(event.target.value)}
      ></input>
      {/* <button onClick={addIngredients}>Add ingredients</button>
    <ul>
      {
        recipeIngredients.map((ingredient, i) => {
          return <li key={i}>{ingredient}</li>
        })
      } 
    </ul> */}
      <textarea
        placeholder="Hur"
        onChange={(event) => setHowTo(event.target.value)}
      ></textarea>
      <button onClick={createRecipe}>Skapa recept</button>
    </div>
  );
}
