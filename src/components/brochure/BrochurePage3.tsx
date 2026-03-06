import React from 'react';
import { Search, Layers, Rocket, Server, Shield, Globe, CheckCircle2 } from 'lucide-react';

export const BrochurePage3: React.FC = () => {
  const diagnosticPhases = [
    { phase: 'Weeks 1–2', deliverable: 'Business Process Blueprint', detail: 'Workflows, leakage points, automation opportunities' },
    { phase: 'Weeks 3–4', deliverable: 'Technical Readiness Report', detail: 'Systems, data quality, integration gaps' },
    { phase: 'Weeks 5–6', deliverable: 'Value Mapping Document', detail: 'CFO-ready business impact model' },
    { phase: 'Weeks 7–8', deliverable: 'Transformation Roadmap', detail: '16-week execution plan, phased milestones' },
  ];

  const executionPhases = [
    { phase: 'Discovery & Foundation', weeks: '1–4', outcome: 'Day-0 digitalization, system integrations, clean core', color: 'bg-blue-500' },
    { phase: 'Intelligence Layer', weeks: '5–12', outcome: 'First Virtual Pod live (Finance/RM), additional pods', color: 'bg-orange-500' },
    { phase: 'Scale & Optimize', weeks: '13–16', outcome: 'Performance tuning, team training, self-sufficient client', color: 'bg-emerald-500' },
  ];

  const enterpriseFeatures = [
    { icon: <Globe className="w-4 h-4 text-blue-600" />, title: 'India-First Architecture', detail: 'AWS Mumbai, Azure India, data sovereignty' },
    { icon: <Shield className="w-4 h-4 text-emerald-600" />, title: 'Compliance', detail: 'SEBI, DFSA, RBI, GDPR frameworks' },
    { icon: <Layers className="w-4 h-4 text-purple-600" />, title: 'Integrations', detail: 'SAP S/4HANA, Salesforce, Workday, native connectors' },
    { icon: <Server className="w-4 h-4 text-orange-600" />, title: '99.9% Uptime SLA', detail: 'Multi-cloud, horizontal scaling' },
  ];

  return (
    <div className="brochure-page bg-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="h-1.5 bg-gradient-to-r from-slate-900 via-orange-500 to-slate-900" />
      
      <div className="px-10 pt-6">
        <h2 className="text-[16px] font-bold text-slate-900 mb-0.5">How We Approach Transformation</h2>
        <p className="text-[10px] text-slate-500 mb-5">We Don't Pitch. We Discover.</p>

        {/* Strategic Diagnostic */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-slate-800">4–8 Week Strategic Diagnostic</h3>
              <p className="text-[9px] text-slate-500">No commitment required</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {diagnosticPhases.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 h-full">
                  <span className="text-[9px] font-bold text-blue-600">{item.phase}</span>
                  <p className="text-[10.5px] font-semibold text-slate-800 mt-1 leading-tight">{item.deliverable}</p>
                  <p className="text-[8.5px] text-slate-500 mt-1 leading-snug">{item.detail}</p>
                </div>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-2 w-3 text-slate-300 text-sm">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-[9.5px] text-blue-800 leading-relaxed">
              <span className="font-semibold">You get actionable insights even if you don't proceed.</span> Board-ready documentation for CFO, CEO, and Digital Transformation Offices.
            </p>
          </div>
        </div>

        {/* 16 Weeks to Production */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
              <Rocket className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-800">16 Weeks to Production</h3>
          </div>

          <div className="space-y-2.5">
            {executionPhases.map((phase, i) => (
              <div key={i} className="flex items-stretch gap-3">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${phase.color} ring-2 ring-white shadow`} />
                  {i < 2 && <div className="w-0.5 flex-1 bg-slate-200 mt-0.5" />}
                </div>
                {/* Content */}
                <div className="flex-1 bg-slate-50 rounded-lg p-3 border border-slate-100 -mt-0.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-bold text-slate-800">{phase.phase}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${phase.color}`}>
                      Weeks {phase.weeks}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1">{phase.outcome}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-orange-50 rounded-lg p-3 border border-orange-100">
            <p className="text-[9.5px] text-orange-800">
              <span className="font-semibold">Day-0 Digitalization delivers value standalone.</span> AI Enablement is optional — added only when the foundation is ready.
            </p>
          </div>
        </div>

        {/* Built for Enterprise */}
        <div>
          <h3 className="text-[13px] font-bold text-slate-800 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Built for Enterprise
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {enterpriseFeatures.map((feat, i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
                <div className="mx-auto w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                  {feat.icon}
                </div>
                <p className="text-[10px] font-bold text-slate-800">{feat.title}</p>
                <p className="text-[8.5px] text-slate-500 mt-0.5 leading-snug">{feat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="px-10 py-2.5 flex justify-between items-center">
          <span className="text-[8px] text-slate-400">© 2025 DiscvrAI. Confidential.</span>
          <span className="text-[8px] text-slate-400 font-mono">03 / 04</span>
        </div>
      </div>
    </div>
  );
};
