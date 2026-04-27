import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ExternalLink, Bell, CheckCircle2 } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CompanyCommandCenterSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const c = slide.content || {};
  const accent = c.accent || '#10b981';
  const company = c.company || '';
  const widgets: Array<{ label: string; val: string }> = c.kpis || [];
  const alerts: Array<{ sev: string; msg: string; owner: string }> = c.alerts || [];
  const bullets: string[] = c.bullets || [];
  const demoUrl: string | undefined = c.demoUrl;

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides} variant="light">
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
              {company} · Decision Command Layer
            </div>
            <h2 className="text-3xl font-light text-slate-900 mb-1">{slide.title}</h2>
            {slide.subtitle && <p className="text-base text-slate-500">{slide.subtitle}</p>}
          </div>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-white rounded px-3 py-1.5 hover:opacity-90"
              style={{ background: accent }}
            >
              Open live demo <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" style={{ color: accent }} />
                <span className="text-sm font-semibold text-slate-800">{company} · Live Decision Hub</span>
              </div>
              <span className="text-[10px] text-slate-500 border border-slate-200 rounded px-1.5 py-0.5">Conceptual UI</span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {widgets.map((k, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{k.label}</div>
                  <div className="text-lg font-semibold text-slate-900">{k.val}</div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Bell className="w-3 h-3" /> Exception Queue · Owner Assigned
            </div>
            <div className="space-y-1.5 flex-1">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${a.sev === 'High' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                    {a.sev}
                  </span>
                  <span className="text-xs text-slate-800 flex-1 truncate">{a.msg}</span>
                  <span className="text-[10px] text-slate-500">{a.owner}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right bullets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Why This Works</div>
            <ul className="space-y-3 flex-1">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
