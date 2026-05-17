import React from 'react';
import CMSModuleNav from '@/components/cms-shared/CMSModuleNav';
import CMSBusinessOutcome from '@/components/cms-shared/CMSBusinessOutcome';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import {
  PackageSearch, Sun, Banknote, Camera, FileCheck2, Truck, ShieldCheck,
  CalendarDays, AlertTriangle, ArrowRight, Activity, MailX
} from 'lucide-react';

const fmtINR = (v: number) => `₹${v.toLocaleString('en-IN')}`;

const stepperSteps = [
  { icon: Activity, title: 'Night VCB', sub: '₹42.5 Cr available', meta: 'tentative · counting 78%', tone: 'slate' },
  { icon: Sun, title: 'Morning tentative indent', sub: '70,000 ATMs · ₹318 Cr planned', meta: 'HO published 06:00', tone: 'blue' },
  { icon: Banknote, title: 'Bank withdrawal', sub: 'Sanctioned ₹10L · Disbursed ₹6L', meta: 'ICICI Surat · 08:42', tone: 'red' },
  { icon: Camera, title: 'OCR slip capture', sub: 'On-device extraction · 96% conf', meta: 'Cashier K.Mehta', tone: 'amber' },
  { icon: FileCheck2, title: 'Auto-revised indent', sub: '₹6,00,000 · PDF generated', meta: 'Attached slip proof', tone: 'emerald' },
  { icon: Truck, title: 'e-CMO / trip sync', sub: 'Custodian app refreshed', meta: '06:42 · Trip 4421', tone: 'emerald' },
];

const calendar = (() => {
  const days: { d: number; chip?: string; tone?: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    let chip: string | undefined; let tone: string | undefined;
    if (i === 25) { chip = 'Payday'; tone = 'red'; }
    else if (i === 1) { chip = 'Salary'; tone = 'red'; }
    else if (i === 14) { chip = 'Diwali (W)'; tone = 'amber'; }
    else if (i === 26) { chip = 'Republic Day'; tone = 'blue'; }
    days.push({ d: i, chip, tone });
  }
  return days;
})();

const cashout = [
  { atm: 'ATM-AMD-0001', bank: 'ICICI', bal: 280000, churn: -32, neighbor: 'High', forecast: '08h to cash-out', action: 'Prepone load' },
  { atm: 'ATM-MUM-0001', bank: 'HDFC', bal: 540000, churn: -12, neighbor: 'Med', forecast: '22h to cash-out', action: 'Hold' },
  { atm: 'ATM-DEL-0102', bank: 'SBI', bal: 120000, churn: -48, neighbor: 'High', forecast: '04h to cash-out', action: 'Prepone load' },
  { atm: 'ATM-PUN-0019', bank: 'Axis', bal: 880000, churn: 6, neighbor: 'Low', forecast: '36h to cash-out', action: 'Hold' },
  { atm: 'ATM-BLR-0055', bank: 'Kotak', bal: 320000, churn: -22, neighbor: 'Med', forecast: '14h to cash-out', action: 'Prepone load' },
  { atm: 'ATM-HYD-0044', bank: 'PNB', bal: 410000, churn: -5, neighbor: 'Low', forecast: '28h to cash-out', action: 'Hold' },
];

const CMSIndentEngine = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <CMSModuleNav />

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><PackageSearch className="h-5 w-5" /></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Indent & Replenishment Engine</h1>
              <p className="text-[11px] text-slate-500">Tentative → Revised · VCB · Bank slip OCR · Cash-out forecast</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] gap-1"><ShieldCheck className="h-3 w-3 text-emerald-600" /> RW5 — Indent Automation</Badge>
        </div>
      </header>

      {/* KPIs */}
      <div className="max-w-[1600px] mx-auto px-4 pt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-slate-200"><CardContent className="p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500">Indent Accuracy (7d)</div><div className="text-2xl font-bold text-emerald-700">91%</div><div className="text-[10px] text-emerald-600">+4 pts WoW</div></CardContent></Card>
        <Card className="border-slate-200"><CardContent className="p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500">Cash-outs Prevented (MTD)</div><div className="text-2xl font-bold text-blue-700">47</div><div className="text-[10px] text-blue-600">≈ ₹62 L revenue protected</div></CardContent></Card>
        <Card className="border-slate-200 bg-emerald-50/40"><CardContent className="p-3"><div className="text-[10px] uppercase tracking-wider text-emerald-700 flex items-center gap-1"><MailX className="h-3 w-3" /> Email Bypass Incidents</div><div className="text-2xl font-bold text-emerald-700">0 <span className="text-[10px] font-normal text-slate-400 line-through ml-1">12 prior</span></div><div className="text-[10px] text-emerald-600">target met</div></CardContent></Card>
        <Card className="border-slate-200"><CardContent className="p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500">VCB · Live Vault Balance</div><div className="text-2xl font-bold text-slate-900">₹42.5 Cr</div><div className="text-[10px] text-amber-600">tentative · firms by 09:00</div></CardContent></Card>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 py-4 space-y-4">
        {/* Stepper */}
        <Card className="border-slate-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-900">Tentative → Revised — One Indent Story (ICICI Surat · ATM-AMD-0001)</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
              {stepperSteps.map((s, i) => {
                const Icon = s.icon;
                const tones: Record<string, string> = {
                  slate: 'bg-slate-100 border-slate-200 text-slate-700',
                  blue: 'bg-blue-50 border-blue-200 text-blue-700',
                  red: 'bg-red-50 border-red-200 text-red-700',
                  amber: 'bg-amber-50 border-amber-200 text-amber-700',
                  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                };
                return (
                  <div key={i} className={`p-2.5 rounded-lg border ${tones[s.tone]}`}>
                    <div className="flex items-center gap-1.5 mb-1.5"><Icon className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-wider">Step {i + 1}</span></div>
                    <div className="text-xs font-bold text-slate-900">{s.title}</div>
                    <div className="text-[11px] text-slate-700 mt-0.5">{s.sub}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{s.meta}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span><strong>Email bypass prevented</strong> — revision happened in-system; e-CMO and custodian app updated automatically.</span>
              <Button size="sm" variant="outline" className="h-6 text-[10px] ml-auto border-emerald-300" onClick={() => toast.success('Audit trail exported')}>Export trail</Button>
            </div>
          </CardContent>
        </Card>

        {/* Two-col: Calendar + Cash-out forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Trigger calendar */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-blue-600" /> Trigger Calendar — April</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-7 gap-1 text-[10px]">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="text-center text-slate-400 font-bold">{d}</div>)}
                {calendar.map(c => (
                  <div key={c.d} className={`aspect-square flex flex-col items-center justify-center rounded border ${
                    c.tone === 'red' ? 'bg-red-50 border-red-200' :
                    c.tone === 'amber' ? 'bg-amber-50 border-amber-200' :
                    c.tone === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'
                  }`}>
                    <div className="text-[10px] font-bold text-slate-700">{c.d}</div>
                    {c.chip && <div className={`text-[8px] leading-none mt-0.5 px-1 py-0.5 rounded text-white ${c.tone === 'red' ? 'bg-red-500' : c.tone === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`}>{c.chip}</div>}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-slate-500">Festival / payday triggers boost forecast badges in cash-out table.</div>
            </CardContent>
          </Card>

          {/* Cash-out risk forecast */}
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-amber-600" /> Cash-Out Risk Forecast</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px]">ATM</TableHead>
                    <TableHead className="text-[10px]">Bank</TableHead>
                    <TableHead className="text-[10px] text-right">Balance</TableHead>
                    <TableHead className="text-[10px] text-right">Churn vs plan</TableHead>
                    <TableHead className="text-[10px]">Neighbor</TableHead>
                    <TableHead className="text-[10px]">Forecast</TableHead>
                    <TableHead className="text-[10px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashout.map(r => (
                    <TableRow key={r.atm} className="text-xs">
                      <TableCell className="py-1.5 font-mono font-bold">{r.atm}</TableCell>
                      <TableCell className="py-1.5">{r.bank}</TableCell>
                      <TableCell className="py-1.5 text-right font-mono">{fmtINR(r.bal)}</TableCell>
                      <TableCell className={`py-1.5 text-right font-mono ${r.churn < -20 ? 'text-red-600 font-bold' : r.churn < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{r.churn}%</TableCell>
                      <TableCell className="py-1.5">
                        <Badge className={`text-[10px] ${r.neighbor === 'High' ? 'bg-red-100 text-red-700' : r.neighbor === 'Med' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.neighbor}</Badge>
                      </TableCell>
                      <TableCell className="py-1.5 text-slate-700">{r.forecast}</TableCell>
                      <TableCell className="py-1.5">
                        <Button size="sm" className={`h-6 text-[10px] ${r.action === 'Prepone load' ? 'bg-amber-500 hover:bg-amber-400 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`} onClick={() => toast.success(`${r.action} queued for ${r.atm}`)}>
                          {r.action} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* VCB widget */}
        <Card className="border-slate-200 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-blue-200">Live Vault Cash Balance</div>
              <div className="text-3xl font-bold">₹42.5 Cr</div>
              <div className="text-[11px] text-blue-200 mt-1">Tentative · counting 78% · firms up by 09:00</div>
            </div>
            <div className="md:col-span-2">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400" style={{ width: '78%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-blue-200 mt-1">
                <span>00:00 PV start</span>
                <span>06:00 indent published</span>
                <span>09:00 firm count</span>
              </div>
              <div className="mt-2 text-[11px] text-blue-100">
                Morning indent built on approximate utilization — firm count ties closes the loop with bank disbursement and OCR proof. Velocity grounded in machine-counter feeds.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer integration chips */}
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <span className="text-slate-500">Integrations:</span>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => toast('Open Vault Ops')}>Open in Vault Ops</Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => toast('Open Data Lake')}>View ATM in Data Lake</Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => toast('Open Overage Alerts')}>Cross-check overage</Button>
        </div>
      </main>

      <footer className="max-w-[1600px] mx-auto px-4 py-3 text-[10px] text-slate-400 text-right">Representative UI · Illustrative data</footer>
    </div>
  );
};

export default CMSIndentEngine;
