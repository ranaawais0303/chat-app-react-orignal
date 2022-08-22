import { Link, useParams } from "react-router-dom";
import chatRooms from "../../data/chatRooms";

import "./ChatRoom.css";
const ChatRoom = (props) => {
  const params = useParams();

  const room = chatRooms.find((x) => x.id === props.id);
  if (!room) {
    // TODO: 404
  }

  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link to="/">⬅️ Back to all rooms</Link>
      </div>
      <div className="messages-container"></div>
    </>
  );
};

export default ChatRoom;
