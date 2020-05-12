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


  function deleteRecipes(id){
    fetch("http://localhost:4000/api/recipes/:recipeId" + id, {
      method: "DELETE",
      headers: {      
        'Content-Type': 'application/json'    
      },
      body: JSON.stringify()
    }).then((response) => {
      if (response.status === 200) {
        console.log("Has been deleted");
      }
      if (response.status === 500) {
        console.log("det gick inte");
    }
  })
}

  return ( 
    <div>
        <button onClick={getRecipes}>Hämta alla recept</button>
    <button onClick={redirectToRecipeForm}>Skapa nytt recept</button>
      <div className="userPage">
        {recipes.map((x, i) => (
          <div className="recipeBoxStyle"  key={i} >
            <h4>{x.title}</h4>
              <ul>
              <li>{x.ingredients}</li>
              </ul>
              <span>{x.howTo}</span>
              <div className="deleteAndChangeButtons"> 
                <button>Ändra</button>
                <button onClick={() => deleteRecipes()}>Radera</button>
              </div>
             
          </div>
        ))}
        </div>
  </div>)
  
}