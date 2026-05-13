import React, { useEffect, useState } from 'react';

/**
 * One-plant triangulation — mathematical validation (proxy run)
 * Management-facing deck. Light enterprise theme. Print-friendly.
 * Part A (1–6) = CXO storyline. Part B (7+) = Appendix / Deep dive.
 */

const ACCENT = '#0F766E'; // restrained teal
const SLATE = '#0F172A';
const MUTED = '#475569';
const BG = '#FAFAF7';
const CARD = '#FFFFFF';
const BORDER = '#E2E8F0';

type SlideMeta = { id: string; label: string; part: 'A' | 'B' };

const SLIDES: SlideMeta[] = [
  { id: 's1',  label: '1 · Cover',                       part: 'A' },
  { id: 's2',  label: '2 · The problem',                 part: 'A' },
  { id: 's3',  label: '3 · Our approach',                part: 'A' },
  { id: 's4',  label: '4 · What we achieved & proved',   part: 'A' },
  { id: 's5',  label: '5 · Outcome at a glance',         part: 'A' },
  { id: 's6',  label: '6 · How this deck is laid out',   part: 'A' },
  { id: 's7',  label: '7 · Bridge: story → spec',        part: 'B' },
  { id: 's8',  label: '8 · Built vs not built',          part: 'B' },
  { id: 's9',  label: '9 · Data spine',                  part: 'B' },
  { id: 's10', label: '10 · Governance',                 part: 'B' },
  { id: 's11', label: '11 · Math flow',                  part: 'B' },
  { id: 's12', label: '12 · Config constants',           part: 'B' },
  { id: 's13', label: '13 · Adoption probability',       part: 'B' },
  { id: 's14', label: '14 · Vehicle fit',                part: 'B' },
  { id: 's15', label: '15 · summary.json',               part: 'B' },
  { id: 's16', label: '16 · Top lanes',                  part: 'B' },
  { id: 's17', label: '17 · Read the headline',          part: 'B' },
  { id: 's18', label: '18 · Possibility space',          part: 'B' },
  { id: 's19', label: '19 · Roadmap to real data',       part: 'B' },
  { id: 's20', label: '20 · Ask / decision',             part: 'B' },
  { id: 's21', label: '21 · Glossary',                   part: 'B' },
];

const TOTAL = SLIDES.length;

const Footer: React.FC<{ n: number }> = ({ n }) => (
  <div
    className="absolute bottom-0 left-0 right-0 px-10 py-3 border-t text-[10.5px] leading-snug flex justify-between gap-6"
    style={{ borderColor: BORDER, color: MUTED, background: '#F8FAFC' }}
  >
    <span>
      Research-led synthetic / proxy inputs; not validated ERP or TMS data. · All headline "savings" are
      <strong style={{ color: SLATE }}> INDEX POINTS</strong> per published assumptions — not Indian Rupees — until a
      separate finance calibration maps index → ₹. · The model ranks and sizes opportunity; it does not replace
      dispatch, transporter contracts, or safety / compliance decisions.
    </span>
    <span className="font-mono whitespace-nowrap" style={{ color: '#94A3B8' }}>
      {String(n).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
    </span>
  </div>
);

const Slide: React.FC<{ id: string; n: number; children: React.ReactNode; dark?: boolean; part?: 'A' | 'B' }> = ({
  id, n, children, dark, part,
}) => (
  <section
    id={id}
    className="relative w-full mx-auto shadow-sm border print:shadow-none print:border-0 print:break-after-page"
    style={{
      maxWidth: 1280,
      minHeight: '92vh',
      background: dark ? SLATE : CARD,
      color: dark ? '#F1F5F9' : SLATE,
      borderColor: BORDER,
      marginBottom: 24,
    }}
  >
    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: ACCENT }} />
    {part && (
      <div
        className="absolute top-3 right-4 text-[10px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded"
        style={{
          color: part === 'A' ? ACCENT : '#64748B',
          background: part === 'A' ? '#F0FDFA' : '#F1F5F9',
          border: `1px solid ${part === 'A' ? '#99F6E4' : BORDER}`,
        }}
      >
        {part === 'A' ? 'Part A · Management' : 'Part B · Deep dive'}
      </div>
    )}
    <div className="px-12 pt-10 pb-20">{children}</div>
    <Footer n={n} />
  </section>
);

const SlideTitle: React.FC<{ kicker?: string; title: string; sub?: string }> = ({ kicker, title, sub }) => (
  <header className="mb-6">
    {kicker && (
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: ACCENT }}>
        {kicker}
      </div>
    )}
    <h2 className="text-3xl font-semibold tracking-tight" style={{ color: SLATE }}>
      {title}
    </h2>
    {sub && <p className="mt-2 text-[15px] max-w-3xl" style={{ color: MUTED }}>{sub}</p>}
  </header>
);

const Callout: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="rounded-md border-l-4 p-4 text-sm mt-5" style={{ borderColor: ACCENT, background: '#F0FDFA', color: SLATE }}>
    <div className="text-[10.5px] font-semibold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>
      {label}
    </div>
    {children}
  </div>
);

const Stat: React.FC<{ value: string; label: string; note?: string }> = ({ value, label, note }) => (
  <div className="rounded-md border p-5" style={{ borderColor: BORDER, background: '#F8FAFC' }}>
    <div className="text-4xl font-semibold tabular-nums" style={{ color: SLATE }}>{value}</div>
    <div className="mt-1 text-[13px] font-medium" style={{ color: SLATE }}>{label}</div>
    {note && <div className="mt-1 text-[11px]" style={{ color: MUTED }}>{note}</div>}
  </div>
);

// ---- Frozen data -----------------------------------------------------------
const SUMMARY_JSON = {
  model_version: '1.0',
  plant_id: 'DADRI-GR-001',
  distance_mode: 'great_circle_km',
  road_factor_k: 1.18,
  minimum_match_score_for_headline: 65.0,
  headline_expected_monthly_saving_index: 12244.8,
  pair_count_after_outbound_radius_filter: 190,
  pair_count_match_score_ge_threshold: 13,
  top_row: {
    match_id: 'M0001', plant_id: 'DADRI-GR-001', supplier_id: 'SUP-FA-001', material: 'Fly ash',
    supplier_return_city: 'Dadri', destination_id: 'GZB', destination_city: 'Ghaziabad',
    plant_to_dest_km: 16.2, return_deviation_km: 15.3, within_triangulation_delta: true,
    supplier_monthly_inbound_trips: 125.0, destination_monthly_dispatch_trips: 125.0, matched_trips_cap: 125.0,
    vehicle_fit_score: 48.0, vehicle_fit_band: 'Low', transporter_fit_prob: 0.9, transporter_score: 90.0,
    proximity_score: 69.3, volume_score: 100.0, commercial_score: 84.7, match_score: 78.9,
    gross_empty_return_index: 60.0, detour_cost_index: 9.2, net_saving_index_per_trip: 23.8,
    expected_monthly_saving_index: 1606.5, actionability: 'Medium',
  },
};

const PAIRS_HEADER = [
  'match_id','supplier_id','material','supplier_return_city','destination_city',
  'plant_to_dest_km','return_deviation_km','matched_trips_cap','vehicle_fit_band',
  'proximity_score','volume_score','commercial_score','match_score',
  'detour_cost_index','net_saving_index_per_trip','expected_monthly_saving_index','actionability',
];

const PAIRS_ROWS: (string | number)[][] = [
  ['M0001','SUP-FA-001','Fly ash','Dadri','Ghaziabad',16.2,15.3,125,'Low',69.3,100.0,84.7,78.9,9.2,23.8,1606.5,'Medium'],
  ['M0002','SUP-FA-001','Fly ash','Dadri','Noida',16.0,15.8,125,'Low',68.5,83.3,84.2,75.0,9.5,23.5,1586.2,'Medium'],
  ['M0003','SUP-FA-001','Fly ash','Dadri','Greater Noida',10.0,10.5,105,'Low',78.9,84.0,89.5,78.6,6.3,26.7,1513.9,'Medium'],
  ['M0004','SUP-FA-002','Fly ash','Panipat','Panipat',109.5,0.6,90,'Medium',98.7,81.8,99.3,84.0,0.4,32.6,1320.3,'Medium'],
  ['M0005','SUP-SLG-001','Slag/Additive','Ghaziabad','Ghaziabad',16.2,0.4,70,'Low',99.2,56.0,99.7,77.9,0.2,32.8,1102.1,'Medium'],
  ['M0006','SUP-FA-001','Fly ash','Dadri','Faridabad',28.1,28.2,110,'Low',43.5,88.0,71.8,67.8,16.9,16.1,956.3,'Medium'],
  ['M0007','SUP-SLG-002','Slag/Additive','Meerut','Meerut',50.2,0.6,60,'Low',98.8,63.2,99.3,77.7,0.4,32.6,821.5,'Medium'],
  ['M0008','SUP-SLG-001','Slag/Additive','Ghaziabad','Noida',16.0,16.0,70,'Low',67.9,46.7,84.0,65.5,9.6,23.4,786.2,'Medium'],
  ['M0009','SUP-FA-003','Fly ash','Yamunanagar','Yamunanagar',177.4,1.2,55,'Medium',97.6,68.8,98.8,79.2,0.7,32.3,692.8,'Medium'],
  ['M0010','SUP-SLG-001','Slag/Additive','Ghaziabad','Greater Noida',10.0,22.4,70,'Low',55.2,66.7,77.7,65.7,13.4,19.6,658.6,'Medium'],
  ['M0011','SUP-FA-004','Fly ash','Ropar','Ropar',286.2,0.8,45,'Medium',98.4,64.3,99.2,77.7,0.5,32.5,526.5,'Medium'],
  ['M0012','SUP-SLG-001','Slag/Additive','Ghaziabad','Faridabad',28.1,31.8,70,'Low',36.4,63.6,68.2,58.8,19.1,13.9,467.0,'Low'],
  ['M0013','SUP-SLG-001','Slag/Additive','Ghaziabad','Delhi',47.2,34.1,70,'Low',31.8,43.8,65.8,52.9,20.5,12.5,420.0,'Low'],
  ['M0014','SUP-FA-002','Fly ash','Panipat','Karnal',137.3,32.9,65,'Medium',34.1,59.1,67.0,57.7,19.8,13.2,386.1,'Low'],
  ['M0015','SUP-CLK-002','Clinker','Rauri','Ropar',286.2,21.8,45,'Medium',56.4,69.2,78.2,66.4,13.1,19.9,349.2,'Medium'],
  ['M0016','SUP-FA-001','Fly ash','Dadri','Delhi',47.2,46.5,125,'Low',7.0,78.1,53.5,53.5,27.9,5.1,344.2,'Low'],
  ['M0017','SUP-GYP-001','Gypsum','Bikaner','Bikaner',419.5,0.4,30,'High',99.3,46.2,99.7,79.8,0.2,32.8,324.7,'Medium'],
  ['M0018','SUP-CLK-002','Clinker','Rauri','Chandigarh',253.7,35.5,65,'Medium',28.9,100.0,64.5,64.1,21.3,11.7,296.6,'Low'],
  ['M0019','SUP-FA-004','Fly ash','Ropar','Chandigarh',253.7,35.5,65,'Medium',29.0,92.9,64.5,61.0,21.3,11.7,273.8,'Low'],
  ['M0020','SUP-SLG-001','Slag/Additive','Ghaziabad','Meerut',50.2,43.0,70,'Low',14.1,73.7,57.0,53.7,25.8,7.2,241.9,'Low'],
  ['M0021','SUP-SLG-002','Slag/Additive','Meerut','Ghaziabad',16.2,42.6,60,'Low',14.7,48.0,57.3,46.6,25.6,7.4,186.5,'Low'],
];

const CONFIG_ROWS: { k: string; v: string; what: string; mgmt: string }[] = [
  { k: 'model_version', v: '1.0', what: 'Written into summary.json for audit trail.', mgmt: '"Which scenario file ran?"' },
  { k: 'distances.mode', v: 'great_circle_km', what: 'All legs use haversine km in v1 default.', mgmt: 'Same distance philosophy as the Excel proxy columns.' },
  { k: 'distances.road_factor_k', v: '1.18', what: 'Used only if mode = road_proxy_km — multiplies every leg.', mgmt: 'Placeholder until routing API / toll-aware network exists.' },
  { k: 'filters.max_outbound_radius_km', v: '500', what: 'Drops destination cities farther than this from plant.', mgmt: '"Which markets this plant model includes."' },
  { k: 'filters.triangulation_delta_cap_km', v: '50', what: 'If supplier→destination > cap, net saving index = 0.', mgmt: '"How strict we are about near-return alignment."' },
  { k: 'commercial.forward_freight_index', v: '100', what: 'Reserved baseline; not driving v1 per-trip formula.', mgmt: 'Anchor for future INR-per-trip calibration.' },
  { k: 'commercial.gross_empty_return_index', v: '60', what: 'Index cost of empty return / reposition before detour.', mgmt: '"How painful empty return is in index space."' },
  { k: 'commercial.avoidable_share_of_empty_return', v: '0.55', what: 'Fraction of gross empty index treated as recoverable before detour.', mgmt: '"Conservative share triangulation can touch."' },
  { k: 'commercial.detour_index_per_km', v: '0.6', what: 'Index penalty per km of return deviation.', mgmt: '"Penalise deliveries off the natural return vector."' },
  { k: 'commercial.adoption_probability', v: '0.6', what: 'Multiplier on EXPECTED index — see slide 13.', mgmt: '"Reality haircut on execution — not geography alone."' },
  { k: 'commercial.minimum_match_score_for_headline', v: '65', what: 'Only pairs with match score ≥ this add to headline sum.', mgmt: '"Quality bar for counting a lane in the headline KPI."' },
  { k: 'scoring.weights', v: 'prox 0.22 · vol 0.22 · comm 0.22 · veh 0.18 · trans 0.16', what: 'Linear blend into match score (sum 1.0).', mgmt: 'How RANKING trades off geometry, volume, kit, people factors.' },
  { k: 'vehicle_fit.default_score', v: '50', what: 'Score used when inbound vehicle label not in table.', mgmt: '"Unknown equipment does not get a free pass."' },
  { k: 'vehicle_fit.inbound_to_covered_truck', v: 'CT 95 · Tipper/Bulker 48 · Bulker 58 · Trailer 62 · Tipper 50', what: 'Maps inbound equipment label to a 0–100 score vs outbound Covered Truck.', mgmt: 'Equipment feasibility as a first-class input.' },
];

// ---- Component -------------------------------------------------------------
const fmt = (v: any) => (typeof v === 'number' ? v.toLocaleString('en-IN') : String(v));

const OnePlantTriangulationDeck: React.FC = () => {
  const [active, setActive] = useState('s1');
  useEffect(() => {
    const onScroll = () => {
      let cur = active;
      for (const s of SLIDES) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 200) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  const partA = SLIDES.filter(s => s.part === 'A');
  const partB = SLIDES.filter(s => s.part === 'B');

  return (
    <div style={{ background: BG, minHeight: '100vh', color: SLATE, fontFamily: 'ui-sans-serif, system-ui' }}>
      {/* Sticky mini-nav grouped by Part A | Part B */}
      <nav className="sticky top-0 z-20 print:hidden border-b backdrop-blur" style={{ background: 'rgba(250,250,247,0.92)', borderColor: BORDER }}>
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex items-center gap-3">
          <div className="text-[12px] font-semibold tracking-tight whitespace-nowrap" style={{ color: SLATE }}>
            One-plant triangulation
            <span className="ml-2 text-[10.5px] font-normal" style={{ color: MUTED }}>
              proxy run · index points, not ₹
            </span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] px-1.5" style={{ color: ACCENT }}>
                Part A · Mgmt
              </span>
              <div className="flex gap-1">
                {partA.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="text-[11px] px-2 py-1 rounded whitespace-nowrap transition-colors"
                    style={{ color: active === s.id ? '#fff' : MUTED, background: active === s.id ? ACCENT : 'transparent' }}>
                    {s.label}
                  </a>
                ))}
              </div>
              <span className="mx-2 text-[10px]" style={{ color: '#CBD5E1' }}>│</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] px-1.5" style={{ color: '#64748B' }}>
                Part B · Deep dive
              </span>
              <div className="flex gap-1">
                {partB.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="text-[11px] px-2 py-1 rounded whitespace-nowrap transition-colors"
                    style={{ color: active === s.id ? '#fff' : MUTED, background: active === s.id ? ACCENT : 'transparent' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => window.print()}
            className="text-[11px] font-medium px-3 py-1.5 rounded border whitespace-nowrap"
            style={{ borderColor: ACCENT, color: ACCENT }}>
            Print / PDF
          </button>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-4 py-8">

        {/* SLIDE 1 — Cover */}
        <Slide id="s1" n={1} dark>
          <div className="flex flex-col h-[78vh] justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#5EEAD4' }}>
                Management briefing · Cement & Logistics leadership
              </div>
              <div className="mt-1 text-[12px]" style={{ color: '#94A3B8' }}>
                Method before scale · proxy run · transparent scoring · Part A for CXOs, Part B for working teams
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight max-w-4xl" style={{ color: '#F8FAFC' }}>
                One-plant triangulation —<br />
                <span style={{ color: '#5EEAD4' }}>mathematical validation</span> (proxy run)
              </h1>
              <p className="mt-5 text-lg max-w-3xl" style={{ color: '#CBD5E1' }}>
                Transparent scoring model and deterministic simulation for a single plant hub — baseline before
                governed operational data.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-3xl">
              {[
                ['Plant in scope', 'DADRI-GR-001 · grinding-unit proxy'],
                ['Distance mode', 'great_circle_km (haversine)'],
                ['Headline unit', 'Index points — NOT ₹'],
              ].map(([a, b]) => (
                <div key={a} className="border rounded-md p-4" style={{ borderColor: '#1E293B', background: '#0B1220' }}>
                  <div className="text-[10.5px] uppercase tracking-widest" style={{ color: '#5EEAD4' }}>{a}</div>
                  <div className="mt-1 text-[14px]" style={{ color: '#E2E8F0' }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* SLIDE 2 — The problem (plain English) */}
        <Slide id="s2" n={2} part="A">
          <SlideTitle kicker="Part A · The problem"
            title="Empty return legs cost money. The combination space is too large to argue in spreadsheets."
            sub="Plain English. No equations. No config." />
          <ul className="space-y-3 text-[15px] leading-relaxed max-w-4xl">
            <li className="flex gap-3"><span style={{ color: ACCENT }}>•</span><span>
              Raw materials arrive at the plant by truck; often those assets <strong>do not go straight to the next paid load</strong> —
              empty or repositioning legs cost money and time.</span></li>
            <li className="flex gap-3"><span style={{ color: ACCENT }}>•</span><span>
              The plant also <strong>ships cement out</strong> to many cities — a separate outbound programme run on different commercials.</span></li>
            <li className="flex gap-3"><span style={{ color: ACCENT }}>•</span><span>
              The opportunity: if a delivery city sits near where a truck would <strong>naturally return</strong> after inbound material,
              we might <strong>share or reduce</strong> that empty leg — but the pair-space is huge and easy to argue without discipline.</span></li>
            <li className="flex gap-3"><span style={{ color: ACCENT }}>•</span><span>
              Today we <strong>do not</strong> have full operational truth from every plant in one system — we still need a
              <strong> credible method</strong> to show where to focus first.</span></li>
          </ul>
          <Callout label="What this slide is NOT">
            Not a P&L claim. Not a TMS replacement. Not multi-plant. One plant, one method, debated openly.
          </Callout>
        </Slide>

        {/* SLIDE 3 — Our approach (plain English) */}
        <Slide id="s3" n={3} part="A">
          <SlideTitle kicker="Part A · Our approach"
            title="One plant. Clear distance rules. A transparent score. A debatable shortlist."
            sub="No equations on this page — just the recipe in three steps." />
          <div className="grid grid-cols-3 gap-5">
            {[
              ['1 · Pick one hub', 'We took ONE plant and treated it as the hub. Every supplier cluster and every dispatch city is enumerated against it.'],
              ['2 · Apply clear rules', 'We combined where suppliers effectively RETURN from with where we DISPATCH cement to, using documented distance filters and a 0–100 transparent score — not live GPS, not a black box.'],
              ['3 · Output a ranked list', 'We produce a TABLE OF CANDIDATE LANES (supplier × destination city) that leadership and ops can debate and pilot. The tool prioritises attention; it does not auto-run trucks.'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border p-5" style={{ borderColor: BORDER }}>
                <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{k}</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{v}</p>
              </div>
            ))}
          </div>
          <Callout label="Why deterministic">
            Same inputs and same config → same ranked table and same headline roll-up. Auditable, reproducible, easy to challenge.
          </Callout>
        </Slide>

        {/* SLIDE 4 — What we achieved & proved */}
        <Slide id="s4" n={4} part="A">
          <SlideTitle kicker="Part A · What we achieved & proved"
            title="The method holds — even while enterprise data integration catches up." />
          <div className="grid grid-cols-3 gap-5">
            {[
              ['Built', 'A documented mathematical pipeline (inputs → filters → scores → savings INDEX) that anyone can re-run and audit. Same inputs, same answers.'],
              ['Ran', 'End-to-end on a realistic proxy for one grinding-style plant — REAL latitudes and longitudes for plant, supplier clusters, and cities (research-led demo data, not a full ERP extract).'],
              ['Proved', 'We can already produce a defensible SHORTLIST of where triangulation is worth deeper operational work BEFORE we finish enterprise data integration. The recipe is robust to data maturity.'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border p-5" style={{ borderColor: ACCENT, background: '#F0FDFA' }}>
                <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{k}</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border p-5" style={{ borderColor: BORDER, background: '#F8FAFC' }}>
            <div className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: MUTED }}>So what?</div>
            <p className="text-sm" style={{ color: SLATE }}>
              We have a <strong>repeatable plant-by-plant pattern</strong>. As each real site is onboarded, the same engine
              consumes its governed coordinates and trip counts and produces a comparable ranked table — no rebuild required.
            </p>
          </div>
        </Slide>

        {/* SLIDE 5 — Outcome at a glance */}
        <Slide id="s5" n={5} part="A">
          <SlideTitle kicker="Part A · Outcome at a glance"
            title="One run. Three numbers. One hero lane to remember."
            sub="All values below are INDEX POINTS under published assumptions — not Indian Rupees." />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Stat value="190" label="Feasible supplier × destination combinations" note="after the 500 km outbound reach filter" />
            <Stat value="13" label="Combinations above the headline quality bar" note="match_score ≥ 65" />
            <Stat value="12,244.8" label="Combined opportunity INDEX per month" note="sum across the 13 qualifying lanes — NOT ₹" />
          </div>
          <div className="rounded-md border p-5 mb-4" style={{ borderColor: ACCENT, background: '#F0FDFA' }}>
            <div className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>
              One concrete hero lane to remember
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: SLATE }}>
              <strong>Fly ash · Dadri → Ghaziabad.</strong> 125 monthly trips align on both inbound and outbound sides;
              the delivery city sits ~15 km from the natural return geography. After the detour penalty, expected monthly
              opportunity index is <strong>1,606.5</strong> with a match score of <strong>78.9</strong> — the cleanest lane in this run.
            </p>
          </div>
          <p className="text-[13px]" style={{ color: MUTED }}>
            What this tells us: <strong>where to pilot</strong> and <strong>what data to tighten next</strong> — not a final P&L.
          </p>
        </Slide>

        {/* SLIDE 6 — How this deck is laid out */}
        <Slide id="s6" n={6} part="A">
          <SlideTitle kicker="Part A · You are here"
            title="A roadmap of the remaining pages — so you can decide where to stop reading." />
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-md border p-5" style={{ borderColor: ACCENT, background: '#F0FDFA' }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
                Part A · For executives (slides 1–6)
              </div>
              <ul className="text-sm space-y-2" style={{ color: SLATE }}>
                <li><strong>1</strong> — Title and guardrails.</li>
                <li><strong>2–5</strong> — The full business story in plain English: problem → approach → what we achieved and proved → outcome numbers.</li>
                <li><strong>6 · this slide</strong> — Roadmap of what comes next.</li>
              </ul>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#64748B' }}>
                Part B · Deep dive (slides 7–21)
              </div>
              <ul className="text-sm space-y-1.5" style={{ color: MUTED }}>
                <li><strong>7–8</strong> — Bridge + what we did NOT claim.</li>
                <li><strong>9–10</strong> — Where the data comes from today vs at scale.</li>
                <li><strong>11–12</strong> — How the calculation works + every config dial.</li>
                <li><strong>13–14</strong> — Why the adoption haircut and vehicle rules exist.</li>
                <li><strong>15–16</strong> — Raw outputs (summary + ranked table).</li>
                <li><strong>17–20</strong> — Reading the headline · scaling · roadmap to real data · ask.</li>
                <li><strong>21</strong> — Glossary for specialists.</li>
              </ul>
            </div>
          </div>
          <Callout label="Reading guide">
            Executives can stop after Slide 6. Slides 7+ support working sessions with planning, analytics, and IT.
          </Callout>
        </Slide>

        {/* ===== Section divider — Appendix / Deep dive ===== */}
        <div className="max-w-[1280px] mx-auto my-6 px-4 print:hidden">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: BORDER }} />
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded border"
              style={{ color: '#64748B', borderColor: BORDER, background: '#F1F5F9' }}>
              Appendix · Deep dive begins
            </div>
            <div className="flex-1 h-px" style={{ background: BORDER }} />
          </div>
        </div>

        {/* SLIDE 7 — Bridge */}
        <Slide id="s7" n={7} part="B">
          <SlideTitle kicker="Part B · Bridge"
            title="From story to specification."
            sub="Slides 2–5 told the story. Slides 7+ are the spec behind it — for planning, analytics, and IT teams." />
          <div className="grid grid-cols-2 gap-5">
            {[
              ['We are not optimising routes in TMS.', 'No live GPS, no slot management, no rate-card ingestion.'],
              ['We rank opportunities under published assumptions.', 'Every filter and weight is in one config file — auditable, not buried.'],
              ['Index ≠ cash.', 'A finance workshop converts index to ₹ once a baseline empty-return cost is agreed per plant.'],
              ['One plant, deliberately.', 'The same engine onboards subsequent plants with their own governed coordinates.'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border p-4" style={{ borderColor: BORDER }}>
                <div className="text-sm font-semibold" style={{ color: SLATE }}>{k}</div>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{v}</p>
              </div>
            ))}
          </div>
        </Slide>

        {/* SLIDE 8 — Built vs not built */}
        <Slide id="s8" n={8} part="B">
          <SlideTitle kicker="Scope contract" title="What we built — and what we deliberately did not." />
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-md border p-5" style={{ borderColor: ACCENT, background: '#F0FDFA' }}>
              <div className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>What we built</div>
              <ul className="space-y-2 text-sm leading-relaxed list-disc pl-5">
                <li>A transparent mathematical model that enumerates every (supplier × destination) pair for one plant.</li>
                <li>Documented filters: outbound radius cap, triangulation delta cap.</li>
                <li>Index-based commercials: gross empty return, avoidable share, per-km detour penalty.</li>
                <li>Five subscores blended into a single 0–100 match score with declared weights.</li>
                <li>Deterministic Python run → frozen <code>summary.json</code> + <code>pairs.csv</code>.</li>
              </ul>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: '#E11D48', background: '#FFF1F2' }}>
              <div className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#BE123C' }}>What we did NOT build</div>
              <ul className="space-y-2 text-sm leading-relaxed list-disc pl-5">
                <li>Not a TMS replacement — no live GPS, no dispatch slot management.</li>
                <li>Not a transporter contract engine — no rate-card ingestion.</li>
                <li>Not a claim in INR — every "saving" is an <strong>index point</strong> until finance calibration.</li>
                <li>Not a safety / compliance / permit decision system.</li>
                <li>Not multi-plant — one plant hub, deliberately, to debate the recipe.</li>
              </ul>
            </div>
          </div>
        </Slide>

        {/* SLIDE 9 — Data spine */}
        <Slide id="s9" n={9} part="B">
          <SlideTitle kicker="Data spine"
            title="Three geographic layers drive every distance and filter."
            sub="Dadri grinding-unit proxy: real lat/long taken from research-led synthetic seeds. Hardcoded for repeatability — not extracted live from operational masters." />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <table className="w-full text-sm border" style={{ borderColor: BORDER }}>
                <thead>
                  <tr style={{ background: '#F1F5F9' }}>
                    <th className="text-left p-2 border" style={{ borderColor: BORDER }}>Layer</th>
                    <th className="text-left p-2 border" style={{ borderColor: BORDER }}>What it is</th>
                    <th className="text-left p-2 border" style={{ borderColor: BORDER }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1 — Plant', 'Plant hub anchor coordinates', 'Outbound reach filter (plant → destination)'],
                    ['2 — Supplier cluster', 'Return anchor for inbound leg', 'Compute return deviation = supplier → destination'],
                    ['3 — Dispatch destinations', 'Outbound cities + monthly trip counts', 'Pair with each supplier; cap by min(in, out)'],
                  ].map(([a, b, c]) => (
                    <tr key={a}>
                      <td className="p-2 border align-top font-medium" style={{ borderColor: BORDER }}>{a}</td>
                      <td className="p-2 border align-top" style={{ borderColor: BORDER, color: MUTED }}>{b}</td>
                      <td className="p-2 border align-top" style={{ borderColor: BORDER, color: MUTED }}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-md border p-6" style={{ borderColor: BORDER, background: '#F8FAFC' }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Schematic</div>
              <svg viewBox="0 0 320 200" className="w-full">
                <circle cx="60" cy="140" r="9" fill={ACCENT} />
                <text x="60" y="165" textAnchor="middle" fontSize="11" fill={SLATE}>Supplier</text>
                <circle cx="160" cy="50" r="11" fill={SLATE} />
                <text x="160" y="34" textAnchor="middle" fontSize="11" fill={SLATE}>Plant</text>
                <circle cx="260" cy="140" r="9" fill="#0EA5E9" />
                <text x="260" y="165" textAnchor="middle" fontSize="11" fill={SLATE}>Destination</text>
                <line x1="60" y1="140" x2="160" y2="50" stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 3" />
                <line x1="160" y1="50" x2="260" y2="140" stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 3" />
                <line x1="60" y1="140" x2="260" y2="140" stroke={ACCENT} strokeWidth="2" />
                <text x="160" y="155" textAnchor="middle" fontSize="10" fill={ACCENT}>return deviation</text>
              </svg>
            </div>
          </div>
        </Slide>

        {/* SLIDE 10 — Governance */}
        <Slide id="s10" n={10} part="B">
          <SlideTitle kicker="Governance"
            title="Hardcoded today — retrieved and governed tomorrow."
            sub="At scale, every coordinate must come from an approved source with a named data owner." />
          <div className="grid grid-cols-2 gap-5">
            {[
              ['Plant + dispatch nodes', 'Survey / GIS or enterprise plant master.', 'Owner: Logistics IT'],
              ['Supplier return anchor', 'Vendor master, GST address, GRN loading location, or transporter billing location.', 'Owner: Procurement + Master Data'],
              ['Customer / depot', 'Sales logistics master linked to dispatch analytics.', 'Owner: Commercial Ops'],
              ['Inbound / outbound trips', 'ERP weighbridge + TMS gate-out, monthly aggregation.', 'Owner: Plant Logistics'],
            ].map(([a, b, c]) => (
              <div key={a} className="rounded-md border p-5" style={{ borderColor: BORDER }}>
                <div className="text-sm font-semibold" style={{ color: SLATE }}>{a}</div>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{b}</p>
                <div className="mt-2 text-[11px] font-medium" style={{ color: ACCENT }}>{c}</div>
              </div>
            ))}
          </div>
          <Callout label="Why hardcoded for now">
            Lat/long are explicit research proxies so the <strong>method is testable</strong> without waiting for IT
            integration. The same engine accepts real masters the day they are wired.
          </Callout>
        </Slide>

        {/* SLIDE 11 — Math flow */}
        <Slide id="s11" n={11} part="B">
          <SlideTitle kicker="Mathematical flow" title="For each (supplier i, destination j) — a deterministic seven-step pipeline." />
          <ol className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Compute plant→destination km. If > max_outbound_radius_km → discard.', '1'],
              ['Compute return_deviation_km = supplier → destination (great-circle in v1).', '2'],
              ['If return_deviation_km > triangulation_delta_cap_km → net saving index = 0 (watchlist).', '3'],
              ['Else: detour_cost_index = detour_index_per_km × return_deviation_km.', '4'],
              ['net_saving_index_per_trip = max(0, avoidable_share × gross_empty_return_index − detour_cost_index).', '5'],
              ['matched_trips_cap = min(monthly inbound trips, monthly outbound trips).', '6'],
              ['expected_monthly_saving_index = matched_trips_cap × net_per_trip × adoption_probability × transporter_fit_prob.', '7'],
              ['In parallel: 5 subscores (proximity, volume, commercial, vehicle, transporter) → match_score 0–100.', 'R'],
            ].map(([t, n]) => (
              <li key={n} className="flex gap-3 border rounded-md p-3" style={{ borderColor: BORDER }}>
                <span className="font-mono text-[13px] font-semibold w-6 shrink-0" style={{ color: ACCENT }}>{n}</span>
                <span style={{ color: SLATE }}>{t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-md border p-4 font-mono text-[12.5px]" style={{ borderColor: ACCENT, background: '#F0FDFA', color: SLATE }}>
            HEADLINE = Σ expected_monthly_saving_index over pairs where match_score ≥ minimum_match_score_for_headline
          </div>
        </Slide>

        {/* SLIDE 12 — Config constants */}
        <Slide id="s12" n={12} part="B">
          <SlideTitle kicker="Config constants" title="Every dial in one place — what runs in code, and how to read it." />
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px] border" style={{ borderColor: BORDER }}>
              <thead>
                <tr style={{ background: '#F1F5F9' }}>
                  <th className="text-left p-2 border" style={{ borderColor: BORDER, width: '20%' }}>Config key</th>
                  <th className="text-left p-2 border" style={{ borderColor: BORDER, width: '18%' }}>Value</th>
                  <th className="text-left p-2 border" style={{ borderColor: BORDER, width: '32%' }}>What it does in the simulation</th>
                  <th className="text-left p-2 border" style={{ borderColor: BORDER, width: '30%' }}>Management reading</th>
                </tr>
              </thead>
              <tbody>
                {CONFIG_ROWS.map((r) => (
                  <tr key={r.k}>
                    <td className="p-2 border font-mono align-top" style={{ borderColor: BORDER }}>{r.k}</td>
                    <td className="p-2 border font-mono align-top" style={{ borderColor: BORDER, color: ACCENT }}>{r.v}</td>
                    <td className="p-2 border align-top" style={{ borderColor: BORDER, color: MUTED }}>{r.what}</td>
                    <td className="p-2 border align-top" style={{ borderColor: BORDER, color: MUTED }}>{r.mgmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Slide>

        {/* SLIDE 13 — Adoption probability */}
        <Slide id="s13" n={13} part="B">
          <SlideTitle kicker="Q & A" title="Why commercial.adoption_probability = 0.6?"
            sub="A documented haircut on the geometric ceiling — risk-adjusted opportunity, not physics optimum." />
          <Callout label="Management will ask">
            "Why multiply savings by 0.6? Are we making the number small on purpose?"
          </Callout>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold" style={{ color: SLATE }}>Why a haircut at all</div>
              <p className="mt-2 text-sm" style={{ color: MUTED }}>
                Even when geometry and trip counts look perfect, real ops do not convert every theoretical backhaul.
                Dispatch windows conflict, customers insist on slots, transporters refuse to share asset days,
                commercial terms are not closed, plant silo / loading rules block sequences. A 100% number would be fiction.
              </p>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold" style={{ color: SLATE }}>Why in YAML</div>
              <p className="mt-2 text-sm" style={{ color: MUTED }}>
                The dial is explicit, configurable and auditable — not buried in a hidden spreadsheet cell. In a pilot,
                replace 0.6 with evidence: fraction of trial lanes actually executed, or workshop estimates from
                dispatch + sales + transport.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-md border p-4 font-mono text-[12.5px]" style={{ borderColor: BORDER, background: '#F8FAFC' }}>
            expected_monthly_saving_index = matched_trips_cap × net_saving_index_per_trip × <span style={{ color: ACCENT }}>adoption_probability</span> × transporter_fit_prob
          </div>
          <p className="mt-3 text-[12px]" style={{ color: MUTED }}>
            Stress test: setting adoption → 1.0 belongs in a clearly labelled <em>upper-bound sensitivity appendix</em>,
            never as base case without alignment.
          </p>
        </Slide>

        {/* SLIDE 14 — Vehicle fit */}
        <Slide id="s14" n={14} part="B">
          <SlideTitle kicker="Q & A" title="Why vehicle_fit and inbound_to_covered_truck?"
            sub="Distance-only models rank lanes that are mathematically neat but operationally impossible." />
          <Callout label="Management will ask">
            "Why do we need vehicle scores? Can't we just use distance?"
          </Callout>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold mb-2">What it is</div>
              <p className="text-sm" style={{ color: MUTED }}>
                A declared lookup table in config (not ML) mapping the inbound preferred-vehicle label to a 0–100
                score against the outbound vehicle type — Covered Truck in this demo.
              </p>
              <table className="w-full mt-3 text-sm border" style={{ borderColor: BORDER }}>
                <thead>
                  <tr style={{ background: '#F1F5F9' }}>
                    <th className="text-left p-2 border" style={{ borderColor: BORDER }}>Inbound label</th>
                    <th className="text-left p-2 border" style={{ borderColor: BORDER }}>Score vs Covered Truck</th>
                  </tr>
                </thead>
                <tbody>
                  {[['Covered Truck',95],['Trailer',62],['Bulker',58],['Tipper',50],['Tipper/Bulker',48],['default',50]].map(([a,b]) => (
                    <tr key={a as string}>
                      <td className="p-2 border" style={{ borderColor: BORDER }}>{a}</td>
                      <td className="p-2 border font-mono" style={{ borderColor: BORDER, color: ACCENT }}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold mb-2">What it is NOT</div>
              <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: MUTED }}>
                <li>Not a permit engine.</li>
                <li>Not a cleaning / contamination SOP.</li>
                <li>Not a legal or safety guarantee.</li>
                <li>A transparent placeholder until TMS + commodity rules feed a richer matrix.</li>
              </ul>
              <div className="mt-4 text-sm font-semibold" style={{ color: SLATE }}>Why the naming</div>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>
                Demo outbound fleet = Covered Truck. The table is keyed as "inbound vs that outbound class." Real
                plants with mixed outbound add columns; the management message holds — equipment feasibility is a
                first-class input.
              </p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 15 — summary.json */}
        <Slide id="s15" n={15} part="B">
          <SlideTitle kicker="Results · summary.json" title="One deterministic Python run on the bundled inputs and config." />
          <div className="grid grid-cols-3 gap-4 mb-5">
            <Stat value="190" label="Feasible pairs after 500 km outbound filter" note="pair_count_after_outbound_radius_filter" />
            <Stat value="13" label="Pairs with match_score ≥ 65 (headline contributors)" note="pair_count_match_score_ge_threshold" />
            <Stat value="12,244.8" label="Headline expected monthly saving — INDEX, not ₹" note="sum over 13 qualifying lanes" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5 text-sm">
            <div className="border rounded-md p-3" style={{ borderColor: BORDER }}>
              <div className="text-[11px] uppercase tracking-widest" style={{ color: MUTED }}>Plant</div>
              <div className="font-mono">{SUMMARY_JSON.plant_id}</div>
            </div>
            <div className="border rounded-md p-3" style={{ borderColor: BORDER }}>
              <div className="text-[11px] uppercase tracking-widest" style={{ color: MUTED }}>Distance mode</div>
              <div className="font-mono">{SUMMARY_JSON.distance_mode}</div>
            </div>
            <div className="border rounded-md p-3" style={{ borderColor: BORDER }}>
              <div className="text-[11px] uppercase tracking-widest" style={{ color: MUTED }}>Road factor (inactive)</div>
              <div className="font-mono">{SUMMARY_JSON.road_factor_k}</div>
            </div>
          </div>
          <details className="rounded-md border" style={{ borderColor: BORDER }}>
            <summary className="px-4 py-2 cursor-pointer text-[12px] font-medium" style={{ color: ACCENT }}>
              View raw summary.json
            </summary>
            <pre className="text-[11.5px] p-4 overflow-x-auto" style={{ background: '#0F172A', color: '#E2E8F0' }}>
{JSON.stringify(SUMMARY_JSON, null, 2)}
            </pre>
          </details>
          <Callout label="Hero lane (top_row)">
            <span className="font-mono">M0001</span> — Fly ash · Dadri → Ghaziabad · match_score{' '}
            <strong>78.9</strong> · expected_monthly_saving_index <strong>1,606.5</strong> · Medium actionability.
          </Callout>
        </Slide>

        {/* SLIDE 16 — Top lanes */}
        <Slide id="s16" n={16} part="B">
          <SlideTitle kicker="Results · ranked lanes" title="Top 21 ranked pairs from outputs/pairs.csv."
            sub="Highlighted columns: supplier_return_city, destination_city, match_score, expected_monthly_saving_index, actionability." />
          <div className="overflow-x-auto border rounded-md" style={{ borderColor: BORDER }}>
            <table className="w-full text-[11px]">
              <thead>
                <tr style={{ background: '#F1F5F9' }}>
                  {PAIRS_HEADER.map((h) => {
                    const hl = ['supplier_return_city','destination_city','match_score','expected_monthly_saving_index','actionability'].includes(h);
                    return (
                      <th key={h} className="text-left p-2 border whitespace-nowrap" style={{ borderColor: BORDER, color: hl ? ACCENT : SLATE }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PAIRS_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 ? '#FAFAF7' : '#fff' }}>
                    {row.map((cell, j) => {
                      const head = PAIRS_HEADER[j];
                      const hl = ['match_score','expected_monthly_saving_index','actionability','supplier_return_city','destination_city'].includes(head);
                      return (
                        <td key={j} className="p-1.5 border whitespace-nowrap font-mono tabular-nums" style={{ borderColor: BORDER, color: hl ? SLATE : MUTED, fontWeight: hl ? 600 : 400 }}>
                          {fmt(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Slide>

        {/* SLIDE 17 — Read the headline */}
        <Slide id="s17" n={17} part="B">
          <SlideTitle kicker="How to read the headline" title="12,244.8 is the sum of 13 lanes. It is index, not cash." />
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold mb-2">What the number is</div>
              <p className="text-sm" style={{ color: MUTED }}>
                A trip-weighted, probability-scaled, configuration-deterministic <strong>opportunity index</strong>{' '}
                across the 13 lanes that cleared the match-score gate of 65. Magnitude indicator — not a forecast,
                not a budget, not a P&L line.
              </p>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold mb-2">What it is not</div>
              <p className="text-sm" style={{ color: MUTED }}>
                It is not rupees. It is not "savings achievable next quarter." It is not net of execution cost beyond
                the declared adoption haircut. Translation to ₹ requires a finance workshop with an agreed empty-return
                INR baseline.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-md border-l-4 p-5" style={{ borderColor: ACCENT, background: '#F0FDFA' }}>
            <div className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>Hero lane in plain English</div>
            <p className="text-sm leading-relaxed">
              <strong>M0001</strong> — fly ash inbound returns toward Dadri (15.3 km from Ghaziabad), which is
              16.2 km from the plant on the outbound dispatch programme. 125 monthly trips align on both sides;
              transporter overlap probability is 0.9. After a 9.2-index detour penalty, net saving per trip is{' '}
              <strong>23.8 index</strong>, expected monthly index <strong>1,606.5</strong>. Match score 78.9 — the
              cleanest lane in this run.
            </p>
          </div>
        </Slide>

        {/* SLIDE 18 — Possibility space */}
        <Slide id="s18" n={18} part="B">
          <SlideTitle kicker="Possibility space" title="Scaling without false precision."
            sub="Today: trip-based scaling. Tomorrow: tonne-based curves and INR calibration on real ops." />
          <div className="grid grid-cols-3 gap-4">
            {[
              ['Today', 'Trips × per-trip index. Tonnes are in inputs for narrative, not in the headline math.'],
              ['Step 1', 'Finance workshop → agreed empty-return INR baseline per trip / per km. Map index → ₹ at lane level.'],
              ['Step 2', 'Tonne-curve overlay: replace per-trip with per-tonne where transporter / commodity supports it.'],
              ['Step 3', 'Multi-plant rollout: same engine, plant-specific config, governed coordinates.'],
              ['Step 4', 'Sensitivity bands replace point estimates: low / base / upper-bound for adoption + detour.'],
              ['Step 5', 'Pilot loop: lanes attempted vs lanes executed → recalibrates adoption_probability per cluster.'],
            ].map(([k, v], i) => (
              <div key={i} className="rounded-md border p-4" style={{ borderColor: BORDER }}>
                <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{k}</div>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{v}</p>
              </div>
            ))}
          </div>
        </Slide>

        {/* SLIDE 19 — Roadmap */}
        <Slide id="s19" n={19} part="B">
          <SlideTitle kicker="Roadmap to real data" title="Six concrete moves to move from proxy to production." />
          <ol className="space-y-3">
            {[
              'Name a single data owner per geographic layer (plant, supplier anchor, customer/depot).',
              'Lift coordinates from approved masters into a versioned reference file consumed by the engine.',
              'Replace synthetic monthly trip counts with ERP weighbridge + TMS gate-out aggregates (last 90 days).',
              'Run engine on one real plant; freeze that summary.json + pairs.csv as a baseline of record.',
              'Finance workshop to map index → ₹ for that plant; publish the conversion factor alongside the run.',
              'Pilot top 3 lanes for 8 weeks; track lanes attempted vs lanes executed; recalibrate adoption_probability.',
            ].map((t, i) => (
              <li key={i} className="flex gap-4 border rounded-md p-3" style={{ borderColor: BORDER }}>
                <span className="font-mono text-[13px] font-semibold w-7 shrink-0" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm" style={{ color: SLATE }}>{t}</span>
              </li>
            ))}
          </ol>
        </Slide>

        {/* SLIDE 20 — Ask / decision */}
        <Slide id="s20" n={20} dark>
          <div className="flex flex-col h-[78vh] justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#5EEAD4' }}>Ask · decision page</div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight" style={{ color: '#F8FAFC' }}>
                Three decisions we need from leadership today.
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ['Endorse the method', 'Filters, scoring, headline definition, adoption haircut — as published in this deck.'],
                ['Name data owners', 'Plant master, supplier anchor, customer/depot, monthly trips. One owner each.'],
                ['Hold the rupee line', 'No external INR claim until the finance calibration workshop has signed the conversion.'],
              ].map(([a, b]) => (
                <div key={a} className="border rounded-md p-5" style={{ borderColor: '#1E293B', background: '#0B1220' }}>
                  <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: '#5EEAD4' }}>{a}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{b}</p>
                </div>
              ))}
            </div>
            <div className="text-[12px]" style={{ color: '#94A3B8' }}>
              Once endorsed, we re-run the engine on a real plant within four weeks of governed coordinates being available.
            </div>
          </div>
        </Slide>

        {/* SLIDE 21 — Glossary */}
        <Slide id="s21" n={21} part="B">
          <SlideTitle kicker="Appendix · glossary" title="Plain-English definitions." />
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Return deviation', 'Distance from supplier cluster to dispatch destination. Core triangulation geometry.'],
              ['Triangulation delta cap', 'Hard km cap above which a pair is treated as not on the natural return vector — net saving forced to 0.'],
              ['Match score', 'Weighted blend of five subscores (proximity, volume, commercial, vehicle, transporter), 0–100.'],
              ['Expected monthly saving index', 'Trips × per-trip index × adoption × transporter fit. Index points, not ₹.'],
              ['Watchlist', 'Pairs that fail the triangulation cap but stay visible for review — never count toward headline.'],
              ['Adoption probability', 'Documented haircut on the geometric ceiling representing real-world execution friction.'],
              ['Vehicle fit', 'Declared lookup mapping inbound vehicle label to outbound feasibility 0–100.'],
              ['Transporter fit probability', 'Likelihood the same transporter / contractual fabric can run both legs.'],
            ].map(([term, def]) => (
              <div key={term} className="border rounded-md p-4" style={{ borderColor: BORDER }}>
                <div className="text-[12.5px] font-semibold" style={{ color: ACCENT }}>{term}</div>
                <p className="mt-1" style={{ color: MUTED }}>{def}</p>
              </div>
            ))}
          </div>
        </Slide>
      </main>

      <style>{`
        @media print {
          nav { display: none !important; }
          section { box-shadow: none !important; border: 0 !important; page-break-after: always; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
};

export default OnePlantTriangulationDeck;
