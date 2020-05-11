import React, { useState } from "react"

export default function LoginPage() {
  // const [data, setData] = useState([])
  let [userName, setUserName] = useState([])
  let [userPassword, setUserPassword] = useState([])

  function userAuthorization(){
    console.log(userName, userPassword + "namn och lösen");
    
    let user = {
      name: userName,
      password: userPassword,
    }

    console.log(user);
    
      fetch("http://localhost:4000/api/users/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),  
      })
      .then((response) => {
        if(response.status === 200) {
          console.log("du är inloggad");
        }
        
        if(response.status === 401) {
          console.log("du får inte vara med");
        }
      })
        // // .then((response) => response.json())

        // // .then((data) => {
        // //   setData(data);
        // });
  }
 

  return (
    <div className="loginDiv">
      <input className="userName" type="text" required placeholder="Användarnamn" onChange={event => setUserName(event.target.value)}></input>
      <input className="userPassword" type="password" required placeholder="Lösenord" onChange={event => setUserPassword(event.target.value)} ></input>
      <button onClick={() => userAuthorization()}>Logga in!</button>
    </div>
  )
}