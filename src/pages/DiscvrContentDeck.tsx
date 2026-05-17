import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Globe, Database, CheckCircle2, Workflow, Rss, Code2, Edit3, ArrowRight, Phone, ExternalLink } from 'lucide-react';

const ACCENT = '#1E3A5F';
const TEAL = '#0D9488';

const SlideShell: React.FC<{ n: number; total: number; children: React.ReactNode }> = ({ n, total, children }) => (
  <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-white to-slate-50">
    <div className="flex-1 flex flex-col px-16 pt-16 pb-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto w-full flex-1 flex flex-col">{children}</div>
    </div>
    <div className="px-16 py-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
      <span>Confidential | DiscvrAI | May 2026</span>
      <span className="font-mono tabular-nums" style={{ color: ACCENT }}>{String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: TEAL }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 ${className}`}>{children}</h1>
);

// Slide 1
const Slide1 = () => (
  <div className="flex-1 flex flex-col justify-center">
    <Eyebrow>Research-to-publish platform</Eyebrow>
    <h1 className="text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
      Scale research content<br /><span style={{ color: ACCENT }}>without losing rigor</span>
    </h1>
    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
      Multi-step AI research, web-grounded generation, citation-aware drafting, and human-controlled publishing — API-first for your existing stack.
    </p>
    <div className="border-l-2 pl-5 py-2 max-w-3xl" style={{ borderColor: TEAL }}>
      <p className="text-sm text-slate-700 leading-relaxed">
        Built and operated at production scale in financial research · Applicable to thematic, sector, and macro commentary workflows
      </p>
    </div>
    <div className="mt-10 text-xs text-slate-400 tracking-wider">DiscvrAI · Content intelligence capability · Confidential</div>
  </div>
);

// Slide 2
const Slide2 = () => {
  const pains = [
    'Analysts and editors cannot manually cover every theme, sector move, and data refresh at the speed markets demand',
    'Generic LLM drafts lack structured research steps, live sourcing, and audit-ready citations',
    'Publishing is fragmented — Word, CMS, syndication feeds, and partner APIs do not share one governed pipeline',
    'Pilot "AI writers" fail when there is no human review path, no source trail, and no integration with distribution',
  ];
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Eyebrow>The problem research leaders face</Eyebrow>
      <Title className="mb-10">Volume pressure meets integrity bar</Title>
      <div className="space-y-4">
        {pains.map((p, i) => (
          <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: ACCENT }}>{i + 1}</div>
            <p className="text-slate-700 leading-relaxed pt-1">{p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Slide 3
const Slide3 = () => (
  <div className="flex-1 flex flex-col justify-center">
    <Eyebrow>One platform, two content modes</Eyebrow>
    <Title className="mb-10">From flash insight to deep research article</Title>
    <div className="grid grid-cols-2 gap-6">
      {[
        { tag: 'CARD A', label: 'Short-form / byte research', size: '50–150 words', icon: Rss,
          items: ['Breaking context, market flashes, entity-tagged alerts', 'Automated web research + structured summary', 'Optimized for feeds, apps, and rapid syndication'] },
        { tag: 'CARD B', label: 'Long-form / deep research', size: '700–2,000+ words', icon: FileText,
          items: ['Multi-step "chain of thought" pipeline: plan → research → draft → validate', 'Sections, hooks, FAQs, entity extraction, SEO/schema metadata', 'Suitable for thematic notes, sector primers, earnings-style analysis'] },
      ].map((c) => (
        <div key={c.tag} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-widest text-slate-400">{c.tag}</span>
            <c.icon className="w-5 h-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">{c.label}</h3>
          <div className="text-sm font-mono mb-5" style={{ color: TEAL }}>{c.size}</div>
          <ul className="space-y-3 text-sm text-slate-700 flex-1">
            {c.items.map((it, i) => (
              <li key={i} className="flex gap-2"><span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT }} />{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-6 text-center text-sm text-slate-600 italic">Same engine, different depth — editors choose the mode per use case</div>
  </div>
);

// Slide 4
const Slide4 = () => {
  const [expanded, setExpanded] = useState(false);
  const steps = [
    { t: 'Signal & brief', d: 'topic, entities, audience, target length', x: 'Editor or trigger feed selects ticker/theme + length policy' },
    { t: 'Live web research', d: 'parallel search APIs + URL citations gathered before writing', x: 'OpenAI web_search + Serper run concurrently; sources scored' },
    { t: 'Structured reasoning', d: 'gap analysis vs. SERP/competitor coverage; outline with H2/H3 plan', x: 'Model produces outline JSON before any prose is written' },
    { t: 'Grounded draft', d: 'generation constrained by retrieved sources and internal data feeds', x: 'Prompt enforces inline source IDs; refuses unsupported claims' },
    { t: 'QA layer', d: 'fact-check pass, reliability scoring, contested-claim flagging', x: 'Each claim tagged supported/contested with evidence URLs' },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-start justify-between mb-2">
        <div>
          <Eyebrow>Deep research pipeline</Eyebrow>
          <Title>Multi-step research, not a single prompt</Title>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-xs font-semibold px-3 py-1.5 rounded border" style={{ borderColor: ACCENT, color: ACCENT }}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div className="mt-10 grid grid-cols-5 gap-3">
        {steps.map((s, i) => (
          <div key={i} className="relative">
            <div className="bg-white border border-slate-200 rounded-lg p-4 h-full">
              <div className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mb-3" style={{ background: ACCENT }}>{i + 1}</div>
              <div className="text-sm font-bold text-slate-900 mb-1">{s.t}</div>
              <div className="text-xs text-slate-600 leading-snug">{s.d}</div>
              {expanded && <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">{s.x}</div>}
            </div>
            {i < steps.length - 1 && <ArrowRight className="absolute -right-3 top-8 w-4 h-4 text-slate-300 z-10" />}
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 rounded-lg border-l-4 bg-slate-50" style={{ borderColor: TEAL }}>
        <span className="font-mono text-xs px-2 py-0.5 rounded mr-2" style={{ background: TEAL, color: 'white' }}>deep_research</span>
        <span className="text-sm text-slate-700">flag in content metadata — every long article records which components were generated and validated</span>
      </div>
    </div>
  );
};

// Slide 5
const Slide5 = () => {
  const [activeSrc, setActiveSrc] = useState<number | null>(null);
  const sources = [
    { t: 'Sector outlook brief — research portal', u: 'research.example.com/sector-outlook' },
    { t: 'Quarterly filing summary', u: 'filings.example.com/q1-summary' },
    { t: 'Macro commentary — economics desk', u: 'macro.example.com/commentary' },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Eyebrow>Citations, sources, and editorial trust</Eyebrow>
      <Title className="mb-8">Every claim can be traced</Title>
      <div className="grid grid-cols-5 gap-6">
        <ul className="col-span-2 space-y-3 text-sm text-slate-700 self-center">
          {[
            'Web research results stored as source objects (title, URL, snippet) and passed into the draft',
            'Fact-checking compares claims against search evidence; reliability score + supporting/contesting sources',
            'Citation blocks attached to published content — ready for footnotes, "Sources", or partner attribution',
            'Human editors see AI draft + sources side by side in CMS — approve, edit, or send back',
          ].map((b, i) => (
            <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />{b}</li>
          ))}
        </ul>
        <div className="col-span-3 grid grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-2">AI DRAFT</div>
            <div className="space-y-2 text-xs leading-relaxed text-slate-700">
              {[0, 1, 2].map((i) => (
                <p key={i} className={`p-2 rounded transition ${activeSrc === i ? 'bg-teal-50 ring-1' : ''}`} style={activeSrc === i ? { boxShadow: `inset 0 0 0 1px ${TEAL}` } : {}}>
                  Claim sentence referencing source <span className="font-mono" style={{ color: ACCENT }}>[{i + 1}]</span> with supporting evidence drawn from web research.
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-2">SOURCES ({sources.length})</div>
            <div className="space-y-2">
              {sources.map((s, i) => (
                <button key={i} onClick={() => setActiveSrc(activeSrc === i ? null : i)}
                  className={`w-full text-left p-2 rounded border text-xs transition ${activeSrc === i ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-1 font-medium text-slate-800">
                    <span className="font-mono" style={{ color: ACCENT }}>[{i + 1}]</span> {s.t}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 mt-0.5"><ExternalLink className="w-3 h-3" />{s.u}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide 6
const Slide6 = () => {
  const cols = [
    { icon: Code2, title: 'REST content APIs', items: ['Create, update, publish, approve articles programmatically', 'Schedule queue, SEO metadata generation, entity tagging endpoints'] },
    { icon: Rss, title: 'Syndication', items: ['RSS / structured feeds for aggregators and partner portals', 'Schema.org Article + FAQ markup for search and AI discovery'] },
    { icon: Edit3, title: 'Human CMS', items: ['Draft → review → approve → publish workflow', 'Rich editor: AI-generated articles fully editable by analysts/editors', 'Version history and approval audit for compliance teams'] },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Eyebrow>Publish anywhere your business needs</Eyebrow>
      <Title className="mb-10">API-first distribution</Title>
      <div className="grid grid-cols-3 gap-5">
        {cols.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
            <c.icon className="w-7 h-7 mb-3" style={{ color: ACCENT }} />
            <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-1">COLUMN {i + 1}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{c.title}</h3>
            <ul className="space-y-2 text-sm text-slate-700 flex-1">
              {c.items.map((it, j) => <li key={j} className="flex gap-2"><span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: TEAL }} />{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-slate-600 italic">Machine speed at the center; human sign-off at the gate</div>
    </div>
  );
};

// Slide 7
const Slide7 = () => {
  const metrics = [
    { n: '200+', l: 'articles generated per day', s: '(financial research production)' },
    { n: '50–100', l: 'words', s: 'short-form alert mode' },
    { n: '400–2,000+', l: 'words', s: 'long-form & deep research modes' },
    { n: '<30s', l: 'SEO metadata + entity tagging', s: 'per article (design target)' },
  ];
  const arch = [
    { icon: Globe, t: 'Web search', d: 'OpenAI web_search + parallel Serper-style search API' },
    { icon: Workflow, t: 'Models', d: 'Gemini / GPT routing behind a gateway' },
    { icon: Database, t: 'Storage', d: 'MongoDB content store + Redis queues' },
    { icon: FileText, t: 'Integrations', d: 'market data APIs (FMP-class), crawlers, internal knowledge' },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Eyebrow>Production proof</Eyebrow>
      <Title className="mb-8">Already at editorial scale</Title>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-3xl font-bold mb-1" style={{ color: ACCENT }}>{m.n}</div>
            <div className="text-sm font-semibold text-slate-800">{m.l}</div>
            <div className="text-xs text-slate-500 mt-1">{m.s}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {arch.map((a, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2">
            <a.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: TEAL }} />
            <div>
              <div className="text-xs font-bold text-slate-900">{a.t}</div>
              <div className="text-[11px] text-slate-600 leading-snug">{a.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-500 italic border-t border-slate-200 pt-3">
        Components are swappable; governance contracts (citations, approval, audit) are not.
      </div>
    </div>
  );
};

// Slide 8
const Slide8 = () => (
  <div className="flex-1 flex flex-col justify-center">
    <Eyebrow>Fit + next step</Eyebrow>
    <Title className="mb-8">How this maps to research organizations' workflows</Title>
    <div className="grid grid-cols-5 gap-8">
      <ul className="col-span-3 space-y-3 text-sm text-slate-700">
        {[
          'Thematic and sector commentary at higher velocity with analyst review retained',
          'Earnings/event-driven note drafts pre-populated with live web + data context',
          'Partner and subscriber feeds via API/RSS without duplicate editorial effort',
          'Pilot scope: one content type, one approval policy, one KPI (e.g., time-to-publish or articles per analyst per week)',
        ].map((b, i) => (
          <li key={i} className="flex gap-3 p-3 bg-white border border-slate-200 rounded">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />{b}
          </li>
        ))}
        <button className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm shadow-md hover:shadow-lg transition" style={{ background: ACCENT }}>
          Schedule a 45-minute research pipeline walkthrough <ArrowRight className="w-4 h-4" />
        </button>
      </ul>
      <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-3">PRESENTER</div>
        <div className="text-lg font-bold text-slate-900">Shubham Srivastava</div>
        <div className="text-sm font-medium mb-3" style={{ color: TEAL }}>CEO, DiscvrAI</div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Two decades leading large-scale digital transformation — CIO (Eureka Forbes), CTO (Hindustan Times), Head of Technology (MakeMyTrip); scaled AI-assisted newsroom and content engines to 100M+ MAU audiences.
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-800 pt-3 border-t border-slate-100">
          <Phone className="w-4 h-4" style={{ color: ACCENT }} /> +91-9873961591
        </div>
      </div>
    </div>
  </div>
);

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

const DiscvrContentDeck: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI((p) => Math.min(p + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft') setI((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  const Cur = SLIDES[i];
  return (
    <div className="fixed inset-0 bg-slate-100 overflow-hidden font-sans" style={{ fontFamily: 'Inter, "DM Sans", system-ui, sans-serif' }}>
      <div className="absolute inset-0">
        <SlideShell n={i + 1} total={SLIDES.length}><Cur /></SlideShell>
      </div>
      {/* Controls */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur border border-slate-200 rounded-full px-4 py-2 shadow-lg z-50">
        <button onClick={() => setI((p) => Math.max(p - 1, 0))} disabled={i === 0} className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className="w-2 h-2 rounded-full transition" style={{ background: idx === i ? ACCENT : '#CBD5E1' }} />
          ))}
        </div>
        <button onClick={() => setI((p) => Math.min(p + 1, SLIDES.length - 1))} disabled={i === SLIDES.length - 1} className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DiscvrContentDeck;
