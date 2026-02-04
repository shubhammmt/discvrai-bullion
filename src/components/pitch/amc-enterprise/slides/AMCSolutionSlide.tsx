import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, MessageCircle, Monitor } from 'lucide-react';

interface AMCSolutionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      notSelling: string;
      actuallyEnabling: string;
      capabilities: Array<{
        before: string;
        after: string;
      }>;
      channels: string[];
    };
  };
}

const channelIcons = [Monitor, MessageCircle, Globe];

export const AMCSolutionSlide: React.FC<AMCSolutionSlideProps> = ({ slide }) => {
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

      {/* Not Selling / Actually Enabling */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <p className="text-red-800 font-medium">{slide.content.notSelling}</p>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <p className="text-green-800 font-medium">{slide.content.actuallyEnabling}</p>
        </motion.div>
      </div>

      {/* Before/After Grid */}
      <div className="flex-1 grid grid-cols-1 gap-4 mb-8">
        {slide.content.capabilities.map((cap, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
          >
            <div className="flex-1 bg-red-100 rounded-lg p-4">
              <p className="text-red-800 text-sm font-medium">{cap.before}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-orange-500 flex-shrink-0" />
            <div className="flex-1 bg-green-100 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">{cap.after}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Channels */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-8"
      >
        <span className="text-gray-500 font-medium">Channels:</span>
        {slide.content.channels.map((channel, index) => {
          const IconComponent = channelIcons[index];
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
            >
              <IconComponent className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 text-sm font-medium">{channel}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
