import React, { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent.js";
import Header from "./components/Header.js"
import LoginPage from "./components/LoginPage"
import CreateUserPage from "./components/CreateUserPage"
import { Switch, Route, BrowserRouter } from "react-router-dom";


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
    <BrowserRouter>
       <div className="App">
      <Header />
      <button onClick={() => getStuff()}>tryck här!</button>
        {data.map((x, i) => (
          <div key={i}>
            <h4>{x.name}</h4>
            <p>{x.password}</p>
          </div>
        ))}
        <Switch>
          <Route exact path="/">
      <MainContent />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="/createuser" component={CreateUserPage} />
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
