import React from 'react';

interface AptechOptionChipsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

const AptechOptionChips = ({ options, onSelect, disabled }: AptechOptionChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-orange-100">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="text-xs px-4 py-2 rounded-full border border-orange-300 bg-white hover:bg-orange-50 hover:border-orange-500 text-foreground transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AptechOptionChips;
