import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function ChangeRecipe(props) {
  const [recipe, setRecipe] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeHowTo, setRecipeHowTo] = useState([]);

  const history = useHistory();

  //Id for the recipe user wants to edit (passed from userpage)
  let recipeId = props.location.id;
  console.log(recipeId + " detta är receptidt");
  

  // The recipe user want to change shown when the component render
  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    fetch("http://localhost:4000/api/recipes/recipe/" + recipeId, {
       credentials: "include" })
      .then((response) => response.json())
      .then((recipe) => {
        setRecipe(recipe);
      });
  }

  // Runs when the user has edited the recipe. If not all input divs are changes, they keep their old value.
  function saveRecipe() {
    let recipeUpdated = recipe;
    recipeUpdated.title = recipeTitle.length <= 0 ? recipe.title : recipeTitle;
    recipeUpdated.ingredients =
      recipeIngredients.length <= 0 ? recipe.ingredients : recipeIngredients;
    recipeUpdated.howTo = recipeHowTo.length <= 0 ? recipe.howTo : recipeHowTo;
    

    fetch("http://localhost:4000/api/recipes/" + recipeId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(recipeUpdated),
    }).then(async (response) => {
      if (response.status === 200) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
        history.push("/userpage");
      }
      if (response.status === 400) {
        console.log(await response.json());
      }
    });
  }

  return (
    <div className="recipeFormMainDiv">
      <aside className="logOutButton">
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Logga ut
      </button>
      </aside>
      <div className="changeRecipeForm">
        <h2>Redigera receptet</h2>
        <input
          type="text"
          defaultValue={recipe.title}
          onChange={(event) => setRecipeTitle(event.target.value)}
        ></input>
        <textarea
          type="text"
          defaultValue={recipe.ingredients}
          onChange={(event) => setRecipeIngredients(event.target.value)}
        ></textarea>
        <textarea
          defaultValue={recipe.howTo}
          onChange={(event) => setRecipeHowTo(event.target.value)}
        ></textarea>
        <button
          onClick={() => {
            saveRecipe(recipeId);
          }}
        >
          Spara
        </button>
      </div>
    </div>
  );
}
