
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Search, BarChart3, BookmarkPlus, Wallet, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if user has completed onboarding
  const userProfile = localStorage.getItem('userProfile');
  
  // Mock subscription state - will be replaced with real state management
  const isSubscribed = false; // Initially disabled for 3 months
  
  const navigationItems = [
    { path: '/feed', label: 'Feed', icon: BarChart3 },
    { path: '/research', label: 'Research', icon: Search },
    { path: '/organize', label: 'Organize', icon: BookmarkPlus },
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-80"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              discvr.ai
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Subscription Status - Hidden for initial 3 months */}
            {false && ( // Will be enabled after 3 months
              <div className="hidden md:block">
                {isSubscribed ? (
                  <span className="text-sm text-green-600 font-medium">Pro Plan</span>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/subscription')}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            )}

            {/* User Actions */}
            {userProfile ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('userProfile');
                  navigate('/');
                }}
                className="flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:block">Profile</span>
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => navigate('/onboarding')}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
