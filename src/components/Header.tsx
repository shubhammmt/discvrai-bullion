
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bell, User, Moon, Sun, Brain, Presentation } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isHomePage = location.pathname === '/';

  if (isHomePage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            discvr.ai
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/feed')}
            className={location.pathname === '/feed' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''}
          >
            Feed
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/research')}
            className={location.pathname.includes('/research') ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''}
          >
            Research
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/organize')}
            className={location.pathname === '/organize' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''}
          >
            Organize
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/portfolio')}
            className={location.pathname === '/portfolio' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''}
          >
            Portfolio
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/pitch')}
            className={location.pathname === '/pitch' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''}
          >
            <Presentation size={16} className="mr-1" />
            Pitch
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleDarkMode}
            className="w-9 h-9 p-0"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <Search size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <Bell size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <User size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
