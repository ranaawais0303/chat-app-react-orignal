import React, { useEffect } from "react";
import { getMessages } from "../firebase";

function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);
    return unsubscribe;
  }, [roomId]);

  return messages;
}

export default useMessages;
