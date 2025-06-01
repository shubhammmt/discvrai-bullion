
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Search, User, Bell } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userProfile = localStorage.getItem('userProfile');

  const navigationItems = [
    { path: '/feed', label: 'Feed' },
    { path: '/research', label: 'Research' },
    { path: '/organize', label: 'Organize' },
    { path: '/portfolio', label: 'Portfolio' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-white/50 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-90 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                discvr.ai
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI Investment Discovery</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          {userProfile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive(item.path)
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {userProfile ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex bg-white/50 backdrop-blur-sm hover:bg-white/70">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="ghost" size="sm" className="bg-white/50 backdrop-blur-sm hover:bg-white/70">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="bg-white/50 backdrop-blur-sm hover:bg-white/70">
                  <User className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/research')}
                  className="text-sm bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                  Explore
                </Button>
                <Button 
                  onClick={() => navigate('/onboarding')}
                  className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
