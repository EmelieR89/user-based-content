import React from "react"

export default function CreateUser() {
  return (
    <div className="loginDiv">
    <input type="text" required placeholder="Användarnamn"></input>
    <input type="password" required placeholder="Lösenord"></input>
    <button>Skapa användare</button>
  </div>
  )
}