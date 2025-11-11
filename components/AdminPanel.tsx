import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';
import { UserPlusIcon } from './Icons';

const AdminPanel: React.FC = () => {
  const { users, updateUserRole, addUser, currentUser } = useAppContext();
  const [newUser, setNewUser] = useState({ username: '', role: Role.BUYER });
  const [error, setError] = useState('');

  if (currentUser?.role !== Role.ADMIN) {
    return <div className="text-center p-8 bg-gray-800 rounded-lg"><p className="text-red-400">Access Denied. Admins only.</p></div>;
  }

  const handleRoleChange = (userId: string, newRole: Role) => {
    updateUserRole(userId, newRole);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.username.trim() === '') {
      setError('Username cannot be empty.');
      return;
    }
    setError('');
    addUser(newUser.username, newUser.role);
    setNewUser({ username: '', role: Role.BUYER });
  };
  
  const getRoleColorClasses = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return 'bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20';
      case Role.SELLER: return 'bg-green-500/10 text-green-400 ring-1 ring-inset ring-green-500/20';
      case Role.BUYER: return 'bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20';
      default: return 'bg-gray-500/10 text-gray-400 ring-1 ring-inset ring-gray-500/20';
    }
  }

  return (
    <div className="space-y-10">
      {/* User Management */}
      <div className="bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">User Management</h2>
          <p className="text-sm text-gray-400 mt-1">Manage user roles and permissions.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead >
              <tr className="border-b border-white/10">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                        <div className="ml-4">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColorClasses(user.role)}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
                    >
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New User Provisioning */}
      <div className="bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Add New User</h2>
          <p className="text-sm text-gray-400 mt-1">Provision a new mock user account.</p>
        </div>
        <form onSubmit={handleAddUser} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="e.g., NewSeller01"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                  className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                >
                  {Object.values(Role).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1 flex items-end">
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                >
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add User
                </button>
             </div>
            </div>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
