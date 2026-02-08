import React from 'react';
import { motion } from 'framer-motion';
import { Target, Headset, Settings, Users, CheckCircle } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  target: Target,
  headset: Headset,
  settings: Settings,
  users: Users,
};

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
};

export const PlatformCapabilitiesSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex-shrink-0">
          <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-lg text-blue-600 font-medium mt-1">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          {content.capabilities.map((cap: any, idx: number) => {
            const Icon = iconMap[cap.icon] || Target;
            const c = colorMap[cap.color] || colorMap.blue;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className={`${c.bg} ${c.border} border rounded-xl p-5 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">{cap.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cap.description}</p>
                <div className="mt-auto space-y-2">
                  {cap.metrics.map((m: string, mIdx: number) => (
                    <div key={mIdx} className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 ${c.icon} flex-shrink-0`} />
                      <span className={`text-sm font-semibold ${c.badge} px-2.5 py-1 rounded`}>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </REASlideLayout>
  );
};
