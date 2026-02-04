import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Zap, CheckCircle } from 'lucide-react';

interface AMCCapabilitiesSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      outputs: Array<{
        title: string;
        metrics: string[];
        color: string;
      }>;
    };
  };
}

const colorClasses: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
  orange: { 
    bg: 'bg-orange-50', 
    border: 'border-orange-200', 
    icon: 'text-orange-600',
    iconBg: 'bg-orange-100'
  },
  blue: { 
    bg: 'bg-blue-50', 
    border: 'border-blue-200', 
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100'
  },
  green: { 
    bg: 'bg-green-50', 
    border: 'border-green-200', 
    icon: 'text-green-600',
    iconBg: 'bg-green-100'
  }
};

const icons = [TrendingUp, BarChart3, Zap];

export const AMCCapabilitiesSlide: React.FC<AMCCapabilitiesSlideProps> = ({ slide }) => {
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

      {/* Outputs Grid */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {slide.content.outputs.map((output, index) => {
          const colors = colorClasses[output.color] || colorClasses.orange;
          const IconComponent = icons[index];
          
          return (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className={`${colors.bg} ${colors.border} border rounded-xl p-6 flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-4 text-lg leading-tight">
                {output.title}
              </h3>
              
              <ul className="space-y-3 flex-1">
                {output.metrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
