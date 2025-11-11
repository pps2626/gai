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
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <LoadingIcon className="w-24 h-24 text-green-400" />
        <p className="mt-4 text-lg tracking-widest uppercase">Entering Orbit...</p>
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
    Admin: 'Command Deck',
    Marketplace: 'Galactic Marketplace',
    'Global Chat': 'Global Comms',
    'Direct Messages': 'Direct Transmissions',
    Profile: 'Stardata Profile'
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-200 p-4">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 ml-4">
        <div className="px-8 py-6 border-b border-white/10">
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-purple-400 to-pink-400" style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}>
                {viewTitles[activeView]}
            </h1>
        </div>
        <div className="flex-1 overflow-y-auto px-8 pb-8">
            {renderActiveView()}
        </div>
      </main>
    </div>
  );
};

export default App;