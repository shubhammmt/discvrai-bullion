import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home, Layers, Mail, BarChart3, BookOpen, FileText, ClipboardList, PieChart, Menu, X
} from 'lucide-react';
import WorkspaceHome from '@/components/workspace/WorkspaceHome';
import PlatformLayers from '@/components/workspace/PlatformLayers';
import MorningMail from '@/components/workspace/MorningMail';
import ResultsNight from '@/components/workspace/ResultsNight';
import AnchorBook from '@/components/workspace/AnchorBook';
import DRHPInvite from '@/components/workspace/DRHPInvite';
import MISReporting from '@/components/workspace/MISReporting';
import LineageAudit from '@/components/workspace/LineageAudit';

type Page = 'home' | 'platform-layers' | 'morning-mail' | 'results-night' | 'anchor-book' | 'drhp-invite' | 'mis-reporting' | 'lineage-audit';

const navItems: { id: Page; label: string; icon: React.FC<any>; group: string }[] = [
  { id: 'home', label: 'Home / Story', icon: Home, group: 'Overview' },
  { id: 'platform-layers', label: 'Platform Layers', icon: Layers, group: 'Overview' },
  { id: 'morning-mail', label: 'Morning Mail', icon: Mail, group: 'Research' },
  { id: 'results-night', label: 'Results Night', icon: BarChart3, group: 'Research' },
  { id: 'anchor-book', label: 'Anchor Book', icon: BookOpen, group: 'Investment Banking' },
  { id: 'drhp-invite', label: 'DRHP → Invite', icon: FileText, group: 'Investment Banking' },
  { id: 'mis-reporting', label: 'MIS — Unified Reporting', icon: PieChart, group: 'MIS' },
  { id: 'lineage-audit', label: 'Lineage & Audit', icon: ClipboardList, group: 'Cross-cutting' },
];

const WorkspaceDemo: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const groups = ['Overview', 'Research', 'Investment Banking', 'MIS', 'Cross-cutting'];

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <WorkspaceHome onNavigate={(p) => setActivePage(p as Page)} />;
      case 'platform-layers': return <PlatformLayers />;
      case 'morning-mail': return <MorningMail />;
      case 'results-night': return <ResultsNight />;
      case 'anchor-book': return <AnchorBook />;
      case 'drhp-invite': return <DRHPInvite />;
      case 'lineage-audit': return <LineageAudit />;
      default: return <WorkspaceHome onNavigate={(p) => setActivePage(p as Page)} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-ws-surface">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-ws-navy text-white flex-shrink-0 overflow-hidden"
      >
        <div className="w-[260px] h-full flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-white/10">
            <h1 className="text-lg font-semibold tracking-tight">WorkspaceOne</h1>
            <p className="text-[10px] text-white/50 mt-0.5">Unified Platform Demo</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {groups.map((group) => {
              const items = navItems.filter((n) => n.group === group);
              return (
                <div key={group} className="mb-4">
                  <p className="px-5 text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
                    {group}
                  </p>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'bg-white/10 text-ws-gold font-medium border-r-2 border-ws-gold'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-[10px] text-white/30 leading-relaxed">
              Prototype for discussion — not production and not legal/financial advice.
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-ws-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md hover:bg-ws-surface transition-colors">
              {sidebarOpen ? <X className="w-4 h-4 text-ws-text-muted" /> : <Menu className="w-4 h-4 text-ws-text-muted" />}
            </button>
            <span className="text-sm font-medium text-ws-text-primary">WorkspaceOne</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">
              Prototype — sample data only
            </span>
            <span className="text-sm text-ws-text-secondary">Arjun Mehta (Demo)</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
          {/* Page footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-ws-text-muted">
              Prototype for discussion — not production and not legal/financial advice.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkspaceDemo;
