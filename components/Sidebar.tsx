import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';
import { View } from '../App';
import { AdminIcon, StoreIcon, ChatIcon, LogoutIcon, LayoutDashboardIcon, UserIcon, ChatBubbleLeftRightIcon, PencilSquareIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </button>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { currentUser, logout } = useAppContext();

  if (!currentUser) return null;

  const navItems = [];
  if (currentUser.role === Role.ADMIN) {
    navItems.push({
      id: 'Admin',
      icon: <AdminIcon className="w-5 h-5" />,
    });
  }
  navItems.push({
    id: 'Marketplace',
    icon: <StoreIcon className="w-5 h-5" />,
  });

  navItems.push({
    id: 'Global Chat',
    icon: <ChatIcon className="w-5 h-5" />,
  });

  navItems.push({
    id: 'Direct Messages',
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
  });
  
  const getRoleColorClasses = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return 'bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20';
      case Role.SELLER: return 'bg-green-500/10 text-green-400 ring-1 ring-inset ring-green-500/20';
      case Role.BUYER: return 'bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20';
      default: return 'bg-gray-500/10 text-gray-400 ring-1 ring-inset ring-gray-500/20';
    }
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800/50 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 p-3 mb-6">
          <LayoutDashboardIcon className="w-8 h-8 text-indigo-500" />
          <h1 className="text-xl font-bold text-white tracking-wider">Marketplace</h1>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.id}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id as View)}
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
                <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-10 h-10 rounded-full"/>
                <div>
                     <p className="font-semibold text-white">{currentUser.username}</p>
                     <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColorClasses(currentUser.role)}`}>{currentUser.role}</span>
                </div>
            </div>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center p-3 mt-2 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
