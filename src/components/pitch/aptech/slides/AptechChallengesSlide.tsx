import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Search, TrendingUp, AlertTriangle } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

const iconMap: Record<string, React.ComponentType<any>> = {
  target: Target,
  users: Users,
  search: Search,
  trending: TrendingUp
};

interface AptechChallengesSlideProps {
  slide: {
    title: string;
    subtitle: string;
    challenges: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechChallengesSlide: React.FC<AptechChallengesSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500 italic">"{slide.subtitle}"</p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {slide.challenges.map((challenge, index) => {
            const IconComponent = iconMap[challenge.icon] || Target;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{challenge.title}</h3>
                    <p className="text-slate-600">{challenge.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AptechSlideLayout>
  );
};
