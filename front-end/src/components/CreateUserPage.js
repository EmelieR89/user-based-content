import React, { useState } from "react";

export default function CreateUser() {
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();

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
    }).then( (response) => {
      if (response.status === 409) {
        alert("Användarnamnet är upptaget. Försök igen.");
      }
      if (response.status === 201) {
        alert("Användaren har skapats");
      }
      if (response.status === 500) {
        alert("Något gick fel. Försök igen. ");
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
