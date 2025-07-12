/* eslint-disable no-unused-vars */
// // import React, { useState } from "react";

// // const MessageInput = ({ onSend }) => {
// //   const [input, setInput] = useState("");

// //   const handleSubmit = () => {
// //     if (!input.trim()) return;
// //     onSend(input);
// //     setInput("");
// //   };

// //   return (
// //     <div className="flex items-center gap-2 border-t border-gray-200 p-4 bg-white">
// //       <input
// //         className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
// //         placeholder="Ask something about movies..."
// //       />
// //       <button
// //         onClick={handleSubmit}
// //         className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-indigo-700"
// //       >
// //         Send
// //       </button>
// //     </div>
// //   );
// // };

// // export default MessageInput;


// import React, { useState } from "react";

// const MessageInput = ({ onSend }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <div className="border-t border-gray-700 p-4 bg-gray-800">
//       <div className="flex items-center gap-3">
//         <input
//           className="flex-1 border border-gray-600 bg-gray-700 text-white rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           placeholder="Ask about movies (e.g. 'Recommend a thriller')..."
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={!input.trim()}
//           className={`p-3 rounded-full transition-all duration-300 ${
//             input.trim()
//               ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
//               : "bg-gray-600 text-gray-400 cursor-not-allowed"
//           }`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       <p className="text-xs text-gray-500 mt-2 text-center">
//         Try: "Best 90s action movies" or "Romantic comedies with happy endings"
//       </p>
//     </div>
//   );
// };

// export default MessageInput;

// import React, { useState } from "react";

// const MessageInput = ({ onSend }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <div className="border-t border-gray-200 p-4 bg-white">
//       <div className="relative">
//         <input
//           className="w-full border border-gray-300 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           placeholder="Ask about movies..."
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={!input.trim()}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full disabled:opacity-50"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       <p className="text-xs text-gray-400 mt-2 text-center">
//         Press Enter to send • Ask about movies, recommendations, and more
//       </p>
//     </div>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import { FiSend, FiFilm } from "react-icons/fi";
import { motion } from "framer-motion";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FiFilm />
        </div>
        <input
          className="w-full border border-gray-300 rounded-full pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Ask about movies..."
        />
        <motion.button
          onClick={handleSubmit}
          disabled={!input.trim()}
          whileTap={{ scale: 0.95 }}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
            input.trim()
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          } transition-colors duration-200`}
        >
          <FiSend />
        </motion.button>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Press Enter to send • Ask about movies, recommendations, and more
      </p>
    </div>
  );
};

export default MessageInput;