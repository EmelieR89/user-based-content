import React, {useState} from "react"
import {useHistory} from "react-router-dom"

export default function RecipeForm() {

  let [recipeTitle, setRecipeTitle] = useState([])
  let [recipeIngredients, setIngredients] = useState([])
  let [recipeHowTo, setHowTo] = useState([])
  const history = useHistory();
  
  function createRecipe() {

    let recipe = {
      title: recipeTitle,
      ingredients: recipeIngredients,
      howTo: recipeHowTo,
    }

    fetch("http://localhost:4000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
      })
        redirectToUserPage()
  }

  function redirectToUserPage() {
    history.push("/userpage");
  }

  function addIngredients(){
    
  }


  return (
    <div className="recipeform">
      <input type="text" placeholder="title" onChange={event => setRecipeTitle(event.target.value)}></input>
      <div onChange={event => setIngredients(event.target.value)}>
        <input type="text" placeholder="ingredienser"></input>
      </div>
      <button onClick={addIngredients}>Lägg till ingrediens</button>
      <textarea rows="10" columns="10" placeholder="Hur" onChange={event => setHowTo(event.target.value)}></textarea>
      <button onClick={createRecipe}>Skapa recept</button>
    </div>
  )
}