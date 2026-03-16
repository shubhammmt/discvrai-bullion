import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Train, ChevronLeft, ChevronRight, Layers, Clock, Users,
  Bot, BarChart3, ShoppingCart, Zap, Target, ArrowRight, MessageSquare
} from 'lucide-react';

const slides = [
  // SLIDE 1: Title / Cover
  {
    id: 'cover',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]" />
        <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl flex items-center justify-center mb-8 border border-[#F59E0B]/30">
          <Train className="w-10 h-10 text-[#F59E0B]" />
        </div>
        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">DiscvrAI × Indian Railways</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Agentic Decision Intelligence for Railway Operations —<br />
          <span className="text-[#F59E0B] font-semibold">From Data to Action, Autonomously</span>
        </p>
        <p className="text-sm text-gray-400 mt-8">Secunderabad Division · Confidential · March 2025</p>
      </div>
    ),
  },
  // SLIDE 2: The Problem
  {
    id: 'problem',
    render: () => (
      <div className="h-full flex flex-col px-16 pt-14">
        <Badge className="w-fit bg-red-50 text-red-700 border-red-200 mb-4">The Challenge</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">The Complexity-Action Gap</h2>
        <p className="text-lg text-gray-500 mb-8">Data exists. But execution lags.</p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { icon: <Layers className="w-6 h-6 text-[#F59E0B]" />, title: 'Operational Silos', desc: 'Data across 13 departments — manual intervention to move from insight to execution.', impact: 'Latency between data generation and corrective action' },
            { icon: <Clock className="w-6 h-6 text-[#F59E0B]" />, title: 'Predictive vs. Reactive', desc: "Current systems tell you what is happening — they don't autonomously initiate the 'first response.'", impact: 'Reactive firefighting instead of proactive optimization' },
            { icon: <Users className="w-6 h-6 text-[#F59E0B]" />, title: 'Human Bandwidth', desc: '30+ direct reports bogged down by routine coordination rather than strategic optimization.', impact: 'Senior leaders spend time on coordination, not optimization' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <p className="text-xs text-[#F59E0B] font-medium">Impact: {item.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10 text-center">
          <p className="text-sm text-[#1E3A8A] font-medium">
            "One of the most complex logistical 'living organisms' in the world — 1,600 km route, 21,000 employees, ₹9,000 Cr revenue."
          </p>
        </div>
      </div>
    ),
  },
  // SLIDE 3: The Solution
  {
    id: 'solution',
    render: () => (
      <div className="h-full flex flex-col px-16 pt-14">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-4">The Solution</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">Agentic Rails — A Digital Chief of Staff</h2>
        <p className="text-lg text-gray-500 mb-8">Not dashboards. Agents that act.</p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { icon: <Bot className="w-6 h-6 text-white" />, title: 'Agentic Automation', sub: 'The "Digital Station Master"', desc: 'AI Agents monitor freight schedules & loco availability. If a freight train is delayed by a caution order, the Agent auto-notifies the next 3 stations, suggests revised crew shift, and updates the cargo client.' },
            { icon: <BarChart3 className="w-6 h-6 text-white" />, title: 'Agentic Analytics', sub: 'Beyond Dashboards', desc: 'Instead of "Why was TAT high yesterday?" — the Agent proactively sends: "DRM Sir, turnaround at X yard increased 12% due to Y. I have drafted an inquiry and suggested alternative routing."' },
            { icon: <ShoppingCart className="w-6 h-6 text-white" />, title: 'Agentic Commerce', sub: 'Freight & Revenue Growth', desc: 'Agent monitors market commodity prices vs. empty wagon flow. Identifies opportunity to capture 5 MT cement cargo by dynamically suggesting discount or rake placement.' },
          ].map((item, i) => (
            <Card key={i} className="bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 border-0 text-white">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-xs text-[#FBBF24] font-medium">{item.sub}</p>
                <p className="text-sm text-blue-100 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center italic">Same architecture we deploy for manufacturing and BFSI — adapted for railway operations.</p>
      </div>
    ),
  },
  // SLIDE 4: The Killer Demo
  {
    id: 'demo-preview',
    render: () => (
      <div className="h-full flex flex-col px-16 pt-14">
        <Badge className="w-fit bg-amber-50 text-amber-700 border-amber-200 mb-4">Live Demo</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">The 24-Hour Division Pulse</h2>
        <p className="text-lg text-gray-500 mb-10">A Simulated Agentic Control Room</p>

        <div className="flex items-center justify-center gap-4 flex-1">
          {[
            { label: 'Input', sub: 'Train delays, weather alerts, staff absences', icon: <Zap className="w-6 h-6 text-[#F59E0B]" /> },
            null,
            { label: 'Process', sub: 'Ops, Safety, Revenue agents debating best course of action', icon: <Bot className="w-6 h-6 text-[#1E3A8A]" /> },
            null,
            { label: 'Output', sub: 'Single Decision Brief for DRM to approve with one tap', icon: <Target className="w-6 h-6 text-green-600" /> },
          ].map((item, i) =>
            item === null ? (
              <ArrowRight key={i} className="w-8 h-8 text-gray-300 flex-shrink-0" />
            ) : (
              <Card key={i} className="flex-1 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-bold text-[#1E3A8A] text-xl">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="mt-8 p-4 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20 text-center">
          <p className="text-sm text-[#1E3A8A] font-semibold">
            "Don't just show a slide deck. Show a simulated Agentic Control Room."
          </p>
        </div>
      </div>
    ),
  },
  // SLIDE 5: Why You?
  {
    id: 'why-you',
    render: () => (
      <div className="h-full flex flex-col px-16 pt-14">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-4">The Fit</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">Why Secunderabad Division?</h2>
        <p className="text-lg text-gray-500 mb-8">You authored the AI strategy for Indian Railways. We provide the engine to make it autonomous.</p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { icon: <Layers className="w-6 h-6 text-[#1E3A8A]" />, title: 'Systems Thinking', desc: 'You think in networks and optimization — not point solutions. Our platform: "An intelligence layer that improves decision-making across the railway network."' },
            { icon: <Target className="w-6 h-6 text-[#1E3A8A]" />, title: 'Safety First', desc: 'Agentic Automation as a secondary "digital layer" for safety protocols (Kavach experience). Proactive alerts before bottlenecks become incidents.' },
            { icon: <BarChart3 className="w-6 h-6 text-[#1E3A8A]" />, title: 'Measurable Pilot', desc: 'Start with a Problem Definition Workshop. Identify one bottleneck. 4-week PoC with clear KPIs. Target: 15–20% reduction in operational friction.' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center italic">"We aren't here to sell a tool. We're here to prove Agentic workflows work — in your division."</p>
      </div>
    ),
  },
  // SLIDE 6: Next Steps
  {
    id: 'next-steps',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-16">
        <Badge className="w-fit bg-green-50 text-green-700 border-green-200 mb-6">Proposed Next Step</Badge>
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-3">A Problem Definition Workshop — Not a Contract</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">Three simple steps to measurable outcomes.</p>

        <div className="flex items-center gap-4 mb-10">
          {[
            { step: '1', label: 'Workshop', desc: '2–3 hours with your Data/Ops heads — identify one bottleneck' },
            { step: '2', label: 'Pilot Scope', desc: '4-week PoC on that one use case' },
            { step: '3', label: 'Measure', desc: 'Measurable reduction in operational friction (e.g., TAT, exception count)' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ArrowRight className="w-6 h-6 text-gray-300 flex-shrink-0" />}
              <Card className="flex-1 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">{item.step}</div>
                  <h3 className="font-semibold text-[#1E3A8A]">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
        </div>

        <div className="p-6 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10 max-w-2xl">
          <MessageSquare className="w-6 h-6 text-[#1E3A8A] mx-auto mb-2" />
          <p className="text-[#1E3A8A] font-semibold text-lg">
            "Where do you see the biggest opportunity for data-driven decision support in railway operations today?"
          </p>
        </div>
      </div>
    ),
  },
];

const RajaRailwaysDeck = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Deck content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl aspect-video bg-white rounded-xl shadow-xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slides[current].render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-4 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-gray-500 font-mono">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default RajaRailwaysDeck;
