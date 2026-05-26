import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Sparkles, CheckCircle2, XCircle, AlertTriangle,
  Database, Workflow, ShieldCheck, TrendingUp, Building2, Stethoscope,
  Factory, ShoppingCart, Banknote, Microscope, Briefcase, Users, Zap,
  Target, Layers, Cpu, FileText, Activity, Lightbulb
} from 'lucide-react';

const GREEN = '#0a7d4d';   // Deloitte-ish accent (note: independent, not Deloitte branded)
const INK = '#0F172A';
const SLATE = '#475569';

const Shell: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-14 py-9" style={{ background: '#FFFFFF', color: INK }}>
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: GREEN }}>
        <Sparkles className="w-4 h-4" /> From Digital Transformation to Intelligent Execution
      </div>
      <div className="text-slate-400 font-mono">{String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
    </div>
    <div className="mt-5">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: GREEN }}>{eyebrow}</div>
      <h1 className="text-[32px] font-light mt-1.5 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-1.5 max-w-5xl text-[14px] leading-relaxed">{sub}</p>}
    </div>
    <div className="mt-5 flex-1 min-h-0">{children}</div>
    <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
      <span>Shubham Srivastava · Founder, DiscvrAI · Deloitte Knowledge Session</span>
      <span>Independent perspective — not affiliated with Deloitte</span>
    </div>
  </div>
);

const Bullet: React.FC<React.PropsWithChildren<{ tone?: 'green' | 'slate' | 'rose' | 'amber' }>> = ({ tone='green', children }) => {
  const c = { green: 'text-emerald-600', slate: 'text-slate-600', rose: 'text-rose-600', amber: 'text-amber-600' }[tone];
  return <li className="flex gap-2.5 text-[13.5px] text-slate-700 leading-snug"><CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${c}`} /><span>{children}</span></li>;
};

const Card: React.FC<React.PropsWithChildren<{ title: string; icon?: any; tone?: string }>> = ({ title, icon: Icon, tone = GREEN, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm h-full">
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className="w-4 h-4" style={{ color: tone }} />}
      <div className="text-[12px] font-semibold text-slate-900">{title}</div>
    </div>
    <div className="text-[12px] text-slate-600 leading-snug space-y-1">{children}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  // 1 — Title
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Opening"
      title="From Digital Transformation to Intelligent Execution"
      sub="What will matter across Financial Services, Consumer, Life Sciences, Health Care, Investment Management and Energy / Resources / Industrials over the next 12–24 months.">
      <div className="h-full grid grid-cols-5 gap-6">
        <div className="col-span-3 flex flex-col justify-center">
          <div className="text-[13px] uppercase tracking-widest text-slate-400 font-semibold">Speaker</div>
          <div className="text-[28px] font-light text-slate-900 mt-1">Shubham Srivastava</div>
          <div className="text-[15px] text-slate-600">Founder, DiscvrAI · 20+ years CIO / CPTO</div>
          <div className="text-[13px] text-slate-500 mt-1">Earlier: Eureka Forbes · Hindustan Digital · MakeMyTrip</div>
          <div className="mt-6 rounded-xl border-l-4 p-4 bg-emerald-50/50" style={{ borderColor: GREEN }}>
            <div className="text-[11px] uppercase tracking-widest font-bold" style={{ color: GREEN }}>Core thesis</div>
            <div className="text-[15px] text-slate-800 mt-1.5 leading-snug">
              The next 12–24 months will not be about who has the most AI pilots. It will be about who can convert fragmented data, manual decisions and operational exceptions into <strong>repeatable, governed, measurable workflows.</strong>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-3 content-center">
          {[
            { l: 'Format', v: '40–50 min talk + Q&A' },
            { l: 'Audience', v: 'Junior to Senior Deloitte practitioners' },
            { l: 'Sectors', v: 'FS · Consumer · LS · HC · IM · ER&I' },
            { l: 'Lens', v: 'Execution, not technology hype' },
          ].map(x => (
            <div key={x.l} className="rounded-lg border border-slate-200 p-3 bg-slate-50">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{x.l}</div>
              <div className="text-[13px] text-slate-800 font-medium mt-0.5">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  ),

  // 2 — Why this matters now
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Why now"
      title="AI is moving from a channel layer into the operating model"
      sub="Two decades of ERP, CRM, cloud, mobile and analytics changed the surface of the enterprise. AI is starting to change the spine.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div>
          <div className="text-[11px] uppercase tracking-widest font-semibold text-slate-500 mb-2">What changed before</div>
          <ul className="space-y-2">
            <Bullet tone="slate">ERP / CRM → systems of record</Bullet>
            <Bullet tone="slate">BI / analytics → systems of report</Bullet>
            <Bullet tone="slate">Cloud / mobile → new channels and scale</Bullet>
            <Bullet tone="slate">Digital transformation → better front-end UX</Bullet>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: GREEN }}>What is changing now</div>
          <ul className="space-y-2">
            <Bullet>AI is sitting inside <strong>decisions, exceptions and workflows</strong></Bullet>
            <Bullet>Claims, KYC, advisory, dispatch, maintenance, scribing, reconciliation</Bullet>
            <Bullet>Productivity is now a <strong>board-level growth lever</strong>, not just cost</Bullet>
            <Bullet>Trust, audit, explainability are <strong>design principles</strong>, not afterthoughts</Bullet>
          </ul>
          <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-[12.5px] text-emerald-900">
            <strong>Punchline:</strong> the enterprise stack is moving from <em>systems of record</em> → <em>systems of intelligence</em> → <em>systems of execution.</em>
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 3 — The 5 shifts overview
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="State of the industry"
      title="Five shifts that matter most across every sector"
      sub="Cuts across FS, Consumer, LS, HC, IM and ER&I. We'll go deeper on industries next.">
      <div className="grid grid-cols-5 gap-3 h-full">
        {[
          { i: Workflow, t: 'Experimentation → Embedded execution', d: 'Deloitte Tech Trends 2026: shift from pilots to impact via agentic AI in real workflows.' },
          { i: Database, t: 'Data usability is the real bottleneck', d: '~½ of orgs cite data searchability & reusability as the blocker — not models.' },
          { i: TrendingUp, t: 'Productivity as a growth lever', d: 'Grow revenue without proportional headcount. AI reshapes hiring and delivery.' },
          { i: ShieldCheck, t: 'Trust & auditability by design', d: 'Customers accept AI that assists & explains, are cautious when AI decides alone.' },
          { i: Target, t: 'Workflow-specific innovation wins', d: '10–15 high-friction workflows beat "AI across the enterprise" abstractions.' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border-2 border-slate-200 p-4 flex flex-col hover:border-emerald-400 transition">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: GREEN+'15' }}>
              <s.i className="w-5 h-5" style={{ color: GREEN }} />
            </div>
            <div className="text-[10px] font-bold text-slate-400">SHIFT {i+1}</div>
            <div className="text-[13.5px] font-semibold text-slate-900 leading-tight mt-1">{s.t}</div>
            <div className="text-[11.5px] text-slate-600 mt-2 leading-snug">{s.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 4 — Industry snapshot grid
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Industries"
      title="What is changing most — by sector"
      sub="One bold shift per industry. We'll unpack the 12–24 month bets next.">
      <div className="grid grid-cols-3 gap-3 h-full">
        <Card title="Financial Services" icon={Banknote}>
          AI moves into onboarding, KYC, fraud, servicing, underwriting, RM copilots. <strong>2026 outlook:</strong> AI projects + data centres as top investment drivers.
        </Card>
        <Card title="Insurance & Investment Mgmt" icon={Briefcase}>
          Claims triage, fraud, policy explainability. AI-enabled distribution could add <strong>~US$2B</strong> annual US life premiums by 2030. Morgan Stanley advisors hit ~98% AI tool adoption.
        </Card>
        <Card title="Consumer / Retail / CPG" icon={ShoppingCart}>
          30% of retailers use AI for supply chain visibility today → <strong>41% within a year</strong>. 59% expect positive ROI on AI supply-chain bets within 12 months.
        </Card>
        <Card title="Life Sciences" icon={Microscope}>
          R&D, regulatory intelligence, medical affairs, pharmacovigilance. 83% of biopharma leaders predict steady-to-strong revenue growth. Agentic AI moves from tool to co-worker.
        </Card>
        <Card title="Health Care" icon={Stethoscope}>
          AI scribes, prior-auth, RCM, care-gaps, cyber. 2/3 of US plan/system leaders expect to outperform competitors in 2026. Focus: give time back to clinicians.
        </Card>
        <Card title="Energy, Resources & Industrials" icon={Factory}>
          Predictive maintenance, dispatch, safety, ESG, plant command centres. AI both <strong>drives</strong> power demand and <strong>optimizes</strong> grid + operations.
        </Card>
      </div>
    </Shell>
  ),

  // 5 — Where 12-24m impact lands
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="12–24 month bets"
      title="Where innovation creates the biggest impact"
      sub="Bounded, measurable workflows where cost, cycle time and accuracy can be compared before and after.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-3">Customer & revenue workflows</div>
          <ul className="space-y-2">
            <Bullet>AI-assisted <strong>onboarding & KYC</strong> — drop-off and TAT reduction</Bullet>
            <Bullet><strong>Service automation</strong> over email, chat, voice, documents</Bullet>
            <Bullet><strong>Advisor / RM copilots</strong> — research, suitability, next-best-action</Bullet>
            <Bullet><strong>Claims triage</strong> with image + video + text evidence</Bullet>
            <Bullet><strong>Personalization</strong> + dynamic pricing in retail / wealth</Bullet>
          </ul>
        </div>
        <div className="rounded-xl border-2 p-4" style={{ borderColor: GREEN, background: GREEN+'08' }}>
          <div className="text-[11px] uppercase tracking-widest font-bold mb-3" style={{ color: GREEN }}>Operations & risk workflows</div>
          <ul className="space-y-2">
            <Bullet><strong>Document intelligence</strong> — contracts, claims, regulatory packs</Bullet>
            <Bullet><strong>Fraud & anomaly</strong> detection in payments and claims</Bullet>
            <Bullet><strong>Supply chain control towers</strong> — exceptions, not just dashboards</Bullet>
            <Bullet><strong>Predictive maintenance</strong>, dispatch, safety, quality, emissions</Bullet>
            <Bullet><strong>Regulatory & compliance</strong> review, reporting, evidence</Bullet>
          </ul>
        </div>
      </div>
    </Shell>
  ),

  // 6 — Innovation drivers
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Innovation drivers"
      title="Six forces shaping enterprise priorities"
      sub="Same drivers, different weights by industry — but every CXO is balancing all six.">
      <div className="grid grid-cols-3 gap-3 h-full">
        {[
          { i: Cpu, t: 'Technology', d: 'GenAI, agentic, vision, IoT, twins, lakehouse. Orchestration is the real challenge — not the model.' },
          { i: ShieldCheck, t: 'Regulation & risk', d: 'Will not stop AI — will shape where AI decides vs assists vs only explains.' },
          { i: Users, t: 'Customer expectation', d: 'Patience for internal complexity is collapsing. Customers expect status, speed, transparency.' },
          { i: TrendingUp, t: 'Cost & efficiency', d: 'Investible use cases = measurable cost, cycle time and accuracy delta.' },
          { i: Zap, t: 'New competition', d: 'Digital-natives, embedded finance, insure-tech, health-tech, AI-native workflow tools.' },
          { i: Briefcase, t: 'Talent & operating model', d: '7 in 10 leaders rank speed & nimbleness as #1 strategy. AI = work redesign, not deployment.' },
        ].map((d, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: GREEN+'15' }}>
                <d.i className="w-4 h-4" style={{ color: GREEN }} />
              </div>
              <div className="text-[13px] font-semibold text-slate-900">{d.t}</div>
            </div>
            <div className="text-[12px] text-slate-600 leading-snug">{d.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 7 — Where investment is flowing
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Capital & talent flow"
      title="Seven capability areas attracting enterprise investment"
      sub="What CIOs, CDOs and COOs are actually funding in 2025–2026.">
      <div className="grid grid-cols-7 gap-2 h-full">
        {[
          { t: 'Enterprise data platforms', d: 'Lakehouse, fabric, semantic layer, MDM, lineage' },
          { t: 'AI & automation factories', d: 'Reusable components, prompt/model governance' },
          { t: 'Agentic workflow platforms', d: 'Plan · retrieve · act · escalate · document' },
          { t: 'Decision intelligence', d: 'Data → recommended action, not just dashboards' },
          { t: 'Vision & document intel', d: 'Claims, logistics, quality, field ops' },
          { t: 'Security & AI governance', d: 'Model risk, explainability, access, monitoring' },
          { t: 'Talent redesign', d: 'PMs, AI/data engineers, FDEs, domain SMEs, governance' },
        ].map((x, i) => (
          <div key={i} className="rounded-lg border border-slate-200 p-2.5 flex flex-col">
            <div className="text-[10px] font-mono text-slate-400">0{i+1}</div>
            <div className="text-[12px] font-semibold text-slate-900 leading-tight mt-1">{x.t}</div>
            <div className="text-[11px] text-slate-600 mt-1.5 leading-snug">{x.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 8 — What works
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Practical lessons"
      title="What I have seen work"
      sub="Five repeatable patterns across customer service, operations and decision automation engagements.">
      <div className="grid grid-cols-5 gap-3 h-full">
        {[
          { t: 'Start with workflow economics', d: 'Not "let\'s use GenAI". Pick the 4 request types that drive 70% of volume.' },
          { t: 'Visible before / after metrics', d: 'TAT, FTR%, cost per txn, leakage, conversion, downtime, SLA.' },
          { t: 'Design for the exception path', d: 'In enterprise ops, the exception path IS the real process.' },
          { t: 'Redesign the human loop', d: 'AI handles high-confidence. Humans review exceptions. Feedback retrains.' },
          { t: 'Build reusable patterns', d: 'Doc ingestion, email-to-workflow, vision evidence, SAP/SF connectors, audit.' },
        ].map((x, i) => (
          <div key={i} className="rounded-xl border-2 border-emerald-100 bg-emerald-50/40 p-3 flex flex-col">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1.5" />
            <div className="text-[13px] font-semibold text-slate-900 leading-tight">{x.t}</div>
            <div className="text-[11.5px] text-slate-600 mt-2 leading-snug">{x.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 9 — What doesn't work
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Practical lessons"
      title="What does not work — and why"
      sub="Most stalled AI programs trace back to one of these five failure modes.">
      <div className="grid grid-cols-5 gap-3 h-full">
        {[
          { t: 'Chatbot-first thinking', d: 'A chatbot on a broken process only exposes the broken process faster.' },
          { t: 'Data platform before use case', d: 'Big data programs without a workflow become long infra projects.' },
          { t: 'No business owner', d: 'If the business does not own the metric, AI becomes an IT experiment.' },
          { t: 'No adoption design', d: 'Teams resist AI that feels like surveillance. Position as exception-amplifier.' },
          { t: 'Ignoring cost at scale', d: 'Usage-based AI pricing bites. Cost / latency / accuracy are design variables.' },
        ].map((x, i) => (
          <div key={i} className="rounded-xl border-2 border-rose-100 bg-rose-50/40 p-3 flex flex-col">
            <XCircle className="w-5 h-5 text-rose-600 mb-1.5" />
            <div className="text-[13px] font-semibold text-slate-900 leading-tight">{x.t}</div>
            <div className="text-[11.5px] text-slate-600 mt-2 leading-snug">{x.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 10 — Case story 1
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Case story 1"
      title="Customer service automation over unstructured inputs"
      sub="Sanitized illustration. Problem was not 'implement AI' — it was high manual effort across email, text, documents, images and video.">
      <div className="grid grid-cols-5 gap-4 h-full">
        <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-2">The shape of the problem</div>
          <ul className="space-y-2">
            <Bullet tone="slate">Inputs: email, chat, PDFs, scans, images, videos</Bullet>
            <Bullet tone="slate">High dependence on experienced operators</Bullet>
            <Bullet tone="slate">Inconsistent triage, weak audit trail</Bullet>
            <Bullet tone="slate">SLA leakage in long-tail request types</Bullet>
          </ul>
        </div>
        <div className="col-span-3 rounded-xl border-2 p-4" style={{ borderColor: GREEN, background: GREEN+'08' }}>
          <div className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: GREEN }}>What actually moved the needle</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[12px] font-semibold text-slate-900 mb-1">Design moves</div>
              <ul className="space-y-1.5">
                <Bullet>Unstructured input → structured case object</Bullet>
                <Bullet>Vision + text + workflow routing combined</Bullet>
                <Bullet>Human-in-loop only on low-confidence cases</Bullet>
              </ul>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-slate-900 mb-1">Outcomes</div>
              <ul className="space-y-1.5">
                <Bullet>Manual effort meaningfully reduced</Bullet>
                <Bullet>Faster triage, more consistent decisions</Bullet>
                <Bullet>Structured audit trail by default</Bullet>
              </ul>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-slate-700 italic border-t border-emerald-200 pt-2">
            <strong>Lesson:</strong> the breakthrough was not the model — it was combining models with workflow, exception handling and business rules.
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 11 — Case story 2
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Case story 2"
      title="From dashboards to an industrial command centre"
      sub="A common pattern across energy / industrials: data exists in ERP, Excel, field reports, maintenance logs — but leadership lacks a live operating picture.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-slate-500" /><div className="text-[12px] font-semibold text-slate-900">Step 1 — Visibility layer</div></div>
          <ul className="space-y-1.5">
            <Bullet tone="slate">Unified view of production, dispatch, downtime, inventory</Bullet>
            <Bullet tone="slate">Operational + financial metrics in one frame</Bullet>
            <Bullet tone="slate">Daily / shift cadence baked in</Bullet>
          </ul>
          <div className="mt-3 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-400" /><div className="text-[11px] text-slate-500">Necessary, but not transformation.</div></div>
        </div>
        <div className="rounded-xl border-2 p-4" style={{ borderColor: GREEN, background: GREEN+'08' }}>
          <div className="flex items-center gap-2 mb-2"><Workflow className="w-4 h-4" style={{ color: GREEN }} /><div className="text-[12px] font-semibold text-slate-900">Step 2 — Action layer</div></div>
          <ul className="space-y-1.5">
            <Bullet>Detect exception → recommend action → assign owner</Bullet>
            <Bullet>Follow-up, escalation and closure tracked</Bullet>
            <Bullet>Reduced downtime, leakage and review-meeting waste</Bullet>
          </ul>
          <div className="mt-3 text-[12px] text-slate-700 italic border-t border-emerald-200 pt-2">
            <strong>Lesson:</strong> a dashboard becomes transformation only when it turns into an <strong>action layer</strong>.
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 12 — Predictions
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="What's next"
      title="Five predictions for the next 12–24 months"
      sub="Bets I'm willing to make publicly to a Deloitte audience.">
      <div className="grid grid-cols-5 gap-3 h-full">
        {[
          { t: 'AI pilots get rationalized', d: 'Vanity pilots cut. Funding flows to use cases with measurable P&L, risk or customer impact.' },
          { t: 'Agentic AI in bounded workflows first', d: 'Claims, onboarding, research, compliance, supply-chain exception, maintenance agents.' },
          { t: 'The "AI operating model" becomes a consulting priority', d: 'Use case portfolio, governance, data readiness, BC design, workflow redesign, talent.' },
          { t: 'Domain-specific AI beats generic AI', d: 'Domain data + rules + workflow + human review + clear metric.' },
          { t: 'Decision intelligence becomes the next layer above ERP/CRM/BI', d: 'Record → report → recommend → act.' },
        ].map((x, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-3 flex flex-col bg-white">
            <div className="text-[28px] font-light leading-none" style={{ color: GREEN }}>{`0${i+1}`}</div>
            <div className="text-[13px] font-semibold text-slate-900 mt-2 leading-tight">{x.t}</div>
            <div className="text-[11.5px] text-slate-600 mt-2 leading-snug">{x.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 13 — Cheat sheet / so what for Deloitte
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="So what for Deloitte teams"
      title="Where consultants and advisors should lean in"
      sub="Beyond recommending technology — help clients redesign how decisions and actions happen inside the enterprise.">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <Lightbulb className="w-5 h-5 mb-2" style={{ color: GREEN }} />
          <div className="text-[13px] font-semibold text-slate-900 mb-2">Help clients pick the right fights</div>
          <ul className="space-y-1.5">
            <Bullet>Use case portfolio with a P&L story</Bullet>
            <Bullet>Workflow economics, not capability slides</Bullet>
            <Bullet>Bias to exception-heavy processes</Bullet>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <Layers className="w-5 h-5 mb-2" style={{ color: GREEN }} />
          <div className="text-[13px] font-semibold text-slate-900 mb-2">Build the operating model</div>
          <ul className="space-y-1.5">
            <Bullet>AI governance, model risk, audit, explainability</Bullet>
            <Bullet>Data readiness tied to a workflow, not boil-the-ocean</Bullet>
            <Bullet>Reusable patterns across business units</Bullet>
          </ul>
        </div>
        <div className="rounded-xl border-2 p-4" style={{ borderColor: GREEN, background: GREEN+'08' }}>
          <Users className="w-5 h-5 mb-2" style={{ color: GREEN }} />
          <div className="text-[13px] font-semibold text-slate-900 mb-2">Lead the people side</div>
          <ul className="space-y-1.5">
            <Bullet>Work redesign — not headcount theatre</Bullet>
            <Bullet>Reskilling: exception-handling, supervision, domain judgement</Bullet>
            <Bullet>Adoption design from day 1 — not a closing slide</Bullet>
          </ul>
        </div>
      </div>
    </Shell>
  ),

  // 14 — Closing + Q&A
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Closing"
      title="The next wave is not adding AI to the enterprise"
      sub="It is redesigning the enterprise around intelligent, governed execution.">
      <div className="h-full grid grid-cols-5 gap-5">
        <div className="col-span-3 flex flex-col justify-center">
          <div className="rounded-xl border-l-4 p-5 bg-emerald-50/60" style={{ borderColor: GREEN }}>
            <div className="text-[18px] text-slate-800 leading-snug">
              "The winners will connect <strong>data, AI, automation, governance and people</strong> into measurable execution systems.
              For consultants and advisors, the opportunity is to help clients <strong>rewire real work</strong> — not just refresh the strategy document."
            </div>
            <div className="mt-3 text-[12px] text-slate-500">— Shubham Srivastava, Founder, DiscvrAI</div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: 'Where to start', v: 'High-volume, high-friction workflows' },
              { l: 'What to measure', v: 'TAT · FTR% · cost / txn · leakage' },
              { l: 'What to govern', v: 'Data, model, decision, audit' },
            ].map(x => (
              <div key={x.l} className="rounded-lg border border-slate-200 p-3 bg-white">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{x.l}</div>
                <div className="text-[12.5px] text-slate-800 font-medium mt-0.5">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 rounded-xl border-2 border-slate-900 bg-slate-900 text-white p-5 flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold">Q&A</div>
          <div className="text-[22px] font-light mt-2 leading-tight">Open floor</div>
          <div className="text-[13px] text-slate-300 mt-3 leading-snug">
            Happy to go deeper on any sector, any case story, or any specific client situation you're navigating right now.
          </div>
          <div className="mt-5 pt-4 border-t border-slate-700 text-[12px] text-slate-300">
            <div className="font-semibold text-white">Shubham Srivastava</div>
            <div>Founder, DiscvrAI</div>
            <div className="text-slate-400 mt-1">discvr.ai</div>
          </div>
        </div>
      </div>
    </Shell>
  ),
];

export default function DeloitteSessionDeck() {
  const [i, setI] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI(p => Math.min(total - 1, p + 1));
      if (e.key === 'ArrowLeft') setI(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  const Cur = slides[i];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-[1280px] aspect-[16/9] bg-white rounded-xl shadow-2xl overflow-hidden relative">
        <Cur n={i + 1} total={total} />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setI(p => Math.max(0, p - 1))}
            disabled={i === 0}
            className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs flex items-center gap-1 disabled:opacity-30"
          >
            <ArrowLeft className="w-3 h-3" /> Prev
          </button>
          <button
            onClick={() => setI(p => Math.min(total - 1, p + 1))}
            disabled={i === total - 1}
            className="px-3 py-1.5 rounded-md text-white text-xs flex items-center gap-1 disabled:opacity-30"
            style={{ background: GREEN }}
          >
            Next <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
