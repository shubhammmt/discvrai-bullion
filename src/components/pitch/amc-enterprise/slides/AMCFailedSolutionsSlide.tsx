import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, Building2, MessageSquare, Bot, Smartphone } from 'lucide-react';

interface AMCFailedSolutionsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      solutions: Array<{
        name: string;
        issues: string[];
        verdict: string;
      }>;
      missingLayer: string;
    };
  };
}

const icons = [Building2, MessageSquare, Bot, Smartphone];

export const AMCFailedSolutionsSlide: React.FC<AMCFailedSolutionsSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {slide.content.solutions.map((solution, index) => {
          const IconComponent = icons[index];
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{solution.name}</h3>
              </div>
              
              <ul className="space-y-2 mb-4">
                {solution.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-red-600">→ {solution.verdict}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Missing Layer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-green-50 border border-green-200 p-6 rounded-xl"
      >
        <p className="text-lg text-green-900 font-medium text-center">
          ✨ The missing layer: {slide.content.missingLayer}
        </p>
      </motion.div>
    </div>
  );
};
