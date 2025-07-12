// import React, { forwardRef } from "react";
// import MessageBubble from "./MessageBubble";

// const ChatWindow = forwardRef(({ chat, isTyping }, ref) => {
//   return (
//     <div
//       ref={ref}
//       className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-900 bg-opacity-90"
//       style={{
//         backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
//         backgroundSize: "20px 20px",
//       }}
//     >
//       {chat.length === 0 && (
//         <div className="h-full flex flex-col items-center justify-center text-center px-4">
//           <div className="bg-gray-800 p-6 rounded-xl max-w-md">
//             <h3 className="text-xl font-bold text-white mb-2">🎬 MovieMatch AI</h3>
//             <p className="text-gray-300">
//               Hi there! I can recommend movies based on your mood, genre preferences, and more. Try asking:
//             </p>
//             <ul className="mt-3 text-left text-gray-400 space-y-1">
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>"Recommend similar movies like 3 idiot"</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>"What are some good horror comedies?"</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>"Suggest movies similar to Inception"</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}

//       {chat.map((msg, idx) => (
//         <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
//       ))}

//       {isTyping && (
//         <div className="flex justify-start">
//           <div className="max-w-[75%] px-4 py-3 rounded-xl rounded-bl-none bg-gray-800 text-gray-300">
//             <div className="flex space-x-2">
//               <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
//               <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

// ChatWindow.displayName = 'ChatWindow';

// export default ChatWindow;


import React, { forwardRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = forwardRef(({ chat, isTyping, onSend }, ref) => {
  const suggestedPrompts = [
    "What are the best thriller movies?",
    "Recommend some comedy movies",
    "Tell me about action movies from 2020",
    "What are the highest rated movies?"
  ];

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto px-6 py-4 bg-white"
    >
      {chat.length === 0 && (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to Movie Q&A</h2>
            <p className="text-gray-500 mb-6">Ask me anything about movies! I can help you discover great films.</p>
            
            <div className="space-y-3 max-w-md mx-auto">
              <p className="text-sm text-gray-500">Try asking:</p>
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onSend(prompt)}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {chat.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {isTyping && (
        <div className="flex justify-start mt-4">
          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500">
            Typing...
          </div>
        </div>
      )}
    </div>
  );
});

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow;