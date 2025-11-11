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
        <div className="max-w-3xl mx-auto space-y-8 pt-6">
            <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-white/10">
                <div className="p-6">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-24 h-24 rounded-full ring-2 ring-purple-500"/>
                            <div className="absolute inset-0 rounded-full ring-2 ring-purple-500 animate-pulse"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{currentUser.username}</h2>
                            <p className="text-gray-400">{currentUser.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-white/10">
                 <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                    <p className="text-sm text-gray-400 mt-1">Update your personal stardata.</p>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
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
                            className="bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
                            placeholder="e.g., Alpha Centauri"
                        />
                    </div>

                    {currentUser.role === Role.SELLER && (
                         <div>
                            <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-1">Base Rate (Credits)</label>
                            <input
                                type="number"
                                id="rate"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
                                placeholder="e.g., 50"
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white transition-all transform hover:scale-105 ${isSaved ? 'bg-green-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-purple-500'}`}
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