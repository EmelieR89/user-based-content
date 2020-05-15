import React from "react";
import MainContent from "./components/MainContent.js";
import Header from "./components/Header.js";
import LoginPage from "./components/LoginPage";
import CreateUserPage from "./components/CreateUserPage";
import { Switch, Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import RecipeForm from "./components/RecipeForm";
import { UserDataProvider } from "./components/UserContext";
import ChangeRecipe from "./components/ChangeRecipe";

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/login" component={LoginPage} />
          <Route path="/createuser" component={CreateUserPage} />
          <Route path="/userpage" component={UserPage} />
          <Route path="/recipeform" component={RecipeForm} />
          <Route path="/changerecipe" component={ChangeRecipe} />
        </Switch>
      </UserDataProvider>
    </div>
  );
}

export default App;
