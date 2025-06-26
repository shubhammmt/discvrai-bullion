
import React from 'react';

interface QuickPromptsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
  isLoading: boolean;
}

const QuickPrompts = ({ prompts, onPromptClick, isLoading }: QuickPromptsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt)}
          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
          disabled={isLoading}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;
