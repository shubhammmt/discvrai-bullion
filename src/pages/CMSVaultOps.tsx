import React, { useState } from 'react';
import CMSModuleNav from '@/components/cms-shared/CMSModuleNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Vault, ChevronRight, FileScan, Box, Lock, Camera, CheckCircle2, AlertTriangle,
  Eye, Truck, BadgeCheck, FileDown
} from 'lucide-react';

const fmtINR = (v: number) => `₹${v.toLocaleString('en-IN')}`;

const tree = [
  { region: 'West', vaults: ['Mumbai Central', 'Pune Hinjewadi', 'Ahmedabad Naroda'] },
  { region: 'North', vaults: ['Delhi Okhla', 'Jaipur Sitapura'] },
  { region: 'South', vaults: ['Bengaluru Whitefield', 'Hyderabad Uppal'] },
];

const ledger = [
  { ts: '06:14:22', event: 'PV Count', actor: 'Vault Officer · A. Joshi', amount: 42500000, denom: '500/200/100', seal: '—', status: 'Verified' },
  { ts: '06:42:08', event: 'Open Cash Entry', actor: 'Counter 3 · K. Mehta', amount: 6000000, denom: '500', seal: '—', status: 'Verified' },
  { ts: '07:18:55', event: 'Sealed Box Register', actor: 'Counter 3 · K. Mehta', amount: 0, denom: '—', seal: 'BX-7741-Q', status: 'Sealed (contents not visible)' },
  { ts: '07:51:12', event: 'Dispatch to CIT', actor: 'Trip 4421 · Custodian S. Patil', amount: 0, denom: '—', seal: 'BX-7741-Q', status: 'In transit' },
  { ts: '12:08:33', event: 'Return from route', actor: 'Trip 4418 · Custodian R. Kapoor', amount: 1850000, denom: 'mixed', seal: 'BX-7733-A', status: 'Reconciled' },
];

const trips = [
  { id: 'TRP-4421', custodian: 'S. Patil', indent: 12500000, cassettes: 4, seals: ['SL-A91', 'SL-A92', 'SL-A93', 'SL-A94'], status: 'In transit' },
  { id: 'TRP-4418', custodian: 'R. Kapoor', indent: 8800000, cassettes: 4, seals: ['SL-B11', 'SL-B12', 'SL-B13', 'SL-B14'], status: 'Returned' },
  { id: 'TRP-4422', custodian: 'V. Meena', indent: 15400000, cassettes: 4, seals: ['SL-C01', 'SL-C02', 'SL-C03', 'SL-C04'], status: 'Dispatched' },
];

const denoms = [
  { d: '₹500', cnt: 1200, val: 600000 },
  { d: '₹200', cnt: 800, val: 160000 },
  { d: '₹100', cnt: 400, val: 40000 },
];

const CMSVaultOps = () => {
  const [tab, setTab] = useState<'ledger' | 'ecmo' | 'ocr' | 'opencash'>('ledger');
  const [asIs, setAsIs] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <CMSModuleNav />

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg"><Vault className="h-5 w-5" /></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Vault Operations — Digital Ledger</h1>
              <p className="text-[11px] text-slate-500">Main Vault → Sub-Vault → Processing · e-CMO · OCR Evidence · 129 Vaults</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <span className={asIs ? 'font-bold text-red-600' : 'text-slate-400'}>As-Is (paper)</span>
              <Switch checked={!asIs} onCheckedChange={v => setAsIs(!v)} />
              <span className={!asIs ? 'font-bold text-emerald-600' : 'text-slate-400'}>Target (digital)</span>
            </div>
            <Badge variant="outline" className="text-[10px] gap-1"><BadgeCheck className="h-3 w-3 text-emerald-600" /> RW2 — Vault Automation</Badge>
          </div>
        </div>
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 pb-2 flex items-center gap-1 text-[11px] text-slate-600">
          <Vault className="h-3 w-3" /> CMS Vault Mumbai Central
          <ChevronRight className="h-3 w-3 text-slate-400" /> Sub-Vault W-12
          <ChevronRight className="h-3 w-3 text-slate-400" /> Processing Area — Counter 3
        </div>
      </header>

      {/* KPI strip */}
      <div className="max-w-[1600px] mx-auto px-4 pt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: '% Vaults on Digital Ledger', val: '67%', sub: '86 of 129', tone: 'emerald' },
          { label: 'OCR Accuracy (7d)', val: '96.2%', sub: '+1.8 pts WoW', tone: 'blue' },
          { label: 'Re-keying Errors Avoided', val: '124', sub: 'illustrative · MTD', tone: 'amber' },
          { label: 'Sealed Boxes In-Transit', val: '38', sub: 'with seal-photo proof', tone: 'slate' },
        ].map((k, i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">{k.label}</div>
              <div className={`text-2xl font-bold ${k.tone === 'emerald' ? 'text-emerald-700' : k.tone === 'blue' ? 'text-blue-700' : k.tone === 'amber' ? 'text-amber-700' : 'text-slate-900'}`}>{k.val}</div>
              <div className="text-[10px] text-slate-500">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <main className="max-w-[1600px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sidebar tree */}
        <aside className="lg:col-span-2">
          <Card className="border-slate-200">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-bold text-slate-900">Vault Hierarchy</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-2 text-xs">
              {tree.map(r => (
                <div key={r.region}>
                  <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">{r.region}</div>
                  <ul className="ml-2 mt-1 space-y-0.5">
                    {r.vaults.map(v => (
                      <li key={v} className={`pl-2 py-0.5 border-l-2 text-[11px] ${v === 'Mumbai Central' ? 'border-amber-500 text-amber-700 font-bold' : 'border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer'}`}>
                        {v}
                        {v === 'Mumbai Central' && <div className="text-[9px] text-slate-500 pl-3 mt-0.5">↳ Sub-Vault W-12 (active)</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main panel */}
        <section className="lg:col-span-10">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <Tabs value={tab} onValueChange={v => setTab(v as any)}>
                <TabsList className="h-9">
                  <TabsTrigger value="ledger" className="text-[11px] gap-1"><FileScan className="h-3 w-3" /> Digital Ledger</TabsTrigger>
                  <TabsTrigger value="ecmo" className="text-[11px] gap-1"><Truck className="h-3 w-3" /> e-CMO Bin Tracker</TabsTrigger>
                  <TabsTrigger value="ocr" className="text-[11px] gap-1"><Camera className="h-3 w-3" /> OCR Capture</TabsTrigger>
                  <TabsTrigger value="opencash" className="text-[11px] gap-1"><Box className="h-3 w-3" /> Open Cash vs Sealed Box</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-2">
              {tab === 'ledger' && (
                <div>
                  {asIs && (
                    <div className="mb-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                      <strong>As-Is mode:</strong> Excel re-key pending after each handoff — ledger is the chalkboard, not the system.
                    </div>
                  )}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px]">Timestamp</TableHead>
                        <TableHead className="text-[10px]">Event</TableHead>
                        <TableHead className="text-[10px]">Actor</TableHead>
                        <TableHead className="text-[10px] text-right">Amount</TableHead>
                        <TableHead className="text-[10px]">Denom</TableHead>
                        <TableHead className="text-[10px]">Seal/Box</TableHead>
                        <TableHead className="text-[10px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ledger.map((e, i) => (
                        <TableRow key={i} className={`text-xs ${asIs && e.event === 'Sealed Box Register' ? 'line-through text-slate-400' : ''}`}>
                          <TableCell className="py-1.5 font-mono">{e.ts}</TableCell>
                          <TableCell className="py-1.5 font-medium">{e.event}</TableCell>
                          <TableCell className="py-1.5 text-slate-600">{e.actor}</TableCell>
                          <TableCell className="py-1.5 text-right font-mono font-bold">{e.amount ? fmtINR(e.amount) : '—'}</TableCell>
                          <TableCell className="py-1.5 text-slate-600">{e.denom}</TableCell>
                          <TableCell className="py-1.5 font-mono text-[11px]">{e.seal}</TableCell>
                          <TableCell className="py-1.5">
                            <Badge className={`text-[10px] ${e.status.includes('Verified') ? 'bg-emerald-100 text-emerald-700' : e.status.includes('Sealed') ? 'bg-slate-200 text-slate-700' : e.status.includes('transit') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{e.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {tab === 'ecmo' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {trips.map(t => (
                    <Card key={t.id} className={`border ${t.status === 'In transit' ? 'border-amber-300 bg-amber-50/50' : t.status === 'Returned' ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'}`}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="font-mono font-bold text-sm">{t.id}</div>
                          <Badge className={`text-[10px] ${t.status === 'In transit' ? 'bg-amber-500 text-white' : t.status === 'Returned' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>{t.status}</Badge>
                        </div>
                        <div className="text-[10px] text-slate-500 mb-1">Custodian {t.custodian}</div>
                        <div className="text-lg font-bold text-slate-900">{fmtINR(t.indent)}</div>
                        <div className="text-[10px] text-slate-500 mb-2">{t.cassettes} cassettes</div>
                        <div className="flex flex-wrap gap-1">
                          {t.seals.map(s => <span key={s} className="text-[9px] font-mono px-1.5 py-0.5 bg-white rounded border border-slate-200">{s}</span>)}
                        </div>
                        <Button size="sm" variant="outline" className="h-6 text-[10px] mt-2 w-full" onClick={() => toast(`Linked to Data Lake cash journey for ${t.id}`)}>
                          <Eye className="h-3 w-3 mr-1" /> Open lineage in Data Lake
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {tab === 'ocr' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 p-4 flex flex-col items-center justify-center min-h-[260px]">
                    <Camera className="h-10 w-10 text-slate-400 mb-2" />
                    <div className="text-xs font-bold text-slate-700">Phone scanner — Bank Disbursement Slip</div>
                    <div className="text-[10px] text-slate-500 mb-3">Auto-crop · B/W filter · On-device cleaned</div>
                    <div className="w-full bg-white border border-slate-300 rounded p-3 font-mono text-[10px] text-slate-700 leading-relaxed">
                      ICICI BANK · BRANCH: SURAT MAIN<br/>
                      DATE: 12-APR-2026 · REF: DISB-228841<br/>
                      SANCTIONED: ₹10,00,000<br/>
                      <span className="text-red-600 font-bold">DISBURSED: ₹6,00,000</span><br/>
                      CASHIER: K.MEHTA · SIGN: ✓
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-2">Extracted Fields</div>
                    <div className="space-y-1.5">
                      {[
                        ['Date', '12-APR-2026', 99],
                        ['Reference', 'DISB-228841', 98],
                        ['Sanctioned ₹', '10,00,000', 97],
                        ['Disbursed ₹', '6,00,000', 96],
                        ['Cashier', 'K.MEHTA', 92],
                      ].map(([k, v, c]) => (
                        <div key={k as string} className="flex items-center justify-between text-xs px-2 py-1.5 bg-slate-50 rounded border border-slate-200">
                          <span className="text-slate-600">{k}</span>
                          <span className="font-mono font-bold text-slate-900">{v}</span>
                          <span className="text-[10px] text-emerald-600">{c}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-800">
                      <AlertTriangle className="h-3 w-3 inline mr-1" /> Extracted ₹6,00,000 vs sanctioned ₹10,00,000 — <strong>indent trim suggested</strong>.
                      <Button size="sm" variant="outline" className="h-6 text-[10px] ml-2 border-red-300" onClick={() => toast.success('Opening Indent Engine…')}>Open Indent Engine</Button>
                    </div>
                    <Button className="h-7 text-[10px] mt-2 w-full bg-slate-900 hover:bg-slate-800" onClick={() => toast.success('Evidence package bundled')}>
                      <FileDown className="h-3 w-3 mr-1" /> Generate Evidence Package
                    </Button>
                  </div>
                </div>
              )}

              {tab === 'opencash' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-emerald-200 bg-emerald-50/40">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-800 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Open Cash · Counter 3</CardTitle></CardHeader>
                    <CardContent className="pt-0">
                      <Table>
                        <TableHeader><TableRow><TableHead className="text-[10px]">Denom</TableHead><TableHead className="text-[10px] text-right">Count</TableHead><TableHead className="text-[10px] text-right">Value</TableHead></TableRow></TableHeader>
                        <TableBody>
                          {denoms.map(d => (
                            <TableRow key={d.d} className="text-xs">
                              <TableCell className="py-1.5 font-bold">{d.d}</TableCell>
                              <TableCell className="py-1.5 text-right font-mono">{d.cnt.toLocaleString()}</TableCell>
                              <TableCell className="py-1.5 text-right font-mono font-bold">{fmtINR(d.val)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="text-xs bg-emerald-100">
                            <TableCell className="py-1.5 font-bold">Total</TableCell>
                            <TableCell className="py-1.5 text-right font-mono">2,400</TableCell>
                            <TableCell className="py-1.5 text-right font-mono font-bold text-emerald-800">{fmtINR(800000)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-300 bg-slate-100">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><Lock className="h-4 w-4" /> Sealed Box BX-7741-Q</CardTitle></CardHeader>
                    <CardContent className="pt-0">
                      <div className="aspect-video rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 text-[10px] mb-2">[ seal photo · BX-7741-Q · 07:18 ]</div>
                      <div className="text-[11px] text-slate-600 space-y-1">
                        <div><strong>Box ID:</strong> BX-7741-Q</div>
                        <div><strong>Seal photo:</strong> captured · operator K. Mehta</div>
                        <div><strong>Declared value:</strong> per indent line</div>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-500 italic px-2 py-1 bg-white rounded border border-slate-200">
                        Contents not visible to system — proof is seal integrity + photo, not denomination count.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-3 px-3 py-2 rounded-lg bg-slate-900 text-slate-100 text-[11px] flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            <span>Eliminates the <strong>Board Problem</strong> — every handoff has a timestamped actor, amount, and seal. The chalkboard is now a system of record.</span>
          </div>
        </section>
      </main>

      <footer className="max-w-[1600px] mx-auto px-4 py-3 text-[10px] text-slate-400 text-right">Representative UI · Illustrative data</footer>
    </div>
  );
};

export default CMSVaultOps;
