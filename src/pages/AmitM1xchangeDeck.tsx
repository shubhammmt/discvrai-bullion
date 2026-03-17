import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft, ChevronRight, AlertTriangle, Clock, Shield,
  Bot, BarChart3, ShoppingCart, Zap, ArrowRight, MessageSquare,
  Building2, Globe, FileText, TrendingUp, Users, Target,
  CheckCircle2
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
  // SLIDE 0: Context Setting
  {
    id: 'context',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981]" />
        <Badge className="w-fit bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20 mb-3">About Us</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Shubham Srivastava · DiscvrAI</h2>
        <p className="text-sm text-gray-500 mb-5">Enterprise AI for operations, analytics & commerce — in production across verticals.</p>

        <div className="grid grid-cols-5 gap-5 mb-4">
          <div className="col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Background</h3>
            {[
              { icon: <Building2 className="w-4 h-4 text-[#10B981]" />, role: 'CIO, Eureka Forbes', desc: 'Field force, supply chain, logistics at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#10B981]" />, role: 'CTO, Hindustan Times', desc: 'Media, content, distribution at scale' },
              { icon: <Building2 className="w-4 h-4 text-[#10B981]" />, role: 'Head of Technology, MakeMyTrip', desc: 'Travel, personalization, high-volume transactions' },
              { icon: <Zap className="w-4 h-4 text-[#10B981]" />, role: 'Technical Depth', desc: 'ML, digital transformation — billion queries/sec, terabytes of data' },
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
                DiscvrAI enables large-scale <span className="font-semibold text-[#1E3A8A]">workflow automation</span> and <span className="font-semibold text-[#1E3A8A]">AI-enabled analytics</span> that sit on top of any existing data — no rip-and-replace. Deployment in weeks, not months. We also do <span className="font-semibold text-[#10B981]">agentic commerce</span> for complex products (e.g., mutual funds, financial services). Same platform, different verticals.
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

        <p className="text-xs text-gray-400 mt-auto mb-4 text-center italic">"We're not theoretical. We're in production with BFSI, manufacturing, and distribution — solving real operational risk, throughput, and compliance problems."</p>
      </div>
    ),
  },
  // SLIDE 1: Title / Cover
  {
    id: 'cover',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981]" />
        <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl flex items-center justify-center mb-8 border border-[#10B981]/30">
          <TrendingUp className="w-10 h-10 text-[#10B981]" />
        </div>
        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">DiscvrAI × M1xchange</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Agentic FinOps for TReDS —<br />
          <span className="text-[#10B981] font-semibold">Risk, Throughput, Compliance at Scale</span>
        </p>
        <p className="text-sm text-gray-400 mt-8">M1xchange | TReDS Platform | Confidential | March 2025</p>
      </div>
    ),
  },
  // SLIDE 2: The Problem
  {
    id: 'problem',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-red-50 text-red-700 border-red-200 mb-3">The Challenge</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Two Silent Killers as You Scale</h2>
        <p className="text-lg text-gray-500 mb-5">₹11k Cr today. ₹20k Cr tomorrow. International next. <span className="text-[#F59E0B] font-semibold">What breaks?</span></p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { icon: <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />, title: 'The Risk Blindspot', desc: 'Traditional credit algorithms use static data — miss early-warning signals in unstructured transaction behavior.', impact: 'Hidden risk in MSME data; NPA surprises' },
            { icon: <Clock className="w-6 h-6 text-[#F59E0B]" />, title: 'Onboarding Latency', desc: 'Every hour an MSME is stuck in KYC or Verification = capital not deployed.', impact: 'Throughput ceiling; manual bottlenecks' },
            { icon: <Shield className="w-6 h-6 text-[#F59E0B]" />, title: 'Regulatory Complexity', desc: 'Section 43B (h) compliance + GST reconciliations for 35,000+ MSMEs — manual = ticking time bomb.', impact: 'Compliance risk; operational overload' },
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
          <p className="text-sm text-[#1E3A8A] font-medium">"Information Asymmetry + Operational Overload — the two silent killers at scale."</p>
        </div>
      </div>
    ),
  },
  // SLIDE 3: The Solution
  {
    id: 'solution',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">The Solution</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Agents That Act as Virtual Credit Officers</h2>
        <p className="text-lg text-gray-500 mb-5">Not dashboards. <span className="text-[#10B981] font-semibold">Agents that execute.</span></p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              icon: <BarChart3 className="w-6 h-6 text-white" />,
              title: 'Agentic Analytics',
              sub: 'The "Early Warning" Agent',
              desc: 'Analyzes delta in payment patterns across TReDS. Flags a supplier 15 days before default by detecting subtle shifts in invoice frequency.',
              metric: '10–15% Gini improvement'
            },
            {
              icon: <ShoppingCart className="w-6 h-6 text-white" />,
              title: 'Agentic Commerce',
              sub: 'The "Liquidity Agent"',
              desc: 'Sits between Corporates and Banks — autonomously optimizes bidding. Best rates for MSMEs + maximum utilization of bank limits.',
              metric: 'Zero manual auction intervention'
            },
            {
              icon: <Bot className="w-6 h-6 text-white" />,
              title: 'Agentic Automation',
              sub: 'The "Compliance Guard"',
              desc: 'Built for Section 43B (h). Scans invoices, checks MSME status, auto-triggers payment reminders to 1,600+ Corporates.',
              metric: 'Zero compliance errors'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 border-0 text-white">
              <CardContent className="p-5 space-y-2.5">
                <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-xs text-[#34D399] font-medium">{item.sub}</p>
                <p className="text-sm text-blue-100 leading-relaxed">{item.desc}</p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-[#10B981] font-semibold">{item.metric}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 mb-3 text-center italic">"Same agentic architecture — adapted for TReDS and trade finance."</p>
      </div>
    ),
  },
  // SLIDE 4: Cross-Border Agent (M1 NXT)
  {
    id: 'cross-border',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">M1 NXT</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">International Trade Finance Ready</h2>
        <p className="text-lg text-gray-500 mb-8">As you expand into Singapore FinTech Festival and global markets</p>

        <div className="flex items-center justify-center gap-4 flex-1">
          {[
            { label: 'Document', sub: 'Multi-lingual trade docs (English, Mandarin, etc.)', icon: <FileText className="w-6 h-6 text-[#1E3A8A]" /> },
            null,
            { label: 'Agent', sub: 'Parses, calculates FX risk, checks global sanctions — in seconds', icon: <Bot className="w-6 h-6 text-[#10B981]" /> },
            null,
            { label: 'Output', sub: 'Document intelligence + FX risk assessment + sanctions clearance', icon: <CheckCircle2 className="w-6 h-6 text-[#10B981]" /> },
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

        <div className="mt-6 mb-3 p-4 bg-[#10B981]/10 rounded-xl border border-[#10B981]/20 text-center">
          <p className="text-sm text-[#1E3A8A] font-semibold">
            Processing time: <span className="text-[#10B981]">8 seconds</span> vs. <span className="text-[#F59E0B]">2–3 hours</span> manual — directly supports ITFS and international expansion.
          </p>
        </div>
      </div>
    ),
  },
  // SLIDE 5: Efficiency Metrics
  {
    id: 'metrics',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">Quantified Impact</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Data-Driven Outcomes</h2>
        <p className="text-lg text-gray-500 mb-8">Agentic FinOps — measurable impact across three levers.</p>

        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-[#1E3A8A] text-white">
              <div className="p-4 font-semibold text-sm border-r border-white/10">Metric</div>
              <div className="p-4 font-semibold text-sm border-r border-white/10 text-center">Today</div>
              <div className="p-4 font-semibold text-sm text-center">With Agentic FinOps</div>
            </div>
            {[
              { metric: 'Lead-to-Liquidity', today: '48 hours', after: '4 hours' },
              { metric: 'Credit Risk (Gini)', today: 'Baseline', after: '+10–15% improvement' },
              { metric: 'Throughput Scaling', today: '2× volume = 2× Ops', after: '2× volume, same headcount' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
                <div className="p-4 text-sm font-semibold text-[#1E3A8A] border-r border-gray-100">{row.metric}</div>
                <div className="p-4 text-sm text-center text-[#F59E0B] font-medium border-r border-gray-100">{row.today}</div>
                <div className="p-4 text-sm text-center text-[#10B981] font-bold">{row.after}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-3 p-3 bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/10 text-center">
          <p className="text-sm text-[#1E3A8A] font-medium">"Efficiency. Risk. Scalability. — The three levers that matter."</p>
        </div>
      </div>
    ),
  },
  // SLIDE 6: Platform Fit — Use Cases
  {
    id: 'use-cases',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200 mb-3">Platform Fit</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">How Agentic FinOps Maps to M1xchange</h2>
        <p className="text-sm text-gray-500 mb-5">Four agents. Four TReDS use cases.</p>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {[
            { icon: <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />, title: 'Early Warning Agent', input: 'GST, bank statements, TReDS transaction patterns', output: 'Supplier risk flags 15 days ahead', roi: 'NPA reduction, better capital allocation' },
            { icon: <ShoppingCart className="w-5 h-5 text-[#10B981]" />, title: 'Liquidity Agent', input: 'Corporate demand, bank limits, MSME invoices', output: 'Optimized bidding, best rates, max utilization', roi: 'Higher throughput, zero manual auction' },
            { icon: <Shield className="w-5 h-5 text-[#1E3A8A]" />, title: 'Compliance Guard', input: 'Invoices, MSME status, Section 43B (h) rules', output: 'Auto reminders, compliance reports', roi: 'Value-added service; zero compliance errors' },
            { icon: <Globe className="w-5 h-5 text-[#10B981]" />, title: 'Cross-Border Agent (M1 NXT)', input: 'Multi-lingual trade docs, FX feeds, sanctions lists', output: 'Document intelligence, FX risk, sanctions clearance', roi: 'International expansion readiness' },
          ].map((uc, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">{uc.icon}</div>
                  <h3 className="font-semibold text-[#1E3A8A]">{uc.title}</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <p><span className="text-gray-400 font-medium">Input:</span> <span className="text-gray-600">{uc.input}</span></p>
                  <p><span className="text-gray-400 font-medium">Output:</span> <span className="text-gray-600">{uc.output}</span></p>
                  <p><span className="text-[#10B981] font-semibold">ROI:</span> <span className="text-gray-700 font-medium">{uc.roi}</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 7: Why DiscvrAI
  {
    id: 'proof',
    render: () => (
      <div className="h-full flex flex-col px-14 pt-10">
        <Badge className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">Proven at Scale</Badge>
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-1">Same Platform. Different Verticals.</h2>
        <p className="text-sm text-gray-500 mb-6">Enterprise infrastructure. Domain expertise. Measurable ROI.</p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              title: 'Financial Services (AMC SaaS)',
              metrics: ['15%+ conversion', '40–50% CAC reduction', '60%+ support deflection'],
              relevance: 'Agentic commerce, risk, compliance',
              color: '#10B981'
            },
            {
              title: 'Manufacturing (Custom)',
              metrics: ['30% leakage reduction (Finance Agent)', '50% faster processing'],
              relevance: 'Reconciliation, document intelligence, automation',
              color: '#F59E0B'
            },
            {
              title: 'BFSI Integrations',
              metrics: ['SAP, payment gateways, CRM, WhatsApp', 'Virtual integration layer'],
              relevance: 'TReDS ecosystem integration — no rip-and-replace',
              color: '#1E3A8A'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  <Target className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-[#1E3A8A]">{item.title}</h3>
                <div className="space-y-1">
                  {item.metrics.map((m, j) => (
                    <p key={j} className="text-sm font-bold" style={{ color: item.color }}>{m}</p>
                  ))}
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span className="font-medium text-gray-400">Relevance:</span> {item.relevance}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 8: Next Steps
  {
    id: 'next-steps',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-16">
        <Badge className="w-fit bg-green-50 text-green-700 border-green-200 mb-6">Proposed Next Step</Badge>
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-3">A Scoped Pilot — One Use Case, Clear KPIs</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">Three simple steps to measurable outcomes.</p>

        <div className="flex items-center gap-4 mb-10">
          {[
            { step: '1', label: 'Discovery', desc: '2-hour session — identify highest-impact use case' },
            { step: '2', label: 'Pilot', desc: '4–6 week PoC on that use case with your data' },
            { step: '3', label: 'Measure', desc: 'Measurable improvement (Gini, Lead-to-Liquidity, compliance errors)' },
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
            "Which of these would you prioritise for the next quarter — Risk, Throughput, or Compliance?"
          </p>
        </div>
      </div>
    ),
  },
];

const AmitM1xchangeDeck = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
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

      <div className="px-6 pb-4 flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-gray-500 font-mono">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <Button variant="outline" size="sm" onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))} disabled={current === slides.length - 1}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AmitM1xchangeDeck;
