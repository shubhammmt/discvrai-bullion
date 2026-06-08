import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Trash2, Upload, Database, FileBarChart, Factory } from 'lucide-react';
import { seedDemoData } from './store';

const navItems = [
  { to: '/plant-ops', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/plant-ops/manpower', label: 'Manpower Entry', icon: Users },
  { to: '/plant-ops/wastage', label: 'Wastage Entry', icon: Trash2 },
  { to: '/plant-ops/upload', label: 'Excel Upload', icon: Upload },
  { to: '/plant-ops/master', label: 'Master Data', icon: Database },
  { to: '/plant-ops/reports', label: 'Monthly Reports', icon: FileBarChart },
];

export default function PlantOpsLayout() {
  useEffect(() => { seedDemoData(); }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      <aside className="md:w-64 md:min-h-screen bg-white border-r border-slate-200 flex md:flex-col">
        <div className="p-5 border-b border-slate-200 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white grid place-items-center">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">Plant Ops</div>
            <div className="text-xs text-slate-500">Daily Data Capture</div>
          </div>
        </div>
        <nav className="flex md:flex-col gap-1 p-2 overflow-x-auto md:overflow-visible">
          {navItems.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm whitespace-nowrap transition ${
                  isActive ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                }`}>
              <n.icon className="w-4 h-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block mt-auto p-4 text-xs text-slate-400">
          v1 • Local storage demo
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
