import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBORevenueCalcSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} appendix>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Appendix — Calculation Methodology</p>
    <h2 className="text-xl font-bold text-slate-900 leading-tight mb-4">{slide.headline}</h2>

    <div className="grid grid-cols-12 gap-4">

      {/* Left: Scenarios */}
      <div className="col-span-5 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Component 1: Incremental Enrollment Revenue</p>

        {/* Base Assumptions */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Base Assumptions</p>
          <ul className="space-y-0.5">
            {slide.baseAssumptions?.map((a: string, i: number) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                <span className="text-[10px] text-slate-600 leading-tight">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Two scenarios side by side */}
        <div className="grid grid-cols-2 gap-2">
          {slide.scenarios?.map((scenario: any, si: number) => (
            <div key={si} className={`rounded-lg border overflow-hidden ${
              scenario.color === 'emerald' ? 'border-emerald-200' : 'border-blue-200'
            }`}>
              <div className={`px-2.5 py-1.5 ${
                scenario.color === 'emerald' ? 'bg-emerald-600' : 'bg-blue-700'
              }`}>
                <p className="text-[10px] font-bold text-white">{scenario.label} Scenario</p>
              </div>
              <div className="bg-white divide-y divide-slate-100">
                {scenario.steps?.map((step: any, i: number) => (
                  <div key={i} className={`px-2.5 py-1.5 ${step.highlight ? (scenario.color === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50') : ''}`}>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[9px] text-slate-500 leading-tight flex-1">{step.description}</span>
                      <span className={`text-[10px] font-bold flex-shrink-0 ${
                        step.highlight
                          ? (scenario.color === 'emerald' ? 'text-emerald-700' : 'text-blue-700')
                          : 'text-slate-700'
                      }`}>{step.value}</span>
                    </div>
                    {step.note && (
                      <p className="text-[8px] text-slate-400 mt-0.5">{step.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Cost Savings + Totals */}
      <div className="col-span-4 space-y-3">
        {/* Cost Savings */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Component 2: Cost Savings</p>
          <div className="space-y-2">
            {slide.costSavings?.map((s: any, i: number) => (
              <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <p className="text-[10px] font-semibold text-amber-800">{s.label}</p>
                <div className="flex gap-3 mt-1">
                  <div>
                    <p className="text-[8px] text-slate-400">Monthly</p>
                    <p className="text-[10px] font-bold text-slate-700">{s.monthly}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-400">Annual</p>
                    <p className="text-[10px] font-bold text-amber-700">{s.annual}</p>
                  </div>
                </div>
                <p className="text-[8px] text-slate-500 mt-1 leading-tight">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total table */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Total Annual Impact</p>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-slate-100 px-3 py-1.5">
              <p className="text-[9px] font-semibold uppercase text-slate-500">Component</p>
              <p className="text-[9px] font-semibold uppercase text-slate-500 text-right">Low</p>
              <p className="text-[9px] font-semibold uppercase text-slate-500 text-right">High</p>
            </div>
            {slide.totals?.map((row: any, i: number) => (
              <div key={i} className={`grid grid-cols-3 gap-0 px-3 py-1.5 border-t border-slate-100 ${
                row.bold ? 'bg-slate-900' : 'bg-white'
              }`}>
                <p className={`text-[10px] ${row.bold ? 'font-bold text-slate-200' : 'text-slate-600'}`}>{row.label}</p>
                <p className={`text-[10px] text-right ${row.bold ? 'font-bold text-blue-400' : 'text-slate-700'}`}>{row.low}</p>
                <p className={`text-[10px] text-right ${row.bold ? 'font-bold text-emerald-400' : 'text-emerald-700 font-semibold'}`}>{row.high}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formula note */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
          <p className="text-[9px] font-semibold text-blue-700 mb-1">Final Calculation</p>
          <p className="text-[9px] text-slate-600 leading-tight">Low: ₹3.6 Cr + ₹0.24 Cr = <span className="font-bold text-blue-700">₹3.84 Cr</span></p>
          <p className="text-[9px] text-slate-600 leading-tight mt-0.5">High: ₹9.0 Cr + ₹0.43 Cr = <span className="font-bold text-emerald-700">₹9.43 Cr</span></p>
        </div>
      </div>

      {/* Right: Phase Validation */}
      <div className="col-span-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Phase-by-Phase Validation</p>
        <div className="space-y-2 mb-3">
          {slide.phaseValidation?.map((pv: any, i: number) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg px-3 py-2">
              <p className="text-[10px] font-bold text-blue-700">{pv.phase}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{pv.incremental}</p>
              <div className="flex justify-between mt-1">
                <div>
                  <p className="text-[8px] text-slate-400">Monthly</p>
                  <p className="text-[10px] font-semibold text-slate-700">{pv.monthly}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-slate-400">Annual</p>
                  <p className="text-[10px] font-semibold text-emerald-600">{pv.annual}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Source note */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <p className="text-[9px] font-semibold text-slate-500 mb-1">Source References</p>
          <ul className="space-y-0.5">
            {[
              'Section 1.2 — Enrollment value assumption',
              'Section 1.5 — SEO spend baseline',
              'Section 3.2 — SEO cost reduction',
              'Section 4.0 — Combined ROI matrix',
              'Section 4.4 — Phase-by-phase impact',
            ].map((s, i) => (
              <li key={i} className="text-[8px] text-slate-500 leading-tight">• {s}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </CBOSlideLayout>
);
