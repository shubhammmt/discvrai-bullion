import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Scale, Bell, Vault, PackageSearch, ShieldCheck } from 'lucide-react';

const links = [
  { to: '/cms-data-lake', label: 'Data Lake', icon: Database },
  { to: '/cms-recon-center', label: 'Recon Center', icon: Scale },
  { to: '/cms-overage-alerts', label: 'Overage Alerts', icon: Bell },
  { to: '/cms-vault-ops', label: 'Vault Ops', icon: Vault },
  { to: '/cms-indent-engine', label: 'Indent Engine', icon: PackageSearch },
  { to: '/cms-audit-command', label: 'Audit Guardian', icon: ShieldCheck },
];

interface Props {
  variant?: 'light' | 'dark';
}

const CMSModuleNav: React.FC<Props> = ({ variant = 'light' }) => {
  const dark = variant === 'dark';
  return (
    <div className={`w-full border-b ${dark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="max-w-[1600px] mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${dark ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-900 text-white'}`}>
            DiscvrAI · CMS
          </div>
          <span className={`text-[10px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            CMS Operations Intelligence · 129 Vaults · 3,000 Routes · 70,000 ATMs
          </span>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? dark
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-900 text-white'
                    : dark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={`max-w-[1600px] mx-auto px-4 pb-1 text-[9px] ${dark ? 'text-slate-500' : 'text-slate-400'} text-right`}>
        Representative UI · Illustrative data · Not production CMS systems
      </div>
    </div>
  );
};

export default CMSModuleNav;
