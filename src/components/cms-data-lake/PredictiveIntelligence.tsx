import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, Banknote, MessageSquareWarning, ShieldAlert, TrendingUp } from 'lucide-react';

interface Props {
  terminalId: string;
  frequentJam: boolean;
  highCashBurn: boolean;
  balanceDrift: number;
  pendingClaimCount: number;
  dataCompleteness: number;
}

interface MLInsight {
  title: string;
  icon: React.ReactNode;
  probability: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  detail: string;
  recommendation: string;
  model: string;
}

const PredictiveIntelligence: React.FC<Props> = ({
  terminalId, frequentJam, highCashBurn, balanceDrift, pendingClaimCount, dataCompleteness
}) => {
  // Deterministic "ML" outputs based on ATM attributes
  const jamProb = frequentJam ? 80 : 22;
  const idleCashReduction = highCashBurn ? 4 : 9;
  const optimalLoad = highCashBurn ? 22.5 : 18.5;
  const complaintRisk = pendingClaimCount > 0 ? 'High' : Math.abs(balanceDrift) > 3000 ? 'Medium' : 'Low';
  const auditRisk = dataCompleteness < 80 ? 'High' : dataCompleteness < 90 ? 'Medium' : 'Low';

  const insights: MLInsight[] = [
    {
      title: 'Jam Propensity',
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      probability: jamProb,
      riskLevel: jamProb > 60 ? 'High' : jamProb > 30 ? 'Medium' : 'Low',
      detail: `${jamProb}% probability of jam within 48 hours based on feed failure patterns.`,
      recommendation: frequentJam ? 'Schedule preventive FLM visit. Replace BNA feed rollers.' : 'No immediate action. Continue monitoring.',
      model: 'JamPredictor v2.1 · Last trained: Apr 10',
    },
    {
      title: 'Indent Optimization',
      icon: <Banknote className="h-4 w-4 text-emerald-500" />,
      probability: 100 - idleCashReduction * 5,
      riskLevel: 'Medium',
      detail: `Next load recommended at ₹${optimalLoad}L (${idleCashReduction}% reduction in idle cash risk).`,
      recommendation: `Optimize denomination mix: increase ₹500 by 15%, reduce ₹2000 by 20% based on dispensing patterns.`,
      model: 'CashOptimizer v3.0 · 30-day rolling window',
    },
    {
      title: 'Complaint Risk Prediction',
      icon: <MessageSquareWarning className="h-4 w-4 text-amber-500" />,
      probability: complaintRisk === 'High' ? 85 : complaintRisk === 'Medium' ? 45 : 12,
      riskLevel: complaintRisk as 'High' | 'Medium' | 'Low',
      detail: complaintRisk === 'High'
        ? "High risk of customer complaint due to unresolved 'Silent Close' event."
        : complaintRisk === 'Medium'
        ? 'Moderate risk — balance drift may trigger disputed transaction.'
        : 'Low complaint risk. All transactions settling normally.',
      recommendation: complaintRisk === 'High'
        ? 'Prioritize EJ-to-switch reconciliation. Pre-draft customer response.'
        : 'Standard monitoring sufficient.',
      model: 'ComplaintPredictor v1.8 · NLP-enhanced',
    },
    {
      title: 'Audit Risk Score',
      icon: <ShieldAlert className="h-4 w-4 text-purple-500" />,
      probability: auditRisk === 'High' ? 92 : auditRisk === 'Medium' ? 58 : 15,
      riskLevel: auditRisk as 'High' | 'Medium' | 'Low',
      detail: `ATM segmented as ${auditRisk} risk for Audit Planner.`,
      recommendation: auditRisk === 'High'
        ? 'Flag for priority audit. Data gaps detected in EOD + MSP coverage.'
        : auditRisk === 'Medium'
        ? 'Include in next scheduled audit cycle.'
        : 'Routine audit cycle. No red flags.',
      model: 'AuditRiskEngine v2.4 · Ensemble model',
    },
  ];

  const riskColor = (r: string) => {
    switch (r) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      default: return 'text-emerald-700 bg-emerald-100 border-emerald-200';
    }
  };

  const probBar = (p: number) => {
    const color = p > 70 ? 'bg-red-500' : p > 40 ? 'bg-amber-500' : 'bg-emerald-500';
    return (
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${p}%` }} />
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="h-4 w-4 text-purple-600" />
        <p className="text-[10px] font-bold text-slate-700">ML-Powered Predictive Intelligence</p>
        <Badge className="text-[7px] bg-purple-100 text-purple-700 px-1 py-0">4 Models Active</Badge>
      </div>

      {insights.map((ins, i) => (
        <div key={i} className={`rounded-lg border p-3 ${riskColor(ins.riskLevel)}`}>
          <div className="flex items-center gap-2 mb-1.5">
            {ins.icon}
            <span className="text-[11px] font-bold text-slate-900 flex-1">{ins.title}</span>
            <Badge className={`text-[8px] px-1.5 py-0 ${riskColor(ins.riskLevel)}`}>{ins.riskLevel}</Badge>
          </div>
          <p className="text-[10px] text-slate-700 font-medium mb-1.5">{ins.detail}</p>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[8px] text-slate-500 shrink-0">Confidence</span>
            <div className="flex-1">{probBar(ins.probability)}</div>
            <span className="text-[9px] font-bold text-slate-700">{ins.probability}%</span>
          </div>
          <div className="bg-white/60 rounded p-2 border border-slate-200/50">
            <p className="text-[9px] text-slate-600"><span className="font-bold">Action:</span> {ins.recommendation}</p>
          </div>
          <p className="text-[7px] text-slate-400 mt-1 italic">{ins.model}</p>
        </div>
      ))}
    </div>
  );
};

export default PredictiveIntelligence;
