import { Link, useParams } from "react-router-dom";
import chatRooms from "../../data/chatRooms";
import Header from "../Headers/Header";
import MessageList from "../Messages/MessageList";
import MessageInput from "../Messages/MessageInput";

import "./ChatRoom.css";
const ChatRoom = (props) => {
  console.log("from chat room ", props.id);
  const params = useParams();

  const room = chatRooms.find((x) => x.id === params.id);
  if (!room) {
    // TODO: 404
  }

  return (
    <div className="chats-page">
      <Header />
      <h2>{room.title}</h2>
      <div>
        <Link to="/chats">⬅️ Back to all rooms</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={room.id} />
        <MessageInput roomId={room.id} />
      </div>
    </div>
  );
};

export default ChatRoom;
