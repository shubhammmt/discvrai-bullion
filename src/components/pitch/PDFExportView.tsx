
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
              padding: 10mm !important;
              box-sizing: border-box !important;
              display: flex !important;
              align-items: flex-start !important;
              justify-content: center !important;
              background: white !important;
              position: relative !important;
            }
            
            .slide-page:last-child {
              page-break-after: avoid !important;
            }
            
            .slide-content {
              width: 100% !important;
              height: auto !important;
              max-width: 100% !important;
              transform: scale(0.75) !important;
              transform-origin: top center !important;
              overflow: visible !important;
            }
            
            /* Ensure all content is visible and properly sized */
            .slide-content * {
              max-width: 100% !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            
            /* Adjust font sizes for better fit */
            .slide-content h1 {
              font-size: 2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.5rem !important;
            }
            
            .slide-content h2 {
              font-size: 1.5rem !important;
              line-height: 1.3 !important;
              margin-bottom: 0.5rem !important;
            }
            
            .slide-content h3 {
              font-size: 1.25rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.25rem !important;
            }
            
            .slide-content p {
              font-size: 0.9rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.25rem !important;
            }
            
            /* Adjust spacing for cards and grid layouts */
            .slide-content .grid {
              gap: 0.5rem !important;
            }
            
            .slide-content [class*="space-y"] {
              --tw-space-y-reverse: 0 !important;
            }
            
            .slide-content [class*="space-y"] > * + * {
              margin-top: 0.5rem !important;
            }
            
            /* Hide navigation and other non-printable elements */
            button, .fixed, .absolute {
              display: none !important;
            }
            
            /* Ensure proper table formatting */
            .slide-content table {
              font-size: 0.8rem !important;
            }
            
            .slide-content td, .slide-content th {
              padding: 0.25rem !important;
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
