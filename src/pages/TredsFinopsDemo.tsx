import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TredsLanding from '@/components/treds-finops/TredsLanding';
import EarlyWarningScreen from '@/components/treds-finops/EarlyWarningScreen';
import ComplianceGuardScreen from '@/components/treds-finops/ComplianceGuardScreen';
import CrossBorderScreen from '@/components/treds-finops/CrossBorderScreen';
import TredsSummary from '@/components/treds-finops/TredsSummary';

const STEPS = [
  { label: 'Early Warning', num: 1 },
  { label: 'Compliance Guard', num: 2 },
  { label: 'Cross-Border (M1 NXT)', num: 3 },
];

const TredsFinopsDemo = () => {
  const [screen, setScreen] = useState(0);
  const showChrome = screen >= 1 && screen <= 3;

  return (
    <div className="min-h-screen" style={{ background: '#0A0F1E' }}>
      {/* Top bar */}
      {showChrome && (
        <header className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center px-6 border-b" style={{ background: '#0A0F1E', borderColor: '#1F2937' }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6366F1' }} />
            <span className="text-white font-bold text-sm">DiscvrAI</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-6">
            {STEPS.map(s => {
              const isActive = screen === s.num;
              const isCompleted = screen > s.num;
              return (
                <span key={s.num} className={`text-xs font-medium flex items-center gap-1.5 ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {isCompleted ? <span className="text-emerald-400">✓</span> : <span className={isActive ? 'text-indigo-400' : 'text-gray-600'}>{['①', '②', '③'][s.num - 1]}</span>}
                  {s.label}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <span>Demo · Agentic FinOps</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-500">Live</span>
          </div>
        </header>
      )}

      {/* Content */}
      <div className={showChrome ? 'pt-14 pb-16' : ''}>
        <AnimatePresence mode="wait">
          {screen === 0 && <TredsLanding key="landing" onStart={() => setScreen(1)} />}
          {screen === 1 && <EarlyWarningScreen key="early-warning" />}
          {screen === 2 && <ComplianceGuardScreen key="compliance" />}
          {screen === 3 && <CrossBorderScreen key="cross-border" />}
          {screen === 4 && <TredsSummary key="summary" onRestart={() => setScreen(0)} />}
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      {showChrome && (
        <footer className="fixed bottom-0 left-0 right-0 h-16 z-50 flex items-center px-6 border-t" style={{ background: '#0A0F1E', borderColor: '#1F2937' }}>
          <div className="flex-1">
            {screen > 1 && (
              <button onClick={() => setScreen(screen - 1)} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 border transition-all hover:border-indigo-500/50 hover:text-white" style={{ borderColor: '#1F2937' }}>
                ← Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {STEPS.map(s => (
              <span key={s.num} className="w-2 h-2 rounded-full" style={{ background: screen === s.num ? '#6366F1' : screen > s.num ? '#10B981' : '#374151' }} />
            ))}
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setScreen(screen + 1)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: '#6366F1' }}
            >
              {screen < 3 ? 'Next Demo →' : 'See Summary →'}
            </button>
          </div>
        </footer>
      )}

      {/* Summary bottom nav */}
      {screen === 4 && (
        <footer className="fixed bottom-0 left-0 right-0 h-16 z-50 flex items-center justify-end px-6 border-t" style={{ background: '#0A0F1E', borderColor: '#1F2937' }}>
          <button onClick={() => setScreen(0)} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 border transition-all hover:border-indigo-500/50 hover:text-white" style={{ borderColor: '#1F2937' }}>
            ← Restart Demo
          </button>
        </footer>
      )}
    </div>
  );
};

export default TredsFinopsDemo;
