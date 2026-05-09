import React, { useState } from 'react';
import { PageHeader, Card, BRAND } from './ui';
import { zones, lateralPaths } from './data';
import { ShieldAlert } from 'lucide-react';

const positions: Record<string, { x: number; y: number }> = {
  'enterprise':  { x: 120, y: 100 },
  'public-edge': { x: 120, y: 280 },
  'ot-dmz':      { x: 460, y: 190 },
  'cctv':        { x: 800, y: 80 },
  'afc':         { x: 800, y: 200 },
  'rail-ops':    { x: 800, y: 320 },
};

export default function UPMetroAssetMap() {
  const [showOnlyNonCompliant, setShowOnlyNonCompliant] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const paths = showOnlyNonCompliant ? lateralPaths.filter(p => !p.compliant) : lateralPaths;

  return (
    <div>
      <PageHeader eyebrow="Module 02" title="IT-OT Asset & Segmentation Map"
        sub="Zone-and-conduit view aligned to IEC 62443. Trust boundaries, criticality and lateral movement risk."
        right={
          <label className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-lg cursor-pointer">
            <input type="checkbox" checked={showOnlyNonCompliant} onChange={e => setShowOnlyNonCompliant(e.target.checked)} />
            Highlight non-compliant pathways only
          </label>
        }
      />
      <div className="p-8 space-y-6">
        <Card title="Network zone map · trust boundaries · lateral risk">
          <svg viewBox="0 0 960 420" className="w-full h-[440px]">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
              </marker>
            </defs>
            {/* trust boundaries */}
            <rect x="20" y="30" width="240" height="370" rx="14" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.3)" strokeDasharray="6 4" />
            <text x="40" y="50" fontSize="11" fill="#93c5fd" letterSpacing="2">CORPORATE / UNTRUSTED</text>

            <rect x="370" y="120" width="200" height="180" rx="14" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.3)" strokeDasharray="6 4" />
            <text x="390" y="140" fontSize="11" fill="#fcd34d" letterSpacing="2">OT DMZ / CONDUIT</text>

            <rect x="690" y="30" width="240" height="370" rx="14" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.3)" strokeDasharray="6 4" />
            <text x="710" y="50" fontSize="11" fill="#6ee7b7" letterSpacing="2">RESTRICTED / SAFETY</text>

            {/* paths */}
            {paths.map((p, i) => {
              const a = positions[p.from], b = positions[p.to];
              const stroke = p.compliant ? '#10b981' : (p.risk === 'High' ? '#ef4444' : p.risk === 'Medium' ? '#f59e0b' : '#94a3b8');
              return (
                <g key={i}>
                  <line x1={a.x + 70} y1={a.y + 30} x2={b.x} y2={b.y + 30} stroke={stroke} strokeWidth={p.compliant ? 1.5 : 2.5} strokeDasharray={p.compliant ? '0' : '4 3'} markerEnd="url(#arrow)" opacity={0.85} />
                </g>
              );
            })}

            {/* zones */}
            {zones.map(z => {
              const pos = positions[z.id];
              const isSel = selected === z.id;
              return (
                <g key={z.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(isSel ? null : z.id)}>
                  <rect x={pos.x} y={pos.y} width={140} height={60} rx={10} fill={z.color} fillOpacity={isSel ? 0.35 : 0.18} stroke={z.color} strokeWidth={isSel ? 2 : 1.2} />
                  <text x={pos.x + 12} y={pos.y + 22} fontSize="11" fontWeight="600" fill="#fff">{z.name}</text>
                  <text x={pos.x + 12} y={pos.y + 40} fontSize="10" fill="#cbd5e1">{z.assets} assets · {z.criticality}</text>
                  {z.criticality === 'Critical' && <circle cx={pos.x + 130} cy={pos.y + 12} r="4" fill="#ef4444" />}
                </g>
              );
            })}
          </svg>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Zone inventory">
            <div className="space-y-2">
              {zones.map(z => (
                <div key={z.id} className="flex items-center gap-3 px-3 py-2 rounded bg-slate-50 border border-slate-200">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: z.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{z.name}</div>
                    <div className="text-[11px] text-slate-500">Trust: {z.trust} · {z.assets} assets</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${z.criticality === 'Critical' ? 'bg-red-500/15 text-red-700 border-red-500/30' : 'bg-amber-500/15 text-amber-700 border-amber-500/30'}`}>{z.criticality}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Lateral movement findings">
            <div className="space-y-2">
              {lateralPaths.filter(p => !p.compliant).map((p, i) => (
                <div key={i} className="rounded bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-cyan-700">{zones.find(z => z.id === p.from)?.name}</span>
                      <span className="text-slate-500 mx-2">→</span>
                      <span className="text-cyan-700">{zones.find(z => z.id === p.to)?.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${p.risk === 'High' ? 'bg-red-500/15 text-red-700 border-red-500/30' : 'bg-amber-500/15 text-amber-700 border-amber-500/30'}`}>{p.risk}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3" /> {p.issue}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
