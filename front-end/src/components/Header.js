import React, { useState } from "react"
import { Redirect } from "react-router-dom"

export default function Header() {

  const [goToLoginPage, setGoToLogin] = useState(false)
  const [goToCreatePage, setGoToCreate] = useState(false)
  const [goToStartPage, setGoToStartPage] = useState(false)

  function goToStart() {
    setGoToStartPage(true)
  }

  if(goToStartPage) {
    return <Redirect to="/" />
  }

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
       <h1 onClick={goToStart}>HerbaScript</h1>
       <div className="loginDiv">
         <button onClick={login}>Login</button>
         <button onClick={createUser}>New user</button>

       </div>
      </header>
  )
}