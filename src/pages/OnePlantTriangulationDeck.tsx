import React, { useEffect, useState } from 'react';

/**
 * One-plant triangulation — mathematical validation (proxy run)
 * Management-facing deck. Light enterprise theme. Print-friendly.
 */

const ACCENT = '#0F766E'; // restrained teal
const SLATE = '#0F172A';
const MUTED = '#475569';
const BG = '#FAFAF7';
const CARD = '#FFFFFF';
const BORDER = '#E2E8F0';

const SLIDES = [
  { id: 's1', label: '1 · Cover' },
  { id: 's2', label: '2 · Why this exists' },
  { id: 's3', label: '3 · Built vs not built' },
  { id: 's4', label: '4 · Data spine' },
  { id: 's5', label: '5 · Governance' },
  { id: 's6', label: '6 · Math flow' },
  { id: 's7', label: '7 · Config constants' },
  { id: 's8', label: '8 · Adoption probability' },
  { id: 's9', label: '9 · Vehicle fit' },
  { id: 's10', label: '10 · summary.json' },
  { id: 's11', label: '11 · Top lanes' },
  { id: 's12', label: '12 · Read the headline' },
  { id: 's13', label: '13 · Possibility space' },
  { id: 's14', label: '14 · Roadmap' },
  { id: 's15', label: '15 · Ask / decision' },
  { id: 's16', label: '16 · Glossary' },
];

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
      {String(n).padStart(2, '0')} / 16
    </span>
  </div>
);

const Slide: React.FC<{ id: string; n: number; children: React.ReactNode; dark?: boolean }> = ({
  id,
  n,
  children,
  dark,
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
    <div className="px-12 pt-10 pb-20">{children}</div>
    <Footer n={n} />
  </section>
);

const SlideTitle: React.FC<{ kicker?: string; title: string; sub?: string }> = ({ kicker, title, sub }) => (
  <header className="mb-6">
    {kicker && (
      <div
        className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: ACCENT }}
      >
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
  <div
    className="rounded-md border-l-4 p-4 text-sm"
    style={{ borderColor: ACCENT, background: '#F0FDFA', color: SLATE }}
  >
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
    match_id: 'M0001',
    plant_id: 'DADRI-GR-001',
    supplier_id: 'SUP-FA-001',
    material: 'Fly ash',
    supplier_return_city: 'Dadri',
    destination_id: 'GZB',
    destination_city: 'Ghaziabad',
    plant_to_dest_km: 16.2,
    return_deviation_km: 15.3,
    within_triangulation_delta: true,
    supplier_monthly_inbound_trips: 125.0,
    destination_monthly_dispatch_trips: 125.0,
    matched_trips_cap: 125.0,
    vehicle_fit_score: 48.0,
    vehicle_fit_band: 'Low',
    transporter_fit_prob: 0.9,
    transporter_score: 90.0,
    proximity_score: 69.3,
    volume_score: 100.0,
    commercial_score: 84.7,
    match_score: 78.9,
    gross_empty_return_index: 60.0,
    detour_cost_index: 9.2,
    net_saving_index_per_trip: 23.8,
    expected_monthly_saving_index: 1606.5,
    actionability: 'Medium',
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
  { k: 'commercial.adoption_probability', v: '0.6', what: 'Multiplier on EXPECTED index — see slide 8.', mgmt: '"Reality haircut on execution — not geography alone."' },
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

  return (
    <div style={{ background: BG, minHeight: '100vh', color: SLATE, fontFamily: 'ui-sans-serif, system-ui' }}>
      {/* Sticky mini-nav */}
      <nav
        className="sticky top-0 z-20 print:hidden border-b backdrop-blur"
        style={{ background: 'rgba(250,250,247,0.92)', borderColor: BORDER }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex items-center gap-3">
          <div className="text-[12px] font-semibold tracking-tight whitespace-nowrap" style={{ color: SLATE }}>
            One-plant triangulation
            <span className="ml-2 text-[10.5px] font-normal" style={{ color: MUTED }}>
              proxy run · index points, not ₹
            </span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-1">
              {SLIDES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[11px] px-2 py-1 rounded whitespace-nowrap transition-colors"
                  style={{
                    color: active === s.id ? '#fff' : MUTED,
                    background: active === s.id ? ACCENT : 'transparent',
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="text-[11px] font-medium px-3 py-1.5 rounded border whitespace-nowrap"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
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
                Method before scale · proxy run · transparent scoring
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

        {/* SLIDE 2 — Why this exists */}
        <Slide id="s2" n={2}>
          <SlideTitle kicker="Why this exists" title="The empty return is the largest unmanaged cost we can model first." sub="One plant in scope. Method before scale. We rank and size lanes — we do not optimise a single live truck." />
          <div className="grid grid-cols-3 gap-5">
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Problem</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>
                Inbound raw-material trucks return empty. Outbound cement dispatch is planned in a different system,
                with different commercials. The natural triangulation between them is unmeasured today.
              </p>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Scope of this run</div>
              <p className="mt-2 text-sm leading-relaxed">
                One plant hub. All inbound supplier clusters × all outbound dispatch cities. Deterministic engine,
                published config, frozen output set.
              </p>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Why now</div>
              <p className="mt-2 text-sm leading-relaxed">
                We need leadership alignment on the <strong>method</strong> and the <strong>data contract</strong>
                {' '}before we touch ERP / TMS integration or claim a rupee number externally.
              </p>
            </div>
          </div>
          <Callout label="Honest framing">
            This is a <strong>kick-starter</strong> analysis, run on research-led synthetic inputs. It exists to align
            COO / Head of Logistics / Cement leadership on the recipe — not to declare a saving in INR.
          </Callout>
        </Slide>

        {/* SLIDE 3 — Built vs not built */}
        <Slide id="s3" n={3}>
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

        {/* SLIDE 4 — Data spine */}
        <Slide id="s4" n={4}>
          <SlideTitle kicker="Data spine" title="Three geographic layers drive every distance and filter." sub="Dadri grinding-unit proxy: real lat/long taken from research-led synthetic seeds. Hardcoded for repeatability — not extracted live from operational masters." />
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

        {/* SLIDE 5 — Governance */}
        <Slide id="s5" n={5}>
          <SlideTitle kicker="Governance" title="Hardcoded today — retrieved and governed tomorrow." sub="At scale, every coordinate must come from an approved source with a named data owner." />
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

        {/* SLIDE 6 — Math flow */}
        <Slide id="s6" n={6}>
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

        {/* SLIDE 7 — Config constants */}
        <Slide id="s7" n={7}>
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

        {/* SLIDE 8 — adoption probability */}
        <Slide id="s8" n={8}>
          <SlideTitle kicker="Q & A — slide 8" title="Why commercial.adoption_probability = 0.6?" sub="A documented haircut on the geometric ceiling — risk-adjusted opportunity, not physics optimum." />
          <Callout label="Management will ask">
            "Why multiply savings by 0.6? Are we making the number small on purpose?"
          </Callout>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold" style={{ color: SLATE }}>Why a haircut at all</div>
              <p className="mt-2 text-sm" style={{ color: MUTED }}>
                Even when geometry and trip counts look perfect, real ops do not convert every theoretical backhaul.
                Dispatch windows conflict, customers insist on slots, transporters refuse to share asset days,
                commercial terms are not closed, plant silo / loading rules block sequences. A 100% number would be
                fiction.
              </p>
            </div>
            <div className="rounded-md border p-5" style={{ borderColor: BORDER }}>
              <div className="text-sm font-semibold" style={{ color: SLATE }}>Why in YAML</div>
              <p className="mt-2 text-sm" style={{ color: MUTED }}>
                The dial is explicit, configurable and auditable — not buried in a hidden spreadsheet cell. In a
                pilot, replace 0.6 with evidence: fraction of trial lanes actually executed, or workshop estimates
                from dispatch + sales + transport.
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

        {/* SLIDE 9 — vehicle fit */}
        <Slide id="s9" n={9}>
          <SlideTitle kicker="Q & A — slide 9" title="Why vehicle_fit and inbound_to_covered_truck?" sub="Distance-only models rank lanes that are mathematically neat but operationally impossible." />
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

        {/* SLIDE 10 — summary.json */}
        <Slide id="s10" n={10}>
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

        {/* SLIDE 11 — top lanes table */}
        <Slide id="s11" n={11}>
          <SlideTitle kicker="Results · ranked lanes" title="Top 21 ranked pairs from outputs/pairs.csv." sub="Highlighted columns: supplier_return_city, destination_city, match_score, expected_monthly_saving_index, actionability." />
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

        {/* SLIDE 12 — read the headline */}
        <Slide id="s12" n={12}>
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

        {/* SLIDE 13 — possibility space */}
        <Slide id="s13" n={13}>
          <SlideTitle kicker="Possibility space" title="Scaling without false precision." sub="Today: trip-based scaling. Tomorrow: tonne-based curves and INR calibration on real ops." />
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

        {/* SLIDE 14 — Roadmap */}
        <Slide id="s14" n={14}>
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

        {/* SLIDE 15 — Ask / decision */}
        <Slide id="s15" n={15} dark>
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

        {/* SLIDE 16 — glossary */}
        <Slide id="s16" n={16}>
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
