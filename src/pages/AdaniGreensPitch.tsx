import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Wind, Truck, Package, Warehouse, AlertTriangle, Bot, Zap, MessageSquare, Lightbulb, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight, CheckCircle, Brain, Network, Shield, Clock, Target, BarChart3, Globe, Users, Calendar, MapPin, Building2, Cpu, FileText, TrendingUp, Search } from 'lucide-react';

// ── Slide scaling constants ──
const SLIDE_W = 1920;
const SLIDE_H = 1080;

// ── Color tokens (matching adani theme) ──
const C = {
  navy: 'hsl(220, 50%, 15%)',
  navyLight: 'hsl(220, 40%, 25%)',
  green: 'hsl(120, 100%, 25%)',
  greenLight: 'hsl(120, 60%, 40%)',
  greenBg: 'hsl(120, 40%, 95%)',
  amber: 'hsl(38, 92%, 50%)',
  amberLight: 'hsl(38, 90%, 95%)',
  red: 'hsl(0, 72%, 51%)',
  white: '#ffffff',
  gray50: 'hsl(220, 20%, 97%)',
  gray100: 'hsl(220, 15%, 93%)',
  gray200: 'hsl(220, 15%, 85%)',
  gray400: 'hsl(220, 10%, 60%)',
  gray600: 'hsl(220, 10%, 40%)',
  gray800: 'hsl(220, 15%, 20%)',
  text: 'hsl(220, 15%, 15%)',
  textSecondary: 'hsl(220, 10%, 45%)',
};

// ── Scaled Slide Wrapper ──
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
    <div style={{
      position: 'absolute',
      width: SLIDE_W,
      height: SLIDE_H,
      left: '50%',
      top: '50%',
      marginLeft: -SLIDE_W / 2,
      marginTop: -SLIDE_H / 2,
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
    }}>
      {children}
    </div>
  );
};

// ── Slide Layout ──
const SlideLayout: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = C.white }) => (
  <div className="slide-content" style={{
    width: SLIDE_W, height: SLIDE_H,
    background: bg,
    fontFamily: "'Inter', -apple-system, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Top accent bar */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${C.green}, ${C.navy})` }} />
    {/* Footer */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
      background: C.gray50, borderTop: `1px solid ${C.gray200}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 60px', fontSize: 14, color: C.gray400,
    }}>
      <span>Adani Green Energy | Confidential</span>
      <span>March 2026</span>
      <span style={{ color: C.green, fontWeight: 600 }}>DiscvrAI</span>
    </div>
    <div style={{ padding: '56px 60px 64px', height: SLIDE_H - 6, boxSizing: 'border-box' }}>
      {children}
    </div>
  </div>
);

// ── Icon Card component ──
const IconCard: React.FC<{ icon: React.ReactNode; title: string; points: string[]; accent?: string }> = ({ icon, title, points, accent = C.green }) => (
  <div style={{
    flex: 1, background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 16,
    padding: 36, borderTop: `4px solid ${accent}`,
    display: 'flex', flexDirection: 'column', gap: 16,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
        {icon}
      </div>
      <span style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{title}</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {points.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 16, color: C.gray600, lineHeight: 1.5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, marginTop: 8, flexShrink: 0 }} />
          <span>{p}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── SLIDES ──

const Slide1Cover: React.FC = () => (
  <SlideLayout bg={C.navy}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative' }}>
      {/* Background pattern */}
      <div style={{ position: 'absolute', right: -100, top: -100, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${C.green}08, transparent)` }} />
      <div style={{ position: 'absolute', right: 100, bottom: 0, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.amber}06, transparent)` }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${C.green}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sun size={30} color={C.greenLight} />
        </div>
        <span style={{ fontSize: 20, color: `${C.white}80`, letterSpacing: 4, fontWeight: 500 }}>DISCVRAI × ADANI GREENS</span>
      </div>

      <h1 style={{ fontSize: 64, fontWeight: 800, color: C.white, lineHeight: 1.15, maxWidth: 1200, marginBottom: 32 }}>
        AI-Enabled Supply Chain Intelligence
      </h1>
      <p style={{ fontSize: 28, color: `${C.white}90`, maxWidth: 900, lineHeight: 1.5, marginBottom: 48 }}>
        From Static Dashboards to Proactive Orchestration — real-time visibility, agentic automation, and predictive logistics for renewable energy.
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: `${C.white}60`, fontSize: 16 }}>
          <Wind size={18} /> Khavda · 30 GW
        </div>
        <div style={{ width: 1, height: 20, background: `${C.white}20` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: `${C.white}60`, fontSize: 16 }}>
          <Globe size={18} /> $2B Annual Logistics
        </div>
        <div style={{ width: 1, height: 20, background: `${C.white}20` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: `${C.white}60`, fontSize: 16 }}>
          <Target size={18} /> 50 GW by 2030
        </div>
      </div>
    </div>
  </SlideLayout>
);

const Slide2Problem: React.FC = () => (
  <SlideLayout>
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontSize: 14, color: C.amber, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>THE CHALLENGE</p>
      <h2 style={{ fontSize: 44, fontWeight: 800, color: C.text, marginBottom: 8 }}>$2B Annual Spend. 30 GW Khavda. What Breaks?</h2>
      <p style={{ fontSize: 20, color: C.textSecondary }}>Strategic dashboards exist. Execution is manual.</p>
    </div>
    <div style={{ display: 'flex', gap: 28 }}>
      <IconCard
        icon={<FileText size={26} />}
        title="Import/Export Friction"
        accent={C.red}
        points={[
          'Bills of Entry, Shipping Bills, invoices — manual processing, human error',
          'Single misstep → delays, demurrage, financial penalties',
          '200+ containers in 45 days (Shanghai → Hazira) — tight timelines, port congestion',
        ]}
      />
      <IconCard
        icon={<Truck size={26} />}
        title="OOG Cargo Complexity"
        accent={C.amber}
        points={[
          'Wind blades (90m+), nacelles (75t+), towers (24t+) — narrow roads, dynamic routing',
          'Static route planning fails; disputes over delays, damage, cost allocation',
          'Multi-jurisdiction permits, weather risk, liability exposure',
        ]}
      />
      <IconCard
        icon={<Network size={26} />}
        title="Data Silos"
        accent={C.navy}
        points={[
          'ENOC excels at asset monitoring; supply chain lives in separate systems',
          'No single view: "What is ordered" → "What is in transit" → "What is at site"',
          'Reactive firefighting vs. proactive orchestration',
        ]}
      />
    </div>
    <div style={{ marginTop: 32, padding: '16px 24px', background: C.amberLight, borderRadius: 12, borderLeft: `4px solid ${C.amber}`, fontSize: 18, color: C.gray600, fontStyle: 'italic' }}>
      "From predictive maintenance to proactive logistics — the gap is execution."
    </div>
  </SlideLayout>
);

const Slide3Solution: React.FC = () => (
  <SlideLayout>
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontSize: 14, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>THE SOLUTION</p>
      <h2 style={{ fontSize: 44, fontWeight: 800, color: C.text, marginBottom: 8 }}>Not Dashboards. Agents That Execute.</h2>
      <p style={{ fontSize: 20, color: C.textSecondary }}>Same architecture we use at Bajaj Electricals — adapted for renewable energy.</p>
    </div>
    <div style={{ display: 'flex', gap: 28 }}>
      <IconCard
        icon={<BarChart3 size={26} />}
        title="Supply Chain Control Tower"
        accent={C.green}
        points={[
          'Real-time visibility: Import → Warehouse → Khavda Project',
          'OTIF, freight cost/unit, vehicle fill rate — KPIs that matter',
          'Exception alerts — critical pendency, aging, customs status',
          '30% logistics cost reduction (Bajaj case study)',
        ]}
      />
      <IconCard
        icon={<Shield size={26} />}
        title="Agentic Customs & Compliance"
        accent={C.navy}
        points={[
          'OCR + LLM for Bills of Entry, HS code classification',
          'ICEGATE integration for autonomous filing',
          'Reduce manual CHA dependency; faster clearance',
        ]}
      />
      <IconCard
        icon={<MapPin size={26} />}
        title="OOG Cargo Orchestration"
        accent={C.amber}
        points={[
          'Dynamic route optimization — infrastructure, weather, permits',
          'Multi-agent coordination: route agent, weather agent, compliance agent',
          'GE Renewable: 10% cost reduction; $2.6B industry savings by 2030',
        ]}
      />
    </div>
    <div style={{ marginTop: 32, padding: '16px 24px', background: C.greenBg, borderRadius: 12, borderLeft: `4px solid ${C.green}`, fontSize: 18, color: C.gray600, fontWeight: 600 }}>
      Same agentic architecture — adapted for Adani Greens.
    </div>
  </SlideLayout>
);

const Slide4Demo: React.FC = () => (
  <SlideLayout>
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontSize: 14, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>LIVE DEMO</p>
      <h2 style={{ fontSize: 44, fontWeight: 800, color: C.text, marginBottom: 8 }}>Renewable Energy Logistics Control Tower</h2>
      <p style={{ fontSize: 20, color: C.textSecondary }}>Real proof. Working today.</p>
    </div>
    <div style={{ display: 'flex', gap: 32, height: 680 }}>
      {/* Left: Demo features */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          { icon: <Target size={22} />, title: 'KPI Strip', desc: 'OTIF, Freight/Unit, Vehicle Fill Rate, Pending Orders, Critical Aging', color: C.green },
          { icon: <Truck size={22} />, title: 'Transportation by Leg', desc: 'Import (Port), Primary (Khavda), Secondary (Site) — shipments, freight, distance', color: C.navy },
          { icon: <Clock size={22} />, title: 'Order Pendency', desc: 'Import orders, aging hours, customs clearance status — sorted by criticality', color: C.amber },
          { icon: <Warehouse size={22} />, title: 'Warehouse Utilisation', desc: 'Hazira, Mundra, Khavda staging — capacity, pallets, inbound expected', color: C.green },
          { icon: <Package size={22} />, title: 'Inventory & Safety Stock', desc: 'Solar modules, wind components — below safety stock alerts', color: C.red },
          { icon: <Bot size={22} />, title: 'Agentic Layer', desc: 'Recommended actions, agent insights, conversational AI — proactive, not reactive', color: C.navy },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px', background: C.gray50, borderRadius: 12, borderLeft: `3px solid ${item.color}` }}>
            <div style={{ color: item.color, marginTop: 2 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 15, color: C.gray600, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Right: Message box */}
      <div style={{ width: 600, background: C.navy, borderRadius: 20, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${C.green}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <Cpu size={28} color={C.greenLight} />
        </div>
        <p style={{ fontSize: 24, color: C.white, lineHeight: 1.6, fontWeight: 400, marginBottom: 32 }}>
          "This is the same architecture we built for Bajaj Electricals. We've adapted it for renewable energy logistics to show you what it looks like with <strong style={{ color: C.greenLight }}>your data</strong>."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: `${C.white}60`, fontSize: 16 }}>
          <ArrowRight size={18} />
          <span>Live at <span style={{ color: C.greenLight, fontWeight: 600 }}>/dashboard/adani-greens</span></span>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const Slide5ProofPoints: React.FC = () => {
  const clients = [
    { name: 'Bajaj Electricals', domain: 'Manufacturing', use: 'Supply Chain Control Tower', result: '30% logistics cost reduction, real-time visibility' },
    { name: 'Manufacturing Enterprise', domain: 'Manufacturing', use: 'Freight reconciliation, SAP + TMS', result: 'Margin leakage recovery, audit-ready close' },
    { name: 'CMS Infosystems', domain: 'Cash Logistics', use: 'Route & dispatch, reconciliation', result: 'Agentic reconciliation, 28% disruption reduction' },
  ];

  const benchmarks = [
    { company: 'Maersk', stat: '28%', desc: 'reduction in disruption impact; automated HS code classification' },
    { company: 'DHL', stat: '36%', desc: 'reduction in late deliveries; 10-day advance delay prediction' },
    { company: 'GE Renewable', stat: '10%', desc: 'logistics cost reduction; $2.6B industry savings by 2030' },
  ];

  return (
    <SlideLayout>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 14, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>PROOF POINTS</p>
        <h2 style={{ fontSize: 44, fontWeight: 800, color: C.text }}>In Production — Not Theory</h2>
      </div>

      {/* Client table */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 160px 1fr 1fr', gap: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.gray200}` }}>
          {/* Header */}
          {['Client', 'Domain', 'Use Case', 'Result'].map(h => (
            <div key={h} style={{ background: C.navy, color: C.white, padding: '14px 20px', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>{h}</div>
          ))}
          {/* Rows */}
          {clients.map((c, i) => (
            <React.Fragment key={i}>
              {[c.name, c.domain, c.use, c.result].map((v, j) => (
                <div key={j} style={{
                  padding: '16px 20px', fontSize: 16, color: j === 0 ? C.text : C.gray600,
                  fontWeight: j === 0 ? 700 : 400,
                  background: i % 2 === 0 ? C.white : C.gray50,
                  borderBottom: i < clients.length - 1 ? `1px solid ${C.gray200}` : 'none',
                }}>{v}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Benchmarks */}
      <p style={{ fontSize: 16, color: C.textSecondary, fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>INDUSTRY BENCHMARKS</p>
      <div style={{ display: 'flex', gap: 24 }}>
        {benchmarks.map((b, i) => (
          <div key={i} style={{ flex: 1, background: C.gray50, borderRadius: 14, padding: 28, borderLeft: `4px solid ${C.green}` }}>
            <div style={{ fontSize: 14, color: C.textSecondary, fontWeight: 600, marginBottom: 8 }}>{b.company}</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: C.green, marginBottom: 8 }}>{b.stat}</div>
            <div style={{ fontSize: 15, color: C.gray600, lineHeight: 1.5 }}>{b.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, padding: '14px 24px', background: C.greenBg, borderRadius: 12, borderLeft: `4px solid ${C.green}`, fontSize: 16, color: C.gray600, fontStyle: 'italic' }}>
        "Adani Group's $100B AI-ready data center investment signals the symmetry between energy and compute. We're ready to help."
      </div>
    </SlideLayout>
  );
};

const Slide6NextSteps: React.FC = () => (
  <SlideLayout>
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontSize: 14, color: C.green, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>NEXT STEPS</p>
      <h2 style={{ fontSize: 44, fontWeight: 800, color: C.text, marginBottom: 8 }}>Path to Production</h2>
      <p style={{ fontSize: 20, color: C.textSecondary }}>Same architecture. Your data. 4–6 week PoC.</p>
    </div>

    {/* Timeline */}
    <div style={{ display: 'flex', gap: 0, marginBottom: 48, position: 'relative' }}>
      {/* Connecting line */}
      <div style={{ position: 'absolute', top: 40, left: 100, right: 100, height: 3, background: C.gray200 }} />
      {[
        { week: 'Week 1–2', title: 'Data Integration', desc: 'ERP, TMS, WMS (or equivalent) — connect to existing data sources', icon: <Cpu size={24} />, color: C.navy },
        { week: 'Week 3–4', title: 'Control Tower', desc: 'KPIs, alerts, visibility — live dashboard with your data', icon: <BarChart3 size={24} />, color: C.green },
        { week: 'Week 5–6', title: 'Agentic Layer', desc: 'Custom exceptions, conversational insights, recommended actions', icon: <Bot size={24} />, color: C.amber },
      ].map((phase, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20, background: `${phase.color}15`, border: `3px solid ${phase.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: phase.color, marginBottom: 20,
          }}>
            {phase.icon}
          </div>
          <div style={{ fontSize: 14, color: phase.color, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>{phase.week}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8, textAlign: 'center' }}>{phase.title}</div>
          <div style={{ fontSize: 15, color: C.gray600, textAlign: 'center', lineHeight: 1.5, maxWidth: 320 }}>{phase.desc}</div>
        </div>
      ))}
    </div>

    {/* Deliverables */}
    <div style={{ display: 'flex', gap: 28 }}>
      <div style={{ flex: 1, background: C.gray50, borderRadius: 16, padding: 32, borderTop: `4px solid ${C.green}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 16 }}>PoC Deliverables</div>
        {['Live Control Tower with Adani Greens data', 'OTIF, freight optimization, pendency visibility', 'Exception alerts and prioritization', 'Agentic layer — recommended actions, conversational insights'].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontSize: 16, color: C.gray600 }}>
            <CheckCircle size={18} color={C.green} />
            <span>{d}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: C.navy, borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: `${C.white}80`, marginBottom: 16 }}>CALL TO ACTION</div>
        <p style={{ fontSize: 24, color: C.white, lineHeight: 1.5, marginBottom: 24 }}>
          "Let's schedule a technical deep-dive with your team to define the PoC scope."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: C.greenLight, fontSize: 16 }}>
          <Calendar size={18} />
          <span style={{ fontWeight: 600 }}>4–6 weeks to production-ready</span>
        </div>
      </div>
    </div>
  </SlideLayout>
);

// ── Main Pitch Component ──
const SLIDES = [Slide1Cover, Slide2Problem, Slide3Solution, Slide4Demo, Slide5ProofPoints, Slide6NextSteps];

const AdaniGreensPitch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Escape' && document.fullscreenElement) { document.exitFullscreen(); setIsFullscreen(false); }
      if (e.key === 'f' || e.key === 'F5') { e.preventDefault(); toggleFullscreen(); }
    };
    const fsHandler = () => { if (!document.fullscreenElement) setIsFullscreen(false); };
    window.addEventListener('keydown', handler);
    document.addEventListener('fullscreenchange', fsHandler);
    return () => { window.removeEventListener('keydown', handler); document.removeEventListener('fullscreenchange', fsHandler); };
  }, [next, prev, toggleFullscreen]);

  const SlideComponent = SLIDES[current];

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Toolbar */}
      {!isFullscreen && (
        <div style={{
          height: 48, background: '#111', borderBottom: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sun size={18} color={C.greenLight} />
            <span style={{ color: '#aaa', fontSize: 14, fontWeight: 600 }}>Adani Greens Pitch</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#666', fontSize: 13 }}>{current + 1} / {SLIDES.length}</span>
            <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 6 }}>
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <ScaledSlide containerRef={containerRef}>
          <SlideComponent />
        </ScaledSlide>
      </div>

      {/* Navigation */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.7)',
        borderRadius: 40, padding: '8px 16px', backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <button onClick={prev} disabled={current === 0} style={{ background: 'none', border: 'none', color: current === 0 ? '#333' : '#aaa', cursor: current === 0 ? 'default' : 'pointer', padding: 6 }}>
          <ChevronLeft size={20} />
        </button>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4,
              background: i === current ? C.greenLight : '#444',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }} />
          ))}
        </div>
        <button onClick={next} disabled={current === SLIDES.length - 1} style={{ background: 'none', border: 'none', color: current === SLIDES.length - 1 ? '#333' : '#aaa', cursor: current === SLIDES.length - 1 ? 'default' : 'pointer', padding: 6 }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail strip */}
      {!isFullscreen && (
        <div style={{
          height: 80, background: '#0d0d0d', borderTop: '1px solid #222',
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px',
          overflowX: 'auto', flexShrink: 0,
        }}>
          {SLIDES.map((S, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: 120, height: 68, borderRadius: 6, overflow: 'hidden',
              border: i === current ? `2px solid ${C.greenLight}` : '2px solid #333',
              cursor: 'pointer', flexShrink: 0, position: 'relative', background: '#111',
            }}>
              <div style={{
                width: SLIDE_W, height: SLIDE_H,
                transform: `scale(${120 / SLIDE_W})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}>
                <S />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdaniGreensPitch;
