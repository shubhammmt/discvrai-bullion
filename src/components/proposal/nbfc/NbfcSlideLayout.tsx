import React from 'react';

interface NbfcSlideLayoutProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
}

export const NbfcSlideLayout: React.FC<NbfcSlideLayoutProps> = ({ children, variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`w-screen h-screen flex flex-col relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]'
          : 'bg-[#fafbfc]'
      }`}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

      {/* Subtle grid */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Content */}
      <div className="flex-1 relative z-10 px-16 pt-14 pb-10">
        {children}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </div>
  );
};
