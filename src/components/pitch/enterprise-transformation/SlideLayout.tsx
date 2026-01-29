import React from 'react';
import { Bot } from 'lucide-react';

interface SlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
  variant?: 'dark' | 'light';
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
  variant = 'dark'
}) => {
  const isDark = variant === 'dark';
  
  return (
    <div 
      className={`w-full h-screen flex flex-col relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-enterprise-navy-dark via-enterprise-navy to-enterprise-navy-dark' 
          : 'bg-white'
      }`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Subtle grid pattern */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      )}
      
      {/* Gold accent line at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isDark ? 'bg-gradient-to-r from-enterprise-gold via-enterprise-gold-light to-enterprise-gold' : 'bg-gradient-to-r from-enterprise-navy via-enterprise-blue to-enterprise-navy'}`} />
      
      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className={`w-5 h-5 ${isDark ? 'text-enterprise-gold' : 'text-enterprise-navy'}`} />
        <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-enterprise-navy'}`}>
          DiscvrAI
        </span>
      </div>
      
      {/* Main content */}
      <div className="flex-1 relative z-10 px-10 pt-12 pb-8">
        {children}
      </div>
      
      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 px-10 pb-3 flex justify-between items-center text-xs ${
        isDark ? 'text-enterprise-text-muted' : 'text-gray-400'
      }`}>
        <span>© 2025 DiscvrAI. Confidential.</span>
        <span className="font-mono">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-enterprise-gold/30 to-transparent' : 'bg-gradient-to-r from-transparent via-enterprise-navy/20 to-transparent'}`} />
    </div>
  );
};
