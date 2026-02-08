import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Monitor } from 'lucide-react';
import caseStudyDataPlatform from '@/assets/case-study-data-platform.jpg';
import caseStudyFieldForce from '@/assets/case-study-field-force.jpg';

interface DalmiaScreenshotSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

const screenshotMap: Record<string, string> = {
  'case-study-data-platform': caseStudyDataPlatform,
  'case-study-field-force': caseStudyFieldForce
};

export const DalmiaScreenshotSlide: React.FC<DalmiaScreenshotSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const screenshotPath = slide.screenshotPath || 'case-study-data-platform';
  const screenshotSrc = screenshotMap[screenshotPath];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Solution Demo</p>
            <h1 className="text-xl font-bold text-slate-900">{slide.headline}</h1>
          </div>
        </motion.div>

        {/* Screenshot Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 bg-slate-100 rounded-xl p-4 flex flex-col min-h-0"
        >
          <div className="flex-1 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
            {screenshotSrc ? (
              <img 
                src={screenshotSrc} 
                alt={slide.headline} 
                className="w-full h-full object-contain bg-white"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50">
                <p className="text-slate-400">Screenshot not available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Caption */}
        {slide.subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-slate-500 mt-4"
          >
            {slide.subtitle}
          </motion.p>
        )}
      </div>
    </MfgNewSlideLayout>
  );
};
