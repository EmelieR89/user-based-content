import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const getStuff = async () => {
    await fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getStuff()}>tryck här!</button>
        {data.map((x, i) => (
          <div key={i}>
            <h4>{x.name}</h4>
            <p>{x.age}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
