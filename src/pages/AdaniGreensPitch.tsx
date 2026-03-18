import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Wind, Truck, Package, Warehouse, AlertTriangle, Bot, Zap, MessageSquare, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight, CheckCircle, Brain, Network, Shield, Clock, Target, BarChart3, Globe, Users, Calendar, MapPin, Building2, Cpu, FileText, TrendingUp } from 'lucide-react';

const SLIDE_W = 1920;
const SLIDE_H = 1080;

const C = {
  navy: '#1a2744',
  navyLight: '#2d3f5e',
  green: '#006400',
  greenLight: '#4ade80',
  greenBg: '#f0fdf4',
  amber: '#f59e0b',
  amberLight: '#fef3c7',
  red: '#dc2626',
  white: '#ffffff',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray400: '#94a3b8',
  gray600: '#475569',
  text: '#0f172a',
  textSec: '#64748b',
};

// ── Scaled Slide ──
const ScaledSlide: React.FC<{ children: React.ReactNode; containerRef: React.RefObject<HTMLDivElement> }> = ({ children, containerRef }) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth: cw, clientHeight: ch } = containerRef.current;
      setScale(Math.min(cw / SLIDE_W, ch / SLIDE_H));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [containerRef]);

  return (
    <div style={{ position: 'absolute', width: SLIDE_W, height: SLIDE_H, left: '50%', top: '50%', marginLeft: -SLIDE_W / 2, marginTop: -SLIDE_H / 2, transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      {children}
    </div>
  );
};

// ── Slide Layout ──
const SL: React.FC<{ children: React.ReactNode; bg?: string; dark?: boolean }> = ({ children, bg = C.white, dark = false }) => (
  <div className="slide-content" style={{ width: SLIDE_W, height: SLIDE_H, background: bg, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${C.green}, ${C.amber})` }} />
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 44, background: dark ? 'rgba(0,0,0,0.3)' : C.gray50, borderTop: dark ? 'none' : `1px solid ${C.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', fontSize: 13, color: dark ? 'rgba(255,255,255,0.4)' : C.gray400 }}>
      <span>Adani Green Energy | Confidential</span>
      <span>March 2026</span>
      <span style={{ color: C.greenLight, fontWeight: 700 }}>DiscvrAI</span>
    </div>
    <div style={{ padding: '48px 64px 56px', height: SLIDE_H - 5, boxSizing: 'border-box' }}>{children}</div>
  </div>
);

// ── Pillar Card ──
const Pillar: React.FC<{ icon: React.ReactNode; title: string; points: string[]; accent: string }> = ({ icon, title, points, accent }) => (
  <div style={{ flex: 1, background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 16, padding: '28px 24px', borderTop: `4px solid ${accent}`, display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 11, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>{icon}</div>
      <span style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{title}</span>
    </div>
    {points.map((p, i) => (
      <div key={i} style={{ display: 'flex', gap: 10, fontSize: 15, color: C.gray600, lineHeight: 1.5 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: accent, marginTop: 8, flexShrink: 0 }} />
        <span>{p}</span>
      </div>
    ))}
  </div>
);

// ── SLIDES ──

const S1: React.FC = () => (
  <SL bg={C.navy} dark>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', right: -60, top: -60, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.06), transparent)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sun size={26} color={C.greenLight} /></div>
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, fontWeight: 500 }}>DISCVRAI × ADANI GREENS</span>
      </div>
      <h1 style={{ fontSize: 60, fontWeight: 800, color: C.white, lineHeight: 1.15, maxWidth: 1100, marginBottom: 28 }}>AI-Enabled Supply Chain Intelligence</h1>
      <p style={{ fontSize: 26, color: 'rgba(255,255,255,0.75)', maxWidth: 900, lineHeight: 1.5, marginBottom: 40 }}>From Static Dashboards to Proactive Orchestration — real-time visibility, agentic automation, and predictive logistics for renewable energy.</p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {[
          { icon: <Wind size={16} />, text: 'Khavda · 30 GW' },
          { icon: <Globe size={16} />, text: '$2B Annual Logistics' },
          { icon: <Target size={16} />, text: '50 GW by 2030' },
        ].map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.15)' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>{item.icon}<span>{item.text}</span></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </SL>
);

const S2: React.FC = () => (
  <SL>
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 13, color: C.amber, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>THE CHALLENGE</p>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: C.text, marginBottom: 6 }}>$2B Annual Spend. 30 GW Khavda. What Breaks?</h2>
      <p style={{ fontSize: 18, color: C.textSec }}>Strategic dashboards exist. Execution is manual.</p>
    </div>
    <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
      <Pillar icon={<FileText size={22} />} title="Import/Export Friction" accent={C.red} points={['Bills of Entry, Shipping Bills, invoices — manual processing, human error', 'Single misstep → delays, demurrage, financial penalties', '200+ containers in 45 days (Shanghai → Hazira)']} />
      <Pillar icon={<Truck size={22} />} title="OOG Cargo Complexity" accent={C.amber} points={['Wind blades (90m+), nacelles (75t+), towers (24t+)', 'Static route planning fails; disputes over delays & damage', 'Multi-jurisdiction permits, weather risk, liability']} />
      <Pillar icon={<Network size={22} />} title="Data Silos" accent={C.navy} points={['ENOC monitors assets; supply chain in separate systems', 'No single view: Ordered → In Transit → At Site', 'Reactive firefighting vs. proactive orchestration']} />
    </div>
    <div style={{ padding: '14px 24px', background: C.amberLight, borderRadius: 10, borderLeft: `4px solid ${C.amber}`, fontSize: 16, color: C.gray600, fontStyle: 'italic' }}>
      "From predictive maintenance to proactive logistics — the gap is execution."
    </div>
  </SL>
);

const S3: React.FC = () => (
  <SL>
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 13, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>THE SOLUTION</p>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: C.text, marginBottom: 6 }}>Not Dashboards. Agents That Execute.</h2>
      <p style={{ fontSize: 18, color: C.textSec }}>Same architecture we use at Bajaj Electricals — adapted for renewable energy.</p>
    </div>
    <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
      <Pillar icon={<BarChart3 size={22} />} title="Supply Chain Control Tower" accent={C.green} points={['Real-time: Import → Warehouse → Khavda Project', 'OTIF, freight cost/unit, vehicle fill rate', 'Exception alerts — critical pendency, customs', '30% logistics cost reduction (Bajaj case study)']} />
      <Pillar icon={<Shield size={22} />} title="Agentic Customs & Compliance" accent={C.navy} points={['OCR + LLM for Bills of Entry, HS classification', 'ICEGATE integration for autonomous filing', 'Reduce manual CHA dependency; faster clearance']} />
      <Pillar icon={<MapPin size={22} />} title="OOG Cargo Orchestration" accent={C.amber} points={['Dynamic route optimization — infrastructure, weather, permits', 'Multi-agent: route, weather, compliance agents', 'GE Renewable: 10% cost reduction; $2.6B by 2030']} />
    </div>
    <div style={{ padding: '14px 24px', background: C.greenBg, borderRadius: 10, borderLeft: `4px solid ${C.green}`, fontSize: 16, color: C.gray600, fontWeight: 600 }}>
      Same agentic architecture — adapted for Adani Greens.
    </div>
  </SL>
);

const S4: React.FC = () => (
  <SL>
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 13, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>LIVE DEMO</p>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: C.text, marginBottom: 6 }}>Renewable Energy Logistics Control Tower</h2>
      <p style={{ fontSize: 18, color: C.textSec }}>Real proof. Working today.</p>
    </div>
    <div style={{ display: 'flex', gap: 28, flex: 1 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { icon: <Target size={20} />, title: 'KPI Strip', desc: 'OTIF, Freight/Unit, Vehicle Fill Rate, Pending Orders, Critical Aging', color: C.green },
          { icon: <Truck size={20} />, title: 'Transportation by Leg', desc: 'Import (Port), Primary (Khavda), Secondary (Site)', color: C.navy },
          { icon: <Clock size={20} />, title: 'Order Pendency', desc: 'Import orders, aging hours, customs clearance status', color: C.amber },
          { icon: <Warehouse size={20} />, title: 'Warehouse Utilisation', desc: 'Hazira, Mundra, Khavda staging — capacity & pallets', color: C.green },
          { icon: <Package size={20} />, title: 'Inventory & Safety Stock', desc: 'Solar modules, wind components — below safety alerts', color: C.red },
          { icon: <Bot size={20} />, title: 'Agentic Layer', desc: 'Recommended actions, insights, conversational AI', color: C.navy },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: C.gray50, borderRadius: 10, borderLeft: `3px solid ${item.color}` }}>
            <div style={{ color: item.color }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{item.title}</div>
              <div style={{ fontSize: 14, color: C.gray600 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: 560, background: C.navy, borderRadius: 18, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <Cpu size={24} color={C.greenLight} />
        </div>
        <p style={{ fontSize: 22, color: C.white, lineHeight: 1.6, marginBottom: 28 }}>
          "This is the same architecture we built for Bajaj Electricals. We've adapted it for renewable energy logistics to show you what it looks like with <strong style={{ color: C.greenLight }}>your data</strong>."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          <ArrowRight size={16} />
          <span>Live at <span style={{ color: C.greenLight, fontWeight: 600 }}>/dashboard/adani-greens</span></span>
        </div>
      </div>
    </div>
  </SL>
);

const S5: React.FC = () => {
  const clients = [
    { name: 'Bajaj Electricals', domain: 'Manufacturing', use: 'Supply Chain Control Tower', result: '30% logistics cost reduction' },
    { name: 'Manufacturing Enterprise', domain: 'Manufacturing', use: 'Freight reconciliation, SAP + TMS', result: 'Margin leakage recovery' },
    { name: 'CMS Infosystems', domain: 'Cash Logistics', use: 'Route & dispatch, reconciliation', result: '28% disruption reduction' },
  ];
  const benchmarks = [
    { co: 'Maersk', stat: '28%', desc: 'reduction in disruption impact' },
    { co: 'DHL', stat: '36%', desc: 'reduction in late deliveries' },
    { co: 'GE Renewable', stat: '10%', desc: 'logistics cost reduction' },
  ];

  return (
    <SL>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>PROOF POINTS</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, color: C.text }}>In Production — Not Theory</h2>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 140px 1fr 1fr', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.gray200}` }}>
          {['Client', 'Domain', 'Use Case', 'Result'].map(h => (
            <div key={h} style={{ background: C.navy, color: C.white, padding: '12px 18px', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{h}</div>
          ))}
          {clients.map((c, i) => (
            <React.Fragment key={i}>
              {[c.name, c.domain, c.use, c.result].map((v, j) => (
                <div key={j} style={{ padding: '14px 18px', fontSize: 15, color: j === 0 ? C.text : C.gray600, fontWeight: j === 0 ? 700 : 400, background: i % 2 === 0 ? C.white : C.gray50, borderBottom: i < clients.length - 1 ? `1px solid ${C.gray200}` : 'none' }}>{v}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 14, color: C.textSec, fontWeight: 600, marginBottom: 14, letterSpacing: 1 }}>INDUSTRY BENCHMARKS</p>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {benchmarks.map((b, i) => (
          <div key={i} style={{ flex: 1, background: C.gray50, borderRadius: 12, padding: 24, borderLeft: `4px solid ${C.green}` }}>
            <div style={{ fontSize: 13, color: C.textSec, fontWeight: 600, marginBottom: 6 }}>{b.co}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: C.green, marginBottom: 6 }}>{b.stat}</div>
            <div style={{ fontSize: 14, color: C.gray600 }}>{b.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 20px', background: C.greenBg, borderRadius: 10, borderLeft: `4px solid ${C.green}`, fontSize: 15, color: C.gray600, fontStyle: 'italic' }}>
        "Adani Group's $100B AI-ready data center investment signals the symmetry between energy and compute."
      </div>
    </SL>
  );
};

const S6: React.FC = () => (
  <SL>
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 13, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>NEXT STEPS</p>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: C.text, marginBottom: 6 }}>Path to Production</h2>
      <p style={{ fontSize: 18, color: C.textSec }}>Same architecture. Your data. 4–6 week PoC.</p>
    </div>
    <div style={{ display: 'flex', gap: 0, marginBottom: 40, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 36, left: 100, right: 100, height: 3, background: C.gray200 }} />
      {[
        { week: 'Week 1–2', title: 'Data Integration', desc: 'ERP, TMS, WMS — connect to existing data', icon: <Cpu size={22} />, color: C.navy },
        { week: 'Week 3–4', title: 'Control Tower', desc: 'KPIs, alerts, visibility — live dashboard', icon: <BarChart3 size={22} />, color: C.green },
        { week: 'Week 5–6', title: 'Agentic Layer', desc: 'Custom exceptions, conversational insights', icon: <Bot size={22} />, color: C.amber },
      ].map((p, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: `${p.color}15`, border: `3px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, marginBottom: 16 }}>{p.icon}</div>
          <div style={{ fontSize: 13, color: p.color, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>{p.week}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 6, textAlign: 'center' }}>{p.title}</div>
          <div style={{ fontSize: 14, color: C.gray600, textAlign: 'center', maxWidth: 280 }}>{p.desc}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1, background: C.gray50, borderRadius: 14, padding: 28, borderTop: `4px solid ${C.green}` }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 14 }}>PoC Deliverables</div>
        {['Live Control Tower with Adani Greens data', 'OTIF, freight optimization, pendency visibility', 'Exception alerts and prioritization', 'Agentic layer — recommended actions, conversational insights'].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 15, color: C.gray600 }}>
            <CheckCircle size={16} color={C.green} /><span>{d}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: C.navy, borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>CALL TO ACTION</div>
        <p style={{ fontSize: 22, color: C.white, lineHeight: 1.5, marginBottom: 20 }}>"Let's schedule a technical deep-dive with your team to define the PoC scope."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.greenLight, fontSize: 15 }}>
          <Calendar size={16} /><span style={{ fontWeight: 600 }}>4–6 weeks to production-ready</span>
        </div>
      </div>
    </div>
  </SL>
);

// ── Main ──
const SLIDES = [S1, S2, S3, S4, S5, S6];

const AdaniGreensPitch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isFS, setIsFS] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  const toggleFS = useCallback(() => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); setIsFS(true); }
    else { document.exitFullscreen(); setIsFS(false); }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'f' || e.key === 'F5') { e.preventDefault(); toggleFS(); }
      if (e.key === 'Escape' && document.fullscreenElement) { document.exitFullscreen(); setIsFS(false); }
    };
    const fsH = () => { if (!document.fullscreenElement) setIsFS(false); };
    window.addEventListener('keydown', handler);
    document.addEventListener('fullscreenchange', fsH);
    return () => { window.removeEventListener('keydown', handler); document.removeEventListener('fullscreenchange', fsH); };
  }, [next, prev, toggleFS]);

  const Slide = SLIDES[current];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {!isFS && (
        <div style={{ height: 44, background: '#111', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sun size={16} color={C.greenLight} />
            <span style={{ color: '#aaa', fontSize: 13, fontWeight: 600 }}>Adani Greens Pitch</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#666', fontSize: 12 }}>{current + 1} / {SLIDES.length}</span>
            <button onClick={toggleFS} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}><Maximize2 size={15} /></button>
          </div>
        </div>
      )}

      <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <ScaledSlide containerRef={containerRef}><Slide /></ScaledSlide>
      </div>

      {/* Nav */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.75)', borderRadius: 40, padding: '6px 14px', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <button onClick={prev} disabled={current === 0} style={{ background: 'none', border: 'none', color: current === 0 ? '#333' : '#aaa', cursor: current === 0 ? 'default' : 'pointer', padding: 4 }}><ChevronLeft size={18} /></button>
        <div style={{ display: 'flex', gap: 5 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 7, height: 7, borderRadius: 4, background: i === current ? C.greenLight : '#444', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }} />
          ))}
        </div>
        <button onClick={next} disabled={current === SLIDES.length - 1} style={{ background: 'none', border: 'none', color: current === SLIDES.length - 1 ? '#333' : '#aaa', cursor: current === SLIDES.length - 1 ? 'default' : 'pointer', padding: 4 }}><ChevronRight size={18} /></button>
      </div>

      {/* Thumbnails */}
      {!isFS && (
        <div style={{ height: 72, background: '#0d0d0d', borderTop: '1px solid #222', display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', overflowX: 'auto', flexShrink: 0 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: 100, height: 56, borderRadius: 5, border: i === current ? `2px solid ${C.greenLight}` : '2px solid #333', cursor: 'pointer', flexShrink: 0, background: i === current ? '#1a1a1a' : '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === current ? C.greenLight : '#555', fontSize: 11, fontWeight: 600 }}>
              Slide {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdaniGreensPitch;
