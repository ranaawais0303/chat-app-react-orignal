import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();
/////////auth context//////////////////
export const useAuth = () => useContext(AuthContext);
//////////auth Provider//////////////////

export const AuthProvider = ({ children }) => {
  ////initial loading state///////////////
  const [loading, setLoading] = useState(true);

  ///////state for user
  const [user, setUser] = useState(null);

  //////history///////////////
  const history = useHistory();

  /////////useEffect//////////
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [user, history]);

  ////////set value////////////
  const value = { user };

  /////////jsx//////////////////
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
