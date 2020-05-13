import React from "react";
import { useHistory, Link } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  return (
    <header className="App-header">
      <h1 onClick={() => history.push("/")}>HerbaScript</h1>
      <div className="loginDiv">
        <button onClick={() => history.push("/login")}>Login</button>
        <Link to="/createuser">
          <button>New user</button>
        </Link>
      </div>
    </header>
  );
}
