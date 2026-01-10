import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface ProposalLayoutProps {
  children: React.ReactNode[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ProposalLayout: React.FC<ProposalLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
}) => {
  const totalPages = children.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentPage > 0) onPageChange(currentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-slate-800">AI Recruitment Platform Proposal</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">NirmalBang</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children[currentPage]}
        </div>
      </div>

      {/* Page Navigation Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-200">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentPage
                ? 'bg-blue-600 w-6'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
