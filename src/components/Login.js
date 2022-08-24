import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Login(props) {
  const history = useHistory();
  const user = useAuth();
  const googleRedirect = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    if (user) {
      history.push("/chats");
    }
  };
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Awais Chat app</h2>
        <div className="login-button google" onClick={googleRedirect}>
          <GoogleOutlined /> Sign In with Google
        </div>
      </div>
    </div>
  );
}

export default Login;
