import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import chatRooms from "../../data/chatRooms";
import "./Chats.css";
import ChatRoom from "./ChatRoom";

const Chats = (props) => {
  const history = useHistory();

  const { user } = useAuth();
  console.log(user);

  const [id, setId] = useState(null);

  //////////logout //////////
  const handleLogut = async () => {
    await auth.signOut();
    history.push("/");
  };

  ///////////////////////////
  return (
    <>
      {!id && (
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
                <Link to={`/chats/${room.id}`}>{room.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {id && <ChatRoom id={id} />}
    </>
  );
};

export default Chats;
