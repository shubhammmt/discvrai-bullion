
import React from 'react';
import { Zap, BarChart3 } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'quick' | 'detailed';
  onViewChange: (view: 'quick' | 'detailed') => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-2 mb-6 inline-flex">
      <button
        onClick={() => onViewChange('quick')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          currentView === 'quick'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Zap size={16} />
        Quick View
      </button>
      <button
        onClick={() => onViewChange('detailed')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          currentView === 'detailed'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <BarChart3 size={16} />
        Deep Dive
      </button>
    </div>
  );
};

export default ViewToggle;
