import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LogoIcon } from './Icons';

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
      setError('Invalid coordinates. Please check your star-chart.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
            <div className="flex justify-center">
                 <LogoIcon className="h-24 w-24 text-green-400"/>
            </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Cosmic Chronic
          </h2>
           <p className="mt-2 text-center text-sm text-gray-400">Log in to begin your journey.</p>
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
                className="relative block w-full appearance-none rounded-t-md border border-white/20 bg-black/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-green-400 focus:outline-none focus:ring-green-400 sm:text-sm transition-all"
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
                className="relative block w-full appearance-none rounded-b-md border border-white/20 bg-black/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-green-400 focus:outline-none focus:ring-green-400 sm:text-sm transition-all"
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
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-green-500 to-teal-600 py-3 px-4 text-sm font-medium text-white hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black/50 transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
            >
              Engage Hyperdrive
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-400 bg-black/30 backdrop-blur-md p-4 rounded-md ring-1 ring-white/10">
            <h3 className="font-semibold text-white mb-2">Demo Accounts</h3>
            <p><strong className="text-pink-400">Admin:</strong> admin / password</p>
            <p><strong className="text-green-400">Seller:</strong> seller / password</p>
            <p><strong className="text-purple-400">Buyer:</strong> buyer / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;