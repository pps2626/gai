import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboardIcon } from './Icons';

const Login: React.FC = () => {
  const { login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
            <div className="flex justify-center">
                 <LayoutDashboardIcon className="h-12 w-12 text-indigo-500"/>
            </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username-input" className="sr-only">
                Username
              </label>
              <input
                id="username-input"
                name="username"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-input" className="sr-only">
                Password
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-400 bg-gray-800/50 p-4 rounded-md ring-1 ring-white/10">
            <h3 className="font-semibold text-white mb-2">Demo Accounts</h3>
            <p><strong className="text-red-400">Admin:</strong> admin / password</p>
            <p><strong className="text-green-400">Seller:</strong> seller / password</p>
            <p><strong className="text-sky-400">Buyer:</strong> buyer / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
