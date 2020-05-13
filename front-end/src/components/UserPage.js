import React from "react";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserPage() {
  const { userData } = useContext(UserContext);

  const [recipes, setRecipe] = useState([]);
  let [goToRecipeForm, setGoToRecipeForm] = useState(false);

  function redirectToRecipeForm() {
    setGoToRecipeForm(true);
  }

  if (goToRecipeForm) {
    return <Redirect to="/recipeform" />;
  }

  function getRecipes() {
    fetch("http://localhost:4000/api/recipes/" + userData.id)
      .then((response) => response.json())
      .then((recipes) => {
        console.log("Förhopningsvis massa recept : ", recipes);
        setRecipe(recipes);
      });
  }

  return (
    <div>
      <button onClick={getRecipes}>Hämta alla dina recept</button>
      <button onClick={redirectToRecipeForm}>Skapa nytt recept</button>
      {recipes.map((x, i) => (
        <div key={i}>
          <h4>{x.title}</h4>
          <ul>{x.ingredients}</ul>
          <div>{x.howTo}</div>
        </div>
      ))}
    </div>
  );
}
