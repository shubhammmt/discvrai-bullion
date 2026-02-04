import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface AMCMarketSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      headline: string;
      subheadline: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
      multiplier: string;
      expansion: Array<{
        vertical: string;
        status: string;
      }>;
      insight: string;
    };
  };
}

export const AMCMarketSlide: React.FC<AMCMarketSlideProps> = ({ slide }) => {
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

      {/* Headline Stats */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl mb-8"
      >
        <div className="text-center">
          <h3 className="text-5xl font-bold mb-2">{slide.content.headline}</h3>
          <p className="text-xl text-orange-100">{slide.content.subheadline}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Stats */}
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {slide.content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
              >
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <p className="text-blue-900 font-medium text-sm">
              🎯 {slide.content.multiplier}
            </p>
          </motion.div>
        </div>

        {/* Expansion Path */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-6"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Expansion Path</h4>
          <div className="flex items-center gap-3">
            {slide.content.expansion.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`px-4 py-3 rounded-lg text-center flex-1 ${
                  item.status === 'Now' 
                    ? 'bg-orange-500 text-white' 
                    : item.status === 'Next'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <p className="font-semibold text-sm">{item.vertical}</p>
                  <p className="text-xs opacity-75">{item.status}</p>
                </div>
                {index < slide.content.expansion.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-4 text-center">
            {slide.content.insight}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
