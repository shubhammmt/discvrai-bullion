
import React from 'react';

export const KeyboardShortcuts: React.FC = () => {
  return (
    <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
      <div className="text-xs text-gray-500 space-y-1">
        <div>→ or Space: Next slide</div>
        <div>← : Previous slide</div>
        <div>Esc: Exit presentation</div>
      </div>
    </div>
  );
};
