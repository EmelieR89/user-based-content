import React, { useState } from "react";

export const UserContext = React.createContext({
  userData: {},
  setUser: () => {},
});

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState("");

  const setUser = (user) =>
    setUserData({ name: user.userName, id: user.userId });

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
