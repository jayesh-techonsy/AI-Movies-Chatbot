import React from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ chat }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
      {chat.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatWindow;
