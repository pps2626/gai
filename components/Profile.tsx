import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';
import { SaveIcon } from './Icons';

const Profile: React.FC = () => {
    const { currentUser, updateUserProfile } = useAppContext();
    const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
    const [location, setLocation] = useState(currentUser?.location || '');
    const [rate, setRate] = useState(currentUser?.rate?.toString() || '');
    const [isSaved, setIsSaved] = useState(false);

    if (!currentUser) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const profileData: any = { avatarUrl, location };
        if (currentUser.role === Role.SELLER) {
            profileData.rate = parseFloat(rate) || 0;
        }
        updateUserProfile(currentUser.id, profileData);
        setIsSaved(true);
    };
    
    useEffect(() => {
        if(isSaved) {
            const timer = setTimeout(() => setIsSaved(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSaved]);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10">
                <div className="p-6">
                    <div className="flex items-center space-x-6">
                        <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-24 h-24 rounded-full ring-2 ring-indigo-500"/>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{currentUser.username}</h2>
                            <p className="text-gray-400">{currentUser.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl shadow-lg ring-1 ring-white/10">
                 <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                    <p className="text-sm text-gray-400 mt-1">Update your personal information.</p>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="https://example.com/avatar.png"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="e.g., San Francisco, CA"
                        />
                    </div>

                    {currentUser.role === Role.SELLER && (
                         <div>
                            <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-1">Base Rate ($/hr)</label>
                            <input
                                type="number"
                                id="rate"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="bg-white/5 border-white/10 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                placeholder="e.g., 50"
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${isSaved ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500'}`}
                            disabled={isSaved}
                        >
                           {isSaved ? (
                             <>
                                <SaveIcon className="w-5 h-5 mr-2" />
                                Saved!
                             </>
                           ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
