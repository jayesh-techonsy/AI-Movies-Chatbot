/* eslint-disable no-unused-vars */
// // import React from "react";

// // const formatBotResponse = (text) => {
// //   const lines = text.split("\n").filter(Boolean);

// //   return (
// //     <div className="space-y-1">
// //       {lines.map((line, idx) => {
// //         if (line.startsWith("🎬")) {
// //           return (
// //             <div key={idx} className="font-semibold text-indigo-600">
// //               {line}
// //             </div>
// //           );
// //         }

// //         if (line.startsWith("•") || /^\d+\./.test(line.trim())) {
// //           return (
// //             <div key={idx} className="pl-4">
// //               {line}
// //             </div>
// //           );
// //         }

// //         return (
// //           <div key={idx} className="text-sm text-gray-700">
// //             {line}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // const MessageBubble = ({ sender, text }) => {
// //   const isUser = sender === "user";
// //   const isBot = sender === "bot";

// //   return (
// //     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
// //       <div
// //         className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
// //           isUser
// //             ? "bg-indigo-600 text-white rounded-br-none"
// //             : "bg-gray-100 text-gray-900 rounded-bl-none"
// //         }`}
// //       >
// //         {isBot ? formatBotResponse(text) : text}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessageBubble;


// import React from "react";

// const formatBotResponse = (text) => {
//   const lines = text.split("\n").filter(Boolean);

//   return (
//     <div className="space-y-2">
//       {lines.map((line, idx) => {
//         if (line.startsWith("🎬")) {
//           return (
//             <div key={idx} className="font-bold text-purple-400 text-lg">
//               {line}
//             </div>
//           );
//         }

//         if (line.startsWith("•") || /^\d+\./.test(line.trim())) {
//           return (
//             <div key={idx} className="pl-4 flex">
//               <span className="mr-2 text-purple-400">•</span>
//               <span className="text-gray-300">{line.replace(/^•\s*|\d+\.\s*/, '')}</span>
//             </div>
//           );
//         }

//         return (
//           <div key={idx} className="text-gray-300">
//             {line}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const MessageBubble = ({ sender, text }) => {
//   const isUser = sender === "user";
//   const isBot = sender === "bot";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-[85%] px-4 py-3 rounded-xl whitespace-pre-line transition-all duration-300 transform ${
//           isUser
//             ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none hover:shadow-lg hover:shadow-purple-500/20"
//             : "bg-gray-800 text-gray-300 rounded-bl-none hover:shadow-lg hover:shadow-gray-700/20"
//         }`}
//       >
//         {isBot ? formatBotResponse(text) : text}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;

// import React, { useState, useEffect } from "react";

// const MessageBubble = ({ sender, text }) => {
//   const isUser = sender === "user";
//   const [displayedText, setDisplayedText] = useState(isUser ? text : "");

//   useEffect(() => {
//     if (isUser) return;
    
//     let i = 0;
//     const typingEffect = setInterval(() => {
//       if (i < text.length) {
//         setDisplayedText(text.substring(0, i + 1));
//         i++;
//       } else {
//         clearInterval(typingEffect);
//       }
//     }, 20);

//     return () => clearInterval(typingEffect);
//   }, [text, isUser]);

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-[85%] px-4 py-3 rounded-lg text-sm ${
//           isUser
//             ? "bg-gray-800 text-white rounded-br-none"
//             : "bg-gray-100 text-gray-800 rounded-bl-none"
//         }`}
//       >
//         {displayedText}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilm, FaStar } from "react-icons/fa";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  const [displayedText, setDisplayedText] = useState(isUser ? text : "");
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    if (isUser) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        setShowIcon(true);
      }
    }, 20);

    return () => {
      clearInterval(typingEffect);
      setShowIcon(false);
    };
  }, [text, isUser]);

  const formatBotResponse = (text) => {
    const lines = text.split("\n").filter(Boolean);

    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          if (line.startsWith("🎬")) {
            return (
              <div key={idx} className="font-semibold text-indigo-600 flex items-center">
                <FaFilm className="mr-2" />
                {line}
              </div>
            );
          }

          if (line.startsWith("•") || /^\d+\./.test(line.trim())) {
            return (
              <div key={idx} className="flex items-start">
                <FaStar className="text-yellow-400 text-xs mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{line.replace(/^•\s*|\d+\.\s*/, '')}</span>
              </div>
            );
          }

          return (
            <div key={idx} className="text-gray-700">
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl text-sm relative ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {isUser ? (
          displayedText
        ) : (
          <>
            {formatBotResponse(displayedText)}
            {showIcon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -left-2 -bottom-2 bg-white p-1 rounded-full shadow-sm"
              >
                <FaFilm className="text-indigo-500 text-xs" />
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;