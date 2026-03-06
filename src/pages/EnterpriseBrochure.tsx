import React from 'react';
import { BrochurePage1 } from '@/components/brochure/BrochurePage1';
import { BrochurePage2 } from '@/components/brochure/BrochurePage2';
import { BrochurePage3 } from '@/components/brochure/BrochurePage3';
import { BrochurePage4 } from '@/components/brochure/BrochurePage4';

const EnterpriseBrochure: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Print styles */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0 !important; padding: 0 !important; }
          .brochure-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .brochure-page:last-child { page-break-after: avoid !important; }
          .no-print { display: none !important; }
        }
        @media screen {
          .brochure-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto 2rem auto;
            box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          }
        }
      `}</style>
      
      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-lg"
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      <BrochurePage1 />
      <BrochurePage2 />
      <BrochurePage3 />
      <BrochurePage4 />
    </div>
  );
};

export default EnterpriseBrochure;
