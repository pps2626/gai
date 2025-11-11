import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import AdminPanel from './components/AdminPanel';
import Marketplace from './components/Marketplace';
import GlobalChatWindow from './components/GlobalChatWindow';
import DirectMessages from './components/DirectMessages';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { Role } from './types';
import { LoadingIcon } from './components/Icons';

export type View = 'Admin' | 'Marketplace' | 'Global Chat' | 'Direct Messages' | 'Profile';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

const AppContent: React.FC = () => {
  const { currentUser, directMessageTarget } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<View>('Marketplace');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (currentUser) {
       if (currentUser.role === Role.ADMIN) {
        setActiveView('Admin');
       } else {
        setActiveView('Marketplace');
       }
    }
  }, [currentUser]);

  useEffect(() => {
    if (directMessageTarget) {
      setActiveView('Direct Messages');
    }
  }, [directMessageTarget]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <LoadingIcon className="w-16 h-16 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'Admin':
        return <AdminPanel />;
      case 'Marketplace':
        return <Marketplace />;
      case 'Global Chat':
        return <GlobalChatWindow />;
      case 'Direct Messages':
        return <DirectMessages />;
      case 'Profile':
        return <Profile />;
      default:
        return <Marketplace />;
    }
  };
  
  const viewTitles: Record<View, string> = {
    Admin: 'Admin Dashboard',
    Marketplace: 'Marketplace',
    'Global Chat': 'Global Chat',
    'Direct Messages': 'Direct Messages',
    Profile: 'My Profile'
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">{viewTitles[activeView]}</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-8 pb-8">
            {renderActiveView()}
        </div>
      </main>
    </div>
  );
};

export default App;