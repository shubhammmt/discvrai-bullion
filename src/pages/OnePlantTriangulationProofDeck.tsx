import React, { useEffect, useState } from 'react';

const ACCENT = '#0F766E';
const BG = '#FAFAF7';
const TEXT = '#0F172A';
const MUTED = '#475569';
const BORDER = '#E2E8F0';

const slides = [
  { id: 's1', label: '1. Title & guardrails' },
  { id: 's2', label: '2. The problem we solved' },
  { id: 's3', label: '3. What we run' },
  { id: 's4', label: '4. What we proved' },
  { id: 's5', label: '5. So what for leadership' },
  { id: 's6', label: '6. How this scales' },
];

const Footer: React.FC = () => (
  <div
    className="mt-8 pt-4 text-[11px] leading-relaxed"
    style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}
  >
    Research-led synthetic / proxy inputs (not ERP truth) · Headline numbers are
    opportunity index points, not ₹, until finance calibration · Model prioritises
    pilots — it does not replace dispatch, contracts, or compliance.
  </div>
);

const Slide: React.FC<{ id: string; eyebrow: string; title: string; children: React.ReactNode }> = ({
  id,
  eyebrow,
  title,
  children,
}) => (
  <section
    id={id}
    className="min-h-screen px-6 md:px-16 lg:px-24 py-16 print:py-10 print:min-h-0 print:break-after-page"
  >
    <div className="max-w-6xl mx-auto">
      <div
        className="text-xs uppercase tracking-[0.18em] mb-3 font-semibold"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-8" style={{ color: TEXT }}>
        {title}
      </h2>
      <div style={{ color: TEXT }}>{children}</div>
      <Footer />
    </div>
  </section>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-lg p-5 ${className}`}
    style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}
  >
    {children}
  </div>
);

const Stat: React.FC<{ value: string; label: string; sub?: string }> = ({ value, label, sub }) => (
  <Card>
    <div className="text-3xl font-semibold" style={{ color: ACCENT }}>{value}</div>
    <div className="text-sm mt-1 font-medium" style={{ color: TEXT }}>{label}</div>
    {sub && <div className="text-xs mt-1" style={{ color: MUTED }}>{sub}</div>}
  </Card>
);

const OnePlantTriangulationProofDeck: React.FC = () => {
  const [active, setActive] = useState('s1');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    slides.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: BG, color: TEXT }} className="min-h-screen font-sans">
      {/* Sticky nav */}
      <nav
        className="sticky top-0 z-30 backdrop-blur print:hidden"
        style={{ background: `${BG}EE`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <span className="font-semibold" style={{ color: ACCENT }}>
            Triangulation · Proxy Run
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {slides.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="transition-colors"
                style={{
                  color: active === s.id ? TEXT : MUTED,
                  fontWeight: active === s.id ? 600 : 400,
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => window.print()}
            className="ml-auto px-3 py-1 rounded text-xs font-medium"
            style={{ background: ACCENT, color: '#fff' }}
          >
            Print / PDF
          </button>
        </div>
      </nav>

      {/* Slide 1 */}
      <Slide id="s1" eyebrow="Slide 1 · Title & guardrails" title="One-plant triangulation — mathematical validation (proxy run)">
        <p className="text-lg leading-relaxed mb-6" style={{ color: MUTED }}>
          Transparent scoring model and deterministic simulation for a single plant
          hub — baseline before governed operational data.
        </p>
        <Card className="mb-6">
          <p className="text-base">
            We enumerate and rank supplier × destination <em>“lanes”</em> for one
            plant, with documented rules — <strong>not live TMS routing</strong>.
          </p>
        </Card>
        <div className="grid md:grid-cols-3 gap-4">
          <Stat value="Proxy" label="Inputs are research-led, not ERP truth" />
          <Stat value="Index" label="Headline = opportunity index points, not ₹" />
          <Stat value="Pilots" label="Model surfaces candidates; it does not dispatch" />
        </div>
      </Slide>

      {/* Slide 2 */}
      <Slide id="s2" eyebrow="Slide 2 · The problem we solved" title="Inbound and outbound run as separate programmes">
        <div className="grid md:grid-cols-3 gap-5">
          <Card>
            <div className="text-sm font-semibold mb-2">The friction</div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              Inbound raw material and outbound cement run as separate programmes;
              trucks often incur empty or repositioning cost after inbound.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2">Why it’s hard</div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              Triangulation only works when a dispatch city sits near the natural
              return geography after a supplier leg — but the combination space is
              huge and easy to argue without discipline.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2">What we solved</div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              A repeatable, auditable way to turn <em>“maybe backhaul”</em> into a
              ranked shortlist of candidate lanes — before full enterprise data
              integration.
            </p>
          </Card>
        </div>
      </Slide>

      {/* Slide 3 */}
      <Slide id="s3" eyebrow="Slide 3 · What we actually run" title="The simulation, in three layers">
        <div className="space-y-4">
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Inputs</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Three CSV layers — <strong>plant</strong> (hub lat/lon),
              <strong> suppliers</strong> (return anchor, inbound trips/month, vehicle, transporter fit),
              <strong> destinations</strong> (dispatch cities, outbound trips/month).
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Mechanics</div>
            <p className="text-sm" style={{ color: MUTED }}>
              For every feasible supplier × destination pair (after plant→destination
              reach filter), compute <strong>return deviation</strong>
              (supplier anchor → destination); apply caps and index economics; build
              a <strong>0–100 match score</strong> across geometry, volume,
              commercial shape, vehicle, transporter.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Outputs</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Sorted pairs table + <code>summary.json</code>. Same inputs +
              same <code>config.yaml</code> → same results — a deterministic
              workshop artifact.
            </p>
          </Card>
        </div>
      </Slide>

      {/* Slide 4 */}
      <Slide id="s4" eyebrow="Slide 4 · What we proved" title="Real coordinates, real trip data — Dadri grinding-unit proxy">
        <p className="text-base mb-5" style={{ color: MUTED }}>
          On <strong>DADRI-GR-001</strong>, we used real lat/lon for plant, supplier
          clusters, and cities (research-led seeds — repeatable, not live masters).
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Stat value="190" label="Pairs after 500 km outbound-radius filter" sub="pair_count_after_outbound_radius_filter" />
          <Stat value="13" label="Pairs ≥ match score 65 (headline roll-up)" sub="pair_count_match_score_ge_threshold" />
          <Stat value="12,244.8" label="Combined expected monthly saving index" sub="Index only — not cash" />
        </div>
        <Card>
          <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>
            Hero lane
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>Material</div>
              <div className="font-medium mt-1">Fly ash</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>Corridor</div>
              <div className="font-medium mt-1">Dadri → Ghaziabad</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>Match score</div>
              <div className="font-medium mt-1">78.9</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>Saving index / mo</div>
              <div className="font-medium mt-1">1,606.5 · Medium actionability</div>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: MUTED }}>
            Concrete proof the engine surfaces named material, corridor, and
            magnitude — in index space.
          </p>
        </Card>
      </Slide>

      {/* Slide 5 */}
      <Slide id="s5" eyebrow="Slide 5 · So what for leadership" title="Validated method, honest assumptions">
        <div className="grid md:grid-cols-3 gap-5">
          <Card>
            <div className="text-sm font-semibold mb-2">Method is validated</div>
            <p className="text-sm" style={{ color: MUTED }}>
              We can size and rank triangulation opportunity under stated
              assumptions, with a full audit trail (config + outputs).
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2">Decision use</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Where to pilot (top lanes), what to distrust (low match / low
              actionability), and what <em>“good”</em> looks like when ops
              challenges geometry vs fleet vs commercial reality.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2">Intellectual honesty</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Index aggregates multiple lanes; rupee impact needs a finance
              workshop (e.g. empty-return INR baseline). Adoption and vehicle rules
              are explicit haircuts — not hidden optimism.
            </p>
          </Card>
        </div>
      </Slide>

      {/* Slide 6 */}
      <Slide id="s6" eyebrow="Slide 6 · How this scales" title="One plant → many plants → production">
        <div className="space-y-4">
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Per plant, same playbook</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Plant master + supplier anchors + dispatch programme + trips +
              vehicle/transporter fields → one ranked table + one summary per site
              (or roll-up portfolio view).
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Data maturity path</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Today: CSV / Excel export for speed. At scale: governed retrieval —
              plant/GIS, vendor or GRN-based supplier anchors, sales logistics /
              depot masters, named owners and refresh cadence.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Product evolution</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Optional road routing, tonnes, INR calibration, pilot actuals
              feeding adoption — without changing the core idea: transparent
              triangulation geometry + volume alignment + feasibility scores.
            </p>
          </Card>
          <Card className="border-l-4" >
            <div className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>The ask</div>
            <p className="text-sm" style={{ color: MUTED }}>
              Endorse the method + data contract · Assign owners for the next data
              drop · No external rupee claim until calibration.
            </p>
          </Card>
        </div>
      </Slide>
    </div>
  );
};

export default OnePlantTriangulationProofDeck;
