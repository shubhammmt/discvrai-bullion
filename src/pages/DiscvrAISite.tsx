import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Zap, ArrowUpRight, Link2, Settings, BarChart3, Database, Cpu, Brain,
  Plug, LineChart, ShieldCheck, Users, CheckCircle2, ArrowRight, ChevronDown,
  Building2, Factory, Zap as ZapIcon, ShoppingCart, Home as HomeIcon, HeartPulse,
  Mail, Phone, MenuIcon, X,
} from 'lucide-react';

/* ============================================================
   DiscvrAI — Static, SEO-friendly marketing site
   Route: /discvrai-site
   ============================================================ */

const COLORS = {
  teal: '#0D6E5E',
  green: '#00E5A0',
  dark: '#0A0F0D',
  surfaceDark: '#131A16',
  light: '#F5F7F5',
  text: '#111A15',
  muted: '#6B7B72',
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
.font-display { font-family: 'Syne', system-ui, sans-serif; }
.font-body { font-family: 'DM Sans', system-ui, sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
.dai-scroll-fade { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.dai-scroll-fade.in { opacity: 1; transform: translateY(0); }
.hero-mesh {
  background:
    radial-gradient(900px 500px at 15% 20%, rgba(0,229,160,0.12), transparent 60%),
    radial-gradient(700px 500px at 85% 70%, rgba(13,110,94,0.28), transparent 60%),
    radial-gradient(500px 400px at 50% 100%, rgba(0,229,160,0.08), transparent 60%);
}
`;

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'what-we-do', label: 'What We Do' },
  { id: 'how-we-work', label: 'How We Work' },
  { id: 'industries', label: 'Industries' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'engagement-models', label: 'Engagement' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

const useScrollFadeIn = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.dai-scroll-fade').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ============================================================ */
const Logo: React.FC<{ light?: boolean }> = ({ light }) => (
  <a
    href="#home"
    onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
    className="flex items-center gap-2"
  >
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-md"
      style={{ background: COLORS.teal }}
    >
      <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
    </span>
    <span
      className="font-display text-xl font-bold tracking-tight"
      style={{ color: light ? '#fff' : COLORS.text }}
    >
      DiscvrAI
    </span>
  </a>
);

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        background: scrolled ? COLORS.dark : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo light />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(1, -1).map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="font-body text-sm text-white/75 transition hover:text-white"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="hidden rounded-md px-4 py-2 font-body text-sm font-semibold text-white transition hover:opacity-90 sm:inline-block"
            style={{ background: COLORS.teal }}
          >
            Talk to us
          </button>
          <button
            className="rounded-md p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden" style={{ background: COLORS.dark, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => { scrollTo(n.id); setOpen(false); }}
                className="rounded-md px-3 py-2 text-left font-body text-sm text-white/80 hover:bg-white/5"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const SectionLabel: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div
    className="font-mono text-xs font-medium uppercase tracking-[0.22em]"
    style={{ color: light ? COLORS.green : COLORS.teal }}
  >
    {children}
  </div>
);

const Hero: React.FC = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center overflow-hidden pt-24"
    style={{ background: COLORS.dark }}
  >
    <div className="hero-mesh absolute inset-0" />
    <div className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionLabel light>Enterprise transformation · Outcomes first</SectionLabel>
      <h1
        className="font-display mt-6 max-w-5xl text-[40px] font-bold leading-[1.05] text-white sm:text-5xl lg:text-[72px]"
      >
        Enterprise transformation fails when data, decisions and execution stay disconnected.
      </h1>
      <p className="font-body mt-8 max-w-3xl text-lg text-white/70 sm:text-xl">
        DiscvrAI helps mature enterprises convert fragmented systems, manual decisioning and operational
        blind spots into measurable business outcomes — without replacing SAP, Oracle, Salesforce, MES,
        SCADA, CRM or data platforms.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { icon: ArrowUpRight, t: 'Improve revenue, margin, cost, risk and customer experience outcomes' },
          { icon: Link2, t: 'Build decision and execution layers on top of existing enterprise systems' },
          { icon: Settings, t: 'Convert unstructured data, workflows and operational signals into automated actions' },
          { icon: BarChart3, t: 'Deploy command centres, agentic workflows and analytics business teams use daily' },
        ].map(({ icon: Icon, t }, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg p-5"
            style={{
              background: COLORS.surfaceDark,
              borderLeft: `3px solid ${COLORS.green}`,
            }}
          >
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: COLORS.green }} />
            <p className="font-body text-sm text-white/85">{t}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => scrollTo('contact')}
          className="inline-flex items-center gap-2 rounded-md px-6 py-3 font-body text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: COLORS.teal }}
        >
          Start with an outcome pilot <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollTo('case-studies')}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-white/5"
        >
          See our work
        </button>
      </div>
    </div>
    <button
      onClick={() => scrollTo('why-discvrai')}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white"
      aria-label="Scroll"
    >
      <ChevronDown className="h-6 w-6" />
    </button>
  </section>
);

const Positioning: React.FC = () => (
  <section id="why-discvrai" className="py-24" style={{ background: COLORS.light }}>
    <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
      <div className="dai-scroll-fade">
        <SectionLabel>Why DiscvrAI</SectionLabel>
        <p
          className="font-display mt-6 text-3xl font-bold leading-tight sm:text-5xl"
          style={{ color: COLORS.teal }}
        >
          "Not deep tech for the sake of tech."
        </p>
      </div>
      <div className="dai-scroll-fade space-y-6">
        {[
          'Most enterprises have the systems. They lack the intelligence layer on top.',
          "We don't replace your core platforms. We build decision and execution layers that make them smarter.",
          'We start with a focused 8–12 week outcome pilot — then scale across functions.',
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-4">
            <span
              className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: `${COLORS.teal}15` }}
            >
              <CheckCircle2 className="h-4 w-4" style={{ color: COLORS.teal }} />
            </span>
            <p className="font-body text-lg leading-relaxed" style={{ color: COLORS.text }}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Capabilities: React.FC = () => {
  const items = [
    { icon: Database, t: 'Data Foundation', d: 'Lakehouse, data pipelines, feature stores, semantic layer, data quality and governance.' },
    { icon: Cpu, t: 'AI and Machine Learning', d: 'Forecasting, anomaly detection, predictive models, recommendations, risk scoring and optimisation.' },
    { icon: Brain, t: 'Generative and Agentic AI', d: 'RAG, copilots, workflow agents, document intelligence, conversational BI and action automation.' },
    { icon: Plug, t: 'Enterprise Integration', d: 'Connectors into SAP, Oracle, Salesforce, CRM, MES, SCADA, core banking and data warehouses.' },
    { icon: LineChart, t: 'Command Centres and BI', d: 'Dashboards, alerts, next-best-action intelligence and exception-first operating views.' },
    { icon: ShieldCheck, t: 'Governance and Adoption', d: 'Role-based access, audit trails, explainability, human-in-the-loop controls and change enablement.' },
  ];
  return (
    <section id="what-we-do" className="py-24" style={{ background: COLORS.dark }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel light>What we bring together</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
            What we build to solve enterprise outcomes
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="dai-scroll-fade rounded-lg p-7 transition hover:-translate-y-1"
              style={{ background: COLORS.surfaceDark, borderLeft: `3px solid ${COLORS.green}` }}
            >
              <Icon className="h-7 w-7" style={{ color: COLORS.green }} />
              <h3 className="font-display mt-5 text-xl font-bold text-white">{t}</h3>
              <p className="font-body mt-3 text-sm leading-relaxed text-white/65">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowWeWork: React.FC = () => {
  const flow = ['Existing Systems', 'Unified Data Layer', 'AI / Analytics Layer', 'Command Centre & Workflow Agents', 'Measurable Business Outcomes'];
  const steps = [
    { t: 'Outcome Discovery', d: 'Define the business KPI, value case, users and operating model.' },
    { t: 'Data & Architecture Readiness', d: 'Map systems, data sources, workflows, controls and integration points.' },
    { t: 'Build and Deploy', d: 'Create the dashboard, agent, workflow, model or command centre.' },
    { t: 'Run, Improve and Scale', d: 'Monitor adoption, business impact and model quality. Scale to adjacent use cases.' },
  ];
  const diffs = [
    { icon: Users, t: 'Joint teams, not vendors', d: 'Mixed pods of your people and ours. Knowledge transfers as we build, not after.' },
    { icon: CheckCircle2, t: 'Enterprise-grade quality', d: 'Security, observability, reproducibility, reversibility and model risk controls — production-ready by default.' },
    { icon: ArrowRight, t: 'Clear exit path', d: 'You own the code, data, features, model weights and pipelines. We design for you to run it.' },
  ];
  return (
    <section id="how-we-work" className="py-24" style={{ background: COLORS.light }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel>Our operating model</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl" style={{ color: COLORS.text }}>
            One model: data → decision → action
          </h2>
        </div>

        {/* flow */}
        <div className="dai-scroll-fade mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {flow.map((n, i) => {
            const last = i === flow.length - 1;
            return (
              <React.Fragment key={n}>
                <div
                  className="flex-1 rounded-lg px-5 py-4 text-center font-body text-sm font-semibold"
                  style={{
                    background: last ? COLORS.teal : '#fff',
                    color: last ? '#fff' : COLORS.text,
                    border: last ? 'none' : '1px solid #E2E8E5',
                  }}
                >
                  {n}
                </div>
                {!last && (
                  <ArrowRight
                    className="hidden h-5 w-5 flex-shrink-0 lg:block"
                    style={{ color: COLORS.teal }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* steps */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="dai-scroll-fade rounded-lg bg-white p-7 shadow-sm" style={{ border: '1px solid #E2E8E5' }}>
              <div className="font-mono text-xs font-semibold" style={{ color: COLORS.teal }}>STEP 0{i + 1}</div>
              <h3 className="font-display mt-3 text-lg font-bold" style={{ color: COLORS.text }}>{s.t}</h3>
              <p className="font-body mt-2 text-sm leading-relaxed" style={{ color: COLORS.muted }}>{s.d}</p>
            </div>
          ))}
        </div>

        {/* diffs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {diffs.map(({ icon: Icon, t, d }) => (
            <div key={t} className="dai-scroll-fade flex items-start gap-3 rounded-lg p-5" style={{ background: '#fff', border: '1px solid #E2E8E5' }}>
              <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: COLORS.teal }} />
              <div>
                <div className="font-body font-semibold" style={{ color: COLORS.text }}>{t}</div>
                <div className="font-body mt-1 text-sm" style={{ color: COLORS.muted }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Industries: React.FC = () => {
  const sectors = [
    { icon: Building2, t: 'BFSI', a: 'Risk, fraud, collections, RM productivity and governed GenAI on core banking, CRM and data platforms', o: 'Lower leakage · Faster decisioning · Higher collection rate' },
    { icon: Factory, t: 'Manufacturing & Industrial', a: 'Demand sensing, predictive maintenance, dispatch and quality intelligence on ERP + MES + historian', o: 'Lower downtime · Better OTIF · Lower inventory leakage' },
    { icon: ZapIcon, t: 'Energy & EPC', a: 'Project control towers, asset reliability and document intelligence across subsurface, drilling, BOQ and vendor systems', o: 'Lower project delays · Better asset uptime · Cost overrun alerts' },
    { icon: ShoppingCart, t: 'D2C & Commerce', a: 'Conversion, retention, demand planning and CX automation on existing data warehouse', o: 'Higher conversion · Lower churn · Better demand accuracy' },
    { icon: HomeIcon, t: 'Real Estate & Infrastructure', a: 'Sales intelligence, project command centres, document intelligence and payment follow-up automation', o: 'Faster sales velocity · Reduced collection delays · Better project visibility' },
    { icon: HeartPulse, t: 'Healthcare', a: 'Patient ops, RCM, supply chain and field-force intelligence on existing HIS / pharma stacks', o: 'Faster verification · Fewer denials · Better channel visibility' },
  ];
  return (
    <section id="industries" className="py-24" style={{ background: COLORS.dark }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel light>Where we create impact</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">Sectors we work in</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ icon: Icon, t, a, o }) => (
            <div
              key={t}
              className="dai-scroll-fade group rounded-lg p-7 transition hover:-translate-y-1"
              style={{
                background: COLORS.surfaceDark,
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 0 0 0 transparent',
              }}
            >
              <Icon className="h-7 w-7" style={{ color: COLORS.green }} />
              <h3 className="font-display mt-5 text-xl font-bold text-white">{t}</h3>
              <p className="font-body mt-3 text-sm leading-relaxed text-white/65">{a}</p>
              <div className="mt-5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>Business Outcomes</div>
                <div className="font-body mt-1 text-sm text-white/85">{o}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Patterns: React.FC = () => {
  const patterns = [
    { t: 'Forecasting & Demand Sensing', d: 'Hierarchical demand and price models across SKU / region / channel.', o: 'Inventory reduction, higher service levels, better planning accuracy.' },
    { t: 'Predictive Maintenance', d: 'Failure prediction, anomaly detection and RUL on sensor and SCADA streams.', o: 'Lower downtime, fewer failures, lower maintenance cost.' },
    { t: 'Constraint Optimisation', d: 'Routing, scheduling, manpower, dispatch and asset planning under real constraints.', o: 'Better utilisation, lower cost-to-serve, faster turnaround.' },
    { t: 'Risk, Fraud & Graph Intelligence', d: 'Entity resolution, network analytics and uplift models for collections and retention.', o: 'Leakage reduction, higher collections, better fraud detection.' },
    { t: 'Document & Vision AI', d: 'OCR, multimodal RAG and CV on SOPs, contracts, drawings and inspection imagery.', o: 'Faster processing, lower manual effort, higher auditability.' },
    { t: 'Agentic Decision Intelligence', d: 'NL-to-SQL on governed data and agent workflows that propose and execute actions.', o: 'Faster decisions, automated follow-ups, next-best actions.' },
  ];
  return (
    <section id="capabilities" className="py-24" style={{ background: COLORS.light }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel>Repeatable patterns</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl" style={{ color: COLORS.text }}>
            What we build — capability patterns that create measurable value
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((p) => (
            <div key={p.t} className="dai-scroll-fade rounded-lg bg-white p-7" style={{ border: '1px solid #E2E8E5', borderLeft: `3px solid ${COLORS.teal}` }}>
              <h3 className="font-display text-lg font-bold" style={{ color: COLORS.text }}>{p.t}</h3>
              <p className="font-body mt-3 text-sm leading-relaxed" style={{ color: COLORS.muted }}>{p.d}</p>
              <div className="mt-5 border-t pt-4" style={{ borderColor: '#E2E8E5' }}>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color: COLORS.teal }}>Business Outcome</div>
                <div className="font-body mt-1 text-sm font-semibold" style={{ color: COLORS.teal }}>{p.o}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies: React.FC = () => {
  type Case = { sector: string; domain: string; title: string; challenge: string; built: string; impact: string };
  const cases: Case[] = [
    { sector: 'BFSI', domain: 'BFSI / NBFC · Lending', title: 'Collections Intelligence & Governed GenAI', challenge: 'Manual collections prioritisation with low recovery rates and unstructured ops data.', built: 'Risk scoring engine, uplift-based collections prioritisation and governed GenAI layer for ops and sales teams.', impact: 'Collections productivity · Risk intelligence' },
    { sector: 'BFSI', domain: 'BFSI / AMC Services', title: 'Distribution Analytics & Fund Flow Intelligence', challenge: 'Fragmented MIS and limited visibility into fund distribution performance at scale.', built: 'Distribution analytics platform, fund flow ML models and operations intelligence dashboards.', impact: 'Operations productivity · MIS speed' },
    { sector: 'BFSI', domain: 'BFSI / Cash Logistics', title: 'ATM Route Optimisation & Anomaly Detection', challenge: 'Margin leakage across a large ATM network with reactive operations.', built: 'Route and cassette optimisation system with anomaly detection across 70,000+ ATMs.', impact: 'Margin leakage recovery · ATM ops efficiency' },
    { sector: 'Manufacturing', domain: 'Manufacturing / Consumer Electricals', title: 'Demand Sensing & Supply Chain Command Centre', challenge: 'Poor demand accuracy and limited supply chain visibility across channels and SKUs.', built: 'Hierarchical demand sensing models, supply chain analytics and an operations command centre.', impact: 'Inventory improvement · Service level uplift' },
    { sector: 'Manufacturing', domain: 'Manufacturing / FMCG', title: 'CEO Sales Intelligence & MIS Automation', challenge: 'Senior leadership dependent on manual reporting with slow decision turnaround.', built: 'CEO-level sales intelligence platform, production analytics and automated MIS workflows.', impact: 'Faster MIS · Better decision visibility' },
    { sector: 'Energy & EPC', domain: 'Energy & EPC / Oil & Gas', title: 'Field Operations & Asset Reliability Intelligence', challenge: 'Reactive asset maintenance and limited field operations visibility.', built: 'Field operations analytics platform, asset reliability models and service orchestration layer.', impact: 'Equipment utilisation · Downtime reduction' },
    { sector: 'D2C', domain: 'D2C / Education · Online Learning', title: 'AI Career Counsellor & Enrolment Intelligence', challenge: 'High CAC and low enrolment conversion with unstructured lead and counsellor data.', built: 'AI career counsellor, funnel scoring models and enrolment intelligence dashboards.', impact: 'Higher conversion · Lower CAC' },
    { sector: 'BFSI', domain: 'BFSI / Asset Management', title: 'Fund Analytics & Distribution Intelligence', challenge: 'Limited channel visibility and manual fund performance tracking.', built: 'Fund analytics and distribution flow intelligence platform.', impact: 'Sales intelligence · Channel productivity' },
    { sector: 'Manufacturing', domain: 'Manufacturing / Industrial · Cement', title: 'Manufacturing Operations & Process Intelligence', challenge: 'High asset downtime and limited process efficiency visibility across plants.', built: 'Manufacturing operations intelligence system with asset and process analytics.', impact: 'Asset utilisation · Process efficiency' },
  ];
  const tabs = ['All', 'BFSI', 'Manufacturing', 'Energy & EPC', 'D2C', 'Real Estate'];
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? cases : cases.filter((c) => c.sector === active);

  return (
    <section id="case-studies" className="py-24" style={{ background: COLORS.dark }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel light>Selected work</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
            Outcomes delivered — across sectors
          </h2>
        </div>

        <div className="dai-scroll-fade mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className="rounded-full px-4 py-2 font-body text-xs font-semibold transition"
                style={{
                  background: isActive ? COLORS.teal : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                  border: `1px solid ${isActive ? COLORS.teal : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <article
              key={i}
              className="dai-scroll-fade rounded-lg p-7 transition hover:-translate-y-1"
              style={{ background: COLORS.surfaceDark, border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                className="font-mono inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${COLORS.teal}30`, color: COLORS.green }}
              >
                {c.sector}
              </span>
              <div className="font-mono mt-4 text-[10px] uppercase tracking-wider text-white/50">{c.domain}</div>
              <h3 className="font-display mt-2 text-lg font-bold leading-snug text-white">{c.title}</h3>
              <p className="font-body mt-3 text-sm text-white/65">{c.challenge}</p>
              <p className="font-body mt-3 text-sm text-white/80">{c.built}</p>
              <div className="font-body mt-5 border-t pt-4 text-sm font-bold" style={{ borderColor: 'rgba(255,255,255,0.08)', color: COLORS.green }}>
                {c.impact}
              </div>
            </article>
          ))}
        </div>

        <p className="font-body mt-8 text-center text-sm italic text-white/50">
          Client names withheld. Details available under NDA.
        </p>
      </div>
    </section>
  );
};

const Engagement: React.FC = () => {
  const models = [
    {
      label: 'MODEL 1', t: 'End-to-End Transformation',
      d: 'Multi-quarter program to rewire a business unit or function — strategy, build, change.',
      best: 'Board-level mandate, real P&L to move, multiple workstreams that must land together.',
      time: '2–3 quarters', shape: 'Outcome-linked', recommended: false,
    },
    {
      label: 'MODEL 2', t: 'Targeted Problem Solution',
      d: 'Focused 8–12 week build to solve one painful, well-defined business problem end-to-end.',
      best: 'Sharp problem, data exists, you need a working system — not another deck.',
      time: '8–12 weeks', shape: 'Fixed-fee / milestone', recommended: true,
    },
    {
      label: 'MODEL 3', t: 'Talent Augmentation',
      d: 'Senior AI, data, product and engineering talent embedded into your teams under your leadership.',
      best: 'Direction and architecture exist; you need depth on specific roles to ship faster.',
      time: 'Weeks', shape: 'T&M / monthly', recommended: false,
    },
  ];
  return (
    <section id="engagement-models" className="py-24" style={{ background: COLORS.light }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel>How we engage</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl" style={{ color: COLORS.text }}>
            Three ways to work with us — pick the shape that fits
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.t}
              className="dai-scroll-fade relative flex flex-col rounded-xl bg-white p-8"
              style={{
                border: m.recommended ? `2px solid ${COLORS.teal}` : '1px solid #E2E8E5',
                boxShadow: m.recommended ? '0 20px 40px -20px rgba(13,110,94,0.25)' : 'none',
              }}
            >
              {m.recommended && (
                <span
                  className="font-mono absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: COLORS.teal }}
                >
                  Recommended
                </span>
              )}
              <div className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.teal }}>{m.label}</div>
              <h3 className="font-display mt-3 text-2xl font-bold" style={{ color: COLORS.text }}>{m.t}</h3>
              <p className="font-body mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>{m.d}</p>
              <div className="mt-6 space-y-3 text-sm">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: COLORS.muted }}>Best when</div>
                  <div className="font-body mt-1" style={{ color: COLORS.text }}>{m.best}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: COLORS.muted }}>Time to value</div>
                  <div className="font-body mt-1 font-semibold" style={{ color: COLORS.text }}>{m.time}</div>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <span
                  className="font-mono inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: COLORS.teal }}
                >
                  {m.shape}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="dai-scroll-fade mt-10 rounded-xl p-7 text-center"
          style={{ background: COLORS.teal }}
        >
          <p className="font-body text-base font-semibold text-white sm:text-lg">
            Recommended starting point: one targeted business outcome with a clear baseline, KPI and financial value estimate.
          </p>
        </div>
      </div>
    </section>
  );
};

const Team: React.FC = () => {
  const people = [
    {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      bio: 'Former CIO / CTO / CPTO across large enterprises including Eureka Forbes, Hindustan Times and MakeMyTrip. 20+ years leading technology, product, data and business transformation across consumer, media, travel, manufacturing and BFSI. Owns enterprise transformation strategy, CXO engagement and business outcome alignment.',
      initials: 'SS',
    },
  ];
  return (
    <section id="team" className="py-24" style={{ background: COLORS.dark }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="dai-scroll-fade max-w-3xl">
          <SectionLabel light>The team</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
            Senior AI, product and enterprise execution depth
          </h2>
          <p className="font-body mt-5 text-lg text-white/70">
            DiscvrAI combines operator experience, AI depth, product thinking and enterprise delivery discipline — so transformation moves from boardroom intent to production outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-1">
          {people.map((p) => (
            <div key={p.name} className="dai-scroll-fade flex flex-col gap-6 rounded-xl p-8 sm:flex-row sm:items-start" style={{ background: COLORS.surfaceDark, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="font-display flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.green})` }}
              >
                {p.initials}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                <div className="font-body mt-1 text-sm font-semibold" style={{ color: COLORS.green }}>{p.title}</div>
                <p className="font-body mt-4 text-sm leading-relaxed text-white/70">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="dai-scroll-fade mt-10 rounded-xl p-7 text-center"
          style={{ background: COLORS.teal }}
        >
          <p className="font-body text-base font-semibold text-white sm:text-lg">
            Operator experience + AI depth + product thinking + enterprise delivery discipline — under one accountable team.
          </p>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', industry: '', problem: '', engagement: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site: build mailto fallback so the message actually reaches us.
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nIndustry: ${form.industry}\nEngagement: ${form.engagement}\n\nProblem:\n${form.problem}`
    );
    window.location.href = `mailto:info@discvr.ai?subject=${encodeURIComponent('Conversation request — ' + (form.company || form.name))}&body=${body}`;
    setSent(true);
  };

  const inputCls = 'w-full rounded-md border border-slate-200 bg-white px-4 py-3 font-body text-sm placeholder:text-slate-400 focus:border-[#0D6E5E] focus:outline-none focus:ring-2 focus:ring-[#0D6E5E]/20';

  return (
    <section id="contact" className="py-24" style={{ background: COLORS.light }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div className="dai-scroll-fade">
          <SectionLabel>Get in touch</SectionLabel>
          <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl" style={{ color: COLORS.text }}>
            Start with one outcome. Scale from there.
          </h2>
          <p className="font-body mt-6 text-lg leading-relaxed" style={{ color: COLORS.muted }}>
            The recommended starting point is a single focused use case — with a clear baseline,
            a defined KPI and a financial value estimate. We scope it, pilot it in 8–12 weeks,
            and build from there.
          </p>
          <p className="font-body mt-5 text-base" style={{ color: COLORS.text }}>
            Reach us at{' '}
            <a href="mailto:info@discvr.ai" className="font-semibold underline" style={{ color: COLORS.teal }}>
              info@discvr.ai
            </a>{' '}
            or fill in the form and we'll respond within one business day.
          </p>

          <div className="mt-8 space-y-3">
            <a href="mailto:info@discvr.ai" className="flex items-center gap-3 text-sm" style={{ color: COLORS.text }}>
              <Mail className="h-4 w-4" style={{ color: COLORS.teal }} /> info@discvr.ai
            </a>
            <a href="tel:+919873961591" className="flex items-center gap-3 text-sm" style={{ color: COLORS.text }}>
              <Phone className="h-4 w-4" style={{ color: COLORS.teal }} /> +91 98739 61591
            </a>
          </div>
        </div>

        <div className="dai-scroll-fade">
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl bg-white p-7 shadow-xl sm:p-9"
            style={{ border: '1px solid #E2E8E5' }}
          >
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-12 w-12" style={{ color: COLORS.teal }} />
                <p className="font-display text-xl font-bold" style={{ color: COLORS.text }}>
                  Thank you. We'll be in touch within one business day.
                </p>
                <p className="font-body text-sm" style={{ color: COLORS.muted }}>
                  Your email client should have opened. If not, write to{' '}
                  <a href="mailto:info@discvr.ai" className="underline" style={{ color: COLORS.teal }}>info@discvr.ai</a>.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Full Name *" className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input required placeholder="Company *" className={inputCls} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required type="email" placeholder="Work Email *" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input type="tel" placeholder="Phone (optional)" className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <select required className={inputCls} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
                  <option value="">Industry / Sector *</option>
                  {['BFSI', 'Manufacturing & Industrial', 'Energy & EPC', 'D2C & Commerce', 'Real Estate & Infrastructure', 'Healthcare', 'Other'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  required rows={5}
                  placeholder="Describe the business problem or outcome you're working on..."
                  className={inputCls}
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                />
                <select required className={inputCls} value={form.engagement} onChange={(e) => setForm({ ...form, engagement: e.target.value })}>
                  <option value="">How would you like to engage? *</option>
                  {['End-to-end transformation', 'Targeted problem solution', 'Talent augmentation', 'Not sure yet'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 font-body text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: COLORS.teal }}
                >
                  Request a conversation <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const cols = [
    {
      h: 'What We Do',
      items: ['Data Foundation', 'AI and Machine Learning', 'Generative and Agentic AI', 'Enterprise Integration', 'Command Centres and BI', 'Governance and Adoption'],
      target: 'what-we-do',
    },
    {
      h: 'Industries',
      items: ['BFSI', 'Manufacturing & Industrial', 'Energy & EPC', 'D2C & Commerce', 'Real Estate & Infrastructure', 'Healthcare'],
      target: 'industries',
    },
    {
      h: 'Work With Us',
      items: ['End-to-End Transformation', 'Targeted Problem Solution', 'Talent Augmentation', 'Contact Us'],
      target: 'engagement-models',
    },
  ];
  return (
    <footer style={{ background: COLORS.dark, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="font-body mt-4 text-sm italic text-white/65">
            Enterprise transformation. Outcomes first.
          </p>
          <div className="mt-5 space-y-2 text-sm text-white/70">
            <a href="mailto:info@discvr.ai" className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" /> info@discvr.ai
            </a>
            <a href="tel:+919873961591" className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4" /> +91 98739 61591
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{c.h}</div>
            <ul className="mt-4 space-y-2">
              {c.items.map((it) => (
                <li key={it}>
                  <button onClick={() => scrollTo(c.target)} className="font-body text-sm text-white/70 hover:text-white">
                    {it}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <div>© {new Date().getFullYear()} DiscvrAI. All rights reserved.</div>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const DiscvrAISite: React.FC = () => {
  useScrollFadeIn();

  const ldOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DiscvrAI',
    url: 'https://discvr.ai',
    email: 'info@discvr.ai',
    description: 'DiscvrAI helps mature enterprises convert fragmented systems and manual decisioning into measurable business outcomes through data, AI and agentic execution layers.',
    founder: { '@type': 'Person', name: 'Shubham Srivastava' },
    sameAs: [],
  };

  return (
    <>
      <Helmet>
        <title>DiscvrAI — Enterprise AI transformation. Outcomes first.</title>
        <meta name="description" content="DiscvrAI builds decision and execution layers on top of SAP, Oracle, Salesforce and your data platforms — turning fragmented systems and manual decisioning into measurable business outcomes." />
        <meta name="keywords" content="enterprise AI, agentic AI, GenAI, BFSI, manufacturing, energy, command centre, AI transformation, DiscvrAI" />
        <link rel="canonical" href="https://discvr.ai/" />
        <meta property="og:title" content="DiscvrAI — Enterprise AI transformation. Outcomes first." />
        <meta property="og:description" content="Decision and execution layers on top of your existing enterprise stack — built for measurable outcomes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discvr.ai/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DiscvrAI — Enterprise AI transformation. Outcomes first." />
        <meta name="twitter:description" content="Decision and execution layers on top of your existing enterprise stack." />
        <style>{FONT_CSS}</style>
        <script type="application/ld+json">{JSON.stringify(ldOrg)}</script>
      </Helmet>

      <div className="font-body" style={{ background: COLORS.light, color: COLORS.text }}>
        <Nav />
        <main>
          <Hero />
          <Positioning />
          <Capabilities />
          <HowWeWork />
          <Industries />
          <Patterns />
          <CaseStudies />
          <Engagement />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DiscvrAISite;
