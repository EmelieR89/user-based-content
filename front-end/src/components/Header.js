import React from "react";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  return (
    <header className="App-header">
      <h1 onClick={() => history.push("/")} style={{ margin: "2rem" }}>
        HerbaScript
      </h1>
      <div className="loginDiv">
        <button onClick={() => history.push("/login")}>Login</button>
        <button onClick={() => history.push("/createuser")}>
          Ny användare
        </button>
      </div>
    </header>
  );
}
