import React, { useState } from 'react';
import AluminaExecReview from './AluminaExecReview';
import AluminaCopDashboard from './AluminaCopDashboard';
import { LayoutGrid, BarChart3, Sun, Moon } from 'lucide-react';

export default function AluminaDashboard() {
  const [tab, setTab] = useState<'exec' | 'cop'>('exec');
  const [dark, setDark] = useState(true);

  const shellBg = dark ? 'bg-slate-950' : 'bg-slate-50';
  const navBg = dark
    ? 'bg-slate-950/95 border-slate-800'
    : 'bg-white/95 border-slate-200';
  const inactive = dark
    ? 'text-slate-300 hover:bg-slate-800/70'
    : 'text-slate-600 hover:bg-slate-100';

  return (
    <div className={`min-h-screen transition-colors ${shellBg}`}>
      {/* Master header */}
      <div className={`border-b ${dark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}>
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-5 py-2.5">
          <div className="flex items-center gap-3 mr-auto">
            <div className="h-9 px-2 rounded-md bg-white border border-slate-200 flex items-center justify-center">
              <img
                src="https://d1rbiogke1jwo5.cloudfront.net/wp-content/themes/VedantaAluminiumAndPower/images/Vedanta-Aluminium-Metal-Limited-Logo.png"
                alt="Vedanta Aluminium"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className={dark ? 'text-slate-100' : 'text-slate-900'}>
              <div className="text-sm font-bold leading-tight">Vedanta Aluminium · Lanjigarh</div>
              <div className={`text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Operations &amp; COP Intelligence</div>
            </div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-md border ${dark ? 'border-slate-700 text-slate-200 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sticky primary tab nav */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur ${navBg}`}>
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-5 py-2">
          <button
            onClick={() => setTab('exec')}
            className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold tracking-wide transition ${
              tab === 'exec'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/60'
                : inactive
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Executive Review
          </button>
          <button
            onClick={() => setTab('cop')}
            className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold tracking-wide transition ${
              tab === 'cop'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/60'
                : inactive
            }`}
          >
            <BarChart3 className="h-4 w-4" /> COP Intelligence
          </button>
        </div>
      </div>

      {tab === 'exec'
        ? <AluminaExecReview dark={dark} />
        : <AluminaCopDashboard dark={dark} setDark={setDark} />}
    </div>
  );
}
