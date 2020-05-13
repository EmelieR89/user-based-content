import React, {useEffect, useState} from "react"

export default function ChangeRecipe(props){
  
    const [recipes, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    let recipeId = JSON.stringify(props.location.id)
    console.log(JSON.stringify(props.location.id) + "här är id på sida två");
    fetch("http://localhost:4000/api/recipes/recipe" + recipeId, )
      .then((response) => console.log(JSON.stringify(response))
      )
      .then((recipes) => {
        setRecipe(recipes);
      });
  }

  return (
    <div className="mainDiv">
      {/* {recipes.map((x, i) => (
        <div className="recipeDiv" key={i}>
          <h4>{x.title}</h4>
          <ul>{x.ingredients}</ul>
          <div>{x.howTo}</div>
        </div>
      ))} */}
    </div>
  );
}