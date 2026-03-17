import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Train, ChevronLeft, ChevronRight, Layers, Clock, Users,
  Bot, BarChart3, ShoppingCart, Zap, Target, ArrowRight, MessageSquare,
  Briefcase, Building2, GraduationCap, Shield
} from 'lucide-react';

const clientRoster = [
  { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence' },
  { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution, investor analytics' },
  { client: 'ADF Foods', domain: 'Manufacturing', useCase: 'CEO sales dashboard, analytics' },
  { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'AI transformation, digital journeys' },
  { client: 'Helios AMC', domain: 'Asset Management', useCase: 'Agentic commerce, distribution' },
  { client: 'Drychem', domain: 'Manufacturing', useCase: 'Operations, analytics' },
  { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Digital transformation' },
  { client: 'Aptech', domain: 'Education', useCase: 'AI career counsellor, enrollment' },
];

const slides = [
  // SLIDE 0: Context Setting — Credentials & Client Roster
  {
    id: 'context',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]" />
        <Badge className="w-fit bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20 mb-3">Context Setting</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">A Peer-to-Peer Conversation</h2>
        <p className="text-sm text-gray-500 mb-5">Establishing credibility — not as a vendor, but as a practitioner.</p>

        {/* Two-column: Credentials + Platform */}
        <div className="grid grid-cols-5 gap-5 mb-4">
          {/* Credentials */}
          <div className="col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Presenter Credentials</h3>
            {[
              { icon: <Building2 className="w-4 h-4 text-[#F59E0B]" />, role: 'CIO, Eureka Forbes', desc: 'Field force, supply chain, logistics at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#F59E0B]" />, role: 'CIO, Hindustan Times', desc: 'Media, content, distribution at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#F59E0B]" />, role: 'CIO, MakeMyTrip', desc: 'Travel, personalization, high-volume transactions' },
              { icon: <Zap className="w-4 h-4 text-[#F59E0B]" />, role: 'Technical Depth', desc: 'ML, digital transformation — billion queries/sec, terabytes of data' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-[#1E3A8A]">{item.role}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Brief + Approach */}
          <div className="col-span-3 space-y-3">
            <div className="p-3 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Platform Brief</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                DiscvrAI enables large-scale <span className="font-semibold text-[#1E3A8A]">workflow automation</span> and <span className="font-semibold text-[#1E3A8A]">AI-enabled analytics</span> that sit on top of any existing data — no rip-and-replace. Deployment in weeks, not months. We also do <span className="font-semibold text-[#F59E0B]">agentic commerce</span> for complex products. Same platform, different verticals.
              </p>
            </div>

            {/* Client Roster — Compact Table */}
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Enterprise Clients in Production</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {clientRoster.map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-gray-50 text-xs">
                  <span className="font-semibold text-[#1E3A8A] min-w-[90px]">{c.client}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 truncate">{c.useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Opening Line */}
        <div className="mt-auto mb-4 p-3 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20">
          <p className="text-xs text-[#1E3A8A] leading-relaxed italic">
            "Mr. Raja, I know you've authored the AI strategy for Indian Railways — most of what I could present you've already thought through. So I'd like to ask: <span className="font-semibold not-italic">where do you see the biggest opportunity for us to add value?</span>"
          </p>
        </div>
      </div>
    ),
  },
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
      <div className="h-full flex flex-col px-14 pt-12">
        <Badge className="w-fit bg-red-50 text-red-700 border-red-200 mb-3">The Challenge</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">The Complexity-Action Gap</h2>
        <p className="text-lg text-gray-500 mb-6">Data exists. But execution lags.</p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { icon: <Layers className="w-6 h-6 text-[#F59E0B]" />, title: 'Operational Silos', desc: 'Data across 13 departments (Loco, Traffic, Engineering, Security) — manual intervention to move from insight to execution.', impact: 'Latency between data generation and corrective action' },
            { icon: <Clock className="w-6 h-6 text-[#F59E0B]" />, title: 'Predictive vs. Reactive', desc: "Current systems tell you what is happening — they don't autonomously initiate the 'first response' to prevent bottlenecks.", impact: 'Reactive firefighting instead of proactive optimization' },
            { icon: <Users className="w-6 h-6 text-[#F59E0B]" />, title: 'Human Bandwidth', desc: '30+ direct reports bogged down by routine coordination rather than high-level strategic optimization.', impact: 'Senior leaders spend time on coordination, not optimization' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-5 space-y-2.5">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-[#F59E0B] font-medium">Impact: {item.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 mb-3 p-3 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10 text-center">
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
      <div className="h-full flex flex-col px-14 pt-12">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">The Solution</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Agentic Rails — A Digital Chief of Staff for Your Division</h2>
        <p className="text-lg text-gray-500 mb-6">Not dashboards. Agents that act.</p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { icon: <Bot className="w-6 h-6 text-white" />, title: 'Agentic Automation', sub: 'The "Digital Station Master"', desc: 'AI Agents monitor freight schedules & loco availability. If a freight train is delayed by a caution order, the Agent auto-notifies the next 3 stations, suggests revised crew shift, and updates the cargo client — without five manual emails.' },
            { icon: <BarChart3 className="w-6 h-6 text-white" />, title: 'Agentic Analytics', sub: 'Beyond Dashboards', desc: 'Instead of "Why was TAT high yesterday?" — the Agent proactively sends: "DRM Sir, turnaround at X yard increased 12% due to Y. I have drafted an inquiry for the Senior DOM and suggested alternative routing for the next 4 hours."' },
            { icon: <ShoppingCart className="w-6 h-6 text-white" />, title: 'Agentic Commerce', sub: 'Freight & Revenue Growth', desc: 'Agent monitors market commodity prices vs. empty wagon flow. Identifies opportunity to capture 5 MT cement cargo by dynamically suggesting discount or rake placement — matching discrete choice demand modelling.' },
          ].map((item, i) => (
            <Card key={i} className="bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 border-0 text-white">
              <CardContent className="p-5 space-y-2.5">
                <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-xs text-[#FBBF24] font-medium">{item.sub}</p>
                <p className="text-sm text-blue-100 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 mb-3 text-center italic">Same architecture we deploy for manufacturing and BFSI — adapted for railway operations.</p>
      </div>
    ),
  },
  // SLIDE 4: The Killer Demo
  {
    id: 'demo-preview',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-12">
        <Badge className="w-fit bg-amber-50 text-amber-700 border-amber-200 mb-3">Live Demo</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">What You'll See — The 24-Hour Division Pulse</h2>
        <p className="text-lg text-gray-500 mb-8">A Simulated Agentic Control Room</p>

        <div className="flex items-center justify-center gap-4 flex-1">
          {[
            { label: 'Input', sub: 'Mock feed of train delays, weather alerts, staff absences', icon: <Zap className="w-6 h-6 text-[#F59E0B]" /> },
            null,
            { label: 'Process', sub: 'Three Agents (Ops, Safety, Revenue) debating the best course of action in a log', icon: <Bot className="w-6 h-6 text-[#1E3A8A]" /> },
            null,
            { label: 'Output', sub: 'A single, high-level "Decision Brief" for the DRM to approve on phone with one tap', icon: <Target className="w-6 h-6 text-green-600" /> },
          ].map((item, i) =>
            item === null ? (
              <ArrowRight key={i} className="w-8 h-8 text-gray-300 flex-shrink-0" />
            ) : (
              <Card key={i} className="flex-1 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-bold text-[#1E3A8A] text-xl">{item.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="mt-6 mb-3 p-4 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20 text-center">
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
      <div className="h-full flex flex-col px-14 pt-12">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">The Fit</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Why Secunderabad Division?</h2>
        <p className="text-lg text-gray-500 mb-6">You authored the AI strategy for Indian Railways. We provide the engine to make it autonomous.</p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { icon: <Layers className="w-6 h-6 text-[#1E3A8A]" />, title: 'Systems Thinking', desc: 'You think in networks and optimization — not point solutions. Our platform: "An intelligence layer that improves decision-making across the railway network."' },
            { icon: <Shield className="w-6 h-6 text-[#1E3A8A]" />, title: 'Safety First', desc: 'Agentic Automation as a secondary "digital layer" for safety protocols (Kavach experience). Proactive alerts before bottlenecks become incidents.' },
            { icon: <BarChart3 className="w-6 h-6 text-[#1E3A8A]" />, title: 'Measurable Pilot', desc: 'Start with a Problem Definition Workshop with your Data/Ops heads. Identify one specific bottleneck. 4-week PoC with clear KPIs. Target: 15–20% reduction in operational friction.' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-5 space-y-2.5">
                <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 mb-3 text-center italic">"We aren't here to sell a tool. We're here to prove Agentic workflows work — in your division."</p>
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
            { step: '3', label: 'Measure', desc: 'Measurable reduction in operational friction (e.g., turnaround time, exception count)' },
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
