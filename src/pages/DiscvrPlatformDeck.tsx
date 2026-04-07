import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Printer, Phone, Database, GitBranch, Brain, Bot, BarChart3, Layers, ArrowRight, AlertTriangle, CheckCircle2, Target, Users, Settings, Zap, Shield, TrendingUp, Package, Workflow, Gauge, FileText, Building2, Factory, Landmark } from 'lucide-react';

const TOTAL = 9;
const navy = '#0F172A';
const accent = '#14B8A6';
const accentLight = 'rgba(20,184,166,0.07)';
const cardBg = '#F8FAFC';
const muted = '#64748B';

/* ── Shell ──────────────────────────────────────────────── */
const Shell: React.FC<{ children: React.ReactNode; n: number }> = ({ children, n }) => (
  <div className="w-full h-screen flex flex-col relative" style={{ background: '#FFFFFF' }}>
    <div className="flex-1 flex items-center justify-center px-8 sm:px-16 py-12">
      <div style={{ maxWidth: 1120, width: '100%' }}>{children}</div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-10 pb-4 text-xs" style={{ color: muted }}>
      <span>Confidential | DiscvrAI | April 2026</span>
      <span className="font-mono" style={{ color: navy }}>{String(n).padStart(2, '0')}/09</span>
    </div>
  </div>
);

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2" style={{ color: navy }}>{children}</h1>
);
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-4" style={{ color: navy }}>{children}</h2>
);
const Bullet: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <div className="flex items-start gap-3 mb-3">
    <span className="mt-1 flex-shrink-0">{icon || <ArrowRight size={16} color={accent} />}</span>
    <span className="text-base leading-relaxed" style={{ color: '#334155' }}>{children}</span>
  </div>
);
const Outcome: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-6 px-5 py-3 rounded-lg" style={{ background: accentLight, borderLeft: `3px solid ${accent}` }}>
    <span className="text-sm font-semibold" style={{ color: accent }}>{children}</span>
  </div>
);
const Card: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="rounded-xl p-5 border" style={{ background: cardBg, borderColor: 'rgba(0,0,0,0.06)' }}>
    <div className="mb-3" style={{ color: accent }}>{icon}</div>
    <div className="text-sm font-bold mb-1" style={{ color: navy }}>{title}</div>
    <div className="text-xs leading-relaxed" style={{ color: muted }}>{desc}</div>
  </div>
);

/* ── Slides ─────────────────────────────────────────────── */

const Slide1 = () => (
  <Shell n={1}>
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: accentLight, color: accent }}>
        Decisions · Automation · Impact
      </div>
      <H1>From fragmented operations to measurable transformation</H1>
      <p className="text-lg mt-4 mb-6 leading-relaxed" style={{ color: '#475569' }}>
        DiscvrAI helps enterprises move from scattered data and manual decisions to automated, measurable business outcomes.
      </p>
      <p className="text-sm font-medium" style={{ color: muted }}>
        Trusted by <span style={{ color: accent, fontWeight: 700 }}>25+ enterprises</span> across data-heavy, operations-heavy industries
      </p>
      <div className="flex justify-center gap-6 mt-8">
        {['BFSI', 'Manufacturing', 'EPC', 'Energy', 'Industrials'].map(s => (
          <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-md" style={{ background: cardBg, color: navy, border: '1px solid rgba(0,0,0,0.06)' }}>{s}</span>
        ))}
      </div>
    </div>
  </Shell>
);

const Slide2 = () => (
  <Shell n={2}>
    <H2>Where transformation usually breaks</H2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {[
        { icon: <BarChart3 size={20} />, text: 'Teams start with dashboards or AI tools before fixing data and workflows.' },
        { icon: <FileText size={20} />, text: 'Different teams run on different spreadsheets and WhatsApp updates.' },
        { icon: <Users size={20} />, text: 'Decisions stay manual even after technology investment.' },
        { icon: <AlertTriangle size={20} />, text: 'ROI is unclear, so transformation momentum drops.' },
      ].map((b, i) => (
        <div key={i} className="flex items-start gap-4 p-5 rounded-xl border" style={{ background: cardBg, borderColor: 'rgba(0,0,0,0.06)' }}>
          <span className="mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }}>{b.icon}</span>
          <span className="text-sm leading-relaxed" style={{ color: '#334155' }}>{b.text}</span>
        </div>
      ))}
    </div>
    <Outcome>If layers are skipped, impact is delayed or lost.</Outcome>
  </Shell>
);

const Slide3 = () => {
  const layers = [
    { label: 'Business Impact', sub: 'Revenue · Cost · Efficiency', color: accent, icon: <TrendingUp size={18} /> },
    { label: 'Automation & AI', sub: 'Agents + governed automation', color: '#8B5CF6', icon: <Bot size={18} /> },
    { label: 'Decision Intelligence', sub: 'Insights → actions', color: '#3B82F6', icon: <Brain size={18} /> },
    { label: 'Process Digitization', sub: 'Workflow layer', color: '#F59E0B', icon: <Workflow size={18} /> },
    { label: 'Data Foundation', sub: 'Single source of truth', color: '#64748B', icon: <Database size={18} /> },
  ];
  return (
    <Shell n={3}>
      <H2>The DiscvrAI transformation stack</H2>
      <p className="text-sm mb-8" style={{ color: muted }}>Every layer strengthens the next — skip one and the stack weakens.</p>
      <div className="max-w-xl mx-auto space-y-3">
        {layers.map((l, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.06)', borderLeft: `4px solid ${l.color}` }}>
            <span style={{ color: l.color }}>{l.icon}</span>
            <div>
              <div className="text-sm font-bold" style={{ color: navy }}>{l.label}</div>
              <div className="text-xs" style={{ color: muted }}>{l.sub}</div>
            </div>
            {i < layers.length - 1 && (
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded" style={{ background: `${l.color}15`, color: l.color }}>Layer {5 - i}</span>
            )}
            {i === layers.length - 1 && (
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded" style={{ background: `${l.color}15`, color: l.color }}>Layer 1</span>
            )}
          </div>
        ))}
      </div>
    </Shell>
  );
};

const Slide4 = () => (
  <Shell n={4}>
    <H2>Build operational trust first</H2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
      <div className="p-6 rounded-xl border" style={{ background: cardBg, borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Database size={20} color={accent} />
          <span className="text-base font-bold" style={{ color: navy }}>Data Foundation</span>
        </div>
        <Bullet>Connect sales, operations, finance, and project data.</Bullet>
        <Bullet>Clean and standardize key business entities.</Bullet>
        <Bullet>Create one trusted view for leadership and teams.</Bullet>
      </div>
      <div className="p-6 rounded-xl border" style={{ background: cardBg, borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Workflow size={20} color="#F59E0B" />
          <span className="text-base font-bold" style={{ color: navy }}>Process Digitization</span>
        </div>
        <Bullet icon={<ArrowRight size={16} color="#F59E0B" />}>Convert email/WhatsApp/Excel-based routines into trackable workflows.</Bullet>
        <Bullet icon={<ArrowRight size={16} color="#F59E0B" />}>Define ownership, SLA, and escalation.</Bullet>
        <Bullet icon={<ArrowRight size={16} color="#F59E0B" />}>Make approvals and reporting system-driven.</Bullet>
      </div>
    </div>
    <Outcome>Visibility + accountability across teams.</Outcome>
  </Shell>
);

const Slide5 = () => (
  <Shell n={5}>
    <H2>Move from dashboards to decisions</H2>
    <p className="text-sm mb-6" style={{ color: muted }}>Decision Intelligence — your wedge into real transformation ROI.</p>
    <div className="space-y-1">
      <Bullet icon={<Brain size={16} color={accent} />}>Explain what changed, why it changed, and what to do next.</Bullet>
      <Bullet icon={<Target size={16} color={accent} />}>Deliver predictive alerts and recommended actions.</Bullet>
      <Bullet icon={<Gauge size={16} color={accent} />}>Prioritize exceptions so leadership focuses on what matters.</Bullet>
      <Bullet icon={<FileText size={16} color={accent} />}>Create decision notes tied to real business metrics.</Bullet>
    </div>
    <Outcome>Faster, better, data-backed decisions.</Outcome>
  </Shell>
);

const Slide6 = () => (
  <Shell n={6}>
    <H2>Automate repetitive work, keep human control</H2>
    <div className="space-y-1 mt-4">
      <Bullet icon={<Settings size={16} color={accent} />}>Workflow automation for repetitive operational and finance tasks.</Bullet>
      <Bullet icon={<Bot size={16} color={accent} />}>OpenClaw-style autonomous agents for multi-step execution with approvals.</Bullet>
      <Bullet icon={<Phone size={16} color={accent} />}>Voice agents for field updates, frontline support, and manager escalations.</Bullet>
      <Bullet icon={<Shield size={16} color={accent} />}>Human-in-the-loop controls for high-impact actions.</Bullet>
    </div>
    <Outcome>Cost reduction + speed without losing governance.</Outcome>
  </Shell>
);

const Slide7 = () => (
  <Shell n={7}>
    <H2>Measure transformation in business outcomes</H2>
    <div className="space-y-1 mt-4">
      <Bullet icon={<Target size={16} color={accent} />}>Tie every initiative to one revenue, one cost, or one efficiency metric.</Bullet>
      <Bullet icon={<BarChart3 size={16} color={accent} />}>Track baseline vs current performance by business owner.</Bullet>
      <Bullet icon={<Users size={16} color={accent} />}>Show impact by function: sales, operations, finance, and leadership.</Bullet>
      <Bullet icon={<FileText size={16} color={accent} />}>Use monthly impact narratives, not only dashboards.</Bullet>
    </div>
    <Outcome>Clear measurable impact and faster scale decisions.</Outcome>
  </Shell>
);

const Slide8 = () => {
  const suites = [
    { icon: <Database size={22} />, title: 'Data Command Center', desc: 'Unified data layer for all business entities and metrics.' },
    { icon: <Workflow size={22} />, title: 'Workflow Digitization Studio', desc: 'Convert manual routines into SLA-tracked workflows.' },
    { icon: <Brain size={22} />, title: 'Decision Intelligence Hub', desc: 'Insights, alerts, and recommended actions for leadership.' },
    { icon: <Bot size={22} />, title: 'Automation & Agent Orchestrator', desc: 'OpenClaw agents + voice bots with human-in-the-loop.' },
    { icon: <Gauge size={22} />, title: 'Executive Impact Cockpit', desc: 'Monthly impact narratives tied to business KPIs.' },
    { icon: <Package size={22} />, title: 'Industry Solutions Packs', desc: 'Pre-built accelerators for BFSI, manufacturing, EPC, energy.' },
  ];
  return (
    <Shell n={8}>
      <H2>Product suites your teams can pilot quickly</H2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {suites.map((s, i) => <Card key={i} {...s} />)}
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: accentLight, color: accent, border: `1px solid ${accent}30` }}>
          Start with a 6–8 week POC tied to one business KPI and one process owner
        </span>
      </div>
    </Shell>
  );
};

const Slide9 = () => (
  <Shell n={9}>
    <div className="max-w-3xl mx-auto">
      <H2>Start with one use case, prove impact, then scale</H2>
      <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
        {[
          { week: 'Week 1–2', label: 'Business baseline + data/process mapping', icon: <FileText size={18} /> },
          { week: 'Week 3–6', label: 'Build and run controlled pilot', icon: <Settings size={18} /> },
          { week: 'Week 7–8', label: 'Impact measurement + scale roadmap', icon: <TrendingUp size={18} /> },
        ].map((p, i) => (
          <div key={i} className="text-center p-5 rounded-xl border" style={{ background: cardBg, borderColor: 'rgba(0,0,0,0.06)' }}>
            <span style={{ color: accent }}>{p.icon}</span>
            <div className="text-xs font-bold mt-2 mb-1" style={{ color: accent }}>{p.week}</div>
            <div className="text-xs leading-relaxed" style={{ color: '#334155' }}>{p.label}</div>
          </div>
        ))}
      </div>

      {/* Presenter */}
      <div className="p-6 rounded-xl border" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.08)', borderTop: `3px solid ${accent}` }}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="flex-1">
            <div className="text-lg font-bold" style={{ color: navy }}>Shubham Srivastava</div>
            <div className="text-sm font-semibold mb-2" style={{ color: accent }}>CEO, DiscvrAI</div>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Two decades leading large-scale digital transformation and technology organisations — <strong>CIO (Eureka Forbes)</strong>, <strong>CTO (Hindustan Times)</strong>, <strong>Head of Technology (MakeMyTrip)</strong>.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="tel:+919873961591" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white no-underline" style={{ background: accent }}>
              <Phone size={16} />
              +91-9873961591
            </a>
            <div className="text-xs mt-2 text-center" style={{ color: muted }}>India</div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

/* ── Main ───────────────────────────────────────────────── */

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];

const DiscvrPlatformDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const go = useCallback((d: number) => {
    setCurrent(p => Math.max(0, Math.min(TOTAL - 1, p + d)));
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go]);

  const SlideComponent = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        .deck-root { font-family: 'DM Sans', sans-serif; }
        .deck-root * { box-sizing: border-box; }
        @media print {
          body * { visibility: hidden !important; }
          .deck-print, .deck-print * { visibility: visible !important; }
          .deck-print { position: absolute; left: 0; top: 0; width: 100%; }
          .deck-print .print-slide { page-break-after: always; width: 100vw; min-height: 100vh; padding: 48px 64px; background: #fff !important; color: #111 !important; }
          .deck-print .print-slide:last-child { page-break-after: avoid; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="deck-root" style={{ background: '#FFFFFF' }}>
        {/* Top bar */}
        <div className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <span className="text-sm font-bold tracking-wide" style={{ color: navy }}>DiscvrAI</span>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" style={{ background: i === current ? accent : 'rgba(0,0,0,0.15)' }} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => window.print()} className="no-print p-1.5 rounded-md hover:bg-gray-100 transition" aria-label="Print">
              <Printer size={16} color={muted} />
            </button>
          </div>
        </div>

        {/* Slide */}
        <div className="pt-12">
          <SlideComponent />
        </div>

        {/* Nav arrows */}
        <div className="no-print fixed bottom-8 right-8 flex gap-2 z-50">
          <button onClick={() => go(-1)} disabled={current === 0} className="w-10 h-10 rounded-full flex items-center justify-center border transition disabled:opacity-30" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.1)' }} aria-label="Previous">
            <ChevronLeft size={18} color={navy} />
          </button>
          <button onClick={() => go(1)} disabled={current === TOTAL - 1} className="w-10 h-10 rounded-full flex items-center justify-center border transition disabled:opacity-30" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.1)' }} aria-label="Next">
            <ChevronRight size={18} color={navy} />
          </button>
        </div>
      </div>

      {/* Print view */}
      <div className="deck-print deck-root" style={{ display: 'none' }}>
        {slides.map((S, i) => (
          <div key={i} className="print-slide"><S /></div>
        ))}
      </div>
    </>
  );
};

export default DiscvrPlatformDeck;
