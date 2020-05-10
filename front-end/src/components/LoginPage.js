import React from "react"

export default function LoginPage() {
  return (
    <div className="loginDiv">
      <input type="text" required placeholder="Användarnamn"></input>
      <input type="password" required placeholder="Lösenord"></input>
      <button>Logga in</button>
    </div>
  )
}