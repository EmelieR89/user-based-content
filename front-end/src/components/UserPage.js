import React from "react"
import { useState } from "react"
import { Redirect, useHistory } from "react-router-dom";

export default function UserPage() {

  const history = useHistory();

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


    function deleteRecipe (id)  {

      fetch("http://localhost:4000/api/recipes/" + id, {
        method: "DELETE",
      })
      .then((response) => {
        if(response.status === 200) {
          console.log("deleted"); 
          getRecipes() 
        } if(response.status === 500) {
          console.log("funkar inte");
          
        }
      });
    }
  

function changeRecipe(){
  history.push("/changerecipe");
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
                <button onClick={changeRecipe}>Ändra</button>
                <button onClick={() => {deleteRecipe(x._id)}}>Radera</button>
              </div>
             
          </div>
        ))}
        </div>
  </div>)
  
}