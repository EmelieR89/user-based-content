import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserPage(props) {
  const { userData } = useContext(UserContext);
  const [recipes, setRecipe] = useState([]);

  const history = useHistory();

  // Users name, from loginpage
  const userName = props.location.name;

  function getRecipes() {
    fetch("http://localhost:4000/api/recipes/" + userData.id)
      .then((response) => response.json())
      .then((recipes) => {
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
        console.log("Can't delete recipe");
      }
    });
  }

  //Changes to changerecipe and the ID of the recipe user wants to edit.
  function changeRecipe(id) {
    history.push({
      pathname: "/changerecipe",
      id: id,
    });
  }

  return (
    <div>
      <div className="stylethisdiv">
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
          {recipes.map((x, i) => (
            <div className="recipeBoxStyle" key={i}>
              <h3 style={{ textAlign: "center" }}>{x.title}</h3>
              <u>Du behöver: </u>
              <p>{x.ingredients}</p>
              <u>Tillvägagångssätt: </u>
              <div className="howToDiv">{x.howTo}</div>
              <div className="deleteAndChangeButtons">
                <button
                  onClick={() => {
                    changeRecipe(x._id);
                  }}
                >
                  Ändra
                </button>
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
    </div>
  );
}
