import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom";

export default function UserPage() {

  const [recipes, setRecipe] = useState([]);
  let [goToRecipeForm, setGoToRecipeForm] = useState(false)


  function redirectToRecipeForm() {
    setGoToRecipeForm(true)
  }

  if(goToRecipeForm) {
    return <Redirect to="/recipeform" />
  }

  function getRecipes() {
      fetch("http://localhost:4000/api/recipes")
      .then((response) => response.json())
      .then((recipes) => {
        setRecipe(recipes);
      })}


  return ( 
  <div>
    <button onClick={getRecipes}>Hämta alla recept</button>
    <button onClick={redirectToRecipeForm}>Skapa nytt recept</button>
        {recipes.map((x, i) => (
          <div key={i}>
            <h4>{x.title}</h4>
            <ul>
              {x.ingredients}
            </ul>
        <div>{x.howTo}</div>
          </div>
        ))}
  </div>)
}