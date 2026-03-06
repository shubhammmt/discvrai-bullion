import React from 'react';
import { Factory, Landmark, HeartPulse, GraduationCap, LineChart, Bot } from 'lucide-react';

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; color: string }> = ({ icon, title, color }) => (
  <div className={`flex items-center gap-2 mb-2 pb-1.5 border-b-2 ${color}`}>
    {icon}
    <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
  </div>
);

const MiniTable: React.FC<{ rows: { transform: string; challenge: string; impact: string }[] }> = ({ rows }) => (
  <table className="w-full text-[9px]">
    <thead>
      <tr className="text-left text-slate-500">
        <th className="pb-1 font-semibold w-[28%]">Transformation</th>
        <th className="pb-1 font-semibold w-[32%]">Challenge</th>
        <th className="pb-1 font-semibold w-[40%]">Impact</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : ''}>
          <td className="py-1 pr-2 font-medium text-slate-700 align-top">{r.transform}</td>
          <td className="py-1 pr-2 text-slate-500 align-top">{r.challenge}</td>
          <td className="py-1 text-slate-700 align-top font-medium">{r.impact}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const BrochurePage2: React.FC = () => {
  const manufacturing = [
    { transform: 'Field Force Enablement', challenge: '10,000+ field force, manual paperwork', impact: 'Zero manual processes, 100% digital order-to-fulfillment' },
    { transform: 'Product Authentication', challenge: 'Gray market, proxy sales', impact: 'QR-based verification, 100% channel integrity' },
    { transform: 'Customer Data Consolidation', challenge: '20M+ records across silos', impact: 'Single source of truth, unified analytics' },
    { transform: 'Supply Chain Visibility', challenge: 'Blind spots across tiers', impact: 'End-to-end tracking: factory → warehouse → distributor → customer' },
    { transform: 'Sales MIS & Analytics', challenge: 'Excel, no real-time visibility', impact: 'Role-based dashboards — management, sales, finance views' },
  ];

  const finance = [
    { transform: 'Automated Reconciliation', challenge: '10,000+ invoices/month, 25–30% leakage', impact: '4-way matching, 80% faster, <5% leakage' },
    { transform: 'Distributor Expense Optimization', challenge: 'Manual Excel, delayed insights', impact: 'GPT-powered analytics, real-time anomaly detection' },
    { transform: 'D2C Conversion Platforms', challenge: 'Low conversion, manual KYC', impact: 'AI onboarding, 15%+ conversion, 4.26L+ customers' },
  ];

  const healthcare = [
    { transform: 'Multi-Hospital Operations', challenge: 'Manual bed mgmt, fragmented EMR', impact: '30% wait time reduction, 25% bed utilization ↑' },
    { transform: 'Patient Data Consolidation', challenge: '5M+ records across 5+ systems', impact: 'Single patient view, 50% fewer duplicate tests' },
    { transform: 'Revenue Cycle Management', challenge: '100K+ claims/month', impact: '40% faster insurance verification, 30% fewer denials' },
  ];

  const education = [
    { transform: 'Lead Attribution & Qualification', challenge: '80% enrollments untraceable, 7–8hr response', impact: 'AI scoring, 15–30 min response, 40–50% decay prevented' },
    { transform: 'Conversion Control', challenge: '1–1.5% conversion, no attribution', impact: 'Centralized platform, 90%+ traceability' },
    { transform: 'Revenue Integrity', challenge: 'Attribution blindness, CPC inflation', impact: 'End-to-end transaction control' },
  ];

  const financial = [
    { transform: 'AI Nudges', challenge: 'Generic alerts, 5–10% open rates', impact: '4–6× open rates, 10–30× trading action' },
    { transform: 'Personalization Engine', challenge: 'Same experience for all users', impact: '2–3× conversion, 40–50% LTV improvement' },
    { transform: 'Distributor Tech Enablement', challenge: '60–70% time on research/admin', impact: '3× scalability (50→150 clients per RM)' },
  ];

  return (
    <div className="brochure-page bg-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="h-1.5 bg-gradient-to-r from-slate-900 via-orange-500 to-slate-900" />
      
      <div className="px-8 pt-5">
        <h2 className="text-[16px] font-bold text-slate-900 mb-0.5">Digital Transformations We Enable</h2>
        <p className="text-[10px] text-slate-500 mb-4">Day-0 Digitalization: The Foundation. AI cannot enable what isn't digital.</p>

        {/* Manufacturing */}
        <div className="mb-3.5">
          <SectionHeader 
            icon={<Factory className="w-3.5 h-3.5 text-blue-600" />} 
            title="Manufacturing & Distribution (Proven at ₹10,000+ Cr Scale)" 
            color="border-blue-500" 
          />
          <MiniTable rows={manufacturing} />
        </div>

        {/* Finance */}
        <div className="mb-3.5">
          <SectionHeader 
            icon={<Landmark className="w-3.5 h-3.5 text-emerald-600" />} 
            title="Finance Transformation (CFO-Ready Outcomes)" 
            color="border-emerald-500" 
          />
          <MiniTable rows={finance} />
        </div>

        {/* Healthcare */}
        <div className="mb-3.5">
          <SectionHeader 
            icon={<HeartPulse className="w-3.5 h-3.5 text-rose-600" />} 
            title="Healthcare (10+ Hospitals, 5M+ Patients)" 
            color="border-rose-500" 
          />
          <MiniTable rows={healthcare} />
        </div>

        {/* Education */}
        <div className="mb-3.5">
          <SectionHeader 
            icon={<GraduationCap className="w-3.5 h-3.5 text-purple-600" />} 
            title="Education & Professional Training" 
            color="border-purple-500" 
          />
          <MiniTable rows={education} />
        </div>

        {/* Financial Services */}
        <div className="mb-3.5">
          <SectionHeader 
            icon={<LineChart className="w-3.5 h-3.5 text-amber-600" />} 
            title="Financial Services — Engagement & Distribution" 
            color="border-amber-500" 
          />
          <MiniTable rows={financial} />
        </div>

        {/* AI Layer */}
        <div className="bg-slate-900 rounded-lg p-4 mt-1">
          <h3 className="text-[11px] font-bold text-white flex items-center gap-2 mb-2">
            <Bot className="w-3.5 h-3.5 text-orange-400" />
            Intelligence Layer: AI Enablement (After Day-0)
          </h3>
          <p className="text-[9px] text-slate-400 mb-2">Virtual Pods — AI agents that execute end-to-end workflows:</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: 'Finance Pod', desc: 'Automated reconciliation, expense optimization, intelligent exception handling' },
              { name: 'HR Pod', desc: 'CV screening, multilingual voice interviews, 50% faster hiring' },
              { name: 'RM/Sales Pod', desc: 'Investor concierge, intent scoring, 10–20× coverage per RM' },
              { name: 'Compliance Pod', desc: 'Automated eligibility checks, one-click audit readiness' },
            ].map((pod, i) => (
              <div key={i} className="bg-white/5 rounded-md p-2 border border-white/10">
                <p className="text-[9.5px] font-semibold text-orange-400 mb-0.5">{pod.name}</p>
                <p className="text-[8px] text-slate-400 leading-snug">{pod.desc}</p>
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
          <span className="text-[8px] text-slate-400 font-mono">02 / 04</span>
        </div>
      </div>
    </div>
  );
};
