import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecPodsSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 3.1 — Manpower Plan</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Delivery pods — parallel execution
    </h2>
    <p className="text-sm text-slate-500 mb-6">Two dedicated delivery pods + shared services — enables Track A and Track B to run in parallel without inflating timeline.</p>

    <div className="grid grid-cols-3 gap-5">
      {/* Pod A */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">A</span>
          <p className="font-bold text-slate-900">Pod A — Pre-Sales</p>
        </div>
        <div className="space-y-2">
          {[
            { role: 'Tech Lead (full-stack)', count: '1' },
            { role: 'Backend engineers', count: '2', note: 'integrations, orchestration' },
            { role: 'Frontend engineer', count: '1', note: 'web chat + Lead Card' },
            { role: 'AI/Agent engineer', count: '1', note: 'conversation logic, scoring' },
            { role: 'QA', count: '1' },
          ].map((r, i) => (
            <div key={i} className="flex items-start justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800">{r.role}</span>
                {r.note && <span className="text-slate-500 ml-1">({r.note})</span>}
              </div>
              <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">{r.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-blue-700">Total Pod A</span>
            <span className="text-blue-700">6 FTE</span>
          </div>
        </div>
      </div>

      {/* Pod B */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">B</span>
          <p className="font-bold text-slate-900">Pod B — Post-Sales</p>
        </div>
        <div className="space-y-2">
          {[
            { role: 'Tech Lead (full-stack)', count: '1' },
            { role: 'Backend engineers', count: '2', note: 'trigger engine, fees/query' },
            { role: 'Frontend engineer', count: '1', note: 'agentic UI + dashboards' },
            { role: 'AI/Agent engineer', count: '1', note: 'doubt resolution + flows' },
            { role: 'QA', count: '1' },
          ].map((r, i) => (
            <div key={i} className="flex items-start justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800">{r.role}</span>
                {r.note && <span className="text-slate-500 ml-1">({r.note})</span>}
              </div>
              <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">{r.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-200">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-700">Total Pod B</span>
            <span className="text-emerald-700">6 FTE</span>
          </div>
        </div>
      </div>

      {/* Shared */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-slate-600 text-white flex items-center justify-center font-bold text-sm">S</span>
          <p className="font-bold text-slate-900">Shared (Cross-pod)</p>
        </div>
        <div className="space-y-2">
          {[
            { role: 'PM / Delivery manager', count: '0.5–1' },
            { role: 'Designer', count: '0.25–0.5' },
            { role: 'DevOps / SRE', count: '0.25–0.5' },
            { role: 'Data / Analytics engineer', count: '0.5' },
            { role: 'Content / KB owner', count: '0.5', note: 'course info, FAQs, policy' },
          ].map((r, i) => (
            <div key={i} className="flex items-start justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800">{r.role}</span>
                {r.note && <span className="text-slate-500 ml-1">({r.note})</span>}
              </div>
              <span className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">{r.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">Total Shared</span>
            <span className="text-slate-700">2–3 FTE</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-5 bg-slate-900 rounded-xl p-4 flex items-center justify-between">
      <span className="text-white font-semibold text-sm">Total Peak Manpower (Parallel Execution)</span>
      <span className="text-2xl font-bold text-blue-400">14–15 FTE</span>
    </div>
  </ExecSlideLayout>
);
