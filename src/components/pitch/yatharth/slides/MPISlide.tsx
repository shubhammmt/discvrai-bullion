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
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Left: Features */}
          <div className="space-y-2">
            {content?.features?.map((feature: any, idx: number) => {
              const IconComponent = icons[idx] || Database;
              const isAI = feature.tag === 'AI-Enabled';
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className={`rounded-lg p-2.5 border ${
                    isAI ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <IconComponent className={`w-4 h-4 ${isAI ? 'text-purple-700' : 'text-emerald-700'}`} />
                    <span className="font-semibold text-gray-900 text-xs">{feature.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ml-auto font-medium ${
                      isAI ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {feature.tag}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {feature.items?.map((item: string, iidx: number) => (
                      <li key={iidx} className="text-xs text-gray-800 flex items-start gap-1.5">
                        <span className={`w-1 h-1 rounded-full mt-1.5 ${isAI ? 'bg-purple-500' : 'bg-emerald-500'}`} />
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
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-700" />
                <span className="font-semibold text-gray-900 text-xs">Sample GPT Queries</span>
              </div>
              <div className="space-y-1.5">
                {content?.sampleQueries?.map((query: string, idx: number) => (
                  <div key={idx} className="bg-white rounded p-1.5 text-xs text-gray-800 border border-gray-100 italic leading-tight">
                    "{query}"
                  </div>
                ))}
              </div>
            </div>
            
            {/* Impact Metrics */}
            <div className="flex gap-2 mt-auto">
              {content?.impact?.map((metric: any, idx: number) => (
                <div key={idx} className="flex-1 text-center px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-lg font-bold text-emerald-700">{metric.value}</div>
                  <div className="text-xs text-gray-700">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};