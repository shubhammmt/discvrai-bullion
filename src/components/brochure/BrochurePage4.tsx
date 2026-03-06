import React from 'react';
import { Bot, Phone, Mail, MessageCircle, ArrowRight, Award, Users, Target, Briefcase } from 'lucide-react';

export const BrochurePage4: React.FC = () => {
  const differentiators = [
    { vs: 'vs. Generic AI', points: ['Enterprise infrastructure, not just APIs', 'Domain expertise (Finance, Manufacturing, Healthcare, Education)', 'Day-0 digitalization first — we build the foundation'] },
    { vs: 'vs. Marketing Automation', points: ['Business transformation, not campaigns', 'Transaction execution, not just lead gen', 'CFO-ready business outcomes'] },
    { vs: 'vs. Custom Development', points: ['16 weeks vs. 12–18 months', 'Reusable components, no vendor lock-in', 'Self-service configuration'] },
  ];

  const outcomes = [
    { vertical: 'Manufacturing (₹2,000+ Cr)', result: '80% faster invoice processing, 30% leakage reduction' },
    { vertical: 'Sales & Distribution', result: 'Excel → role-based MIS dashboards; at-risk visibility' },
    { vertical: 'Asset Management', result: 'Days of analysis → seconds (GPT-powered analytics)' },
    { vertical: 'Financial Services', result: '₹950+ Cr AUM, 10× investor coverage; 4–6× open rates' },
    { vertical: 'Education / Training', result: '1% → 3%+ conversion; 20% → 90%+ attribution' },
    { vertical: 'Healthcare', result: '30% wait time ↓, 100% patient record accuracy' },
  ];

  const steps = [
    { step: '1', title: 'Discovery Call', detail: '30 min — understand your challenges. No commitment.', color: 'bg-blue-500' },
    { step: '2', title: 'Strategic Consulting', detail: '4–8 weeks — Value Mapping, Business Impact Model, Roadmap.', color: 'bg-orange-500' },
    { step: '3', title: 'Decision Point', detail: 'You evaluate. We present. Proceed only if it makes business sense.', color: 'bg-purple-500' },
    { step: '4', title: 'Execution', detail: '16 weeks — Phased deployment, measurable milestones.', color: 'bg-emerald-500' },
  ];

  return (
    <div className="brochure-page bg-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="h-1.5 bg-gradient-to-r from-slate-900 via-orange-500 to-slate-900" />
      
      <div className="px-10 pt-6">
        <h2 className="text-[16px] font-bold text-slate-900 mb-0.5">Why DiscvrAI & Next Steps</h2>
        <p className="text-[10px] text-slate-500 mb-4">Not Another AI Vendor. Your Transformation Partner.</p>

        {/* Differentiators */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {differentiators.map((d, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <p className="text-[10px] font-bold text-orange-600 mb-2">{d.vs}</p>
              <ul className="space-y-1.5">
                {d.points.map((p, j) => (
                  <li key={j} className="text-[8.5px] text-slate-700 flex items-start gap-1.5">
                    <ArrowRight className="w-2.5 h-2.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CXO Advantage */}
        <div className="bg-slate-900 rounded-lg p-4 mb-5">
          <h3 className="text-[11px] font-bold text-white mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            The CXO Advantage
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Users className="w-3.5 h-3.5 text-orange-400" />, label: 'Founder-led', detail: '20 years tech leadership, 10 years as CXO of listed companies' },
              { icon: <Target className="w-3.5 h-3.5 text-orange-400" />, label: 'Consulting-first', detail: 'We discover before we execute' },
              { icon: <Briefcase className="w-3.5 h-3.5 text-orange-400" />, label: 'Risk-aware', detail: 'Phased approach, measurable milestones' },
              { icon: <Award className="w-3.5 h-3.5 text-orange-400" />, label: 'Business-outcome focused', detail: 'Every recommendation tied to operational ROI' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-7 h-7 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-1.5">
                  {item.icon}
                </div>
                <p className="text-[9px] font-semibold text-white">{item.label}</p>
                <p className="text-[7.5px] text-slate-400 mt-0.5 leading-snug">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proven Outcomes */}
        <div className="mb-5">
          <h3 className="text-[12px] font-bold text-slate-800 mb-2">Proven Outcomes</h3>
          <div className="grid grid-cols-3 gap-2">
            {outcomes.map((o, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-md p-2.5 border border-slate-100">
                <p className="text-[9px] font-bold text-slate-800">{o.vertical}</p>
                <p className="text-[8px] text-slate-600 mt-0.5 leading-snug">{o.result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Path Forward */}
        <div className="mb-4">
          <h3 className="text-[13px] font-bold text-slate-900 mb-3">Ready to Transform? The Path Forward</h3>
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 relative">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 h-full">
                  <div className={`w-5 h-5 ${s.color} rounded-full flex items-center justify-center mb-1.5`}>
                    <span className="text-white text-[9px] font-bold">{s.step}</span>
                  </div>
                  <p className="text-[9.5px] font-bold text-slate-800">{s.title}</p>
                  <p className="text-[8px] text-slate-500 mt-0.5 leading-snug">{s.detail}</p>
                </div>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-1.5 text-slate-300 text-[10px]">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-white text-[12px] font-bold">Shubham Srivastava</p>
                  <p className="text-slate-400 text-[9px]">Founder & CEO, DiscvrAI</p>
                </div>
              </div>
              <p className="text-orange-400 text-[10px] italic mt-1">
                "We don't sell software. We architect your next evolution."
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[10px]">shubham@discvr.ai</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[10px]">+91-9873961591</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[10px]">+91-9873961591</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="px-10 py-2.5 flex justify-between items-center">
          <span className="text-[8px] text-slate-400">© 2025 DiscvrAI. Confidential.</span>
          <span className="text-[8px] text-slate-400 font-mono">04 / 04</span>
        </div>
      </div>
    </div>
  );
};
