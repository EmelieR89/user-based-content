import React, { useState } from "react";

export const UserContext = React.createContext({
  userData: {},
  setName: () => {},
  setId: () => {},
});

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState("");

  const setName = (name) => setUserData({ ...userData, name });
  const setId = (id) => setUserData({ ...userData, id });

  return (
    <UserContext.Provider value={{ userData, setName, setId }}>
      {props.children}
    </UserContext.Provider>
  );
};
