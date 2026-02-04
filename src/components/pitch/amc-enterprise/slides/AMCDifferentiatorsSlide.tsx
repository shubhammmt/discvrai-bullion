import React from 'react';
import { motion } from 'framer-motion';
import { Route, Link, Target, Shield, Cpu } from 'lucide-react';

interface AMCDifferentiatorsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      differentiators: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  route: Route,
  link: Link,
  target: Target,
  shield: Shield,
  cpu: Cpu
};

export const AMCDifferentiatorsSlide: React.FC<AMCDifferentiatorsSlideProps> = ({ slide }) => {
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

      {/* Differentiators */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {slide.content.differentiators.slice(0, 4).map((diff, index) => {
          const IconComponent = iconMap[diff.icon] || Target;
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{diff.title}</h3>
                  <p className="text-gray-600 text-sm">{diff.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fifth differentiator - full width */}
      {slide.content.differentiators[4] && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gray-900 text-white rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{slide.content.differentiators[4].title}</h3>
              <p className="text-gray-300 text-sm">{slide.content.differentiators[4].description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
