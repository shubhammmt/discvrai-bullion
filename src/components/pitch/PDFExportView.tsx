
import React from 'react';
import { SlideRenderer } from './SlideRenderer';

interface PDFExportViewProps {
  slides: any[];
}

// Define content density categories for different slide types
const getSlideScaling = (slide: any) => {
  const contentHeavySlides = [
    'revenue', 'ai-tech-stack', 'competition', 'big-tech', 
    'risks', 'team', 'funding', 'execution-example', 'unit_economics'
  ];
  
  const mediumContentSlides = [
    'business-model', 'solution', 'user-flow', 'gtm'
  ];
  
  const lightContentSlides = [
    'title', 'problem', 'market', 'vision', 'moats'
  ];

  if (contentHeavySlides.includes(slide.type)) {
    return {
      scale: '0.6',
      fontSize: 'small',
      padding: '8mm'
    };
  } else if (mediumContentSlides.includes(slide.type)) {
    return {
      scale: '0.7',
      fontSize: 'medium', 
      padding: '10mm'
    };
  } else {
    return {
      scale: '0.8',
      fontSize: 'large',
      padding: '12mm'
    };
  }
};

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
            
            /* Heavy content slides - most compressed */
            .slide-page.heavy-content {
              padding: 8mm !important;
            }
            
            .slide-page.heavy-content .slide-content {
              transform: scale(0.6) !important;
            }
            
            .slide-page.heavy-content .slide-content h1 {
              font-size: 1.5rem !important;
              line-height: 1.1 !important;
              margin-bottom: 0.25rem !important;
            }
            
            .slide-page.heavy-content .slide-content h2 {
              font-size: 1.2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.25rem !important;
            }
            
            .slide-page.heavy-content .slide-content h3 {
              font-size: 1rem !important;
              line-height: 1.3 !important;
              margin-bottom: 0.2rem !important;
            }
            
            .slide-page.heavy-content .slide-content p {
              font-size: 0.75rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.15rem !important;
            }
            
            .slide-page.heavy-content .slide-content .grid {
              gap: 0.25rem !important;
            }
            
            .slide-page.heavy-content .slide-content table {
              font-size: 0.6rem !important;
            }
            
            .slide-page.heavy-content .slide-content td,
            .slide-page.heavy-content .slide-content th {
              padding: 0.15rem !important;
            }
            
            /* Medium content slides */
            .slide-page.medium-content {
              padding: 10mm !important;
            }
            
            .slide-page.medium-content .slide-content {
              transform: scale(0.7) !important;
            }
            
            .slide-page.medium-content .slide-content h1 {
              font-size: 1.8rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.4rem !important;
            }
            
            .slide-page.medium-content .slide-content h2 {
              font-size: 1.4rem !important;
              line-height: 1.3 !important;
              margin-bottom: 0.4rem !important;
            }
            
            .slide-page.medium-content .slide-content h3 {
              font-size: 1.1rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.3rem !important;
            }
            
            .slide-page.medium-content .slide-content p {
              font-size: 0.8rem !important;
              line-height: 1.3 !important;
              margin-bottom: 0.2rem !important;
            }
            
            .slide-page.medium-content .slide-content .grid {
              gap: 0.4rem !important;
            }
            
            /* Light content slides - least compressed */
            .slide-page.light-content {
              padding: 12mm !important;
            }
            
            .slide-page.light-content .slide-content {
              transform: scale(0.8) !important;
            }
            
            .slide-page.light-content .slide-content h1 {
              font-size: 2.2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.6rem !important;
            }
            
            .slide-page.light-content .slide-content h2 {
              font-size: 1.8rem !important;
              line-height: 1.3 !important;
              margin-bottom: 0.6rem !important;
            }
            
            .slide-page.light-content .slide-content h3 {
              font-size: 1.4rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.4rem !important;
            }
            
            .slide-page.light-content .slide-content p {
              font-size: 1rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.3rem !important;
            }
            
            .slide-page.light-content .slide-content .grid {
              gap: 0.6rem !important;
            }
            
            /* Common styles for all slides */
            .slide-content {
              width: 100% !important;
              height: auto !important;
              max-width: 100% !important;
              transform-origin: top center !important;
              overflow: visible !important;
            }
            
            .slide-content * {
              max-width: 100% !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            
            .slide-content [class*="space-y"] {
              --tw-space-y-reverse: 0 !important;
            }
            
            .slide-content [class*="space-y"] > * + * {
              margin-top: 0.3rem !important;
            }
            
            /* Hide navigation and other non-printable elements */
            button, .fixed, .absolute {
              display: none !important;
            }
            
            /* Ensure proper table formatting */
            .slide-content table {
              font-size: 0.7rem !important;
              width: 100% !important;
            }
            
            .slide-content td, .slide-content th {
              padding: 0.2rem !important;
              vertical-align: top !important;
            }
          }
          
          @media screen {
            .pdf-export-container {
              display: none !important;
            }
          }
        `}
      </style>
      {slides.map((slide, index) => {
        const scaling = getSlideScaling(slide);
        const contentClass = scaling.scale === '0.6' ? 'heavy-content' : 
                           scaling.scale === '0.7' ? 'medium-content' : 'light-content';
        
        return (
          <div key={`slide-${index}`} className={`slide-page ${contentClass}`}>
            <div className="slide-content">
              <SlideRenderer slide={slide} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
