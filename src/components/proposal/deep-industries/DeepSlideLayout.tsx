import React from 'react';

interface DeepSlideLayoutProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
}

export const DeepSlideLayout: React.FC<DeepSlideLayoutProps> = ({ children, variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`w-screen h-screen flex flex-col relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-white'
      }`}
    >
      {/* Teal accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600" />

      {/* Subtle grid */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      )}

      {/* Content */}
      <div className="flex-1 relative z-10 px-16 pt-14 pb-10">
        {children}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    </div>
  );
};
