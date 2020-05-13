import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const { userData, setName, setId } = useContext(UserContext);

  const [userName, setUserName] = useState([]);
  const [userPassword, setUserPassword] = useState([]);
  const history = useHistory();

  function redirectToUserPage() {
    history.push("/userpage");
  }

  function userAuthorization() {
    console.log(userName, userPassword + "namn och lösen");

    let user = {
      name: userName,
      password: userPassword,
    };

    fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (response) => {
      if (response.status === 200) {
        let dataFromBackend = await response.json();
        console.log(dataFromBackend);
        setId(dataFromBackend.userId);
        redirectToUserPage();
      }

      if (response.status === 401) {
        console.log("du får inte vara med");
      }
    });
  }

  return (
    <div className="loginDiv">
      <input
        className="userName"
        type="text"
        required
        placeholder="Användarnamn"
        onChange={(event) => setUserName(event.target.value)}
      ></input>
      <input
        className="userPassword"
        type="password"
        required
        placeholder="Lösenord"
        onChange={(event) => setUserPassword(event.target.value)}
      ></input>
      <button onClick={() => userAuthorization()}>Logga in!</button>
    </div>
  );
}
