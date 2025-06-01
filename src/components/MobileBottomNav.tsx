
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Search, BookmarkPlus, Wallet, User } from 'lucide-react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userProfile = localStorage.getItem('userProfile');
  
  const navigationItems = [
    { path: '/feed', label: 'Feed', icon: BarChart3 },
    { path: '/research', label: 'Research', icon: Search },
    { path: '/organize', label: 'Organize', icon: BookmarkPlus },
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Only show on mobile and for authenticated users on specific pages
  const shouldShow = userProfile && (
    location.pathname.startsWith('/feed') ||
    location.pathname.startsWith('/research') ||
    location.pathname.startsWith('/organize') ||
    location.pathname.startsWith('/portfolio')
  );

  if (!shouldShow) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive(item.path)
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
