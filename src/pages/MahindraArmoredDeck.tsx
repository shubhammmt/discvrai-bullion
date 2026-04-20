import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Radar, Network, Brain, Workflow, Shield, FileSearch, Building2, Users, Calendar, MapPin, AlertCircle, Database, Filter, Target, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY = '#0B2545';
const NAVY_SOFT = '#13315C';
const ACCENT = '#1E5BA8';
const INK = '#1A2238';
const MUTED = '#5A6478';
const LINE = '#E4E8EF';
const BG = '#FFFFFF';
const SOFT_BG = '#F7F9FC';

interface FooterProps { num: number; total: number; }
const Footer: React.FC<FooterProps> = ({ num, total }) => (
  <div className="absolute bottom-5 left-0 right-0 px-14 flex justify-between items-center">
    <span className="text-[11px] tracking-wide" style={{ color: MUTED }}>
      Discussion brief &nbsp;·&nbsp; Discvr.ai × Mahindra Armored &nbsp;·&nbsp; Confidential
    </span>
    <span className="text-[11px] font-mono" style={{ color: MUTED }}>
      {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
);

const SlideTitle: React.FC<{ eyebrow?: string; children: React.ReactNode }> = ({ eyebrow, children }) => (
  <div className="mb-8">
    {eyebrow && (
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: ACCENT }}>{eyebrow}</span>
      </div>
    )}
    <h2 className="text-[34px] font-semibold leading-tight tracking-tight" style={{ color: INK }}>{children}</h2>
  </div>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-3 text-[16px] leading-relaxed" style={{ color: '#2C3447' }}>
    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: NAVY }} />
    <span>{children}</span>
  </li>
);

// ─── SLIDE 1 — TITLE ───
const Slide1 = () => (
  <div className="h-full flex flex-col justify-between px-14 py-14" style={{ background: BG }}>
    <div className="flex justify-between items-start">
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Discvr.ai</span>
      <span className="text-[11px] tracking-[0.22em] uppercase font-medium" style={{ color: MUTED }}>Mahindra Armored</span>
    </div>

    <div className="max-w-[1100px]">
      <h1 className="text-[58px] font-semibold leading-[1.05] tracking-tight mb-7" style={{ color: INK }}>
        AI for relevant demand
      </h1>
      <div className="h-[3px] w-20 mb-7" style={{ background: NAVY }} />
      <p className="text-[24px] leading-relaxed mb-3" style={{ color: NAVY_SOFT }}>
        Demand intelligence and signal-to-account pursuit for institutional armored mobility.
      </p>
      <p className="text-[15px] mt-10 max-w-[640px]" style={{ color: MUTED }}>
        Discussion brief prepared for the CEO and commercial leadership of Mahindra Emirates Vehicle Armouring (MEVA).
      </p>
    </div>

    <div className="flex justify-between items-end">
      <span className="text-[11px] tracking-wide" style={{ color: MUTED }}>Confidential · For internal discussion only</span>
      <span className="text-[11px] font-mono" style={{ color: MUTED }}>01 / 09</span>
    </div>

    {/* Subtle geometric motif */}
    <div className="absolute top-0 right-0 w-[360px] h-[360px] opacity-[0.04] pointer-events-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 18} x2="200" y2={i * 18 - 80} stroke={NAVY} strokeWidth="0.4" />
        ))}
      </svg>
    </div>
  </div>
);

// ─── SLIDE 2 — Why this category is different ───
const Slide2 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Context">Not a "lead volume" problem</SlideTitle>

    <div className="grid grid-cols-2 gap-10 mt-2">
      <div>
        <ul className="space-y-5">
          <Bullet>
            Institutional buyers: government, police, humanitarian agencies, extractives, CIT operators, diplomatic missions, VIP protection.
          </Bullet>
          <Bullet>
            Long cycles, committee decisions, with certification and mission fit dominating the conversation.
          </Bullet>
          <Bullet>
            Demand is often latent — surfacing only when tenders, missions, projects, or risk environments shift.
          </Bullet>
        </ul>
      </div>

      <div className="flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {['Government', 'Police / MoI', 'Humanitarian', 'Diplomatic', 'Extractives', 'CIT / VIP'].map((seg) => (
            <div key={seg} className="px-3 py-3 rounded text-[12px] font-medium text-center" style={{ background: SOFT_BG, color: NAVY_SOFT, border: `1px solid ${LINE}` }}>
              {seg}
            </div>
          ))}
        </div>
        <div className="border-l-[3px] pl-5 py-2" style={{ borderColor: NAVY }}>
          <p className="text-[18px] leading-snug font-medium" style={{ color: INK }}>
            The opportunity is earlier visibility and sharper pursuit — not more noise.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── SLIDE 3 — Current motion (respectful) ───
const Slide3 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Current motion">You already have the right channels</SlideTitle>

    <ul className="space-y-4 mb-8 max-w-[1100px]">
      <Bullet>Partners and distributors, exhibitions, long-standing relationships, formal procurement, inbound web — these work.</Bullet>
      <Bullet>The uplift is in <span className="font-semibold" style={{ color: INK }}>timing, ranking, and coordination</span> across those channels.</Bullet>
    </ul>

    <div className="rounded-lg overflow-hidden border" style={{ borderColor: LINE }}>
      <div className="grid grid-cols-3 px-6 py-3 text-[11px] font-semibold tracking-wider uppercase" style={{ background: SOFT_BG, color: NAVY_SOFT }}>
        <div>Channel</div>
        <div>Strength</div>
        <div>Typical industry pattern</div>
      </div>
      {[
        ['Partners & distributors', 'Local trust, certification access', 'Coverage uneven vs. live signal density'],
        ['Exhibitions & events', 'High-quality face time, relationships', 'Post-event follow-through often slips'],
        ['Inbound web & RFP inflow', 'Self-qualified, high intent', 'Late in the cycle; competitor already engaged'],
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-3 px-6 py-4 text-[14px] border-t" style={{ borderColor: LINE, color: '#2C3447' }}>
          <div className="font-medium" style={{ color: INK }}>{row[0]}</div>
          <div>{row[1]}</div>
          <div style={{ color: MUTED }}>{row[2]}</div>
        </div>
      ))}
    </div>

    <p className="mt-6 text-[13px] italic" style={{ color: MUTED }}>
      Patterns shown reflect industry observations across institutional B2B, not a critique of current execution.
    </p>
  </div>
);

// ─── SLIDE 4 — What Discvr proposes ───
const Slide4 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Proposal">A signal-to-account layer on top of existing GTM</SlideTitle>

    <ul className="space-y-4 mb-10 max-w-[1100px]">
      <Bullet>Monitor high-signal public and institutional data on a fixed cadence.</Bullet>
      <Bullet>Resolve signals to accounts, segments, and likely product families.</Bullet>
      <Bullet>Score and prioritize; output briefs and CRM-ready tasks.</Bullet>
    </ul>

    {/* Pipeline diagram */}
    <div className="mt-6">
      <div className="flex items-stretch gap-2">
        {[
          { label: 'Sources', icon: Database },
          { label: 'Normalize & classify', icon: Filter },
          { label: 'Entity & account match', icon: Network },
          { label: 'Score & tier', icon: Target },
          { label: 'Alerts & CRM', icon: Send },
          { label: 'Human review', icon: Users },
        ].map((step, i, arr) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.label}>
              <div className="flex-1 rounded-lg px-3 py-5 flex flex-col items-center text-center" style={{ background: SOFT_BG, border: `1px solid ${LINE}` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: NAVY }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-[12px] font-semibold leading-tight" style={{ color: INK }}>{step.label}</div>
              </div>
              {i < arr.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4" style={{ color: ACCENT }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <p className="mt-5 text-[12px]" style={{ color: MUTED }}>
        Selected tiers go through human review before any outreach is recommended.
      </p>
    </div>
  </div>
);

// ─── SLIDE 5 — Where AI creates leverage ───
const Slide5 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Leverage">Practical AI leverage in defense-adjacent, institutional GTM</SlideTitle>

    <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-4 max-w-[1200px]">
      {[
        { icon: FileSearch, title: 'Tender & notice intelligence', body: 'Monitor public tenders, notices, and adjacent accounts for procurement patterns relevant to armored mobility.' },
        { icon: Shield, title: 'Risk & event overlays', body: 'Map security events, advisories, and conflict signals to territories and customer footprints.' },
        { icon: Building2, title: 'Project & procurement milestones', body: 'Track multilateral and government project timelines that historically pull armored vehicle demand.' },
        { icon: Radar, title: 'Account-level web intent', body: 'Treat inbound web behavior and digital signals as account-level intent where appropriate.' },
        { icon: Network, title: 'Partner coverage vs. signal density', body: 'Exception-based view of where partner activity does or does not match external signal pressure.' },
      ].map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex gap-4 p-4 rounded-lg" style={{ border: `1px solid ${LINE}` }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: SOFT_BG, border: `1px solid ${LINE}` }}>
            <Icon className="w-4 h-4" style={{ color: NAVY }} />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold mb-1" style={{ color: INK }}>{title}</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── SLIDE 6 — 6-week pilot ───
const Slide6 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Pilot">Signal-to-Pipeline — a 6-week pilot</SlideTitle>

    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-3">
        <ul className="space-y-4">
          <Bullet>Narrow geography and source set agreed upfront.</Bullet>
          <Bullet>300–500 account pilot universe; daily / weekly alert rhythm.</Bullet>
          <Bullet>10–15 outreach-ready, human-reviewed briefs for agreed tiers.</Bullet>
          <Bullet>Light CRM handoff or structured export — no big-bang IT project.</Bullet>
        </ul>

        <div className="mt-7 rounded-lg p-5 border-l-[3px]" style={{ background: SOFT_BG, borderColor: NAVY }}>
          <p className="text-[15px] font-medium" style={{ color: INK }}>
            Success = faster action on high-intent accounts — <span style={{ color: NAVY }}>not lead count.</span>
          </p>
        </div>

        <p className="mt-5 text-[13px] italic" style={{ color: MUTED }}>
          [Insert priority regions after workshop]
        </p>
      </div>

      <div className="col-span-2">
        <div className="text-[11px] font-semibold tracking-wider uppercase mb-3" style={{ color: MUTED }}>6-week timeline</div>
        <div className="space-y-2">
          {[
            { wk: 'W1', label: 'Scope, source set & charter' },
            { wk: 'W2', label: 'Account universe build, baseline' },
            { wk: 'W3–4', label: 'Live signal capture & scoring' },
            { wk: 'W5', label: 'Brief generation & seller review' },
            { wk: 'W6', label: 'CRM handoff, readout, decision' },
          ].map((row) => (
            <div key={row.wk} className="flex items-center gap-3 px-4 py-3 rounded" style={{ background: SOFT_BG, border: `1px solid ${LINE}` }}>
              <div className="w-12 text-[12px] font-mono font-semibold" style={{ color: NAVY }}>{row.wk}</div>
              <div className="text-[13px]" style={{ color: INK }}>{row.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── SLIDE 7 — Governance & trust ───
const Slide7 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Governance">Governance we design in from day one</SlideTitle>

    <div className="grid grid-cols-2 gap-5 mt-4 max-w-[1200px]">
      {[
        { icon: Users, title: 'Human-in-the-loop', body: 'Sensitive tiers, messaging, and any outreach recommendation are reviewed by named owners before action.' },
        { icon: Brain, title: '"Why now" on every item', body: 'Each prioritized account carries a transparent explanation of which signals drove the score, with timestamps.' },
        { icon: Workflow, title: 'Channel routing rules', body: 'Direct vs. partner routing follows agreed rules to avoid conflict and protect existing relationships.' },
        { icon: Shield, title: 'Data handling discipline', body: 'Aligned to your privacy and security posture; public-source bias, controlled access, and audit logging from day one.' },
      ].map(({ icon: Icon, title, body }) => (
        <div key={title} className="p-5 rounded-lg" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: NAVY }}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-[16px] font-semibold" style={{ color: INK }}>{title}</h4>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: MUTED }}>{body}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── SLIDE 8 — Commercials ───
const Slide8 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Commercials">Commercial structure (indicative, AED)</SlideTitle>

    <div className="rounded-lg overflow-hidden border mb-5" style={{ borderColor: LINE }}>
      <div className="grid grid-cols-12 px-6 py-3 text-[11px] font-semibold tracking-wider uppercase" style={{ background: SOFT_BG, color: NAVY_SOFT }}>
        <div className="col-span-3">Phase</div>
        <div className="col-span-6">Scope</div>
        <div className="col-span-3 text-right">Fee (AED)</div>
      </div>
      {[
        ['Discovery & design sprint', '10–15 working days — scope, sources, segments, charter', '25,000'],
        ['6-week pilot', 'Signal capture, scoring, briefs, CRM handoff per agreed scope', '65,000'],
        ['Optional Phase 2', 'Retainer / quarter — expansion, additional segments & territories', 'TBD'],
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-12 px-6 py-4 text-[14px] border-t items-center" style={{ borderColor: LINE, color: '#2C3447' }}>
          <div className="col-span-3 font-medium" style={{ color: INK }}>{row[0]}</div>
          <div className="col-span-6" style={{ color: MUTED }}>{row[1]}</div>
          <div className="col-span-3 text-right font-mono font-semibold text-[15px]" style={{ color: NAVY }}>{row[2]}</div>
        </div>
      ))}
    </div>

    <p className="text-[12px] mb-8" style={{ color: MUTED }}>
      Fees exclude VAT if applicable. Third-party data tools may be pass-through or bundled per SOW.
    </p>

    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-lg p-5" style={{ background: SOFT_BG, border: `1px solid ${LINE}` }}>
        <div className="text-[11px] font-semibold tracking-wider uppercase mb-2" style={{ color: ACCENT }}>Next step</div>
        <p className="text-[15px] font-medium" style={{ color: INK }}>
          Named sponsor + half-day workshop to freeze the pilot charter.
        </p>
      </div>
      <div className="rounded-lg p-5" style={{ background: NAVY, color: 'white' }}>
        <div className="text-[11px] font-semibold tracking-wider uppercase mb-2 opacity-80">Contact</div>
        <p className="text-[15px] font-semibold leading-snug">Shubham Srivastava</p>
        <p className="text-[13px] opacity-90 mt-1">Shubham@discvr.ai · +91 9873961591 · Discvr.ai</p>
      </div>
    </div>
  </div>
);

// ─── SLIDE 9 — What we need from Mahindra ───
const Slide9 = () => (
  <div className="h-full px-14 py-14" style={{ background: BG }}>
    <SlideTitle eyebrow="Ask">What we need from Mahindra Armored</SlideTitle>

    <div className="grid grid-cols-2 gap-5 mt-4 max-w-[1200px]">
      {[
        { title: 'Executive sponsor', body: 'Named CEO-office or commercial sponsor for the 6-week pilot.' },
        { title: 'Two segment priorities', body: 'Pick two of: government, police, humanitarian, extractives, CIT, diplomatic, VIP.' },
        { title: 'Partner rules', body: 'Routing principles for partner / direct, including conflict-avoidance.' },
        { title: 'No-go list', body: 'Accounts, geographies, or signal types that should be filtered out from day one.' },
        { title: 'CRM / export access', body: 'Light access to CRM fields or agreement on a structured CSV handoff.' },
        { title: 'Comms & legal touchpoint', body: 'Single point of contact to align on outreach templates and approvals.' },
      ].map((card) => (
        <div key={card.title} className="p-5 rounded-lg flex gap-4" style={{ border: `1px solid ${LINE}` }}>
          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: NAVY }} />
          <div>
            <h4 className="text-[15px] font-semibold mb-1" style={{ color: INK }}>{card.title}</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{card.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];
const TOTAL = slides.length;

const MahindraArmoredDeck: React.FC = () => {
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
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: BG }}>
      {/* Top progress */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-50" style={{ background: '#EEF1F6' }}>
        <div className="h-full transition-all duration-500" style={{ width: `${((current + 1) / TOTAL) * 100}%`, background: NAVY }} />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 pt-1"
        >
          <SlideComponent />
          <Footer num={current + 1} total={TOTAL} />
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <button onClick={() => go(-1)} disabled={current === 0} className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30" style={{ background: '#EEF1F6', color: NAVY }}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className="w-2 h-2 rounded-full transition-all" style={{ background: i === current ? NAVY : '#D5DAE3' }} />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1} className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30" style={{ background: '#EEF1F6', color: NAVY }}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MahindraArmoredDeck;
