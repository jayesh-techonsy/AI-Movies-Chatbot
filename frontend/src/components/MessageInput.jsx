import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 p-4 bg-white">
      <input
        className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ask something about movies..."
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
