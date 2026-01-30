import React from 'react';
import { motion } from 'framer-motion';
import { Database, Link, Brain, MessageSquare } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface MPISlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MPISlide: React.FC<MPISlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  const icons = [Database, Link, Brain];
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Left: Features */}
          <div className="space-y-3">
            {content?.features?.map((feature: any, idx: number) => {
              const IconComponent = icons[idx] || Database;
              const isAI = feature.tag === 'AI-Enabled';
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className={`rounded-lg p-3 border ${
                    isAI ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className={`w-4 h-4 ${isAI ? 'text-purple-600' : 'text-emerald-600'}`} />
                    <span className="font-semibold text-gray-900 text-sm">{feature.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ml-auto ${
                      isAI ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {feature.tag}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {feature.items?.map((item: string, iidx: number) => (
                      <li key={iidx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className={`w-1 h-1 rounded-full mt-1.5 ${isAI ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          
          {/* Right: Sample Queries & Impact */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Sample Queries */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-gray-900 text-sm">Sample GPT Queries</span>
              </div>
              <div className="space-y-2">
                {content?.sampleQueries?.map((query: string, idx: number) => (
                  <div key={idx} className="bg-white rounded p-2 text-xs text-gray-600 border border-gray-100 italic">
                    "{query}"
                  </div>
                ))}
              </div>
            </div>
            
            {/* Impact Metrics */}
            <div className="flex gap-3 mt-auto">
              {content?.impact?.map((metric: any, idx: number) => (
                <div key={idx} className="flex-1 text-center px-4 py-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-xl font-bold text-emerald-600">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};
