import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const scopeItems = [
  { title: 'AI Career Counsellor', desc: 'Qualification, intent scoring, course fitment', channels: 'Web chat, WhatsApp, optional voice' },
  { title: 'Lead ID & Attribution Binding', desc: 'Immutable attribution, dispute resolution, ROI measurement', channels: 'HQ dashboard, counsellor lead card' },
  { title: 'Enrichment (Voice + WhatsApp Warming)', desc: '15–30 min response, visit scheduling, objections captured', channels: 'WhatsApp, voice' },
  { title: 'Center Enablement — Smart Lead Card', desc: 'Counsellor context, playbooks, scripts', channels: 'Responsive web app' },
  { title: 'Payment-Enabled Enrollment (Optional)', desc: 'Online payment/enrollment, receipts', channels: 'Web payment flow' },
];

export const ExecTrackASlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Track A</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      Pre-Sales — Discovery → Engagement → Transaction
    </h2>
    <p className="text-sm text-slate-500 mb-6">Scope &amp; Cost</p>

    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">What We Build</p>
      <div className="space-y-3">
        {scopeItems.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-3.5">
            <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
              <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
            </div>
            <span className="text-xs text-blue-700 bg-blue-100 rounded-full px-2.5 py-1 font-medium flex-shrink-0 mt-0.5">{item.channels}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
        <p className="text-xs text-slate-600">
          <strong>Integration support</strong> with Aptech/vendor systems (websites, app, CRM, Aptrack/ProConnect) for our product integrations is included.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-blue-600 rounded-xl p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-blue-200 font-bold mb-1">Total Cost</p>
        <p className="text-3xl font-bold">₹45 Lakhs</p>
        <p className="text-sm text-blue-200 mt-1">Fixed for this proposal</p>
      </div>
      <div className="bg-slate-900 rounded-xl p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Duration</p>
        <p className="text-3xl font-bold">12–24 weeks</p>
        <p className="text-sm text-slate-400 mt-1">Post scoping (excluding 4-week scoping)</p>
      </div>
    </div>
  </ExecSlideLayout>
);
