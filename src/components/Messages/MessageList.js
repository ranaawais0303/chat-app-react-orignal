import React, { useEffect, useState } from "react";
import useMessages from "../../hooks/useMessages";
import { useAuth } from "../../context/AuthContext";
import "./MessageList.css";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function MessageList({ roomId }) {
  const containerRef = React.useRef(null);
  const { user } = useAuth();
  const messages = useMessages(roomId);

  // useEffect(()=>{
  //   if(messages){}
  // })

  let date = "";
  // useEffect(() => {
  //   if (messages.length > 0) {
  //     date = weekday[messages[0].timestamp.toDate().getDay()];
  //   }
  // }, [messages]);
  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((x) => {
          let a = "";
          if (date !== weekday[x.timestamp.toDate().getDay()]) {
            a = weekday[x.timestamp.toDate().getDay()];
            date = a;
          }
          return (
            <Message
              key={x.id}
              message={x}
              date={a}
              isOwnMessage={x.uid === user.uid}
              timestamp={x.timestamp}
              user={user}
              // timestamp={x.timestamp}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Message({ message, isOwnMessage, date }) {
  const { displayName, text, photo, timestamp } = message;
  return (
    <>
      <label className="lab"> {date !== "" ? `------${date}------` : ""}</label>
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
    </>
  );
}

export default MessageList;
