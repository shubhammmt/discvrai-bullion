import React, { useState, useMemo } from 'react';
import CMSModuleNav from '@/components/cms-shared/CMSModuleNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Bell, AlertTriangle, CheckCircle2, Clock, Lock, ShieldAlert, Smartphone,
  TrendingDown, TrendingUp, Calculator, FileDown, User
} from 'lucide-react';

const ATMS = [
  { id: 'ATM-AMD-0001', bank: 'ICICI', region: 'West', hub: 'Ahmedabad', custodian: 'Vikram Meena', route: 'AMD-W-04',
    flmJam: 7500, claim: 5000, prior: 0, status: 'Awaiting custodian declaration', mismatch: false },
  { id: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', hub: 'Mumbai', custodian: 'Suresh Patil', route: 'MUM-W-07',
    flmJam: 4200, claim: 8000, prior: 1500, status: 'Mismatch — escalated', mismatch: true },
  { id: 'ATM-DEL-0102', bank: 'SBI', region: 'North', hub: 'Delhi', custodian: 'Manoj Kumar', route: 'DEL-S-03',
    flmJam: 12000, claim: 0, prior: 0, status: 'Declared match', mismatch: false },
  { id: 'ATM-PUN-0019', bank: 'Axis', region: 'West', hub: 'Pune', custodian: 'Rohit Kapoor', route: 'PUN-E-01',
    flmJam: 3500, claim: 2000, prior: 0, status: 'Awaiting custodian declaration', mismatch: false },
  { id: 'ATM-BLR-0055', bank: 'Kotak', region: 'South', hub: 'Bengaluru', custodian: 'Ravi Shankar', route: 'BLR-E-02',
    flmJam: 0, claim: 6500, prior: 2200, status: 'Mismatch — escalated', mismatch: true },
  { id: 'ATM-HYD-0044', bank: 'PNB', region: 'South', hub: 'Hyderabad', custodian: 'Deepak Joshi', route: 'HYD-N-04',
    flmJam: 9800, claim: 1200, prior: 0, status: 'Declared match', mismatch: false },
];

const TPLUS5 = [
  { id: 'BQ-22841', atm: 'ATM-AMD-0001', bank: 'ICICI', amount: 12500, hoursLeft: 18 },
  { id: 'BQ-22847', atm: 'ATM-MUM-0001', bank: 'HDFC', amount: 13700, hoursLeft: 41 },
  { id: 'BQ-22855', atm: 'ATM-BLR-0055', bank: 'Kotak', amount: 8700, hoursLeft: 9 },
  { id: 'BQ-22862', atm: 'ATM-DEL-0102', bank: 'SBI', amount: 15400, hoursLeft: 72 },
  { id: 'BQ-22871', atm: 'ATM-HYD-0044', bank: 'PNB', amount: 6200, hoursLeft: 56 },
];

const fmtINR = (v: number) => `₹${v.toLocaleString('en-IN')}`;

const CMSOverageAlerts = () => {
  const [selected, setSelected] = useState(ATMS[0].id);
  const [tab, setTab] = useState<'bm' | 'cust'>('bm');
  const atm = useMemo(() => ATMS.find(a => a.id === selected)!, [selected]);
  const total = atm.flmJam + atm.claim + atm.prior;

  return (
    <div className="min-h-screen bg-slate-50">
      <CMSModuleNav />

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-white p-2 rounded-lg"><Bell className="h-5 w-5" /></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Preemptive Overage & Recovery</h1>
              <p className="text-[11px] text-slate-500">FLM + Claims → Expected Overage · T+5 Bank Queries · OTC Enforcement · 129 Vaults · 70,000 ATMs</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] gap-1"><ShieldAlert className="h-3 w-3 text-amber-600" /> RW3 — Overage Intelligence</Badge>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Column 1 — Calculator */}
        <section className="lg:col-span-5 space-y-3">
          <Card className="border-slate-200 bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-amber-600" /> Expected Overage Calculator
                </CardTitle>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger className="h-7 w-[160px] text-[11px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ATMS.map(a => <SelectItem key={a.id} value={a.id} className="text-[11px]">{a.id}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="text-center py-3 rounded-lg bg-white border border-amber-200">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Target Overage</div>
                <div className="text-4xl font-bold text-amber-700">{fmtINR(total)}</div>
                <div className="text-[11px] text-slate-600 mt-1">{atm.bank} · {atm.hub} · Custodian {atm.custodian}</div>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'FLM jam (Apr 11)', val: atm.flmJam },
                  { label: 'Customer claim CMS-02435512', val: atm.claim },
                  { label: 'Prior unresolved', val: atm.prior },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-xs px-2 py-1.5 bg-white rounded border border-slate-100">
                    <span className="text-slate-600">{r.label}</span>
                    <span className="font-mono font-bold text-slate-900">{fmtINR(r.val)}</span>
                  </div>
                ))}
              </div>
              <div className={`text-[11px] px-3 py-2 rounded-lg border font-medium ${
                atm.mismatch ? 'bg-red-50 text-red-700 border-red-200' : atm.status === 'Declared match' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                Status: {atm.status}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Lifecycle</div>
                <div className="flex items-center gap-1 overflow-x-auto">
                  {['Alert created', 'BM notified', 'Custodian reminded', 'Visit', 'Declaration'].map((s, i) => (
                    <React.Fragment key={s}>
                      <div className={`px-2 py-1 rounded text-[10px] whitespace-nowrap ${i <= 2 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>{s}</div>
                      {i < 4 && <div className="h-px w-2 bg-slate-300" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-900">Recovery outcomes — last 7 days</CardTitle></CardHeader>
            <CardContent className="pt-0 grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-[10px] text-emerald-700 uppercase tracking-wider">Inferred vs Declared</div>
                <div className="text-xl font-bold text-emerald-800">94%</div>
                <div className="text-[10px] text-emerald-600 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +6 pts WoW</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-[10px] text-blue-700 uppercase tracking-wider">Penalties avoided</div>
                <div className="text-xl font-bold text-blue-800">₹8.3 L</div>
                <div className="text-[10px] text-blue-600 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Harmonizing −38%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-[10px] text-amber-800 uppercase tracking-wider">OTC locks issued</div>
                <div className="text-xl font-bold text-amber-900">11</div>
                <div className="text-[10px] text-amber-700">Routes held · 4 cleared</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Column 2 — Alert feeds */}
        <section className="lg:col-span-4">
          <Card className="border-slate-200 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-900">Alert Feeds</CardTitle>
              <Tabs value={tab} onValueChange={v => setTab(v as any)}>
                <TabsList className="h-8">
                  <TabsTrigger value="bm" className="text-[11px]">Branch Manager</TabsTrigger>
                  <TabsTrigger value="cust" className="text-[11px]">Custodian (mobile)</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 max-h-[560px] overflow-auto">
              {tab === 'bm' && ATMS.map(a => (
                <div key={a.id} className="p-3 rounded-lg border border-slate-200 bg-white hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{a.id}</div>
                      <div className="text-[10px] text-slate-500">{a.bank} · {a.hub} · Route {a.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-700">{fmtINR(a.flmJam + a.claim + a.prior)}</div>
                      <div className="text-[10px] text-slate-500">expected</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 mb-2 flex items-center gap-1"><User className="h-3 w-3" /> {a.custodian}</div>
                  <div className="flex gap-1.5">
                    <Button size="sm" className="h-6 text-[10px] flex-1 bg-slate-900 hover:bg-slate-800" onClick={() => toast.success(`Notified custodian ${a.custodian}`)}>Notify</Button>
                    <Button size="sm" variant="outline" className="h-6 text-[10px] flex-1" onClick={() => toast(`Acknowledged ${a.id}`)}>Acknowledge</Button>
                  </div>
                </div>
              ))}
              {tab === 'cust' && ATMS.slice(0, 4).map(a => (
                <div key={a.id} className="p-3 rounded-2xl border border-slate-300 bg-slate-900 text-white shadow-md">
                  <div className="flex items-center gap-2 mb-2 text-[10px] text-slate-300"><Smartphone className="h-3 w-3" /> CMS Custodian App · {a.custodian}</div>
                  <div className="text-xs font-bold mb-1">Overage expected at {a.id}</div>
                  <div className="text-[11px] text-slate-300 mb-2">Declare accurately before CBR close — {fmtINR(a.flmJam + a.claim + a.prior)}</div>
                  {a.mismatch && (
                    <div className="text-[10px] bg-red-500/20 text-red-200 border border-red-500/40 rounded px-2 py-1 mb-2 flex items-center gap-1">
                      <Lock className="h-3 w-3" /> OTC Lock: Next ATM locked until overage explained — Route hold active
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    <Button size="sm" className="h-6 text-[10px] flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900" onClick={() => toast.success(`Declared ₹${a.flmJam + a.claim + a.prior}`)}>Declare Overage</Button>
                    <Button size="sm" variant="outline" className="h-6 text-[10px] flex-1 border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700" onClick={() => toast(`Sent to supervisor queue`)}>No Overage</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Column 3 — T+5 + harmonizing */}
        <section className="lg:col-span-3 space-y-3">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Clock className="h-4 w-4 text-red-600" /> T+5 Bank Queries</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow><TableHead className="text-[10px]">Query</TableHead><TableHead className="text-[10px]">Amount</TableHead><TableHead className="text-[10px]">SLA</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {TPLUS5.map(q => (
                    <TableRow key={q.id} className="text-xs">
                      <TableCell className="py-1.5">
                        <div className="font-mono font-bold text-slate-900 text-[11px]">{q.id}</div>
                        <div className="text-[10px] text-slate-500">{q.atm} · {q.bank}</div>
                      </TableCell>
                      <TableCell className="py-1.5 font-mono font-bold text-[11px]">{fmtINR(q.amount)}</TableCell>
                      <TableCell className="py-1.5">
                        <Badge className={`text-[10px] ${q.hoursLeft < 24 ? 'bg-red-600 text-white animate-pulse' : q.hoursLeft < 48 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {q.hoursLeft}h left
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-red-50/40">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-red-800">Harmonizing Penalties · QTD</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-3xl font-bold text-red-700">₹4.2 L</div>
              <div className="text-[11px] text-red-600 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> −22% vs prior quarter</div>
              <div className="text-[10px] text-slate-600 pt-1 border-t border-red-200">
                Top 3 causes:
                <ol className="list-decimal list-inside mt-1 space-y-0.5">
                  <li>Late EOD declaration (47%)</li>
                  <li>Custodian under-reporting (28%)</li>
                  <li>Bank query non-response &gt;T+5 (25%)</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-amber-600" /> Non-Declaration Detected</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px]">
                <div className="font-bold text-amber-900">ATM-BLR-0055 · Custodian Ravi Shankar</div>
                <div className="text-amber-700 mt-1">Cleared alert without scan — flagged to Supervisor (Audit-Q-1148)</div>
                <Button size="sm" variant="outline" className="h-6 text-[10px] mt-2 border-amber-300" onClick={() => toast.success('Evidence package bundled')}>
                  <FileDown className="h-3 w-3 mr-1" /> Evidence Pack
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="max-w-[1600px] mx-auto px-4 py-3 text-[10px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> RW3 closed: Expected Overage · OTC Lock · T+5 Countdown</div>
        <div>Representative UI · Illustrative data · Not production CMS systems</div>
      </footer>
    </div>
  );
};

export default CMSOverageAlerts;
