
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, User, Moon, Sun, Brain, Presentation, Zap, ArrowRight, FileText, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  
  // Check if user is logged in
  const userProfile = localStorage.getItem('userProfile');
  const isLoggedIn = !!userProfile;

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
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Zap className="w-1.5 h-1.5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            discvr.ai
          </span>
        </div>

        {/* Navigation - only show if logged in */}
        {isLoggedIn && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/market')}
                className={`font-medium ${location.pathname === '/market' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Market
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/stocks')}
                className={`font-medium ${location.pathname === '/stocks' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Stocks
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/us-stocks')}
                className={`font-medium ${location.pathname === '/us-stocks' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                US Stocks
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/mutual-funds')}
                className={`font-medium ${location.pathname === '/mutual-funds' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Mutual Funds
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/ipos')}
                className={`font-medium ${location.pathname === '/ipos' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                IPOs
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/crypto')}
                className={`font-medium ${location.pathname === '/crypto' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Crypto
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/organize')}
                className={`font-medium ${location.pathname === '/organize' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Organize
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/portfolio')}
                className={`font-medium ${location.pathname === '/portfolio' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Portfolio
              </Button>
            </nav>

            {/* Mobile Navigation Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden w-9 h-9 p-0">
                  <Menu size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/market')}
                    className={`justify-start h-12 ${location.pathname === '/market' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Market
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/stocks')}
                    className={`justify-start h-12 ${location.pathname === '/stocks' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Stocks
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/us-stocks')}
                    className={`justify-start h-12 ${location.pathname === '/us-stocks' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    US Stocks
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/mutual-funds')}
                    className={`justify-start h-12 ${location.pathname === '/mutual-funds' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Mutual Funds
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/ipos')}
                    className={`justify-start h-12 ${location.pathname === '/ipos' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    IPOs
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/crypto')}
                    className={`justify-start h-12 ${location.pathname === '/crypto' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Crypto
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/organize')}
                    className={`justify-start h-12 ${location.pathname === '/organize' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Organize
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/portfolio')}
                    className={`justify-start h-12 ${location.pathname === '/portfolio' ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    Portfolio
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            /* Show onboarding CTA for non-logged users */
            <Button 
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Started <ArrowRight size={14} className="ml-1" />
            </Button>
          ) : (
            /* Show normal actions for logged in users */
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleDarkMode}
                className="w-9 h-9 p-0"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Bell size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <User size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
