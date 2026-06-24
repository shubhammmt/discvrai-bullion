import React, { useState } from 'react';
import AluminaExecReview from './AluminaExecReview';
import AluminaCopDashboard from './AluminaCopDashboard';
import { LayoutGrid, BarChart3 } from 'lucide-react';

export default function AluminaDashboard() {
  const [tab, setTab] = useState<'exec' | 'cop'>('exec');
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2 px-5 py-2">
          <button
            onClick={() => setTab('exec')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
              tab === 'exec' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Executive Review
          </button>
          <button
            onClick={() => setTab('cop')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
              tab === 'cop' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="h-4 w-4" /> COP Intelligence
          </button>
        </div>
      </div>
      {tab === 'exec' ? <AluminaExecReview /> : <AluminaCopDashboard />}
    </div>
  );
}
