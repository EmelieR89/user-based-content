import React from "react";
import "./App.css";
import MainContent from "./components/MainContent.js";
import Header from "./components/Header.js"
import LoginPage from "./components/LoginPage"
import CreateUserPage from "./components/CreateUserPage"
import { Switch, Route, BrowserRouter } from "react-router-dom";
import UserPage from "./components/UserPage";
import RecipeForm from "./components/RecipeForm"


function App() { 

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
                <MainContent />
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/createuser" component={CreateUserPage} />
          <Route path="/userpage" component={UserPage} />
          <Route path="/recipeform" component={RecipeForm} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
