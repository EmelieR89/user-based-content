import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateUser() {
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();

  const history = useHistory();

  function createNewUser() {
    let newUser = {
      name: userName,
      password: userPassword,
    };

    fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(async (response) => {
      if (response.status === 409) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
      }
      if (response.status === 201) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
        history.push("/login");
      }
      if (response.status === 500) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
      }
    });
  }

  return (
    <div className="loginDiv">
      <input
        onChange={(event) => setUserName(event.target.value)}
        type="text"
        required
        placeholder="Användarnamn"
      ></input>
      <input
        onChange={(event) => setUserPassword(event.target.value)}
        type="password"
        required
        placeholder="Lösenord"
      ></input>
      <button onClick={createNewUser}>Skapa användare</button>
    </div>
  );
}
