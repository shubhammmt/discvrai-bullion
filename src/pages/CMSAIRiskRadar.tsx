import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CMSModuleNav from '@/components/cms-shared/CMSModuleNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Activity, AlertTriangle, BrainCircuit, ChevronDown, Cpu, FileDown, Gauge, Layers,
  LineChart as LineIcon, MapPin, MessageSquare, Network, Radar as RadarIcon, ScanText, Sparkles,
  Target, TrendingUp, Workflow,
} from 'lucide-react';
import { toast } from 'sonner';

const fmtINR = (v: number) => `₹${v.toLocaleString('en-IN')}`;

/* ---------------- Shared bits ---------------- */
const ModelIO: React.FC<{ inputs: string[]; outputs: { k: string; v: string }[]; lastRun?: string; confidence?: number }> = ({
  inputs, outputs, lastRun = '08:42 IST · 14 May 2026', confidence = 86,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-slate-200">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Model I/O</span>
              <Badge variant="outline" className="text-[10px]">Confidence {confidence}%</Badge>
              <span className="text-[10px] text-slate-500">Last run {lastRun}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid md:grid-cols-2 gap-3 p-3 pt-0 border-t border-slate-200">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">Inputs</div>
              <ul className="text-[11px] space-y-0.5 text-slate-700 list-disc pl-4">
                {inputs.map((i, k) => <li key={k}>{i}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">Outputs</div>
              <div className="space-y-0.5">
                {outputs.map((o, k) => (
                  <div key={k} className="text-[11px] flex justify-between gap-2 border-b border-slate-100 py-0.5">
                    <code className="font-mono text-blue-700">{o.k}</code>
                    <span className="text-slate-700">{o.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const SectionTitle: React.FC<{ icon: any; title: string; sub?: string }> = ({ icon: Icon, title, sub }) => (
  <div className="flex items-start gap-2 mb-3">
    <div className="p-2 rounded-lg bg-blue-50 text-blue-700"><Icon className="h-4 w-4" /></div>
    <div>
      <div className="text-base font-bold text-slate-900">{title}</div>
      {sub && <div className="text-[11px] text-slate-500">{sub}</div>}
    </div>
  </div>
);

/* ---------------- Tab content components ---------------- */

// ML-1 DRS Explorer
const DRSExplorer: React.FC = () => {
  const features = [
    { k: 'Bottom-edge call frequency', w: 14 },
    { k: 'High closing balance trend', w: 11 },
    { k: 'OTC resets (7d)', w: 8 },
    { k: 'Dispense discrepancy', w: 7 },
    { k: 'Overage history', w: 6 },
    { k: 'FLM call density', w: 5 },
    { k: 'Customer claim rate', w: 5 },
    { k: 'Neighbor stress (cluster)', w: 4 },
    { k: 'Cash velocity drift', w: 4 },
  ];
  const top20 = [
    ['ATM-DEL-0102', 'ICICI', 'Delhi-S', 87, 'Theft'],
    ['ATM-MUM-0001', 'SBI', 'Mumbai-W', 82, 'Theft'],
    ['ATM-AMD-0001', 'HDFC', 'Ahmedabad-C', 78, 'Overage'],
    ['ATM-PUN-0019', 'Axis', 'Pune-E', 74, 'Cashout'],
    ['ATM-BLR-0055', 'Kotak', 'Bengaluru-N', 71, 'Overage'],
    ['ATM-HYD-0044', 'Yes', 'Hyderabad-W', 69, 'Cashout'],
  ];
  const buckets = [12, 28, 41, 9, 5]; // 0-20, 20-40, 40-60, 60-80, 80-100

  return (
    <div className="space-y-3">
      <SectionTitle icon={Gauge} title="DRS Explorer" sub="ML-1 · XGBoost · drs-v3.2 · Single score per ATM, 0–100" />
      <div className="grid lg:grid-cols-3 gap-3">
        <Card className="border-slate-200 lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Network DRS distribution (95-ATM sample)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {buckets.map((b, i) => {
                const colors = ['bg-emerald-500', 'bg-emerald-400', 'bg-amber-400', 'bg-orange-500', 'bg-red-600'];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end">
                    <div className={`w-full ${colors[i]} rounded-t`} style={{ height: `${b * 3}px` }} />
                    <div className="text-[10px] text-slate-500 mt-1">{i * 20}–{(i + 1) * 20}</div>
                    <div className="text-[10px] font-bold">{b}</div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Green = stable · Red = action required</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">ATM-AMD-0001 · Why this score</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-3xl font-bold text-amber-600">78</div>
              <div className="text-xs text-slate-500">/ 100 · Overage mode</div>
            </div>
            <div className="space-y-1">
              {features.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px]"><span>{f.k}</span><span className="font-mono">+{f.w}</span></div>
                  <div className="h-1.5 bg-slate-100 rounded"><div className="h-1.5 bg-blue-600 rounded" style={{ width: `${f.w * 5}%` }} /></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-slate-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Top 20 highest-DRS ATMs</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[10px]">ATM</TableHead><TableHead className="text-[10px]">Bank</TableHead>
              <TableHead className="text-[10px]">Region</TableHead><TableHead className="text-[10px]">DRS</TableHead>
              <TableHead className="text-[10px]">Mode</TableHead><TableHead className="text-[10px]">Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {top20.map((r, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="font-mono font-bold">{r[0]}</TableCell><TableCell>{r[1]}</TableCell>
                  <TableCell>{r[2]}</TableCell>
                  <TableCell><span className={`font-bold ${(r[3] as number) > 70 ? 'text-red-600' : 'text-amber-600'}`}>{r[3]}</span></TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{r[4]}</Badge></TableCell>
                  <TableCell className="space-x-1">
                    <Link to="/cms-data-lake"><Button size="sm" variant="outline" className="h-6 text-[10px]">Data Lake</Button></Link>
                    <Link to="/cms-audit-command"><Button size="sm" variant="outline" className="h-6 text-[10px]">Audit</Button></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ModelIO
        inputs={['EJ logs (15-day rolling)', 'Switch txns (90-day)', 'FLM/MSP tickets', 'Custodian behavior history', 'Vault attestation gaps', 'Neighbor cluster status']}
        outputs={[{ k: 'drs_score', v: '78' }, { k: 'risk_mode', v: 'Overage' }, { k: 'confidence_pct', v: '82' }, { k: 'model_version', v: 'drs-v3.2' }]}
        confidence={82}
      />
    </div>
  );
};

// ML-2 Risk Modes
const RiskModes: React.FC = () => {
  const modes = [
    { k: 'Theft', v: 14, c: 'bg-red-500', triggers: ['Stagnant route > 60d', 'OTC resets cluster', 'High closing cash'], action: 'Trigger surprise audit + dual custody' },
    { k: 'Overage', v: 27, c: 'bg-amber-500', triggers: ['FLM jam unresolved', 'Customer claims', 'System ≠ machine count'], action: 'Lock OTC · expected overage to custodian' },
    { k: 'Cashout', v: 19, c: 'bg-orange-500', triggers: ['Velocity surge', 'Neighbor OOC', 'Festival/payday flag'], action: 'Prepone load · revise indent' },
    { k: 'Stable', v: 40, c: 'bg-emerald-500', triggers: [], action: 'Standard cycle' },
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={Layers} title="Risk Modes" sub="ML-2 · One dominant mode per ATM · 70% custodian behavior · 30% neighbor stress" />
      <div className="grid md:grid-cols-4 gap-3">
        {modes.map((m, i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-700">{m.k}</div>
                <div className="text-2xl font-bold">{m.v}%</div>
              </div>
              <div className="h-2 bg-slate-100 rounded mt-1"><div className={`h-2 rounded ${m.c}`} style={{ width: `${m.v}%` }} /></div>
              {m.triggers.length > 0 && (
                <ul className="mt-2 text-[10px] text-slate-600 list-disc pl-4 space-y-0.5">
                  {m.triggers.map((t, k) => <li key={k}>{t}</li>)}
                </ul>
              )}
              <div className="mt-2 text-[10px] font-medium text-blue-700">{m.action}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-slate-200">
        <CardContent className="p-3 text-[11px] text-slate-600">
          <span className="font-bold text-slate-800">Governance:</span> Custodian behavior weighted 70%, neighbor cluster stress 30%. Mode is decided by argmax over Theft/Overage/Cashout severities — Stable when all are below trigger thresholds.
        </CardContent>
      </Card>
      <ModelIO
        inputs={['DRS sub-scores per signal family', 'Custodian profile vector', 'Cluster stress index', 'Calendar / festival flags']}
        outputs={[{ k: 'risk_mode', v: 'Overage' }, { k: 'playbook_id', v: 'PB-OVR-04' }, { k: 'severity', v: '0.72' }]}
      />
    </div>
  );
};

// ML-3 Demand Forecast
const DemandForecast: React.FC = () => {
  const forecast = [12, 14, 18, 22, 19, 24, 28];
  const max = Math.max(...forecast);
  return (
    <div className="space-y-3">
      <SectionTitle icon={LineIcon} title="Cash Demand Forecast" sub="ML-3 · 7-day forecast · Drives indent revision" />
      <Card className="border-slate-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm">ATM-AMD-0001 · 7-day forecast (₹ Lakh)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {forecast.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(v / max) * 110}px` }} />
                <div className="text-[10px] mt-1">D{i + 1}</div>
                <div className="text-[10px] font-bold text-slate-700">{v}L</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between bg-amber-50 border border-amber-200 rounded p-2">
            <div className="text-[11px]">
              <span className="font-bold text-amber-800">Forecast cashout:</span> 14 May 16:30 IST · Confidence 88%
            </div>
            <Link to="/cms-indent-engine">
              <Button size="sm" className="h-7 text-[11px] bg-blue-600 hover:bg-blue-700"
                onClick={() => toast.success('Demand forecast routed to Indent Engine')}>
                Send to Indent Engine →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <ModelIO
        inputs={['90-day dispense history', 'Calendar (payday/festival)', 'Machine counter velocity', 'System counter fallback', 'Local event flags']}
        outputs={[{ k: 'forecast_load_₹', v: '19,00,000' }, { k: 'forecast_cashout_at', v: 'Apr 14 16:30' }, { k: 'confidence_pct', v: '88' }, { k: 'action', v: 'Prepone load' }]}
        confidence={88}
      />
    </div>
  );
};

// ML-4 Mismatch Watch
const MismatchWatch: React.FC = () => {
  const rows = [
    ['ATM-DEL-0102', 1240000, 1235000, 1240000, -5000, 'Phantom dispense'],
    ['ATM-MUM-0001', 856000, 856000, 851000, -5000, 'Vault timing'],
    ['ATM-AMD-0001', 940000, 932500, null, -7500, 'Denomination drift'],
    ['ATM-PUN-0019', 612000, 615000, 612000, +3000, 'Phantom dispense'],
    ['ATM-BLR-0055', 1804000, 1804000, 1798000, -6000, 'Vault timing'],
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={Activity} title="Mismatch Watch" sub="ML-4 · Live three-way variance feed" />
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[10px]">ATM</TableHead>
              <TableHead className="text-[10px] text-right">Bank ₹</TableHead>
              <TableHead className="text-[10px] text-right">Machine ₹</TableHead>
              <TableHead className="text-[10px] text-right">Vault ₹</TableHead>
              <TableHead className="text-[10px] text-right">Variance</TableHead>
              <TableHead className="text-[10px]">Type</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="font-mono font-bold">{r[0]}</TableCell>
                  <TableCell className="text-right">{fmtINR(r[1] as number)}</TableCell>
                  <TableCell className="text-right">{fmtINR(r[2] as number)}</TableCell>
                  <TableCell className="text-right">{r[3] == null ? <span className="text-amber-600">pending</span> : fmtINR(r[3] as number)}</TableCell>
                  <TableCell className={`text-right font-bold ${(r[4] as number) < 0 ? 'text-red-600' : 'text-emerald-600'}`}>{fmtINR(r[4] as number)}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{r[5]}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Link to="/cms-recon-center"><Button variant="outline" size="sm">Open Three-Way Truth in Recon Center →</Button></Link>
      <ModelIO
        inputs={['Bank switch txn log', 'EJ machine dispense', 'Vault disbursement line', 'Cassette seal events']}
        outputs={[{ k: 'variance_₹', v: '-5,000' }, { k: 'variance_type', v: 'phantom_dispense' }, { k: 'severity', v: '0.63' }]}
      />
    </div>
  );
};

// ML-5 Stuck Cash
const StuckCash: React.FC = () => {
  const rows = [
    ['ATM-AMD-0001', 7500, 'C2 · ₹500', 'FLM-44218', 0.91],
    ['ATM-MUM-0001', 4500, 'C1 · ₹2000', 'FLM-44230', 0.87],
    ['ATM-DEL-0102', 12000, 'C3 · ₹500', 'FLM-44241', 0.83],
    ['ATM-BLR-0055', 3500, 'C4 · ₹100', 'FLM-44262', 0.79],
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={MapPin} title="Stuck Cash Locator" sub="ML-5 · Reject/purge estimates · Feeds Expected Overage" />
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[10px]">ATM</TableHead>
              <TableHead className="text-[10px] text-right">Estimated stuck ₹</TableHead>
              <TableHead className="text-[10px]">Cassette</TableHead>
              <TableHead className="text-[10px]">FLM event</TableHead>
              <TableHead className="text-[10px] text-right">Confidence</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="font-mono font-bold">{r[0]}</TableCell>
                  <TableCell className="text-right font-bold text-amber-700">{fmtINR(r[1] as number)}</TableCell>
                  <TableCell>{r[2]}</TableCell>
                  <TableCell className="font-mono">{r[3]}</TableCell>
                  <TableCell className="text-right">{Math.round((r[4] as number) * 100)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-2 text-[11px] text-blue-800">
          Estimated stuck values feed the <Link to="/cms-overage-alerts" className="font-bold underline">Expected Overage Calculator</Link> in Overage Alerts.
        </CardContent>
      </Card>
      <ModelIO
        inputs={['EJ reject events', 'Cassette purge logs', 'FLM ticket reason codes', 'Counter deltas pre/post visit']}
        outputs={[{ k: 'estimated_stuck_₹', v: '7,500' }, { k: 'cassette_id', v: 'C2' }, { k: 'confidence', v: '0.91' }]}
      />
    </div>
  );
};

// ML-6 OCR Pipeline
const OCRPipeline: React.FC = () => {
  const stages = ['Capture', 'On-device crop/BW', 'Compress 90%', 'Extract', 'Validate'];
  const jobs = [
    ['EOD receipt', 97.4, 'Pass', 'TRIP-4421'],
    ['Bank slip', 96.1, 'Pass', 'TRIP-4422'],
    ['Admin screen', 91.0, 'Pass', 'TRIP-4423'],
    ['Bank slip', 72.5, 'Fail', 'TRIP-4424'],
    ['EOD receipt', 95.8, 'Pass', 'TRIP-4425'],
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={ScanText} title="OCR Pipeline" sub="ML-6 · On-device cleaning · Server-side validation" />
      <Card className="border-slate-200">
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-2">
            {stages.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 px-2 py-2 rounded bg-blue-50 border border-blue-200 text-center text-[11px] font-medium text-blue-800">{s}</div>
                {i < stages.length - 1 && <div className="text-blue-400">→</div>}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-3 gap-3">
        {[['7d accuracy', '96.2%'], ['Jobs (7d)', '1,240'], ['Failures', '47']].map((k, i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-3">
              <div className="text-[10px] uppercase text-slate-500">{k[0]}</div>
              <div className="text-2xl font-bold text-slate-900">{k[1]}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-slate-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Recent jobs</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[10px]">Doc type</TableHead><TableHead className="text-[10px] text-right">OCR confidence %</TableHead>
              <TableHead className="text-[10px]">Status</TableHead><TableHead className="text-[10px]">Linked trip</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {jobs.map((j, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell>{j[0]}</TableCell>
                  <TableCell className="text-right font-mono">{j[1]}</TableCell>
                  <TableCell><Badge className={`text-[10px] ${j[2] === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{j[2]}</Badge></TableCell>
                  <TableCell className="font-mono">{j[3]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ModelIO
        inputs={['Phone capture image', 'Doc type classifier output', 'Counter/sanction reference for cross-check']}
        outputs={[{ k: 'extracted_amount_₹', v: '6,00,000' }, { k: 'ocr_confidence_%', v: '96.1' }, { k: 'validation_pass', v: 'true' }]}
      />
    </div>
  );
};

// ML-7 Overage Inference
const OverageInference: React.FC = () => {
  const queue = [
    ['ATM-AMD-0001', 12500, 7500, 5000, 0, 'High'],
    ['ATM-MUM-0001', 9800, 4500, 5300, 0, 'High'],
    ['ATM-DEL-0102', 16200, 12000, 4200, 0, 'Critical'],
    ['ATM-PUN-0019', 5400, 0, 5400, 0, 'Medium'],
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={Target} title="Overage Inference" sub="ML-7 · Severity-ranked queue · Pushed to Overage Alerts" />
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[10px]">ATM</TableHead>
              <TableHead className="text-[10px] text-right">Target overage ₹</TableHead>
              <TableHead className="text-[10px] text-right">FLM</TableHead>
              <TableHead className="text-[10px] text-right">Claim</TableHead>
              <TableHead className="text-[10px] text-right">Prior</TableHead>
              <TableHead className="text-[10px]">Severity</TableHead>
              <TableHead className="text-[10px]">Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {queue.map((q, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="font-mono font-bold">{q[0]}</TableCell>
                  <TableCell className="text-right font-bold">{fmtINR(q[1] as number)}</TableCell>
                  <TableCell className="text-right">{fmtINR(q[2] as number)}</TableCell>
                  <TableCell className="text-right">{fmtINR(q[3] as number)}</TableCell>
                  <TableCell className="text-right">{fmtINR(q[4] as number)}</TableCell>
                  <TableCell><Badge className={`text-[10px] ${q[5] === 'Critical' ? 'bg-red-100 text-red-700' : q[5] === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{q[5]}</Badge></TableCell>
                  <TableCell>
                    <Link to="/cms-overage-alerts"><Button size="sm" variant="outline" className="h-6 text-[10px]">Open</Button></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ModelIO
        inputs={['FLM event ledger', 'Open customer claims', 'Prior unresolved overages', 'Three-way variance']}
        outputs={[{ k: 'target_overage_₹', v: '12,500' }, { k: 'severity_score', v: '0.81' }, { k: 'rules_first', v: 'true' }]}
      />
    </div>
  );
};

// ML-8 Triangulation
const Triangulation: React.FC = () => {
  return (
    <div className="space-y-3">
      <SectionTitle icon={Network} title="Triangulation Assist" sub="ML-8 · Dispute resolution · Auto-evidence package" />
      <Card className="border-slate-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Sample dispute · CMS-02435512</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-2 mb-3">
            {[['Bank Switch', '₹5,000 debited', '14:22 IST'], ['Machine EJ', '₹0 dispensed', '14:22 IST · purge event'], ['Field count', 'Surplus +₹5,000', 'Cassette C2']].map((c, i) => (
              <div key={i} className="border border-slate-200 rounded p-2">
                <div className="text-[10px] uppercase text-slate-500">{c[0]}</div>
                <div className="text-sm font-bold">{c[1]}</div>
                <div className="text-[10px] text-slate-500">{c[2]}</div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-[12px]">
            <span className="font-bold text-emerald-800">Suggested root cause:</span> Partial dispense — purge during transaction · <span className="font-mono">match_confidence: 91%</span>
          </div>
          <div className="mt-3">
            <div className="text-[10px] uppercase text-slate-500 mb-1">Evidence package manifest</div>
            <ul className="text-[11px] space-y-0.5">
              {['EJ.txt (machine log)', 'switch_response.html', 'cassette_seal.jpg', 'custodian_declaration.pdf', 'customer_claim_form.pdf'].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> <code className="font-mono text-[10px]">{f}</code></li>
              ))}
            </ul>
            <Button size="sm" className="mt-2 h-7 text-[11px]" onClick={() => toast.success('Evidence package exported (mock)')}>
              <FileDown className="h-3 w-3 mr-1" /> Export Evidence Package
            </Button>
          </div>
        </CardContent>
      </Card>
      <ModelIO
        inputs={['EJ raw log', 'Switch host response', 'Field count after FLM', 'Customer claim form text']}
        outputs={[{ k: 'suggested_root_cause', v: 'partial_dispense' }, { k: 'match_confidence', v: '0.91' }, { k: 'evidence_files', v: '5' }]}
      />
    </div>
  );
};

// ML-9 Cluster Stress
const ClusterStress: React.FC = () => {
  const cluster = [
    [null, 'OOC', null],
    ['Online', 'ATM-AMD-0001', 'Jam'],
    ['Online', 'Online', 'OOC'],
  ];
  const cityHeat = [
    ['Ahmedabad', 0.72, 'bg-red-500'],
    ['Mumbai-W', 0.61, 'bg-orange-500'],
    ['Delhi-S', 0.58, 'bg-orange-400'],
    ['Pune-E', 0.41, 'bg-amber-400'],
    ['Bengaluru-N', 0.32, 'bg-emerald-400'],
    ['Chennai-C', 0.22, 'bg-emerald-500'],
  ];
  return (
    <div className="space-y-3">
      <SectionTitle icon={RadarIcon} title="Cluster Stress" sub="ML-9 · 6-neighbor micro-cluster · Input feature, not standalone product" />
      <div className="grid lg:grid-cols-2 gap-3">
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">ATM-AMD-0001 · neighbor mini-grid</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-1.5">
              {cluster.flat().map((c, i) => {
                if (!c) return <div key={i} />;
                const center = c === 'ATM-AMD-0001';
                const tone = c === 'OOC' ? 'bg-red-100 text-red-700 border-red-300'
                  : c === 'Jam' ? 'bg-amber-100 text-amber-700 border-amber-300'
                  : center ? 'bg-blue-100 text-blue-800 border-blue-400 font-bold'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300';
                return <div key={i} className={`text-[10px] border rounded p-2 text-center ${tone}`}>{c}</div>;
              })}
            </div>
            <div className="mt-3 text-[12px]">
              <code className="font-mono text-blue-700">neighbor_stress_index:</code> <span className="font-bold">0.72</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Input feature to DRS and Demand models — not a separate product.</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">City heatmap</CardTitle></CardHeader>
          <CardContent className="space-y-1.5">
            {cityHeat.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-24 text-[11px]">{c[0]}</div>
                <div className="flex-1 h-3 bg-slate-100 rounded">
                  <div className={`h-3 rounded ${c[2]}`} style={{ width: `${(c[1] as number) * 100}%` }} />
                </div>
                <div className="w-10 text-right text-[10px] font-mono">{c[1]}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <ModelIO
        inputs={['Real-time ATM status (Online/OOC/Jam)', 'Geo-distance matrix', 'Footfall proxy from txn rate']}
        outputs={[{ k: 'neighbor_stress_index', v: '0.72' }, { k: 'cluster_size', v: '6' }, { k: 'failover_load', v: '+34%' }]}
      />
    </div>
  );
};

// ML-10 NLP Intake
const NLPIntake: React.FC = () => {
  return (
    <div className="space-y-3">
      <SectionTitle icon={MessageSquare} title="MSP Intake NLP" sub="ML-10 · Email/WhatsApp → structured indent revision" />
      <div className="grid md:grid-cols-2 gap-3">
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Inbound message</CardTitle></CardHeader>
          <CardContent>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-[11px] font-mono whitespace-pre-wrap text-slate-700">
{`From: msp-ops@vendor.in
Subject: Indent revision — Surat cluster

Hi team,
Pls revise indent for ATM-AMD-0001 from 10L to 6L for tomorrow.
Bank shortfall at branch — only 6L disbursed.
Also keep ATM-AMD-0014 at planned 8L.
Thanks.`}
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Parsed structured output</CardTitle></CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-emerald-300 rounded p-3 text-[10px] font-mono whitespace-pre overflow-auto">
{`[
  {
    "atm_id": "ATM-AMD-0001",
    "old_₹": 1000000,
    "new_₹": 600000,
    "reason": "bank_shortfall"
  }
]
duplicate_detected: false
applied_via: structured_revision`}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-red-50 border border-red-200 rounded p-2">
                <div className="text-[10px] uppercase text-red-700">Before</div>
                <div className="font-bold text-red-800">Email bypass</div>
                <div className="text-[10px]">Untracked, no audit</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-2">
                <div className="text-[10px] uppercase text-emerald-700">After</div>
                <div className="font-bold text-emerald-800">Structured revision</div>
                <div className="text-[10px]">PDF + audit trail</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ModelIO
        inputs={['Email/WhatsApp text', 'ATM ID dictionary', 'Reason code taxonomy']}
        outputs={[{ k: 'parsed_revisions[]', v: '1' }, { k: 'duplicate_detected', v: 'false' }, { k: 'pdf_generated', v: 'true' }]}
      />
    </div>
  );
};

/* ---------------- Main page ---------------- */

const TABS = [
  { id: 'drs', label: 'DRS Explorer', sub: 'ML-1', icon: Gauge, comp: <DRSExplorer /> },
  { id: 'modes', label: 'Risk Modes', sub: 'ML-2', icon: Layers, comp: <RiskModes /> },
  { id: 'demand', label: 'Demand Forecast', sub: 'ML-3', icon: LineIcon, comp: <DemandForecast /> },
  { id: 'mismatch', label: 'Mismatch Watch', sub: 'ML-4', icon: Activity, comp: <MismatchWatch /> },
  { id: 'stuck', label: 'Stuck Cash', sub: 'ML-5', icon: MapPin, comp: <StuckCash /> },
  { id: 'ocr', label: 'OCR Pipeline', sub: 'ML-6', icon: ScanText, comp: <OCRPipeline /> },
  { id: 'overage', label: 'Overage Inference', sub: 'ML-7', icon: Target, comp: <OverageInference /> },
  { id: 'triangulation', label: 'Triangulation', sub: 'ML-8', icon: Network, comp: <Triangulation /> },
  { id: 'cluster', label: 'Cluster Stress', sub: 'ML-9', icon: RadarIcon, comp: <ClusterStress /> },
  { id: 'nlp', label: 'MSP Intake NLP', sub: 'ML-10', icon: MessageSquare, comp: <NLPIntake /> },
];

const CMSAIRiskRadar: React.FC = () => {
  const [active, setActive] = useState('drs');
  const tab = TABS.find(t => t.id === active)!;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <CMSModuleNav />
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 pt-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-blue-600 text-white"><RadarIcon className="h-4 w-4" /></div>
              <h1 className="text-xl font-bold text-slate-900">AI &amp; Predictive Risk Radar</h1>
              <Badge className="bg-blue-100 text-blue-700 text-[10px]">DiscvrAI Engine</Badge>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Unified ML Engine · 10 Interventions · 1 Score (DRS) · 129 Vaults · 3,000 Routes · 70,000 ATMs
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]"><Cpu className="h-3 w-3 mr-1" /> XGBoost · drs-v3.2</Badge>
            <Badge variant="outline" className="text-[10px]"><Sparkles className="h-3 w-3 mr-1" /> Rules + Models</Badge>
            <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">Updated 08:42 IST</Badge>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
          {[
            ['Models live', '10/10', 'text-blue-700'],
            ['ATMs scored', '70,000', 'text-slate-900'],
            ['High-DRS today', '127', 'text-red-600'],
            ['Cashouts prevented (MTD)', '47', 'text-emerald-600'],
            ['Penalties avoided (QTD)', '₹8.3 L', 'text-emerald-600'],
          ].map((s, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-2">
                <div className="text-[9px] uppercase tracking-wide text-slate-500">{s[0]}</div>
                <div className={`text-base font-bold ${s[2]}`}>{s[1]}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Layout: left tabs + main */}
        <div className="grid grid-cols-12 gap-3 pb-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="border-slate-200">
              <CardContent className="p-2 space-y-1">
                {TABS.map(t => {
                  const Icon = t.icon;
                  const isActive = t.id === active;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActive(t.id)}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-[11px] transition-colors ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium leading-tight">{t.label}</div>
                        <div className={`text-[9px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>{t.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {tab.comp}

            {/* Footer cross-links */}
            <Card className="border-slate-200 mt-4">
              <CardContent className="p-3">
                <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">Cross-module links</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['Data Lake', '/cms-data-lake'],
                    ['Indent Engine', '/cms-indent-engine'],
                    ['Overage Alerts', '/cms-overage-alerts'],
                    ['Recon Center', '/cms-recon-center'],
                    ['Audit Guardian', '/cms-audit-command'],
                    ['Vault Ops', '/cms-vault-ops'],
                  ].map(([l, p]) => (
                    <Link key={p} to={p}>
                      <Button variant="outline" size="sm" className="h-7 text-[11px]"><Workflow className="h-3 w-3 mr-1" />{l}</Button>
                    </Link>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                  Single ML catalogue powers Reconciliation (WS1) and Audit (WS2). Rules (RW4) consume scores. Representative UI · Illustrative data.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSAIRiskRadar;
