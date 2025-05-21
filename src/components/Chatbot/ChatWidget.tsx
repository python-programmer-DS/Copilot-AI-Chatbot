import { useState } from 'react';
import ChatContainer from './ChatContainer';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
          aria-label="Open chat"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 8h10M7 12h4m-5 8h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
          </svg>
        </button>
      ) : (
        <div className="transition-all duration-300 transform scale-100 animate-fadeIn">
          <ChatContainer onClose={() => setIsOpen(false)} />
        </div>

      )}
    </div>
  );
}