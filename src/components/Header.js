import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

function Header(props) {
  const history = useHistory();

  const { user } = useAuth();
  //////////logout //////////
  const handleLogut = async () => {
    await auth.signOut();
    history.push("/");
  };
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatApp</div>
        <div onClick={handleLogut} className="logout-tab">
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;
