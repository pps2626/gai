import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';
import { View } from '../App';
import { AdminIcon, StoreIcon, ChatIcon, LogoutIcon, LogoIcon, ChatBubbleLeftRightIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  notificationCount?: number;
}> = ({ icon, label, isActive, onClick, notificationCount = 0 }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 my-1 rounded-lg transition-all duration-200 group relative ${
        isActive
          ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white shadow-lg'
          : 'text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    >
        <div className="flex items-center">
            {icon}
            <span className="ml-3 font-medium">{label}</span>
        </div>
        {notificationCount > 0 && (
            <span className="bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {notificationCount}
            </span>
        )}
    </button>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { currentUser, logout, getUnreadGlobalCount, getTotalUnreadDirectMessageCount } = useAppContext();

  if (!currentUser) return null;

  const unreadGlobalCount = getUnreadGlobalCount();
  const unreadDirectMessagesCount = getTotalUnreadDirectMessageCount();

  const navItems = [];
  if (currentUser.role === Role.ADMIN) {
    navItems.push({
      id: 'Admin',
      icon: <AdminIcon className="w-5 h-5" />,
      notificationCount: 0,
    });
  }
  navItems.push({
    id: 'Marketplace',
    icon: <StoreIcon className="w-5 h-5" />,
    notificationCount: 0,
  });

  navItems.push({
    id: 'Global Chat',
    icon: <ChatIcon className="w-5 h-5" />,
    notificationCount: unreadGlobalCount,
  });

  navItems.push({
    id: 'Direct Messages',
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    notificationCount: unreadDirectMessagesCount,
  });
  
  const getRoleColorClasses = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return 'bg-pink-500/20 text-pink-300 ring-pink-500/30';
      case Role.SELLER: return 'bg-green-500/20 text-green-300 ring-green-500/30';
      case Role.BUYER: return 'bg-purple-500/20 text-purple-300 ring-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 ring-gray-500/30';
    }
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 p-3 mb-6">
          <LogoIcon className="w-10 h-10" />
          <h1 className="text-xl font-bold text-white tracking-wider">Cosmic Chronic</h1>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.id === 'Admin' ? 'Command Deck' : item.id === 'Global Chat' ? 'Global Comms' : item.id === 'Direct Messages' ? 'Direct Transmissions' : 'Marketplace'}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id as View)}
                notificationCount={item.notificationCount}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <button 
            onClick={() => setActiveView('Profile')}
            className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors mb-2"
        >
            <div className="flex items-center space-x-3">
                <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-10 h-10 rounded-full ring-2 ring-purple-400/50"/>
                <div>
                     <p className="font-semibold text-white">{currentUser.username}</p>
                     <span className={`px-2 py-0.5 text-xs font-medium rounded-full ring-1 ${getRoleColorClasses(currentUser.role)}`}>{currentUser.role}</span>
                </div>
            </div>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center p-3 mt-2 rounded-lg text-gray-400 hover:bg-pink-500/20 hover:text-pink-300 transition-colors duration-200"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;