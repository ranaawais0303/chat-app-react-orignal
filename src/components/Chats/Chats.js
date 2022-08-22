import React from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import chatRooms from "../../data/chatRooms";
import "./Chats.css";

const Chats = (props) => {
  const history = useHistory();

  const { user } = useAuth();
  console.log(user);

  //////////logout //////////
  const handleLogut = async () => {
    await auth.signOut();
    history.push("/");
  };

  ///////////////////////////
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatApp</div>
        <div onClick={handleLogut} className="logout-tab">
          Logout
        </div>
      </div>
      <h2>Choose a Chat Room</h2>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.id}>
            {room.title}
            {/* <ChatRoom /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
