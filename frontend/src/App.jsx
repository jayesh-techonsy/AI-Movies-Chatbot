// import React, { useState } from "react";
// import ChatWindow from "./components/ChatWindow";
// import MessageInput from "./components/MessageInput";
// import { sendMessageToBot } from "./services/api";

// const App = () => {
//   const [chat, setChat] = useState([]);

//   const handleSend = async (message) => {
//     const userMessage = { sender: "user", text: message };
//     setChat((prev) => [...prev, userMessage]);

//     try {
//       const res = await sendMessageToBot(message);
//       const botMessage = { sender: "bot", text: res.answer };
//       setChat((prev) => [...prev, botMessage]);
//     } catch {
//       setChat((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error: could not get response" },
//       ]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//         <header className="bg-indigo-600 text-white text-lg font-semibold px-6 py-4">
//           🎬 AI Movie Chatbot
//         </header>

//         <ChatWindow chat={chat} />

//         <MessageInput onSend={handleSend} />
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useRef, useEffect } from "react";
// import ChatWindow from "./components/ChatWindow";
// import MessageInput from "./components/MessageInput";
// import { sendMessageToBot } from "./services/api";

// const App = () => {
//   const [chat, setChat] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const chatWindowRef = useRef(null);

//   const handleSend = async (message) => {
//     const userMessage = { sender: "user", text: message };
//     setChat((prev) => [...prev, userMessage]);
//     setIsTyping(true);

//     try {
//       const res = await sendMessageToBot(message);
//       const botMessage = { sender: "bot", text: res.answer };
//       setChat((prev) => [...prev, botMessage]);
//     } catch {
//       setChat((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error: could not get response" },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [chat]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 transition-all duration-300">
//       <div className="w-full max-w-2xl h-[90vh] flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 transform transition-all duration-300 hover:shadow-2xl">
//         <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl font-bold px-6 py-5 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
//               <span className="text-purple-600 text-xl">🎬</span>
//             </div>
//             <h1>MovieMatch AI</h1>
//           </div>
//           <div className="flex space-x-2">
//             <div className="w-3 h-3 rounded-full bg-green-400"></div>
//             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//             <div className="w-3 h-3 rounded-full bg-red-400"></div>
//           </div>
//         </header>

//         <ChatWindow chat={chat} isTyping={isTyping} ref={chatWindowRef} />

//         <MessageInput onSend={handleSend} />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { sendMessageToBot } from "./services/api";

const App = () => {
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);

  const handleSend = async (message) => {
    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await sendMessageToBot(message);
      const botMessage = { sender: "bot", text: res.answer };
      setChat((prev) => [...prev, botMessage]);
    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't get a response. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[90vh] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <header className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-medium text-gray-800">Movie Q&A</h1>
          <p className="text-sm text-gray-500">Ask me anything about films</p>
        </header>

        <ChatWindow chat={chat} isTyping={isTyping} ref={chatWindowRef} onSend={handleSend} />

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;