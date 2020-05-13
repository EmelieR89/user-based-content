import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserPage() {
  const { userData } = useContext(UserContext);

  const history = useHistory();

  const [recipes, setRecipe] = useState([]);

  function redirectToRecipeForm() {
    history.push("/recipeform")
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

 function changeRecipe(_id) {
    history.push("/changerecipe");
  }

  return (
    <div>
      <button onClick={getRecipes}>Hämta alla recept</button>
      <button onClick={redirectToRecipeForm}>Skapa nytt recept</button>
      <div className="userPage">
        {recipes.map((x, i) => (
          <div className="recipeBoxStyle" key={i}>
            <h4>{x.title}</h4>
            <ul>
              <li>{x.ingredients}</li>
            </ul>
            <span>{x.howTo}</span>
            <div className="deleteAndChangeButtons">
              <button onClick={() => {changeRecipe(x._id)}}>Ändra</button>
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
