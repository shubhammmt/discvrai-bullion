import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Target, Users, BarChart3, TrendingUp, Brain, Workflow, Shield, ArrowRight, Zap, Package, DollarSign, Eye, CheckCircle2, FileText, Clock, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT_BROWN = '#6B3A2A';
const ACCENT_MAROON = '#7A2E3B';
const ACCENT_GOLD = '#B8860B';
const SLATE_DARK = '#1E293B';
const CREAM_BG = '#FAF8F5';
const WARM_WHITE = '#FFFDF9';

const clientRoster = [
  { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence' },
  { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution, investor analytics' },
  { client: 'ADF Foods', domain: 'Manufacturing', useCase: 'CEO sales dashboard, analytics' },
  { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'AI transformation, digital journeys' },
  { client: 'Helios AMC', domain: 'Asset Management', useCase: 'Agentic commerce, distribution' },
  { client: 'Adani Cement', domain: 'Cement / Industrial', useCase: 'Digital transformation, operations intelligence' },
  { client: 'Drychem', domain: 'Manufacturing', useCase: 'Operations, analytics' },
  { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Digital transformation' },
  { client: 'Deep Industries', domain: 'Oil & Gas', useCase: 'Operations analytics, asset reliability, ESG' },
  { client: 'Aptech', domain: 'Education', useCase: 'AI career counsellor, enrollment' },
];

interface SlideProps {
  isActive: boolean;
}

const Footer = ({ slideNum, total }: { slideNum: number; total: number }) => (
  <div className="absolute bottom-4 left-0 right-0 px-10 flex justify-between items-center">
    <span className="text-xs tracking-wide" style={{ color: '#9B8E80' }}>
      Confidential &nbsp;|&nbsp; Discvr.ai × Chitale Bandhu &nbsp;|&nbsp; April 2026
    </span>
    <span className="text-xs font-mono" style={{ color: '#9B8E80' }}>
      {String(slideNum).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
);

// ─── SLIDE 1: TITLE ───
const Slide1 = () => (
  <div className="h-full flex flex-col justify-between px-12 py-10" style={{ background: WARM_WHITE }}>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full" style={{ background: ACCENT_MAROON }} />
      <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: ACCENT_MAROON }}>
        Discvr.ai
      </span>
    </div>

    <div className="flex-1 flex flex-col justify-center max-w-[1100px]">
      <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: SLATE_DARK }}>
        Discvr.ai × Chitale Bandhu Mithaiwale
      </h1>
      <p className="text-2xl leading-relaxed mb-8" style={{ color: '#4A4A4A' }}>
        Digital + AI transformation for operational visibility, demand–supply alignment, and capital efficiency at scale
      </p>

      <div className="flex items-center gap-6 mb-10">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${ACCENT_MAROON}40, transparent)` }} />
      </div>

      <p className="text-base mb-3" style={{ color: '#6B6B6B' }}>
        Brief conversation with Finance leadership — introduction via Indraneel Chitale
      </p>
      <p className="text-base font-semibold" style={{ color: SLATE_DARK }}>
        Shubham Srivastava — Founder, Discvr.ai &nbsp;|&nbsp; +91 9873961591
      </p>
    </div>

    {/* Subtle geometric motif */}
    <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04]">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="80" fill="none" stroke={ACCENT_MAROON} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke={ACCENT_MAROON} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="40" fill="none" stroke={ACCENT_MAROON} strokeWidth="0.5" />
      </svg>
    </div>
  </div>
);

// ─── SLIDE 2: CREDENTIALS ───
const Slide2 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-8" style={{ color: SLATE_DARK }}>
      Why this conversation — execution at scale
    </h2>

    <div className="flex-1 flex flex-col gap-6 max-w-[1100px]">
      <p className="text-lg" style={{ color: '#4A4A4A' }}>
        Founder <strong style={{ color: SLATE_DARK }}>Shubham Srivastava</strong> — ~two decades as CIO / technology leadership across field force, supply chain, logistics, and high-volume digital — now Discvr.ai for AI-led digital transformation.
      </p>

      <div className="grid grid-cols-3 gap-5 mt-2">
        {[
          { title: 'Eureka Forbes', desc: 'Field force, supply chain, logistics, enterprise systems driving revenue ops', icon: <Target className="w-5 h-5" /> },
          { title: 'Hindustan Times', desc: 'Content + distribution at scale', icon: <FileText className="w-5 h-5" /> },
          { title: 'MakeMyTrip', desc: 'Personalization, high-volume digital transactions', icon: <TrendingUp className="w-5 h-5" /> },
        ].map((item, i) => (
          <div key={i} className="rounded-lg p-5 border" style={{ background: '#F7F4F0', borderColor: '#E8E2DA' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold" style={{ color: SLATE_DARK }}>{item.title}</h3>
            </div>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg p-4 border-l-4" style={{ borderColor: ACCENT_MAROON, background: '#F7F4F0' }}>
        <p className="text-base" style={{ color: '#4A4A4A' }}>
          <strong>Technical depth:</strong> ML + digital transformation across supply chain, logistics, customer journeys — "P&L, not slides."
        </p>
      </div>

      <p className="text-base mt-2" style={{ color: '#6B6B6B' }}>
        <strong style={{ color: ACCENT_MAROON }}>Why Chitale:</strong> Traditional foods & FMCG benefit most when SKU-level, channel-level, and cash-level signals move in near real time — especially with short shelf life and festival-driven demand.
      </p>
    </div>
  </div>
);

// ─── SLIDE 3: PLATFORM + CLIENT TABLE ───
const Slide3 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-5" style={{ color: SLATE_DARK }}>
      Discvr.ai — practical AI & automation on what you already run
    </h2>

    <p className="text-base leading-relaxed mb-5 max-w-[1050px]" style={{ color: '#4A4A4A' }}>
      Workflow automation + AI-enabled analytics on top of existing data and tools — no rip-and-replace. Typical path: prove value in weeks on prioritised workflows, then expand. Domain logic sits in agents, workflows, and governance (human-in-the-loop, evidence trails, role-based control).
    </p>

    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: ACCENT_MAROON, color: '#fff' }}>
            <th className="text-left py-2.5 px-4 font-semibold rounded-tl-lg">Client</th>
            <th className="text-left py-2.5 px-4 font-semibold">Domain</th>
            <th className="text-left py-2.5 px-4 font-semibold rounded-tr-lg">Use Case</th>
          </tr>
        </thead>
        <tbody>
          {clientRoster.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#FDFBF8' : '#F7F4F0' }}>
              <td className="py-2.5 px-4 font-semibold" style={{ color: SLATE_DARK }}>{row.client}</td>
              <td className="py-2.5 px-4" style={{ color: '#555' }}>{row.domain}</td>
              <td className="py-2.5 px-4" style={{ color: '#555' }}>{row.useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-sm mt-3" style={{ color: '#9B8E80' }}>
      Same platform discipline — your recipes, channels, plants, and CFO metrics.
    </p>
  </div>
);

// ─── SLIDE 4: CONTEXT ───
const Slide4 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-6" style={{ color: SLATE_DARK }}>
      Context — scale, tradition, and modern distribution
    </h2>

    <div className="flex-1 grid grid-cols-2 gap-5 max-w-[1100px]">
      {[
        { icon: <TrendingUp className="w-5 h-5" />, title: 'National / omnichannel acceleration', desc: 'E-commerce & quick-commerce as expansion levers alongside retail — complexity shifts from "sell" to predict and replenish.' },
        { icon: <Package className="w-5 h-5" />, title: 'Portfolio breadth + perishability', desc: '250+ SKUs, short shelf life, seasonal & festival-driven demand — forecasting error shows up as wastage or stock-out quickly.' },
        { icon: <Workflow className="w-5 h-5" />, title: 'Operational excellence underway', desc: 'High manufacturing automation, "Cows to Cloud" IoT on dairy — opportunity is unified visibility from signals → plan → inventory → cash.' },
        { icon: <BarChart3 className="w-5 h-5" />, title: 'Competitive bar rising', desc: 'Peers raising the bar on integrated digital cores and analytics — differentiation will be speed + margin discipline, not only brand.' },
      ].map((item, i) => (
        <div key={i} className="rounded-lg p-5 border" style={{ background: '#F7F4F0', borderColor: '#E8E2DA' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold" style={{ color: SLATE_DARK }}>{item.title}</h3>
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Flywheel */}
    <div className="mt-5 flex items-center justify-center gap-3">
      {['Demand signals', 'Production & procurement', 'Inventory & service', 'Cash & margin'].map((step, i) => (
        <React.Fragment key={i}>
          <div className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: `${ACCENT_MAROON}12`, color: ACCENT_MAROON }}>
            {step}
          </div>
          {i < 3 && <ArrowRight className="w-4 h-4" style={{ color: ACCENT_MAROON }} />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// ─── SLIDE 5: DIGITAL TRANSFORMATION ───
const Slide5 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-6" style={{ color: SLATE_DARK }}>
      Digital transformation — one truthful operational picture
    </h2>
    <p className="text-base mb-6" style={{ color: '#6B6B6B' }}>
      ERP / tools may exist or be in motion — this is the integration layer + master data discipline + workflow that completes the picture.
    </p>

    <div className="flex-1 grid grid-cols-2 gap-5 max-w-[1100px]">
      {[
        { icon: <Eye className="w-6 h-6" />, title: 'End-to-end SKU & channel visibility', desc: 'What is selling where, at what margin, at what service level — across retail, distribution, Q-com.' },
        { icon: <Package className="w-6 h-6" />, title: 'Inventory & freshness control', desc: 'FEFO, inter-node transfers, SLA by channel (including quick-commerce rhythms).' },
        { icon: <Clock className="w-6 h-6" />, title: 'Closed-loop ops cadence', desc: 'Daily / weekly S&OP-style views finance can trust — not reconstructed in Excel.' },
        { icon: <Shield className="w-6 h-6" />, title: 'Control & auditability', desc: 'Role-based workflows; evidence for exceptions and overrides — board-friendly trails.' },
      ].map((item, i) => (
        <div key={i} className="rounded-lg p-5 border" style={{ background: '#F7F4F0', borderColor: '#E8E2DA' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold" style={{ color: SLATE_DARK }}>{item.title}</h3>
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-5 rounded-lg p-4 border-l-4 text-center" style={{ borderColor: ACCENT_GOLD, background: '#FAF6EE' }}>
      <p className="text-base font-semibold" style={{ color: SLATE_DARK }}>
        "Digitize the decision chain — not just the transaction."
      </p>
    </div>
  </div>
);

// ─── SLIDE 6: AI TRANSFORMATION ───
const Slide6 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-5" style={{ color: SLATE_DARK }}>
      AI transformation — better forecasts, fewer surprises
    </h2>

    <div className="flex-1 grid grid-cols-2 gap-5 max-w-[1100px]">
      {[
        { icon: <Brain className="w-6 h-6" />, title: 'Demand sensing', desc: 'Multi-signal models: promotions, calendar / festive shifts, weather, channel mix, POS data — target is lower error on high-volatility SKUs. Pilot-measured, not guaranteed %.' },
        { icon: <Package className="w-6 h-6" />, title: 'Inventory & wastage', desc: 'Recommended buffers by node (plant / DC / channel) with explainability — reduce expiry-driven shrink.' },
        { icon: <Layers className="w-6 h-6" />, title: 'Procurement / RM alignment', desc: 'Early visibility when raw-material cost is a large share of economics — tighter coverage and order policy.' },
        { icon: <DollarSign className="w-6 h-6" />, title: 'Working capital lens', desc: 'DIO, payables / receivables visibility paired to demand scenario views — cash tied in inventory, quantified.' },
      ].map((item, i) => (
        <div key={i} className="rounded-lg p-5 border" style={{ background: '#F7F4F0', borderColor: '#E8E2DA' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold" style={{ color: SLATE_DARK }}>{item.title}</h3>
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
        </div>
      ))}
    </div>

    <p className="text-xs mt-4" style={{ color: '#9B8E80' }}>
      Human approval on material plans; private deployment options; no training on your data for third parties without contract.
    </p>
  </div>
);

// ─── SLIDE 7: NEXT STEP ───
const Slide7 = () => (
  <div className="h-full flex flex-col px-12 py-10" style={{ background: WARM_WHITE }}>
    <h2 className="text-3xl font-bold mb-6" style={{ color: SLATE_DARK }}>
      Practical next step — pilot before platform debates
    </h2>

    <div className="flex-1 flex flex-col gap-6 max-w-[1100px]">
      <div className="grid grid-cols-3 gap-5">
        {[
          { num: '01', title: 'Start narrow', desc: '1–2 SKU clusters or 1 region / channel + one plant / DC view — 6–10 week proof.' },
          { num: '02', title: 'Measure what matters', desc: 'Forecast error (MAPE / bias), fill rate, wastage / shrink, inventory turns, planner hours, cash tied in inventory — pick 3–4 with CFO.' },
          { num: '03', title: 'Integration posture', desc: 'Read from existing sources first; avoid big-bang rip-and-replace in the pilot phase.' },
        ].map((item, i) => (
          <div key={i} className="rounded-lg p-5 border" style={{ background: '#F7F4F0', borderColor: '#E8E2DA' }}>
            <span className="text-2xl font-black" style={{ color: ACCENT_MAROON }}>{item.num}</span>
            <h3 className="text-lg font-bold mt-2 mb-2" style={{ color: SLATE_DARK }}>{item.title}</h3>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg p-5 border-l-4" style={{ borderColor: ACCENT_MAROON, background: '#F7F4F0' }}>
        <h3 className="text-lg font-bold mb-2" style={{ color: SLATE_DARK }}>Ask</h3>
        <p className="text-base" style={{ color: '#555' }}>
          Workshop with Finance + Supply + IT — data map + highest-pain use case. 60-minute working session to specify a clickable pilot.
        </p>
      </div>

      <div className="mt-auto rounded-lg p-5 text-center" style={{ background: `${ACCENT_MAROON}08` }}>
        <p className="text-lg font-semibold" style={{ color: SLATE_DARK }}>
          "We're aligning to Chitale's expansion — disciplined, measurable, board-friendly."
        </p>
        <p className="text-base mt-3 font-semibold" style={{ color: ACCENT_MAROON }}>
          Shubham Srivastava — Founder, Discvr.ai &nbsp;|&nbsp; +91 9873961591
        </p>
      </div>
    </div>
  </div>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];
const TOTAL = slides.length;

const ChitaleBandhuDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((dir: number) => {
    setCurrent(prev => {
      const next = prev + dir;
      if (next < 0 || next >= TOTAL) return prev;
      setDirection(dir);
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const SlideComponent = slides[current];

  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: CREAM_BG }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50" style={{ background: '#E8E2DA' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${((current + 1) / TOTAL) * 100}%`, background: ACCENT_MAROON }}
        />
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 pt-1"
        >
          <SlideComponent />
          <Footer slideNum={current + 1} total={TOTAL} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30"
          style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ background: i === current ? ACCENT_MAROON : '#D5CFC7' }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          disabled={current === TOTAL - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30"
          style={{ background: `${ACCENT_MAROON}15`, color: ACCENT_MAROON }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChitaleBandhuDeck;
