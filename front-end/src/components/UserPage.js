import React from "react";
import { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserPage() {
  const { userData } = useContext(UserContext);

  const history = useHistory();

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

  function deleteRecipe(id) {
    fetch("http://localhost:4000/api/recipes/" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        console.log("deleted");
        getRecipes();
      }
      if (response.status === 500) {
        console.log("funkar inte");
      }
    });
  }

  function changeRecipe(id) {  
    history.push({
      pathname: "/changerecipe",
      id: id,
    });
  }

  return (
    
    <div className="stylethisdiv">
      <button onClick={getRecipes}>Hämta alla recept</button>
      <button onClick={redirectToRecipeForm}>Skapa nytt recept</button>
    
      <div className="userPage">
        {recipes.map((x, i) => (
          <div className="recipeBoxStyle" key={i}>
           <h3 style={{textAlign: "center"}}>{x.title}</h3>
           <u>Du behöver: </u>
          <ul>{x.ingredients}</ul>
          <u>Tillvägagångssätt: </u>
          <div>{x.howTo}</div>
            <div className="deleteAndChangeButtons">
              <button  onClick={() => {changeRecipe(x._id)}}>Ändra</button>
              <button
                onClick={() => {
                  deleteRecipe(x._id);
                }}
              >
                Radera
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
}
