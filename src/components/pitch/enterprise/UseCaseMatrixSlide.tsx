import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mic, MessageSquare, Globe, Smartphone, Code, Layers } from 'lucide-react';

interface UseCaseMatrixSlideProps {
  slide: any;
}

export const UseCaseMatrixSlide: React.FC<UseCaseMatrixSlideProps> = ({ slide }) => {
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-amber-400 font-medium tracking-wide uppercase text-sm">
            Deployment Matrix
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{slide.title}</h1>
        <p className="text-xl text-slate-300">{slide.subtitle}</p>
      </motion.div>

      {/* Main Matrix */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Mode Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Voice Capabilities */}
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Mic className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Voice AI Agents</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {slide.voiceCapabilities.map((cap: string, idx: number) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50"
                >
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Text Capabilities */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Text AI Agents</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {slide.textCapabilities.map((cap: string, idx: number) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - Deployment Options */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Deployment Options</h3>
          
          {slide.deploymentOptions.map((option: any, idx: number) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${option.gradient}`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{option.type}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {option.timeline}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{option.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature: string) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-center"
      >
        <p className="text-slate-400 text-sm">
          <Globe className="w-4 h-4 inline mr-2 text-emerald-400" />
          All capabilities available in <span className="text-white font-medium">11 languages</span> with regional dialect support
        </p>
      </motion.div>
    </div>
  );
};
