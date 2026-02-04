import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Users, Cpu } from 'lucide-react';

interface AMCWhyNowSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      marketShift: string;
      drivers: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
      insight: string;
    };
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'trending-up': TrendingUp,
  'alert': AlertTriangle,
  'users': Users,
  'cpu': Cpu
};

export const AMCWhyNowSlide: React.FC<AMCWhyNowSlideProps> = ({ slide }) => {
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

      {/* Market Shift Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl mb-8 text-center"
      >
        <p className="text-2xl font-bold">{slide.content.marketShift}</p>
      </motion.div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {slide.content.drivers.map((driver, index) => {
          const IconComponent = iconMap[driver.icon] || TrendingUp;
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{driver.title}</h3>
                  <p className="text-gray-600 text-sm">{driver.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl"
      >
        <p className="text-lg text-blue-900 font-medium text-center">
          💡 {slide.content.insight}
        </p>
      </motion.div>
    </div>
  );
};
