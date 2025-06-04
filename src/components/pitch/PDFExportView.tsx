
import React from 'react';
import { SlideRenderer } from './SlideRenderer';

interface PDFExportViewProps {
  slides: any[];
}

export const PDFExportView: React.FC<PDFExportViewProps> = ({ slides }) => {
  return (
    <div className="pdf-export-container">
      <style>
        {`
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            .pdf-export-container {
              display: block !important;
              visibility: visible !important;
            }
            
            .no-print {
              display: none !important;
            }
            
            .slide-page {
              page-break-after: always !important;
              page-break-inside: avoid !important;
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 15mm !important;
              box-sizing: border-box !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background: white !important;
              position: relative !important;
            }
            
            .slide-page:last-child {
              page-break-after: avoid !important;
            }
            
            .slide-content {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              max-height: 100% !important;
              transform: scale(0.85) !important;
              transform-origin: center center !important;
              overflow: hidden !important;
            }
            
            /* Ensure all content is visible */
            .slide-content * {
              max-width: 100% !important;
              word-wrap: break-word !important;
            }
            
            /* Hide navigation and other non-printable elements */
            button, .fixed, .absolute {
              display: none !important;
            }
          }
          
          @media screen {
            .pdf-export-container {
              display: none !important;
            }
          }
        `}
      </style>
      {slides.map((slide, index) => (
        <div key={`slide-${index}`} className="slide-page">
          <div className="slide-content">
            <SlideRenderer slide={slide} />
          </div>
        </div>
      ))}
    </div>
  );
};
