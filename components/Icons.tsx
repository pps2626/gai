import React from 'react';

interface IconProps {
  className?: string;
}

export const LoadingIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>
      {`
        .spin {
          transform-origin: center;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <circle className="spin" cx="400" cy="400" fill="none" r="100" strokeWidth="12" stroke="currentColor" strokeDasharray="251.2 251.2" strokeLinecap="round" style={{ animationDuration: '1.5s' }}/>
    <circle className="spin" cx="400" cy="400" fill="none" r="200" strokeWidth="12" stroke="currentColor" strokeDasharray="314 314" strokeLinecap="round" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
    <circle className="spin" cx="400" cy="400" fill="none" r="300" strokeWidth="12" stroke="currentColor" strokeDasharray="471 471" strokeLinecap="round" style={{ animationDuration: '2.5s' }} />
    <circle cx="400" cy="400" r="50" fill="currentColor"/>
  </svg>
);


export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className}>
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4ade80'}} />
          <stop offset="100%" style={{stopColor: '#8b5cf6'}} />
        </linearGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      <g filter="url(#logo-glow)" fill="url(#logo-gradient)">
        <path d="M100 10c-15 15-15 30 0 45 10-10 20-25 0-45z"/>
        <path d="M145 30c-15 15-30 15-45 0 10 10 25 20 45 0z"/>
        <path d="M170 55c-15 15-15 30 0 45 10-10 20-25 0-45z"/>
        <path d="M170 145c-15-15-15-30 0-45 10 10 20 25 0 45z"/>
        <path d="M145 170c-15-15-30-15-45 0 10 10 25 20 45 0z"/>
        <path d="M100 190c-15-15-15-30 0-45 10 10 20 25 0 45z"/>
        <path d="M55 170c15-15 30-15 45 0-10-10-25-20-45 0z"/>
        <path d="M30 145c15-15 15-30 0-45-10 10-20 25 0 45z"/>
        <path d="M30 55c15 15 15 30 0 45-10-10-20-25 0 45z"/>
        <path d="M55 30c15 15 30 15 45 0-10-10-25-20-45 0z"/>
      </g>
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#logo-gradient)" strokeWidth="5" transform="rotate(-30 100 100)"/>
    </svg>
);


export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const AdminIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

export const StoreIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A.75.75 0 0114.25 12h.01a.75.75 0 01.75.75v7.5m-3.75-7.5A.75.75 0 009.75 12h-.01a.75.75 0 00-.75.75v7.5m-3.75 0v-7.5A.75.75 0 015.25 12h.01a.75.75 0 01.75.75v7.5m0 0H21m-18 0h9.75m-9.75 0a1.5 1.5 0 01-1.5-1.5V5.25A1.5 1.5 0 015.25 3.75h13.5A1.5 1.5 0 0120.25 5.25v14.25a1.5 1.5 0 01-1.5 1.5m-9.75 0h-3.75a1.5 1.5 0 01-1.5-1.5V6.75m15 12.75v-3.75a1.5 1.5 0 00-1.5-1.5h-3.75a1.5 1.5 0 00-1.5 1.5v3.75" />
    </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.063 1.063 0 00-1.5 1.5l3.72 3.72c-1.136.847-2.1 1.98-2.193 1.98H6.525c-1.136 0-2.1-.847-2.1-1.98V10.608c0-.97.616-1.813 1.5-2.097M15.75 6.489c-.884-.284-1.5-1.128-1.5-2.097V4.286c0-1.136.847-2.1 1.98-2.193l3.72 3.72a1.063 1.063 0 001.5-1.5L17.25 1.5c1.136-.847 2.1-1.98 2.193-1.98H9.75c-1.136 0-2.1.847-2.1 1.98v4.286c0 .97-.616 1.813-1.5 2.097" />
    </svg>
);