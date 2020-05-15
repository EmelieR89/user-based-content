import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserPage() {
  const { userData } = useContext(UserContext);

  const [recipes, setRecipe] = useState([]);

  const history = useHistory();

  // Users name, from loginpage
  const userName = userData.name;

  function getRecipes() {    
    fetch("http://localhost:4000/api/recipes/" + userData.id, {
    credentials: "include"})
     .then((response) => response.json())
      .then((recipes) => {
        // sätt 404 här response.status > 300 
        setRecipe(recipes);
      })
  }

  function deleteRecipe(id) {
    fetch("http://localhost:4000/api/recipes/" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        console.log("deleted");
        getRecipes();
      }
      if (response.status === 500) {
        console.log("Can't delete recipe");
      }
    });
  }

  // Redirects to changerecipe with the Id of the recipe the user wants to edit.
  function changeRecipe(id) {
    history.push({
      pathname: "/changerecipe",
      id: id,
    });
  }

  return (
    <div>
      <div className="styleUserPage">
        <h2>Välkommen {userName}!</h2>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Logga ut
        </button>
        <button onClick={getRecipes}>Hämta alla recept</button>
        <button
          onClick={() => {
            history.push("./recipeform");
          }}
        >
          Skapa nytt recept
        </button>

        <div className="userPage">
          {recipes.map((recipe, i) => (
            <div className="recipeBoxStyle" key={i}>
              <h3 style={{ textAlign: "center" }}>{recipe.title}</h3>
              <u>Du behöver: </u>
              <p>{recipe.ingredients}</p>
              <u>Tillvägagångssätt: </u>
              <div className="howToDiv">{recipe.howTo}</div>
              <div className="deleteAndChangeButtons">
                <button
                  onClick={() => {
                    changeRecipe(recipe._id);
                  }}
                >
                  Ändra
                </button>
                <button
                  onClick={() => {
                    deleteRecipe(recipe._id);
                  }}
                >
                  Radera
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
