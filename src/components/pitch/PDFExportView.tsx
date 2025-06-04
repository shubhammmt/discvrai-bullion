
import React from 'react';
import { SlideRenderer } from './SlideRenderer';

interface PDFExportViewProps {
  slides: any[];
}

export const PDFExportView: React.FC<PDFExportViewProps> = ({ slides }) => {
  return (
    <div className="print-only">
      <style>
        {`
          @media print {
            .print-only {
              display: block !important;
            }
            .no-print {
              display: none !important;
            }
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            .slide-page {
              page-break-after: always;
              page-break-inside: avoid;
              width: 297mm;
              height: 210mm;
              margin: 0;
              padding: 20mm;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
            }
            .slide-page:last-child {
              page-break-after: avoid;
            }
            .slide-content {
              width: 100%;
              height: 100%;
              transform: scale(0.8);
              transform-origin: center;
            }
          }
          @media screen {
            .print-only {
              display: none !important;
            }
          }
        `}
      </style>
      {slides.map((slide, index) => (
        <div key={index} className="slide-page">
          <div className="slide-content">
            <SlideRenderer slide={slide} />
          </div>
        </div>
      ))}
    </div>
  );
};
