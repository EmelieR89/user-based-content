import React, { useState } from "react"
import { Redirect } from "react-router-dom"

export default function Header() {

  const [goToLoginPage, setGoToLogin] = useState(false)
  const [goToCreatePage, setGoToCreate] = useState(false)


  function login() {
    setGoToLogin(true)
  }

  if(goToLoginPage) {
    return <Redirect to="/login" />
  }

  function createUser() {
    setGoToCreate(true)
  }
  if(goToCreatePage) {
    return <Redirect to="/createuser" />
  }

  return (
    <header className="App-header">
       <h1>HerbaScript</h1>
       <div className="loginDiv">
         <button onClick={login}>Login</button>
         <button onClick={createUser}>New user</button>

       </div>
      </header>
  )
}