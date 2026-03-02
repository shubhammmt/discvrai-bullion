import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecSharedSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Shared Foundation</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Shared infrastructure that enables parallel execution
    </h2>

    <div className="grid grid-cols-2 gap-5 mb-6">
      {[
        { title: 'Identity + Event Model', desc: 'Lead ID → Student ID mapping. Single identity across the entire lifecycle from first inquiry to course completion.', icon: '🔗' },
        { title: 'Conversational Interface Layer', desc: 'One interface (embedded chat + WhatsApp), multi-agent routing behind it. Students interact through one channel — agents are invisible.', icon: '💬' },
        { title: 'Integration Adapters', desc: 'Aptrack/AptTrack, ProConnect, CRM (optional), payment gateway (optional). Adapters built once, shared across tracks.', icon: '⚙️' },
        { title: 'Analytics + Dashboards Base', desc: 'Event store, scoring store, role-based dashboard framework. Shared infrastructure for I4, I5, I6 and all reporting.', icon: '📊' },
      ].map((item, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <p className="font-bold text-slate-900 text-sm">{item.title}</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Why this matters</p>
      <p className="text-sm text-slate-700 leading-relaxed">
        These four pillars start in <strong>Week 1–2</strong> of the engagement. By building them first, Track A (Pre-Sales) and Track B (Post-Sales) can proceed independently with separate pods — without duplicating infrastructure or creating integration debt later.
      </p>
    </div>
  </ExecSlideLayout>
);
