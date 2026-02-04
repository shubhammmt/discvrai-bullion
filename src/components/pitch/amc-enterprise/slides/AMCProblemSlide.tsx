import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Building, Layers, TrendingUp } from 'lucide-react';

interface AMCProblemSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      mainProblem: string;
      painPoints: Array<{
        title: string;
        description: string;
      }>;
      bottomLine: string;
    };
  };
}

const icons = [Building, Lock, Layers, TrendingUp];

export const AMCProblemSlide: React.FC<AMCProblemSlideProps> = ({ slide }) => {
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

      {/* Main Problem Statement */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-8"
      >
        <p className="text-lg text-gray-800 font-medium">
          {slide.content.mainProblem}
        </p>
      </motion.div>

      {/* Pain Points Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {slide.content.painPoints.map((point, index) => {
          const IconComponent = icons[index];
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                  <p className="text-gray-600 text-sm">{point.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gray-900 text-white p-6 rounded-xl text-center"
      >
        <p className="text-lg font-medium">{slide.content.bottomLine}</p>
      </motion.div>
    </div>
  );
};
