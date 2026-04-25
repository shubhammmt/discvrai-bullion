import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { GradientCTA, PageHero } from './_shared';

export default function DiscvrContact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk wealth.</>}
        subtitle="Whether you're an investor, a distributor or an enterprise — we'd love to hear from you."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-5 md:col-span-2">
            {[
              { icon: Mail, t: 'Email', v: 'hello@discvr.ai', href: 'mailto:hello@discvr.ai' },
              { icon: MessageCircle, t: 'Chat with the copilot', v: 'Always available in the app', href: 'https://agent.discvr.ai/discovery?view=invest' },
              { icon: MapPin, t: 'Office', v: 'Mumbai, India' },
            ].map((c) => (
              <a
                key={c.t}
                href={c.href ?? '#'}
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-slate-900/5 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.t}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{c.v}</div>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-slate-900/5 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
              <div className="text-sm font-semibold uppercase tracking-wider text-white/60">For enterprise</div>
              <p className="mt-2 text-sm text-white/85">
                Looking to white-label DiscvrAI for your clients? Drop us a line and we'll set up a 30-min walkthrough with our team.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-5 rounded-3xl border border-slate-900/5 bg-white p-7 shadow-sm md:p-9"
            >
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="text-xl font-semibold text-slate-900">Thanks — we got it.</div>
                  <p className="max-w-sm text-sm text-slate-600">
                    Someone from our team will reach out within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Your name" placeholder="Priya Sharma" required />
                    <Field label="Work email" type="email" placeholder="priya@company.com" required />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Company" placeholder="Acme Wealth" />
                    <Field label="Phone (optional)" placeholder="+91 98XXX XXXXX" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-800">I'm interested in</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                      {['Investor onboarding', 'Pro plan', 'White-label', 'API access', 'Partnership', 'Other'].map((p) => (
                        <label key={p} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs hover:border-indigo-300">
                          <input type="checkbox" className="accent-indigo-600" />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-800">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us a bit about what you're looking for…"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow shadow-indigo-500/30 transition hover:opacity-95"
                  >
                    Send message <Send className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    We typically respond within 1 business day.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <GradientCTA
        title="Or skip the form. Just open the app."
        subtitle="The fastest way to see DiscvrAI is to start chatting."
      />
    </>
  );
}

function Field({ label, type = 'text', placeholder, required }: { label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-800">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
      />
    </div>
  );
}
