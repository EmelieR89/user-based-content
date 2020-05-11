import React, {useState, useEffect} from "react"

export default function MainContent() {
  const [recipes, setRecipe] = useState([]);

  useEffect(()=> {
    getRecipes()
  })

  function getRecipes() {
    fetch("http://localhost:4000/api/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      setRecipe(recipes);
    })}

    return ( 
      <div className="mainDiv">
            {recipes.map((x, i) => (
              <div className="recipeDiv" key={i}>
                <h4>{x.title}</h4>
                <ul>
                  {x.ingredients}
                </ul>
            <div>{x.howTo}</div>
              </div>
            ))}
      </div>)
 
}

