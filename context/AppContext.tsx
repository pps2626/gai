import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Product, ChatMessage, Role, PrivateChatMessage } from '../types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CHAT_MESSAGES, MOCK_PRIVATE_MESSAGES } from '../constants';

interface AppContextState {
  users: User[];
  products: Product[];
  chatMessages: ChatMessage[];
  privateChatMessages: PrivateChatMessage[];
  currentUser: User | null;
  directMessageTarget: { userId: string; initialMessage: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUserRole: (userId: string, newRole: Role) => void;
  addUser: (username: string, role: Role) => void;
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'imageUrl'>) => void;
  addChatMessage: (text: string) => void;
  addPrivateChatMessage: (receiverId: string, text: string) => void;
  updateUserProfile: (userId: string, profileData: Partial<Pick<User, 'avatarUrl' | 'location' | 'rate'>>) => void;
  findUserById: (userId: string) => User | undefined;
  initiateDirectMessage: (userId: string, initialMessage: string) => void;
  clearDirectMessageTarget: () => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [privateChatMessages, setPrivateChatMessages] = useState<PrivateChatMessage[]>(MOCK_PRIVATE_MESSAGES);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [directMessageTarget, setDirectMessageTarget] = useState<{ userId: string; initialMessage: string } | null>(null);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser?.id === userId) {
        setCurrentUser(prev => prev ? {...prev, role: newRole} : null);
    }
  };

  const addUser = (username: string, role: Role) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      role,
      password: 'password',
      avatarUrl: `https://i.pravatar.cc/150?u=user-${Date.now()}`,
      location: 'Unknown'
    };
    setUsers([...users, newUser]);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'sellerId'|'imageUrl'>) => {
    if (currentUser?.role !== Role.SELLER) return;
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      sellerId: currentUser.id,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800`,
    };
    setProducts([...products, newProduct]);
  };

  const addChatMessage = (text: string) => {
    if (!currentUser) return;
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderUsername: currentUser.username,
      text,
      timestamp: Date.now(),
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const addPrivateChatMessage = (receiverId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: PrivateChatMessage = {
      id: `pmsg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      timestamp: Date.now(),
    };
    setPrivateChatMessages([...privateChatMessages, newMessage]);
  };
  
  const updateUserProfile = (userId: string, profileData: Partial<Pick<User, 'avatarUrl' | 'location' | 'rate'>>) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...profileData } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...profileData } : null);
    }
  };

  const findUserById = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
  };
  
  const initiateDirectMessage = (userId: string, initialMessage: string) => {
    setDirectMessageTarget({ userId, initialMessage });
  };

  const clearDirectMessageTarget = () => {
    setDirectMessageTarget(null);
  };

  const value = {
    users,
    products,
    chatMessages,
    privateChatMessages,
    currentUser,
    directMessageTarget,
    login,
    logout,
    updateUserRole,
    addUser,
    addProduct,
    addChatMessage,
    addPrivateChatMessage,
    updateUserProfile,
    findUserById,
    initiateDirectMessage,
    clearDirectMessageTarget
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};