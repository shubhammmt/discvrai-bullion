import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Zap,
  Handshake, Network, Target, Compass, Layers, MessageSquare,
  Building2, Factory, Truck, Flame, ShoppingBag, Radio, Cpu,
  Search, Brain, Repeat, TrendingUp, Activity,
  Briefcase, Users, FileCheck, Rocket, BadgeCheck, Phone, Mail, User,
  ArrowRight, CheckCircle2, Database, Workflow, Shield
} from 'lucide-react';

const ACCENT = '#0F766E';
const TOTAL = 7;

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
    </div>
    <div className="absolute top-5 right-8 z-20 text-[10px] uppercase tracking-widest text-slate-400">Advisor & GTM Partner Module</div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-xs text-slate-400">
      <span>Confidential | DiscvrAI | Advisor Proposition</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: ACCENT }}>{children}</div>
);

// ---------- Slide 1 ----------
const S1: React.FC = () => (
  <SlideWrapper num={1}>
    <div className="flex-1 flex flex-col justify-center">
      <Eyebrow>Strategic Advisor & GTM Partner Proposition</Eyebrow>
      <h1 className="text-[42px] leading-tight font-bold text-slate-900 mb-5 max-w-4xl">
        Partnering with senior leaders to scale <span style={{ color: ACCENT }}>AI-led enterprise transformation</span>
      </h1>
      <p className="text-base text-slate-600 leading-relaxed max-w-4xl mb-3">
        DiscvrAI is building an AI-led enterprise transformation practice across analytics, workflow automation,
        decision intelligence, agentic workflows and command-center solutions.
      </p>
      <p className="text-base text-slate-600 leading-relaxed max-w-4xl mb-8">
        We are looking to collaborate with select senior leaders, domain experts and GTM partners who can help us
        validate use cases, access relevant enterprise conversations and convert meaningful business opportunities.
      </p>
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 mb-8 max-w-4xl">
        <p className="text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">This is not a passive advisory title.</span> It is an
          opportunity-led collaboration where the advisor's experience, network and judgment help create real
          enterprise outcomes.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-4xl">
        {[
          { icon: Brain, label: 'Domain Depth' },
          { icon: Network, label: 'Senior Access' },
          { icon: Handshake, label: 'Outcome-Linked Collaboration' }
        ].map((it, i) => (
          <div key={i} className="rounded-xl border p-4 flex items-center gap-3"
            style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
              <it.icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
            </div>
            <p className="text-sm font-semibold text-slate-900">{it.label}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideWrapper>
);

// ---------- Slide 2 ----------
const S2: React.FC = () => {
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
    <SlideWrapper num={2}>
      <Eyebrow>Where DiscvrAI Creates Value</Eyebrow>
      <h2 className="text-[28px] leading-tight font-bold text-slate-900 mb-2">
        A decision + execution layer on top of existing enterprise systems
      </h2>
      <p className="text-sm text-slate-600 max-w-4xl mb-5 leading-relaxed">
        We help enterprises move from fragmented data, manual workflows and reactive decision-making to
        intelligent, measurable, execution-ready operating models.
      </p>

      <div className="grid grid-cols-12 gap-5 flex-1 min-h-0">
        <div className="col-span-7 grid grid-cols-2 gap-2 content-start">
          {caps.map((c, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} />
              <span className="text-sm text-slate-800">{c}</span>
            </div>
          ))}
        </div>

        <div className="col-span-5 flex flex-col justify-center gap-2">
          {flow.map((f, i) => (
            <React.Fragment key={i}>
              <div className="rounded-lg border px-4 py-3 flex items-center gap-3"
                style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}>
                <f.icon className="w-4.5 h-4.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span className="text-[13px] font-semibold text-slate-900">{f.label}</span>
              </div>
              {i < flow.length - 1 && <div className="text-center text-xs" style={{ color: `${ACCENT}80` }}>↓</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl py-2.5 px-4 border text-center"
        style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}>
        <p className="text-xs font-medium" style={{ color: ACCENT }}>
          We don't just create dashboards — we convert data, workflows and insights into measurable business actions.
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 3 ----------
const S3: React.FC = () => {
  const sectors = [
    { icon: Building2, name: 'BFSI', uses: 'Agentic commerce, digital investment journeys, conversion, onboarding, operations & workflow intelligence' },
    { icon: Factory, name: 'Manufacturing', uses: 'Factory analytics, production visibility, predictive maintenance, quality intelligence, ERP/OT integration' },
    { icon: Truck, name: 'Supply Chain & Logistics', uses: 'Dispatch control towers, freight optimization, demand visibility, warehouse intelligence, procurement analytics' },
    { icon: Flame, name: 'Energy, Mining, Oil & Gas', uses: 'Operations intelligence, asset performance, performance reporting, predictive insights, command centers' },
    { icon: ShoppingBag, name: 'FMCG, Retail & Distribution', uses: 'Sales performance, distributor analytics, route-to-market, field productivity, channel visibility' },
    { icon: Radio, name: 'Telecom, Media & Cloud', uses: 'Customer intelligence, revenue assurance, cloud modernization, service assurance, executive dashboards' },
    { icon: Cpu, name: 'GCCs & Enterprise Operations', uses: 'Process automation, analytics, AI copilots, workflow optimization, productivity intelligence' }
  ];
  return (
    <SlideWrapper num={3}>
      <Eyebrow>Priority Sectors & Opportunity Themes</Eyebrow>
      <h2 className="text-[26px] leading-tight font-bold text-slate-900 mb-4">
        Sector-specific transformation themes where advisors can help us scale
      </h2>
      <div className="grid grid-cols-2 gap-3 flex-1 content-start">
        {sectors.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 flex gap-3 hover:shadow-sm transition">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}15` }}>
              <s.icon className="w-5 h-5" style={{ color: ACCENT }} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 mb-1">{s.name}</p>
              <p className="text-[11.5px] text-slate-600 leading-snug">{s.uses}</p>
            </div>
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-slate-300 p-3.5 flex items-center justify-center text-center">
          <p className="text-[11.5px] text-slate-500">
            <span className="font-semibold text-slate-700">Advisor lens →</span> Help us prioritize where DiscvrAI's
            capabilities meet real, fundable enterprise problems.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 4 ----------
const S4: React.FC = () => {
  const flow = ['Discovery', 'Decision', 'Execution', 'Portfolio Action', 'Continuity', 'Repeat Conversion'];
  const connects = ['Guided discovery', 'Decision support', 'Transaction execution', 'Portfolio actionability', 'Rebalancing triggers', 'SIP continuity', 'Personalized nudges', 'Repeat investor engagement'];
  const outcomes = ['Higher funded conversion', 'Better SIP setup & persistence', 'Repeat investment actions', 'Rebalancing completion', 'Dormant-user reactivation', 'Higher nudge-to-action conversion'];
  return (
    <SlideWrapper num={4}>
      <Eyebrow>BFSI Product Proposition</Eyebrow>
      <h2 className="text-[26px] leading-tight font-bold text-slate-900 mb-2">
        Agentic commerce & full-stack digital commerce for BFSI
      </h2>
      <p className="text-sm text-slate-600 max-w-4xl mb-4 leading-relaxed">
        A conversion operating layer for banks, AMCs, NBFCs, wealth platforms and fintechs — connecting discovery,
        decision, execution and continuity into one measurable journey.
      </p>

      <div className="rounded-xl border p-3 mb-4" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}>
        <div className="flex items-center justify-between gap-1">
          {flow.map((f, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 text-center">
                <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: ACCENT }}>Step {i + 1}</div>
                <div className="text-[12px] font-semibold text-slate-900">{f}</div>
              </div>
              {i < flow.length - 1 && <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${ACCENT}80` }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Layers className="w-4 h-4" style={{ color: ACCENT }} />
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">What it connects</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {connects.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-[11.5px] text-slate-700">
                <div className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />{c}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}08` }}>
          <div className="flex items-center gap-2 mb-2.5">
            <TrendingUp className="w-4 h-4" style={{ color: ACCENT }} />
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Business outcomes</p>
          </div>
          <div className="space-y-1.5">
            {outcomes.map((o, i) => (
              <div key={i} className="flex items-start gap-2 text-[11.5px] text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />{o}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg py-2 px-4 border border-slate-200 bg-slate-50/60 text-center">
        <p className="text-[12px] text-slate-700">
          Most platforms optimize either discovery or transactions. <span className="font-semibold">DiscvrAI connects discovery, decision, execution and continuity into one measurable journey.</span>
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 5 ----------
const S5: React.FC = () => {
  const items = [
    { icon: Compass, label: 'Strategic guidance & market positioning' },
    { icon: BadgeCheck, label: 'Domain validation for sector use cases' },
    { icon: Users, label: 'Senior enterprise introductions' },
    { icon: Network, label: 'GTM access into relevant accounts' },
    { icon: Search, label: 'Client problem discovery' },
    { icon: FileCheck, label: 'Solution shaping & proposal input' },
    { icon: Briefcase, label: 'Pilot design & commercial structuring' },
    { icon: Activity, label: 'Industry credibility & relationship-led access' },
    { icon: Target, label: 'Opportunity qualification & conversion support' }
  ];
  return (
    <SlideWrapper num={5}>
      <Eyebrow>How Advisors Add Value</Eyebrow>
      <h2 className="text-[26px] leading-tight font-bold text-slate-900 mb-4">
        Where senior advisors and GTM partners create leverage
      </h2>
      <p className="text-sm text-slate-600 max-w-4xl mb-5 leading-relaxed">
        We are looking for selective, high-trust associations where advisors can help us in one or more of the following ways:
      </p>
      <div className="grid grid-cols-3 gap-3 flex-1 content-start">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-start gap-3 hover:shadow-sm transition">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}15` }}>
              <it.icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
            </div>
            <p className="text-[12.5px] text-slate-800 leading-snug pt-1.5 font-medium">{it.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl py-2.5 px-4 border text-center"
        style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}>
        <p className="text-xs font-medium" style={{ color: ACCENT }}>
          The advisor doesn't need to be involved in every opportunity — the association can remain selective, focused and opportunity-led.
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 6 ----------
const S6: React.FC = () => {
  const cards = [
    {
      num: '01', title: 'Success-Linked Advisory Payout',
      body: 'For opportunities that convert into paid engagements, DiscvrAI can structure a success-linked advisory payout based on deal size, nature, margin and level of advisor involvement.',
      highlight: '7.5% – 15%', sub: 'of project value, depending on contribution & commercial structure'
    },
    {
      num: '02', title: 'Project-Specific Advisory Fee',
      body: 'For deeper involvement in defined client workshops, discovery sessions, proposal review, solution shaping or domain validation — a project-specific fee can be mutually agreed in advance.',
      highlight: 'Mutually agreed', sub: 'in advance, scoped per engagement'
    },
    {
      num: '03', title: 'No Passive Retainers by Default',
      body: 'We prefer outcome-linked commercial arrangements over standing retainers, unless there is a clearly defined operating role, time commitment and mutual scope.',
      highlight: 'Outcome > Retainer', sub: 'transparency over passivity'
    }
  ];
  return (
    <SlideWrapper num={6}>
      <Eyebrow>Engagement & Commercial Model</Eyebrow>
      <h2 className="text-[26px] leading-tight font-bold text-slate-900 mb-2">
        Flexible, outcome-linked engagement model
      </h2>
      <p className="text-sm text-slate-600 max-w-4xl mb-5 leading-relaxed">
        DiscvrAI prefers flexible, opportunity-led advisory associations directly linked to meaningful business contribution.
      </p>

      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col">
            <div className="text-3xl font-light mb-2" style={{ color: `${ACCENT}80` }}>{c.num}</div>
            <p className="text-[14px] font-bold text-slate-900 mb-2">{c.title}</p>
            <p className="text-[11.5px] text-slate-600 leading-relaxed mb-4 flex-1">{c.body}</p>
            <div className="border-t pt-3" style={{ borderColor: `${ACCENT}30` }}>
              <p className="text-sm font-bold" style={{ color: ACCENT }}>{c.highlight}</p>
              <p className="text-[10.5px] text-slate-500">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl py-2.5 px-4 border text-center"
        style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}>
        <p className="text-xs font-semibold" style={{ color: ACCENT }}>
          A transparent advisory & GTM collaboration — not a passive referral arrangement.
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 7 ----------
const S7: React.FC = () => {
  const steps = [
    { icon: MessageSquare, title: 'Introductory conversation', body: 'Understand advisor background, network, interest areas and potential fit.' },
    { icon: Target, title: 'Sector & account mapping', body: 'Identify sectors, accounts or themes where DiscvrAI capabilities are relevant.' },
    { icon: Search, title: 'Opportunity qualification', body: 'Assess buyer access, business problem, budget visibility, urgency and conversion potential.' },
    { icon: Briefcase, title: 'Client conversation / workshop', body: 'Support discovery, positioning or solutioning conversations where required.' },
    { icon: Rocket, title: 'Commercial closure & payout', body: 'For converted engagements, payout is structured per contribution and deal economics.' }
  ];
  return (
    <SlideWrapper num={7}>
      <Eyebrow>How We Start</Eyebrow>
      <h2 className="text-[26px] leading-tight font-bold text-slate-900 mb-5">A simple path to collaborate</h2>

      <div className="grid grid-cols-5 gap-3 mb-5">
        {steps.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: ACCENT }}>{i + 1}</div>
              <s.icon className="w-4 h-4" style={{ color: ACCENT }} />
            </div>
            <p className="text-[12px] font-bold text-slate-900 mb-1.5 leading-snug">{s.title}</p>
            <p className="text-[10.5px] text-slate-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4 mb-3 text-white" style={{ background: ACCENT }}>
        <p className="text-[13px] leading-relaxed">
          DiscvrAI is building <span className="font-bold">long-term, trust-led relationships</span> with senior
          professionals who can help identify serious opportunities where AI-led transformation can deliver
          measurable enterprise value.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
            <User className="w-6 h-6" style={{ color: ACCENT }} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-slate-900 leading-tight">Shubham Srivastava</p>
            <p className="text-[10.5px] text-slate-500 leading-snug">Founder, DiscvrAI · 20+ yrs technology & digital leadership · Ex-CIO/CTO/CPTO Eureka Forbes, HT Media, MakeMyTrip · IIT(ISM) Dhanbad</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[12px] text-slate-700">
          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: ACCENT }} />+91-9873961591</div>
          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: ACCENT }} />shubham@discvr.ai</div>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 text-center mt-2">
        AI-led Enterprise Transformation · Decision Intelligence · Agentic Workflows · Digital Commerce
      </p>
    </SlideWrapper>
  );
};

const slideRenderers = [S1, S2, S3, S4, S5, S6, S7];

const AdvisorPitch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => { setEntered(true); }, []);

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const Slide = slideRenderers[current];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#e2e8f0' }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={entered ? { opacity: 0, x: 30 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-6 right-8 z-50 flex gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdvisorPitch;
