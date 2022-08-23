import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";

import Chats from "../components/Chats/Chats";
import Login from "./Login";
import ChatRoom from "./Chats/ChatRoom";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/chats" exact>
              <Chats />
            </Route>
            <Route path="/chats/:id">
              <ChatRoom />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
