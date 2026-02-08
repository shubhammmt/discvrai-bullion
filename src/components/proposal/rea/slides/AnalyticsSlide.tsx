import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MessageSquare, Filter, Brain, AlertTriangle, FlaskConical, CheckCircle } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const featureIcons = [MessageSquare, Filter, Brain, AlertTriangle, FlaskConical];

export const AnalyticsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Features */}
          <div className="col-span-7 space-y-3">
            {content.features.map((feat: any, idx: number) => {
              const Icon = featureIcons[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.06 }}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{feat.title}</h4>
                    <p className="text-xs text-gray-500 italic">{feat.example}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-200" />
              <h3 className="font-bold text-base">Proven Results</h3>
            </div>
            <div className="space-y-3 flex-1">
              {content.results.map((r: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  <span className="text-sm font-medium">{r}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-xs text-blue-200 italic">
                "Instead of Excel-heavy analysis taking days, business users ask questions in natural language and get instant answers."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </REASlideLayout>
  );
};
