
import React from 'react';
import { ArrowRight, Brain, User, Target, Search } from 'lucide-react';

interface AIContextFlowProps {
  steps: Array<{
    label: string;
    description: string;
    layer: 1 | 2 | 3 | 4;
    status: 'completed' | 'active' | 'pending';
  }>;
  className?: string;
}

export const AIContextFlow: React.FC<AIContextFlowProps> = ({ steps, className }) => {
  const layerIcons = {
    1: Brain,
    2: Target, 
    3: Search,
    4: User
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-blue-800">AI Context Flow</h4>
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto">
        {steps.map((step, index) => {
          const IconComponent = layerIcons[step.layer];
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center min-w-[120px]">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                  ${step.status === 'completed' ? 'bg-green-100 border-green-500' : 
                    step.status === 'active' ? 'bg-blue-100 border-blue-500 animate-pulse' : 
                    'bg-gray-100 border-gray-300'}
                `}>
                  <IconComponent className={`w-5 h-5 ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'active' ? 'text-blue-600' :
                    'text-gray-400'
                  }`} />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-800">{step.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{step.description}</div>
                </div>
              </div>
              
              {!isLast && (
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
