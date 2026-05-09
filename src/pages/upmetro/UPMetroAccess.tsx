import React from 'react';
import { PageHeader, Card, Kpi } from './ui';
import { identityKpis, vendors } from './data';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function UPMetroAccess() {
  return (
    <div>
      <PageHeader eyebrow="Module 04" title="Identity, Access & Vendor Control"
        sub="Privileged access posture · vendor session compliance · access request audit trail." />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-6 gap-4">
          <Kpi label="Privileged accounts" value={identityKpis.privAccounts} tone="cyan" />
          <Kpi label="MFA coverage" value={identityKpis.mfaCoverage} unit="%" delta="Target 100%" tone="amber" />
          <Kpi label="PAM session compliance" value={identityKpis.pamSessions} unit="%" tone="green" />
          <Kpi label="Dormant priv. accounts" value={identityKpis.dormantPriv} delta="Review SLA: 14d" tone="red" />
          <Kpi label="Vendors connected" value={identityKpis.vendors} tone="cyan" />
          <Kpi label="Vendor violations" value={identityKpis.vendorViolations} tone="red" />
        </div>

        <Card title="Vendor access · live sessions and compliance">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">Vendor / OEM</th>
                  <th className="text-left px-3 py-2 font-medium">Sessions (24h)</th>
                  <th className="text-left px-3 py-2 font-medium">Last session</th>
                  <th className="text-left px-3 py-2 font-medium">MFA</th>
                  <th className="text-left px-3 py-2 font-medium">PAM</th>
                  <th className="text-left px-3 py-2 font-medium">Status</th>
                  <th className="text-left px-3 py-2 font-medium">Access expires</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.name} className="border-t border-white/5">
                    <td className="px-3 py-2.5 text-slate-100">{v.name}</td>
                    <td className="px-3 py-2.5 text-slate-300">{v.sessions}</td>
                    <td className="px-3 py-2.5 text-slate-400">{v.last}</td>
                    <td className="px-3 py-2.5">{v.mfa ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}</td>
                    <td className="px-3 py-2.5">{v.pam ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${v.status === 'OK' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-red-500/15 text-red-300 border-red-500/30'}`}>{v.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{v.expires}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Access request · simulation">
            <div className="space-y-3 text-sm">
              <div className="rounded bg-white/5 border border-white/10 p-3">
                <div className="text-xs text-slate-400">Request</div>
                <div className="text-slate-100">Hikvision Partner — emergency NVR access · Hazratganj station</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="rounded bg-white/5 border border-white/10 p-2">Requester · Vendor PoC</div>
                <div className="rounded bg-white/5 border border-white/10 p-2">Window · 4 hours</div>
                <div className="rounded bg-white/5 border border-white/10 p-2">MFA · Required (FIDO2)</div>
                <div className="rounded bg-white/5 border border-white/10 p-2">PAM session · Recorded</div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded bg-cyan-400 text-[#06142A] text-sm font-semibold py-2">Approve with conditions</button>
                <button className="flex-1 rounded border border-white/15 text-slate-200 text-sm py-2">Deny</button>
              </div>
            </div>
          </Card>
          <Card title="Audit trail · last 24h">
            <ul className="text-xs space-y-2">
              {[
                ['10:42', 'Approver', 'Approved Alstom session · 2h · station Charbagh'],
                ['09:18', 'Policy', 'Auto-revoke: Hikvision Partner expired access (no MFA)'],
                ['08:55', 'IAM',    'PAM session recorded · Siemens SCADA support'],
                ['07:30', 'Risk',   'Flag: CMS-Edge accessed AFC switch outside window'],
                ['06:12', 'IR',     'Compromised credential rotated · escalated to L3'],
              ].map(([t, who, what], i) => (
                <li key={i} className="flex gap-3 border-b border-white/5 pb-1.5">
                  <span className="text-cyan-300 font-mono w-12">{t}</span>
                  <span className="text-slate-400 w-20">{who}</span>
                  <span className="text-slate-200 flex-1">{what}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
