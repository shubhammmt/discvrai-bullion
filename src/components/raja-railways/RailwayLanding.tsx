import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Train, Play } from 'lucide-react';

interface RailwayLandingProps {
  onStart: () => void;
}

export const RailwayLanding: React.FC<RailwayLandingProps> = ({ onStart }) => {
  return (
    <div className="h-screen bg-[#0c1a3a] flex items-center justify-center relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Amber accent top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-3xl mx-auto px-8"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl flex items-center justify-center border border-[#F59E0B]/30">
            <Train className="w-10 h-10 text-[#F59E0B]" />
          </div>
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FBBF24] text-sm font-medium tracking-wide">
          24-Hour Division Pulse · Agentic Control Room
        </div>

        <h1 className="text-5xl font-bold text-white leading-tight">
          Three Agents. One Control Room.
          <br />
          <span className="text-[#FBBF24]">Real-time Decision Intelligence.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Ops · Safety · Revenue — reasoning over live inputs and producing a single Decision Brief for the DRM to approve.
        </p>

        <Button
          onClick={onStart}
          size="lg"
          className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0c1a3a] font-bold text-lg px-10 py-6 rounded-xl"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Demo
        </Button>
      </motion.div>
    </div>
  );
};
