import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { User } from '../types';
import { PaperAirplaneIcon } from './Icons';

const DirectMessages: React.FC = () => {
    const { users, currentUser, privateChatMessages, addPrivateChatMessage, directMessageTarget, clearDirectMessageTarget, findUserById } = useAppContext();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const otherUsers = users.filter(u => u.id !== currentUser?.id);

    useEffect(() => {
        if (directMessageTarget) {
            const targetUser = findUserById(directMessageTarget.userId);
            if (targetUser) {
                setSelectedUser(targetUser);
                setNewMessage(directMessageTarget.initialMessage);
            }
            clearDirectMessageTarget();
        } else if (!selectedUser && otherUsers.length > 0) {
            // Select the first user in the list by default if no target
            setSelectedUser(otherUsers[0]);
        }
    }, [directMessageTarget, users, currentUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [privateChatMessages, selectedUser]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !selectedUser) return;
        addPrivateChatMessage(selectedUser.id, newMessage);
        setNewMessage('');
    };

    const conversation = privateChatMessages.filter(
        msg => (msg.senderId === currentUser?.id && msg.receiverId === selectedUser?.id) ||
               (msg.senderId === selectedUser?.id && msg.receiverId === currentUser?.id)
    ).sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className="flex h-full max-h-[calc(100vh-150px)] bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10 overflow-hidden">
            {/* User List Panel */}
            <div className="w-1/3 border-r border-white/10 overflow-y-auto">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Contacts</h2>
                </div>
                <ul>
                    {otherUsers.map(user => (
                        <li key={user.id}>
                            <button 
                                onClick={() => setSelectedUser(user)}
                                className={`w-full text-left p-4 flex items-center space-x-3 transition-colors ${selectedUser?.id === user.id ? 'bg-indigo-600/30' : 'hover:bg-white/5'}`}
                            >
                                <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-white">{user.username}</p>
                                    <p className="text-sm text-gray-400">{user.location}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Panel */}
            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-white/10 flex items-center space-x-3">
                             <img src={selectedUser.avatarUrl} alt={selectedUser.username} className="w-10 h-10 rounded-full"/>
                             <div>
                                <h2 className="text-lg font-semibold text-white">{selectedUser.username}</h2>
                                <p className="text-sm text-gray-400">{selectedUser.role}</p>
                             </div>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto space-y-6">
                            {conversation.map(msg => {
                                const isCurrentUser = msg.senderId === currentUser?.id;
                                return (
                                    <div key={msg.id} className={`flex items-end gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                        {!isCurrentUser && (
                                            <img src={selectedUser.avatarUrl} alt={selectedUser.username} className="w-8 h-8 rounded-full flex-shrink-0"/>
                                        )}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${isCurrentUser ? 'bg-indigo-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
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
                                    placeholder={`Message ${selectedUser.username}...`}
                                    className="flex-grow bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                />
                                <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
                                    <PaperAirplaneIcon className="w-5 h-5"/>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-500">
                        <p>Select a user to start a conversation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectMessages;