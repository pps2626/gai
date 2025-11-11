import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { PaperAirplaneIcon } from './Icons';

const GlobalChatWindow: React.FC = () => {
  const { chatMessages, addChatMessage, currentUser, findUserById } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    addChatMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-150px)] bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10">
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {chatMessages.map((msg) => {
          const isCurrentUser = msg.senderId === currentUser?.id;
          const sender = findUserById(msg.senderId);
          return (
            <div key={msg.id} className={`flex items-end gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
               {!isCurrentUser && sender && (
                 <img src={sender.avatarUrl} alt={sender.username} className="w-8 h-8 rounded-full flex-shrink-0"/>
               )}
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${isCurrentUser ? 'bg-indigo-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                {!isCurrentUser && (
                   <p className="text-xs font-bold text-indigo-300 mb-1">{msg.senderUsername}</p>
                )}
                <p className="text-white text-sm">{msg.text}</p>
                <p className={`text-xs text-gray-400 mt-1.5 ${isCurrentUser ? 'text-right' : 'text-left'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
          >
            <PaperAirplaneIcon className="w-5 h-5"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlobalChatWindow;
