/* eslint-disable no-unused-vars */
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
//         { sender: "bot", text: "Sorry, I couldn't get a response. Please try again." },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [chat]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl h-[90vh] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//         <header className="border-b border-gray-200 px-6 py-4">
//           <h1 className="text-xl font-medium text-gray-800">Movie Q&A</h1>
//           <p className="text-sm text-gray-500">Ask me anything about films</p>
//         </header>

//         <ChatWindow chat={chat} isTyping={isTyping} ref={chatWindowRef} onSend={handleSend} />

//         <MessageInput onSend={handleSend} />
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useRef, useEffect } from "react";
import { FiFilm, FiSend, FiClock } from "react-icons/fi";
import { FaFilm, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { sendMessageToBot } from "./services/api";

const App = () => {
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (message) => {
    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await sendMessageToBot(message);
      // Simulate typing delay based on response length
      const typingDelay = Math.min(Math.max(res.answer.length * 20, 1000), 3000);
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
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
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chat]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="mx-auto w-16 h-16 rounded-full border-4 border-gray-300 border-t-indigo-500 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Loading Movie Q&A</h2>
          <p className="text-gray-500 mt-2">Preparing your cinematic experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl h-[90vh] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      >
        <header className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaFilm className="text-white text-xl" />
            <h1 className="text-xl font-semibold text-white">Movie Q&A</h1>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-white/80"></div>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </header>

        <ChatWindow chat={chat} isTyping={isTyping} ref={chatWindowRef} onSend={handleSend} />

        <MessageInput onSend={handleSend} />
      </motion.div>
    </div>
  );
};

export default App;