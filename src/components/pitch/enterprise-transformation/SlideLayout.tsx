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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-enterprise-gold via-enterprise-gold-light to-enterprise-gold" />
      
      {/* Logo */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
        <Bot className={`w-6 h-6 ${isDark ? 'text-enterprise-gold' : 'text-enterprise-navy'}`} />
        <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-enterprise-navy'}`}>
          DiscvrAI
        </span>
      </div>
      
      {/* Main content */}
      <div className="flex-1 relative z-10 px-12 pt-16 pb-12">
        {children}
      </div>
      
      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 px-12 pb-4 flex justify-between items-center text-xs ${
        isDark ? 'text-enterprise-text-muted' : 'text-gray-400'
      }`}>
        <span>© 2025 DiscvrAI. Confidential.</span>
        <span className="font-mono">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-enterprise-gold/30 to-transparent" />
    </div>
  );
};
