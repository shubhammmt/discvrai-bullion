import React from 'react';
import { motion } from 'framer-motion';

interface AMCEnterpriseSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const AMCEnterpriseSlideLayout: React.FC<AMCEnterpriseSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-gray-900 font-semibold">DiscvrAI</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-gray-900">{slideNumber}</span>
          <span>/</span>
          <span>{totalSlides}</span>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

      {/* Footer */}
      <div className="px-8 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>Confidential</span>
        <span>Agentic D2C Platform for AMCs</span>
      </div>
    </div>
  );
};
