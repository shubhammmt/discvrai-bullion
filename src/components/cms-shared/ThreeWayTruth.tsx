import React from 'react';
import { Building2, Cpu, Vault, FileDown } from 'lucide-react';
import { toast } from 'sonner';

const fmtINR = (v: number) => `₹${v.toLocaleString('en-IN')}`;

interface Props {
  bank: number;
  machine: number;
  vault?: number | null;
  variant?: 'light' | 'dark';
  atmId?: string;
}

const ThreeWayTruth: React.FC<Props> = ({ bank, machine, vault, variant = 'light', atmId = 'ATM-AMD-0001' }) => {
  const dark = variant === 'dark';
  const card = (label: string, val: React.ReactNode, Icon: any, sub?: string, missing?: boolean) => (
    <div className={`flex-1 rounded-lg border p-3 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} ${missing ? 'opacity-70' : ''}`}>
      <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wide ${dark ? 'text-slate-400' : 'text-slate-500'} mb-1`}>
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={`text-base font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{val}</div>
      {sub && <div className={`text-[10px] mt-0.5 ${missing ? 'text-amber-600' : dark ? 'text-slate-500' : 'text-slate-500'}`}>{sub}</div>}
    </div>
  );

  const machineDelta = machine - bank;
  const vaultDelta = vault != null ? vault - bank : null;
  const hasMismatch = Math.abs(machineDelta) > 0 || (vaultDelta != null && Math.abs(vaultDelta) > 0);

  return (
    <div className={`rounded-xl border p-3 ${dark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className={`text-xs font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Three-Way Truth · {atmId}</div>
          <div className={`text-[10px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Bank Switch ↔ Machine EJ ↔ Vault / Indent line</div>
        </div>
        <button
          onClick={() => toast.success('Bundling EJ + vault line + audit clip…')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium ${dark ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
        >
          <FileDown className="h-3 w-3" /> Generate Evidence Package
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {card('Bank Switch', fmtINR(bank), Building2, 'Authoritative ledger')}
        {card(
          'Machine (EJ)',
          fmtINR(machine),
          Cpu,
          machineDelta === 0 ? 'Match' : `Δ ${fmtINR(machineDelta)}`,
        )}
        {card(
          'Vault / Indent',
          vault != null ? fmtINR(vault) : '— pending —',
          Vault,
          vault == null ? 'Vault attestation pending — In-Transit gap' : vaultDelta === 0 ? 'Match' : `Δ ${fmtINR(vaultDelta!)}`,
          vault == null,
        )}
      </div>
      {hasMismatch && (
        <div className={`mt-2 text-[10px] px-2 py-1 rounded ${dark ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          Mismatch detected — suggested root cause: <span className="font-semibold">Indent timing drift</span>. Open evidence package to triangulate.
        </div>
      )}
    </div>
  );
};

export default ThreeWayTruth;
