import React from "react";
import useMessages from "../../hooks/useMessages";
import { useAuth } from "../../context/AuthContext";
import "./MessageList.css";
function MessageList({ roomId }) {
  const containerRef = React.useRef(null);
  const { user } = useAuth();
  const messages = useMessages(roomId);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((x) => (
          <Message
            key={x.id}
            message={x}
            isOwnMessage={x.uid === user.uid}
            timestamp={x.timestamp}
            user={user}
            // timestamp={x.timestamp}
          />
        ))}
      </ul>
    </div>
  );
}

function Message({ message, isOwnMessage }) {
  const { displayName, text, photo, timestamp } = message;
  return (
    <li className={["message", isOwnMessage && "own-message"].join(" ")}>
      <img className="img" src={photo} alt="Avatar"></img>
      <div>
        <p className="sender">{isOwnMessage ? "You" : displayName}</p>
        <div>
          <div className="text">{text}</div>
          <label className={isOwnMessage ? "time-left" : "time-right"}>
            {`${timestamp?.toDate()?.getHours()}:${timestamp
              ?.toDate()
              ?.getMinutes()}`}
          </label>
        </div>
      </div>
    </li>
  );
}

export default MessageList;
