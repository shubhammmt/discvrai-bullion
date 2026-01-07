import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface TechnicalPillarsSlideProps {
  slide: any;
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'ready') {
    return <CheckCircle className="w-5 h-5 text-emerald-400" />;
  }
  if (status === 'partial') {
    return <Clock className="w-5 h-5 text-amber-400" />;
  }
  return <Circle className="w-5 h-5 text-slate-500" />;
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    ready: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };
  
  const labels = {
    ready: 'Ready',
    partial: 'Available',
    upcoming: 'Enabled'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.ready}`}>
      {labels[status as keyof typeof labels] || 'Ready'}
    </span>
  );
};

export const TechnicalPillarsSlide: React.FC<TechnicalPillarsSlideProps> = ({ slide }) => {
  const Icon = slide.icon;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-cyan-400 font-medium tracking-wide uppercase text-sm">
            Capability Audit
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{slide.title}</h1>
        <p className="text-xl text-slate-300">{slide.subtitle}</p>
      </motion.div>

      {/* Pillars Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {slide.pillars.map((pillar: any, pillarIdx: number) => (
          <motion.div
            key={pillar.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + pillarIdx * 0.15 }}
            className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden"
          >
            {/* Pillar Header */}
            <div className={`p-5 ${pillar.gradient}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <pillar.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{pillar.name}</h3>
                  <p className="text-white/70 text-sm">{pillar.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-5 space-y-3">
              {pillar.features.map((feature: any, idx: number) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + pillarIdx * 0.15 + idx * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                >
                  <StatusIcon status={feature.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-white font-medium text-sm truncate">{feature.name}</span>
                      <StatusBadge status={feature.status} />
                    </div>
                    <p className="text-slate-400 text-xs">{feature.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center justify-center gap-8"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400 text-sm">Production Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400 text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-4 h-4 text-blue-400" />
          <span className="text-slate-400 text-sm">Enabled Per Ask</span>
        </div>
      </motion.div>
    </div>
  );
};
