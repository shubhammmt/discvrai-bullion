import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft, ChevronRight, Building2, Bot, TrendingDown,
  Construction, Wifi, Zap, MessageSquare, Users, Target,
  CheckCircle2, ArrowRight, FileText, Shield, BarChart3,
  Clock, AlertTriangle, Home, Phone
} from 'lucide-react';

const TOTAL_SLIDES = 7;

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
  // SLIDE 0: Context Setting
  {
    id: 'context',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37]" />
        <Badge className="w-fit bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20 mb-3">About Us</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Shubham Srivastava · DiscvrAI</h2>
        <p className="text-sm text-gray-500 mb-5">Enterprise AI for operations, analytics & commerce — in production across verticals.</p>

        <div className="grid grid-cols-5 gap-5 mb-4">
          <div className="col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Background</h3>
            {[
              { icon: <Building2 className="w-4 h-4 text-[#D4AF37]" />, role: 'CIO, Eureka Forbes', desc: 'Field force, supply chain, logistics at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#D4AF37]" />, role: 'CTO, Hindustan Times', desc: 'Media, content, distribution at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#D4AF37]" />, role: 'Head of Technology, MakeMyTrip', desc: 'Travel, personalization, high-volume transactions' },
              { icon: <Zap className="w-4 h-4 text-[#D4AF37]" />, role: 'Technical Depth', desc: 'ML, digital transformation — billion queries/sec, terabytes of data' },
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

          <div className="col-span-3 space-y-3">
            <div className="p-3 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Platform Brief</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                DiscvrAI enables <span className="font-semibold text-[#1E3A8A]">workflow automation</span> and <span className="font-semibold text-[#1E3A8A]">AI-enabled analytics</span> on top of existing data — no rip-and-replace. Deployment in weeks, not months. We work across manufacturing, BFSI, and now <span className="font-semibold text-[#D4AF37]">real estate</span> — same platform, domain-specific use cases.
              </p>
            </div>

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

        <p className="text-xs text-gray-400 mt-auto mb-4 text-center italic">"We're not theoretical. We're in production with manufacturing, BFSI, and logistics — solving real operational problems. Real estate is a natural extension."</p>
      </div>
    ),
  },
  // SLIDE 1: Title / Cover
  {
    id: 'cover',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37]" />
        <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl flex items-center justify-center mb-8 border border-[#D4AF37]/30">
          <Home className="w-10 h-10 text-[#D4AF37]" />
        </div>
        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">DiscvrAI × Emami Realty</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          AI-Driven Sales & Execution Intelligence —<br />
          <span className="text-[#D4AF37] font-semibold">Monetizing Strength, Maximizing Value</span>
        </p>
        <div className="mt-8 space-y-1">
          <p className="text-sm text-gray-500">Shubham Srivastava — Former CIO, Eureka Forbes | Hindustan Times | MakeMyTrip</p>
          <p className="text-xs text-gray-400">DiscvrAI — Workflow automation & AI analytics | Clients: Bajaj Electricals, CAMS, ADF Foods, Bajaj Finserv, Helios AMC</p>
        </div>
        <p className="text-xs text-gray-400 mt-8">Confidential | March 2026</p>
      </div>
    ),
  },
  // SLIDE 2: The Problem — Execution Squeeze
  {
    id: 'problem',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-red-50 text-red-700 border-red-200 mb-3">The Challenge</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">The Execution Squeeze — Where the Gap Is</h2>
        <p className="text-lg text-gray-500 mb-5">Strong assets. <span className="text-[#F59E0B] font-semibold">Revenue under pressure.</span></p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              icon: <TrendingDown className="w-6 h-6 text-red-500" />,
              title: 'Revenue Collapse',
              desc: 'Q3 FY26: Net sales down 91% YoY (₹4.89 Cr vs ₹57.22 Cr). Employee costs at 152% of revenue — unsustainable unit economics.',
              impact: 'Inventory (Aamod, Aastha, Business Bay) not converting to cash flow'
            },
            {
              icon: <Construction className="w-6 h-6 text-[#F59E0B]" />,
              title: 'Project Execution Lag',
              desc: '"Struggle to execute projects" — delays and cost overruns erode margins. 22M sq ft pipeline, ₹15,000 Cr potential — execution is the bottleneck.',
              impact: 'Monetizing the 3.7 Cr sq ft land bank depends on timely delivery'
            },
            {
              icon: <Wifi className="w-6 h-6 text-[#1E3A8A]" />,
              title: 'Competitive Tech Gap',
              desc: 'PS Group: $2.5 Bn AI/cloud investment; Srijan: tech-driven marketing. Traditional sales and site reporting can\'t keep pace with digitally native buyers.',
              impact: 'Lost leads, dropped inquiries, channel partners under-optimized'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-5 space-y-2.5">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-[#F59E0B] font-medium">Impact: {item.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 mb-3 p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-center">
          <p className="text-sm text-[#1E3A8A] font-medium">"3.7 Cr sq ft land bank · ₹850 Cr Aamod launch · ₹15,000 Cr pipeline — The assets are there. The execution engine needs a boost."</p>
        </div>
      </div>
    ),
  },
  // SLIDE 3: The Solution — Three Pillars
  {
    id: 'solution',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">The Solution</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Where AI Can Help — Three Pillars</h2>
        <p className="text-lg text-gray-500 mb-5">Sales velocity. Project oversight. <span className="text-[#D4AF37] font-semibold">Compliance.</span></p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              icon: <Target className="w-6 h-6 text-white" />,
              title: 'Sales Velocity & Lead Recovery',
              points: [
                'Predictive AI to re-engage failed leads — 5–6% re-engagement adds revenue without new ad spend',
                'Channel partner optimization: identify top 5% brokers who drive 40–50% of bookings',
                '24/7 AI chatbots for night leads, NRI inquiries, WhatsApp — compress decision cycle from months to weeks',
              ]
            },
            {
              icon: <Construction className="w-6 h-6 text-white" />,
              title: 'Project Execution & Margin Protection',
              points: [
                'AI-powered quantity takeoffs from blueprints — reduce manual errors by ~80%',
                'Variance tracking: BOQ linked to schedules for real-time material & cash flow forecasts',
                'Voice-to-text site reporting in Hindi/Bengali — supervisors capture progress without admin friction',
              ]
            },
            {
              icon: <Shield className="w-6 h-6 text-white" />,
              title: 'Compliance & Trust',
              points: [
                'Automated RERA filings, GST invoicing — reduce regulatory risk',
                'ESG monitoring for institutional capital alignment',
                'Audit trail and document intelligence for governance',
              ]
            },
          ].map((item, i) => (
            <Card key={i} className="bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 border-0 text-white">
              <CardContent className="p-5 space-y-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((p, j) => (
                    <li key={j} className="text-xs text-blue-100 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 mb-3 text-center italic">"Same platform we deploy for Bajaj Electricals, ADF Foods, CAMS — adapted for real estate."</p>
      </div>
    ),
  },
  // SLIDE 4: Killer Use Case — Lead Revival for Emami Aamod
  {
    id: 'use-case',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 mb-3">Killer Use Case</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Lead Revival for Emami Aamod</h2>
        <p className="text-lg text-gray-500 mb-3">Turn dormant leads into bookings — <span className="text-[#D4AF37] font-semibold">without new ad spend.</span></p>
        <p className="text-sm text-gray-500 mb-6">Emami Aamod (Kolkata) — ₹850 Cr revenue potential. Critical for near-term liquidity.</p>

        <div className="flex items-center justify-center gap-4 flex-1">
          {[
            {
              label: 'Input',
              sub: 'Historical lead database — past inquiries, site visits, dropped WhatsApp chats',
              icon: <FileText className="w-6 h-6 text-[#1E3A8A]" />
            },
            null,
            {
              label: 'Process',
              sub: 'Predictive AI ranks leads by conversion probability; AI chatbot re-engages via WhatsApp with floor plans, pricing, availability',
              icon: <Bot className="w-6 h-6 text-[#D4AF37]" />
            },
            null,
            {
              label: 'Output',
              sub: 'Qualified leads routed to sales; night leads & NRIs served 24/7; top 10% of leads drive 40–60% of bookings',
              icon: <CheckCircle2 className="w-6 h-6 text-green-600" />
            },
          ].map((item, i) =>
            item === null ? (
              <ArrowRight key={i} className="w-8 h-8 text-gray-300 flex-shrink-0" />
            ) : (
              <Card key={i} className="flex-1 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-5 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-bold text-[#1E3A8A] text-xl">{item.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="mt-5 mb-3 p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-center">
          <p className="text-sm text-[#1E3A8A] font-semibold">
            4–6 week pilot: Re-engage <span className="text-[#D4AF37]">500–1,000 dormant leads</span> for Aamod. Target: <span className="text-[#D4AF37]">5–6% conversion</span> to site visit or booking. Measurable ROI.
          </p>
        </div>
      </div>
    ),
  },
  // SLIDE 5: Why Emami Realty? Why Now?
  {
    id: 'why-now',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">Strategic Fit</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Why Emami Realty? Why Now?</h2>
        <p className="text-lg text-gray-500 mb-6">"Monetizing Strength" needs a <span className="text-[#D4AF37] font-semibold">digital engine.</span></p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
              title: 'Ground Zero Execution',
              desc: 'Dr. Kumar\'s philosophy: hands-on, precision, quality — AI as a force multiplier, not a replacement.',
              detail: 'Our platform deploys in weeks, sits on existing data, no rip-and-replace.'
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-[#D4AF37]" />,
              title: 'Liquidity Is the Priority',
              desc: 'Aamod, Aastha, Business Bay — inventory must move. Sales AI and lead recovery directly support revenue realization.',
              detail: 'Every re-engaged lead is revenue without new marketing spend.'
            },
            {
              icon: <Target className="w-6 h-6 text-[#D4AF37]" />,
              title: 'Measurable Pilot',
              desc: 'Problem Definition Workshop — 2–3 hours with Sales + Marketing heads.',
              detail: '4–6 week PoC on Lead Revival. Success: X% re-engagement, Y site visits, Z bookings — clear ROI.'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-5 space-y-3">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-[#1E3A8A]/70 leading-relaxed border-t border-gray-100 pt-2">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 mb-3 p-3 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10 text-center">
          <p className="text-sm text-[#1E3A8A] font-medium">"We aren't here to sell a generic PropTech stack. We're here to prove AI works for Emami — on your projects, your leads, your timeline."</p>
        </div>
      </div>
    ),
  },
  // SLIDE 6: Next Steps
  {
    id: 'next-steps',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">Next Steps</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Proposed Next Step</h2>
        <p className="text-lg text-gray-500 mb-8">A Problem Definition Workshop — <span className="text-[#D4AF37] font-semibold">Not a Contract.</span></p>

        <div className="flex items-center justify-center gap-4 flex-1">
          {[
            {
              label: 'Workshop',
              sub: '2–3 hours with Sales, Marketing & Ops — identify one high-impact use case (e.g., Lead Revival for Aamod, or Site Reporting)',
              icon: <Users className="w-8 h-8 text-[#1E3A8A]" />
            },
            null,
            {
              label: 'Pilot',
              sub: '4–6 week PoC on the chosen use case — scoped, measurable, low-risk',
              icon: <Zap className="w-8 h-8 text-[#D4AF37]" />
            },
            null,
            {
              label: 'Measure',
              sub: 'Re-engagement rate, site visits, bookings — or execution variance reduction. Clear ROI.',
              icon: <BarChart3 className="w-8 h-8 text-green-600" />
            },
          ].map((item, i) =>
            item === null ? (
              <ArrowRight key={i} className="w-8 h-8 text-gray-300 flex-shrink-0" />
            ) : (
              <Card key={i} className="flex-1 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-gray-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-bold text-[#1E3A8A] text-xl">{item.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="mt-6 mb-3 space-y-3">
          <div className="p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-center">
            <p className="text-lg text-[#1E3A8A] font-bold mb-1">
              "Which use case would you prioritise — Sales velocity, Project execution, or both?"
            </p>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> shubham@discvr.ai</span>
            <span>·</span>
            <span>Shubham Srivastava, Founder & CEO</span>
          </div>
        </div>
      </div>
    ),
  },
];

const EmamiRealtyDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen bg-white relative overflow-hidden font-sans">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] z-30" />

      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className="w-5 h-5 text-[#D4AF37]" />
        <span className="text-base font-bold tracking-tight text-[#1E3A8A]">DiscvrAI</span>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {slides[currentSlide].render()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-10 z-20">
        <span className="text-xs text-gray-400">Confidential | March 2026</span>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="w-8 h-8 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-mono text-sm text-gray-500">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="w-8 h-8 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmamiRealtyDeck;
