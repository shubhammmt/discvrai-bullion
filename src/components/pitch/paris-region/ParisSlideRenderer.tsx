import React from 'react';
import { ParisRegionSlide } from '@/data/parisRegionSlides';
import { ParisSlideLayout } from './ParisSlideLayout';
import { MessageSquareQuote, Phone, Mail } from 'lucide-react';

interface Props {
  slide: ParisRegionSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ParisSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <ParisSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      {slide.type === 'cover' && <CoverContent slide={slide} />}
      {slide.type === 'context' && <BulletContent slide={slide} />}
      {slide.type === 'problem' && <BulletContent slide={slide} />}
      {slide.type === 'barriers' && <BulletContent slide={slide} />}
      {slide.type === 'approach' && <BulletContent slide={slide} />}
      {slide.type === 'outcomes' && <MetricsContent slide={slide} />}
      {slide.type === 'value' && <BulletContent slide={slide} />}
      {slide.type === 'pathways' && <BulletContent slide={slide} />}
      {slide.type === 'discussion' && <DiscussionContent slide={slide} />}
      {slide.type === 'about' && <AboutContent slide={slide} />}
      {slide.type === 'next-steps' && <NextStepsContent slide={slide} />}
    </ParisSlideLayout>
  );
};

/* ─── Cover ─── */
const CoverContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#002395] to-[#1a3a8f] flex items-center justify-center shadow-lg">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">
        {slide.title}
      </h1>
      <p className="text-2xl text-slate-500 font-light">{slide.subtitle}</p>
      <div className="mt-4 px-6 py-2 rounded-full bg-slate-100 border border-slate-200">
        <span className="text-sm text-slate-600">{slide.framingLanguage}</span>
      </div>
      <p className="text-sm text-slate-400 mt-2">Shubham Srivastava · Founder & CEO · shubham@discvr.ai · +91-9873961591</p>
    </div>
  );
};

/* ─── Bullets ─── */
const BulletContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#002395]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#002395]" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{slide.title}</h2>
          {slide.subtitle && <p className="text-lg text-slate-500">{slide.subtitle}</p>}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 pl-2">
        {slide.bullets?.map((bullet, i) => {
          const [label, ...rest] = bullet.split(': ');
          const description = rest.join(': ');
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#002395] flex-shrink-0" />
              <p className="text-lg text-slate-700 leading-relaxed">
                {description ? (
                  <>
                    <span className="font-semibold text-slate-900">{label}:</span> {description}
                  </>
                ) : (
                  bullet
                )}
              </p>
            </div>
          );
        })}
      </div>

      {slide.framingLanguage && (
        <div className="mt-auto px-5 py-3 rounded-lg bg-slate-50 border-l-4 border-[#002395]/40">
          <p className="text-sm text-slate-600 italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#002395]/60 mt-0.5 flex-shrink-0" />
            {slide.framingLanguage}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Metrics ─── */
const MetricsContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{slide.title}</h2>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-5 content-center">
        {slide.metrics?.map((m, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#002395]">{m.value}</p>
            <p className="text-sm text-slate-500 mt-2">{m.label}</p>
          </div>
        ))}
      </div>

      {slide.framingLanguage && (
        <div className="mt-auto px-5 py-3 rounded-lg bg-slate-50 border-l-4 border-emerald-400/60">
          <p className="text-sm text-slate-600 italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-emerald-600/60 mt-0.5 flex-shrink-0" />
            {slide.framingLanguage}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Discussion ─── */
const DiscussionContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-700" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{slide.title}</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 pl-2">
        {slide.questions?.map((q, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-amber-50/60 border border-amber-200/50">
            <span className="text-lg font-bold text-amber-600 flex-shrink-0">{i + 1}.</span>
            <p className="text-lg text-slate-700">{q}</p>
          </div>
        ))}
      </div>

      {slide.framingLanguage && (
        <div className="mt-auto px-5 py-3 rounded-lg bg-slate-50 border-l-4 border-amber-400/60">
          <p className="text-sm text-slate-600 italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-amber-600/60 mt-0.5 flex-shrink-0" />
            {slide.framingLanguage}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── About ─── */
const AboutContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  const f = slide.founderInfo!;
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#002395]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#002395]" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{slide.title}</h2>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 content-center">
        {/* Founder */}
        <div className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">{f.name}</h3>
          <p className="text-sm text-[#002395] font-medium mb-4">{f.role}</p>
          <div className="space-y-2">
            {f.experience.map((e, i) => (
              <p key={i} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#002395] flex-shrink-0" />
                {e}
              </p>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-1">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#002395]" /> {f.contact.phone}
            </p>
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#002395]" /> {f.contact.email}
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div className="flex flex-col gap-4 justify-center">
          {slide.bullets?.map((b, i) => {
            const [label, ...rest] = b.split(': ');
            const desc = rest.join(': ');
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#002395] flex-shrink-0" />
                <p className="text-base text-slate-700">
                  <span className="font-semibold text-slate-900">{label}:</span> {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {slide.framingLanguage && (
        <div className="mt-auto px-5 py-3 rounded-lg bg-slate-50 border-l-4 border-[#002395]/40">
          <p className="text-sm text-slate-600 italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#002395]/60 mt-0.5 flex-shrink-0" />
            {slide.framingLanguage}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Next Steps ─── */
const NextStepsContent: React.FC<{ slide: ParisRegionSlide }> = ({ slide }) => {
  const Icon = slide.icon;
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#002395]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#002395]" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{slide.title}</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5">
        {slide.nextSteps?.map((step, i) => (
          <div key={i} className="flex items-center gap-5">
            <div className="w-28 text-right">
              <span className="text-sm font-bold text-[#002395] uppercase tracking-wide">{step.phase}</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#002395] flex-shrink-0 ring-4 ring-[#002395]/10" />
            <div className="flex-1 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-base text-slate-700">{step.action}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto text-center">
        <p className="text-lg font-semibold text-slate-900">Shubham Srivastava</p>
        <p className="text-sm text-slate-500">shubham@discvr.ai · +91-9873961591</p>
      </div>

      {slide.framingLanguage && (
        <div className="px-5 py-3 rounded-lg bg-slate-50 border-l-4 border-[#002395]/40">
          <p className="text-sm text-slate-600 italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#002395]/60 mt-0.5 flex-shrink-0" />
            {slide.framingLanguage}
          </p>
        </div>
      )}
    </div>
  );
};
