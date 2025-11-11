import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { User } from '../types';
import { PaperAirplaneIcon } from './Icons';

const DirectMessages: React.FC = () => {
    const { 
        users, 
        currentUser, 
        privateChatMessages, 
        addPrivateChatMessage, 
        directMessageTarget, 
        clearDirectMessageTarget, 
        findUserById,
        markChatAsRead,
        getUnreadDirectMessageCount
    } = useAppContext();
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
            setSelectedUser(otherUsers[0]);
        }
    }, [directMessageTarget, users, currentUser]);
    
    useEffect(() => {
        if (selectedUser) {
            markChatAsRead(selectedUser.id);
        }
    }, [selectedUser, markChatAsRead, privateChatMessages]);


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
        <div className="flex h-full max-h-[calc(100vh-170px)] bg-black/30 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-white/10 overflow-hidden mt-6">
            {/* User List Panel */}
            <div className="w-1/3 border-r border-white/10 overflow-y-auto">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Contacts</h2>
                </div>
                <ul>
                    {otherUsers.map(user => {
                        const unreadCount = getUnreadDirectMessageCount(user.id);
                        const isSelected = selectedUser?.id === user.id;
                        return (
                        <li key={user.id}>
                            <button 
                                onClick={() => setSelectedUser(user)}
                                className={`w-full text-left p-4 flex items-center justify-between space-x-3 transition-colors relative ${isSelected ? 'bg-purple-600/30' : 'hover:bg-white/5'}`}
                            >
                                {isSelected && <div className="absolute left-0 top-0 h-full w-1 bg-purple-400 rounded-r-full"></div>}
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full flex-shrink-0 ring-1 ring-white/10"/>
                                    <div className="truncate">
                                        <p className="font-semibold text-white truncate">{user.username}</p>
                                        <p className="text-sm text-gray-400 truncate">{user.location}</p>
                                    </div>
                                </div>
                                {unreadCount > 0 && (
                                    <span className="bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        </li>
                    )})}
                </ul>
            </div>

            {/* Chat Panel */}
            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-black/20">
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
                                            <img src={selectedUser.avatarUrl} alt={selectedUser.username} className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-white/10"/>
                                        )}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${isCurrentUser ? 'bg-gradient-to-br from-purple-600 to-green-600 rounded-br-none text-white' : 'bg-gray-800/80 rounded-bl-none'}`}>
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
                                    className="flex-grow bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-green-400 transition-all transform hover:scale-105"
                                >
                                    <PaperAirplaneIcon className="w-5 h-5"/>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-500">
                        <p>Select a transmission channel.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectMessages;