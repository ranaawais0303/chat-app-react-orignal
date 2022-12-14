import React, { useEffect, useRef } from "react";
import useMessages from "../../hooks/useMessages";
import { useAuth } from "../../context/AuthContext";
import parse from "html-react-parser";

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
  const containerRef = useRef(null);
  const messageEndRef = useRef(null);

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
  useEffect(() => {
    if (messages.length > 0) {
      messageEndRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((x) => {
          let a = "";
          if (date !== weekday[x.timestamp?.toDate()?.getDay()]) {
            a = weekday[x.timestamp?.toDate()?.getDay()];
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
        <div ref={messageEndRef} />
      </ul>
    </div>
  );
}

function Message({ message, isOwnMessage, date }) {
  const { displayName, text, photo, timestamp } = message;
  return (
    <>
      <label className="lab">
        {date && date !== ""
          ? `------${timestamp?.toDate().toDateString()}------`
          : ""}
      </label>
      <li className={["message", isOwnMessage && "own-message"].join(" ")}>
        <img className="img" src={photo} alt="Avatar"></img>
        <div>
          <p className="sender">{isOwnMessage ? "You" : displayName}</p>
          <div>
            <div className="text">{parse(text)}</div>
            <label className={isOwnMessage ? "time-left" : "time-right"}>
              {timestamp
                ? ` ${timestamp?.toDate()?.getHours()}:${timestamp
                    ?.toDate()
                    ?.getMinutes()}`
                : "..."}
            </label>
          </div>
        </div>
      </li>
    </>
  );
}

export default MessageList;
