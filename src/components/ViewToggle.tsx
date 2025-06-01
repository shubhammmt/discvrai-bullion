
import React from 'react';
import { Zap, BarChart3 } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'quick' | 'detailed';
  onViewChange: (view: 'quick' | 'detailed') => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-1 inline-flex">
      <button
        onClick={() => onViewChange('quick')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          currentView === 'quick'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Zap size={14} />
        Quick View
      </button>
      <button
        onClick={() => onViewChange('detailed')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          currentView === 'detailed'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <BarChart3 size={14} />
        Deep Dive
      </button>
    </div>
  );
};

export default ViewToggle;
