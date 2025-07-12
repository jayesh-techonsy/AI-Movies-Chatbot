import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { sendMessageToBot } from "./services/api";

const App = () => {
  const [chat, setChat] = useState([]);

  const handleSend = async (message) => {
    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await sendMessageToBot(message);
      const botMessage = { sender: "bot", text: res.answer };
      setChat((prev) => [...prev, botMessage]);
    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: could not get response" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <header className="bg-indigo-600 text-white text-lg font-semibold px-6 py-4">
          🎬 AI Movie Chatbot
        </header>

        <ChatWindow chat={chat} />

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;
