import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlatformArchitectureSlideProps {
  slide: any;
}

export const PlatformArchitectureSlide: React.FC<PlatformArchitectureSlideProps> = ({ slide }) => {
  const Icon = slide.icon;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-purple-400 font-medium tracking-wide uppercase text-sm">
            Technical Deep Dive
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{slide.title}</h1>
        <p className="text-xl text-slate-300">{slide.subtitle}</p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Runtime-Capsule Architecture</h3>
          
          {/* Architecture Visual */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-white font-medium">Reasoning Engine</span>
              </div>
              <p className="text-slate-400 text-sm ml-6">Decoupled core AI logic</p>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-slate-500 rotate-90" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {slide.capsules.map((capsule: string, idx: number) => (
                <motion.div
                  key={capsule}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-slate-700/50 rounded-lg p-3 border border-slate-600"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span className="text-slate-200 text-sm">{capsule}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <p className="text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Extensible platform—new verticals plug in seamlessly
            </p>
          </div>
        </motion.div>

        {/* Right - Readiness Score */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-500/30">
            <h3 className="text-lg font-medium text-slate-300 mb-4">Platform Readiness</h3>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-6xl font-bold text-emerald-400">{slide.readinessScore}%</span>
              <span className="text-slate-400 pb-2">Enterprise Ready</span>
            </div>
            <Progress value={slide.readinessScore} className="h-3 bg-slate-700" />
          </div>

          {/* Key Differentiators */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Key Differentiators</h3>
            <ul className="space-y-3">
              {slide.differentiators.map((diff: string, idx: number) => (
                <motion.li
                  key={diff}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{diff}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom Note */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
            <p className="text-slate-400 text-sm italic">
              "{slide.bottomNote}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
