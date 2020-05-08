import React, { useState } from "react";
import "./App.css";
import MainContent from "./MainContent.js";
import Header from "./Header.js"

function App() {
  const [data, setData] = useState([]);

 

/* const [recipes, setRecipe] = useState([]);
 */

  const getStuff = async () => {
    await fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  // const getRecipes = async () => {
  //   await fetch("http://localhost:4000/api/recipes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // };

  return (
    <div className="App">
      <Header />
      <MainContent />
      <button onClick={() => getRecipes()}>tryck här!</button>
        {data.map((x, i) => (
          <div key={i}>
            <h4>{x.name}</h4>
            <p>{x.password}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
