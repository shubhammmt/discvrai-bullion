import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Eye, EyeOff,
  Handshake, Network, Target, Compass, Layers, MessageSquare,
  Building2, Factory, Truck, Flame, ShoppingBag, Radio, Cpu,
  Search, Brain, Zap, Repeat, TrendingUp, Activity,
  Briefcase, Users, FileCheck, Rocket, BadgeCheck, Phone, Mail, User,
  ArrowRight, CheckCircle2, Database, Workflow
} from 'lucide-react';
import { SlideLayout } from '@/components/pitch/enterprise-transformation/SlideLayout';

// ---------- Slide Components ----------

const S1Proposition: React.FC<{ n: number; t: number }> = ({ n, t }) => (
  <SlideLayout slideNumber={n} totalSlides={t}>
    <div className="h-full flex flex-col justify-center items-center text-center relative">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-enterprise-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-enterprise-gold/10 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="z-10 max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-enterprise-gold mb-6">Strategic Advisor & GTM Partner Proposition</p>
        <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-6 leading-tight">
          Partnering with senior leaders to scale<br />
          <span className="text-enterprise-gold font-normal">AI-led enterprise transformation</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-enterprise-gold" />
          <span className="text-base text-enterprise-text-secondary">An opportunity-led collaboration, not a passive title</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-enterprise-gold" />
        </div>
        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
          DiscvrAI is building an AI-led enterprise transformation practice across analytics, workflow automation,
          decision intelligence, agentic workflows and command-center solutions. We collaborate with select senior
          leaders whose experience, network and judgment help create real enterprise outcomes.
        </p>
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Brain, label: 'Domain Depth' },
            { icon: Network, label: 'Senior Access' },
            { icon: Handshake, label: 'Outcome-Linked Collaboration' }
          ].map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-enterprise-surface-elevated/60 border border-enterprise-gold/20 rounded-xl py-6 px-4">
              <it.icon className="w-7 h-7 text-enterprise-gold mx-auto mb-3" />
              <p className="text-white font-medium">{it.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </SlideLayout>
);

const S2Value: React.FC<{ n: number; t: number }> = ({ n, t }) => {
  const caps = [
    'AI & Analytics', 'Workflow Automation', 'Decision Intelligence',
    'Agentic Workflows', 'Command-Center Dashboards', 'ERP / CRM / SAP / Salesforce',
    'Business Process Transformation', 'Cloud, Data & AI Readiness'
  ];
  const flow = [
    { icon: Database, label: 'Enterprise Systems' },
    { icon: Workflow, label: 'Data & Workflows' },
    { icon: Brain, label: 'DiscvrAI Decision Layer' },
    { icon: Zap, label: 'Actions · Alerts · Automation · Dashboards' }
  ];
  return (
    <SlideLayout slideNumber={n} totalSlides={t}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">Where DiscvrAI Creates Value</p>
          <h2 className="text-4xl font-light text-white">A decision + execution layer on top of existing enterprise systems</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-enterprise-text-secondary mb-5 leading-relaxed">
              We help enterprises move from fragmented data, manual workflows and reactive decisions to
              intelligent, measurable, execution-ready operating models.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {caps.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex items-center gap-2 bg-enterprise-surface-elevated/60 border border-enterprise-border rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 text-enterprise-gold flex-shrink-0" />
                  <span className="text-sm text-white/90">{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col justify-center gap-4">
            {flow.map((f, i) => (
              <React.Fragment key={i}>
                <div className="bg-gradient-to-r from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl px-5 py-4 flex items-center gap-4">
                  <f.icon className="w-6 h-6 text-enterprise-gold flex-shrink-0" />
                  <span className="text-white font-medium">{f.label}</span>
                </div>
                {i < flow.length - 1 && <div className="text-enterprise-gold/60 text-center">↓</div>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 text-center">
          <p className="text-enterprise-gold italic">
            We don't just create dashboards — we convert data, workflows and insights into measurable business actions.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

const S3Sectors: React.FC<{ n: number; t: number }> = ({ n, t }) => {
  const sectors = [
    { icon: Building2, name: 'BFSI', uses: 'Agentic commerce, digital investment journeys, conversion, onboarding, operations automation' },
    { icon: Factory, name: 'Manufacturing', uses: 'Factory analytics, production visibility, predictive maintenance, quality, ERP/OT integration' },
    { icon: Truck, name: 'Supply Chain & Logistics', uses: 'Dispatch control towers, freight optimization, demand visibility, warehouse intelligence' },
    { icon: Flame, name: 'Energy, Mining, Oil & Gas', uses: 'Operations intelligence, asset performance, predictive insights, command centers' },
    { icon: ShoppingBag, name: 'FMCG, Retail & Distribution', uses: 'Sales performance, distributor analytics, route-to-market, field productivity, channel visibility' },
    { icon: Radio, name: 'Telecom, Media & Cloud', uses: 'Customer intelligence, revenue assurance, cloud modernization, executive dashboards' },
    { icon: Cpu, name: 'GCCs & Enterprise Operations', uses: 'Process automation, AI copilots, workflow optimization, productivity intelligence' }
  ];
  return (
    <SlideLayout slideNumber={n} totalSlides={t}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">Priority Sectors & Opportunity Themes</p>
          <h2 className="text-3xl font-light text-white">Sector-specific transformation themes where advisors can help us scale</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 flex-1 content-start">
          {sectors.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-enterprise-surface-elevated/60 border border-enterprise-border hover:border-enterprise-gold/40 transition-colors rounded-xl p-4 flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-enterprise-gold/15 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5 text-enterprise-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold mb-1">{s.name}</p>
                <p className="text-xs text-enterprise-text-secondary leading-relaxed">{s.uses}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

const S4BFSI: React.FC<{ n: number; t: number }> = ({ n, t }) => {
  const flow = ['Discovery', 'Decision', 'Execution', 'Portfolio Action', 'Continuity', 'Repeat Conversion'];
  const connects = ['Guided discovery', 'Decision support', 'Transaction execution', 'Portfolio actionability', 'Rebalancing triggers', 'SIP continuity', 'Personalized nudges', 'Repeat engagement'];
  const outcomes = ['Higher funded conversion', 'Better SIP setup & persistence', 'Repeat investment actions', 'Rebalancing completion', 'Dormant-user reactivation', 'Higher nudge-to-action conversion'];
  return (
    <SlideLayout slideNumber={n} totalSlides={t}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">BFSI Product Proposition</p>
          <h2 className="text-3xl font-light text-white">Agentic commerce & full-stack digital commerce for BFSI</h2>
        </motion.div>

        <p className="text-enterprise-text-secondary mb-5 max-w-4xl leading-relaxed">
          A conversion operating layer for banks, AMCs, NBFCs, wealth platforms and fintechs — connecting
          discovery, decision, execution and continuity into one measurable journey.
        </p>

        {/* Flow */}
        <div className="bg-gradient-to-r from-enterprise-gold/5 via-enterprise-blue/5 to-enterprise-gold/5 border border-enterprise-gold/20 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between gap-2">
            {flow.map((f, i) => (
              <React.Fragment key={i}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex-1 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-enterprise-gold mb-1">Step {i + 1}</div>
                  <div className="text-sm text-white font-medium">{f}</div>
                </motion.div>
                {i < flow.length - 1 && <ArrowRight className="w-4 h-4 text-enterprise-gold/60 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 flex-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-enterprise-surface-elevated/60 border border-enterprise-border rounded-xl p-5">
            <p className="text-sm uppercase tracking-wider text-enterprise-gold mb-3 flex items-center gap-2"><Layers className="w-4 h-4" /> What it connects</p>
            <div className="grid grid-cols-2 gap-1.5">
              {connects.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-1 h-1 bg-enterprise-gold rounded-full" />{c}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-enterprise-surface-elevated/60 border border-enterprise-gold/30 rounded-xl p-5">
            <p className="text-sm uppercase tracking-wider text-enterprise-gold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Business outcomes</p>
            <div className="space-y-1.5">
              {outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-enterprise-gold mt-0.5 flex-shrink-0" />{o}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};

const S5Advisor: React.FC<{ n: number; t: number }> = ({ n, t }) => {
  const items = [
    { icon: Compass, label: 'Strategic guidance & market positioning' },
    { icon: BadgeCheck, label: 'Domain validation for sector use cases' },
    { icon: Users, label: 'Senior enterprise introductions' },
    { icon: Network, label: 'GTM access into relevant accounts' },
    { icon: Search, label: 'Client problem discovery' },
    { icon: FileCheck, label: 'Solution shaping & proposal input' },
    { icon: Briefcase, label: 'Pilot design & commercial structuring' },
    { icon: Activity, label: 'Industry credibility & relationship access' },
    { icon: Target, label: 'Opportunity qualification & conversion support' }
  ];
  return (
    <SlideLayout slideNumber={n} totalSlides={t}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">How Advisors Add Value</p>
          <h2 className="text-3xl font-light text-white">Where senior advisors and GTM partners create leverage</h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-3 flex-1 content-start">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-enterprise-surface-elevated/60 border border-enterprise-border hover:border-enterprise-gold/40 transition-colors rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-enterprise-gold/15 flex items-center justify-center flex-shrink-0">
                <it.icon className="w-4.5 h-4.5 text-enterprise-gold" />
              </div>
              <p className="text-sm text-white/90 leading-snug pt-1">{it.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-5 text-center">
          <p className="text-enterprise-gold italic">
            Selective, focused, opportunity-led — the advisor doesn't need to be involved in every opportunity.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

const S6Commercial: React.FC<{ n: number; t: number }> = ({ n, t }) => (
  <SlideLayout slideNumber={n} totalSlides={t}>
    <div className="h-full flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">Engagement & Commercial Model</p>
        <h2 className="text-3xl font-light text-white">Flexible, outcome-linked engagement model</h2>
      </motion.div>

      <p className="text-enterprise-text-secondary mb-5 max-w-4xl leading-relaxed">
        DiscvrAI prefers flexible, opportunity-led associations directly linked to meaningful business contribution.
      </p>

      <div className="grid grid-cols-3 gap-4 flex-1">
        {[
          {
            num: '01', title: 'Success-Linked Advisory Payout',
            body: 'For opportunities that convert into paid engagements, structured based on deal size, nature, margin and level of advisor involvement.',
            highlight: '7.5% – 15%', sub: 'of project value, depending on contribution'
          },
          {
            num: '02', title: 'Project-Specific Advisory Fee',
            body: 'For deeper involvement in client workshops, discovery sessions, proposal review, solution shaping or domain validation.',
            highlight: 'Mutually agreed', sub: 'in advance, scoped per engagement'
          },
          {
            num: '03', title: 'No Passive Retainers by Default',
            body: 'We prefer outcome-linked arrangements over standing retainers, unless there is a clearly defined operating role and mutual scope.',
            highlight: 'Outcome > Retainer', sub: 'transparency over passivity'
          }
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-gradient-to-b from-enterprise-surface-elevated to-enterprise-surface-elevated/40 border border-enterprise-border rounded-xl p-5 flex flex-col">
            <div className="text-3xl font-light text-enterprise-gold/60 mb-2">{c.num}</div>
            <p className="text-white font-semibold mb-3">{c.title}</p>
            <p className="text-xs text-enterprise-text-secondary leading-relaxed mb-4 flex-1">{c.body}</p>
            <div className="border-t border-enterprise-gold/20 pt-3">
              <p className="text-enterprise-gold font-medium">{c.highlight}</p>
              <p className="text-[11px] text-enterprise-text-muted">{c.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="mt-5 text-center bg-enterprise-gold/5 border border-enterprise-gold/20 rounded-lg py-3">
        <p className="text-enterprise-gold text-sm">
          A transparent advisory & GTM collaboration — not a passive referral arrangement.
        </p>
      </motion.div>
    </div>
  </SlideLayout>
);

const S7HowWeStart: React.FC<{ n: number; t: number }> = ({ n, t }) => {
  const steps = [
    { icon: MessageSquare, title: 'Introductory conversation', body: 'Understand advisor background, network, interest areas and potential fit.' },
    { icon: Target, title: 'Sector & account mapping', body: 'Identify sectors, accounts or themes where DiscvrAI capabilities are relevant.' },
    { icon: Search, title: 'Opportunity qualification', body: 'Assess buyer access, business problem, budget visibility, urgency and conversion potential.' },
    { icon: Briefcase, title: 'Client conversation or workshop', body: 'Support discovery, positioning or solutioning conversations where required.' },
    { icon: Rocket, title: 'Commercial closure & payout', body: 'For converted engagements, payout is structured per contribution and deal economics.' }
  ];
  return (
    <SlideLayout slideNumber={n} totalSlides={t}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-enterprise-gold mb-2">How We Start</p>
          <h2 className="text-3xl font-light text-white">A simple path to collaborate</h2>
        </motion.div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
              className="bg-enterprise-surface-elevated/60 border border-enterprise-border rounded-xl p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-enterprise-gold/20 flex items-center justify-center text-enterprise-gold text-xs font-bold">{i + 1}</div>
                <s.icon className="w-4 h-4 text-enterprise-gold" />
              </div>
              <p className="text-sm text-white font-semibold mb-2 leading-snug">{s.title}</p>
              <p className="text-[11px] text-enterprise-text-secondary leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl p-5 mb-4">
          <p className="text-white/90 leading-relaxed">
            DiscvrAI is building <span className="text-enterprise-gold font-medium">long-term, trust-led relationships</span> with senior
            professionals who can identify serious opportunities where AI-led transformation can deliver measurable enterprise value.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="bg-enterprise-surface-elevated border border-enterprise-gold/30 rounded-xl p-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
              <User className="w-7 h-7 text-enterprise-gold" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Shubham Srivastava</p>
              <p className="text-xs text-enterprise-text-muted">Founder, DiscvrAI · AI-led Enterprise Transformation · Decision Intelligence · Agentic Workflows · Digital Commerce</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2 text-white/90"><Phone className="w-4 h-4 text-enterprise-gold" />+91-9873961591</div>
            <div className="flex items-center gap-2 text-white/90"><Mail className="w-4 h-4 text-enterprise-gold" />shubham@discvr.ai</div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

// ---------- Page Shell ----------

const slides = [S1Proposition, S2Value, S3Sectors, S4BFSI, S5Advisor, S6Commercial, S7HowWeStart];
const titles = [
  'Strategic Advisor Proposition',
  'Where DiscvrAI Creates Value',
  'Priority Sectors',
  'BFSI Product Proposition',
  'How Advisors Add Value',
  'Engagement & Commercial Model',
  'How We Start'
];

const AdvisorPitch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  const total = slides.length;

  const next = () => setCurrent(c => Math.min(c + 1, total - 1));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'p' || e.key === 'P') setPresentationMode(p => !p);
      if (e.key === 'Escape') setPresentationMode(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const Slide = slides[current];

  return (
    <div className="h-screen bg-enterprise-navy-dark overflow-hidden relative">
      <Slide n={current + 1} t={total} />

      {!presentationMode && (
        <div className="fixed top-3 left-3 z-50 flex items-center gap-2">
          <button onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-enterprise-gold/10 backdrop-blur-sm border border-enterprise-gold/30 text-enterprise-gold hover:bg-enterprise-gold/20 transition-all text-xs">
            <Eye className="w-3.5 h-3.5" /><span>Present (P)</span>
          </button>
        </div>
      )}

      {presentationMode && (
        <button onClick={() => setPresentationMode(false)}
          className="fixed top-3 left-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/40 hover:bg-white/10 hover:text-white/70 transition-all text-xs opacity-0 hover:opacity-100">
          <EyeOff className="w-3.5 h-3.5" /><span>Exit (Esc)</span>
        </button>
      )}

      {!presentationMode && (
        <>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            <button onClick={prev} disabled={current === 0}
              className="w-10 h-10 rounded-full bg-enterprise-gold/10 backdrop-blur-sm border border-enterprise-gold/30 flex items-center justify-center text-enterprise-gold hover:bg-enterprise-gold/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 bg-enterprise-navy/80 backdrop-blur-sm rounded-full px-3 py-2 border border-enterprise-border">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`transition-all duration-200 ${i === current ? 'w-6 h-2 bg-enterprise-gold rounded-full' : 'w-2 h-2 bg-enterprise-gold/30 rounded-full hover:bg-enterprise-gold/50'}`} />
              ))}
            </div>
            <button onClick={next} disabled={current === total - 1}
              className="w-10 h-10 rounded-full bg-enterprise-gold/10 backdrop-blur-sm border border-enterprise-gold/30 flex items-center justify-center text-enterprise-gold hover:bg-enterprise-gold/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
            <span className="text-enterprise-text-muted text-xs bg-enterprise-navy/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-enterprise-border">
              {titles[current]}
            </span>
          </div>
          <div className="fixed bottom-6 right-6 z-50 text-enterprise-text-muted text-xs space-y-1">
            <p>← → Navigate slides</p>
            <p>P - Present mode</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvisorPitch;
