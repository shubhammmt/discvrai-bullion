import { Sparkles, Heart, Target, Users } from 'lucide-react';
import { GradientCTA, PageHero, SectionEyebrow } from './_shared';

export default function DiscvrAbout() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Wealth, simplified through conversation.</>}
        subtitle="DiscvrAI was built on a simple bet — that the next decade of personal finance won't be won by better dashboards, but by smarter agents."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, t: 'Agent-first', d: 'We design every flow as a conversation, not a screen. The chat is the product.' },
            { icon: Heart, t: 'Aligned with you', d: 'No commissions. No upsells. We win when your portfolio wins.' },
            { icon: Target, t: 'Outcome-driven', d: 'Goals, plans and reviews — not jargon, percentages and clutter.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-slate-900/5 bg-white p-7 shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-900">{t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionEyebrow>Our story</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            From dashboards to dialogues.
          </h2>
        </div>
        <div className="space-y-5 text-slate-600 md:col-span-7">
          <p>
            For two decades, retail wealth tech has piled feature on feature — funds, screeners, charts, reports — leaving everyday investors more confused, not more confident.
          </p>
          <p>
            DiscvrAI started with a different question: what if you could just <em>ask</em>? Ask about your goals, your tax, your next SIP, what to switch — and get a real, personalised answer that you can act on instantly.
          </p>
          <p>
            We built an agentic platform that reads your portfolio, runs the math, navigates the rules and executes — all inside a single chat. No tabs. No forms. No fine print.
          </p>
          <p className="text-slate-900 font-semibold">
            One copilot. Your wealth. End-to-end.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionEyebrow>Leadership</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Built by operators.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { n: 'Shubham Srivastava', r: 'Founder & CEO', b: '20+ years in technology and product, scaling consumer fintech and AI platforms.' },
            { n: 'Ramji Tripathi', r: 'CPTO', b: 'Hands-on platform engineer leading the agentic stack — LangGraph, MongoDB, n8n.' },
          ].map((p) => (
            <div key={p.n} className="flex items-start gap-5 rounded-2xl border border-slate-900/5 bg-white p-7 shadow-sm">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">
                {p.n.split(' ').map((x) => x[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="text-base font-semibold text-slate-900">{p.n}</div>
                <div className="text-sm text-indigo-600">{p.r}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-slate-900/5 bg-gradient-to-br from-slate-50 to-white p-10">
          <div className="flex items-start gap-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight">What we stand for</div>
              <ul className="mt-4 grid gap-3 text-slate-700 md:grid-cols-2">
                {[
                  'Independent, never paid by AMCs',
                  'Transparent recommendations and audit trails',
                  'Privacy-first — your data is yours',
                  'Engineering quality you can trust',
                ].map((v) => (
                  <li key={v} className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" /> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <GradientCTA
        title="Get an early look at the future of wealth."
        subtitle="Sign in and try the agentic Wealth Copilot today."
        secondary={{ label: 'Contact us', href: '/discvrai/contact' }}
      />
    </>
  );
}
