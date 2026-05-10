// Synthetic RAK Ceramics demo data — illustrative only

export const skuForecast = [
  { wk: 'W1', actual: 1240, forecast: 1260, lo: 1180, hi: 1340 },
  { wk: 'W2', actual: 1310, forecast: 1295, lo: 1210, hi: 1380 },
  { wk: 'W3', actual: 1280, forecast: 1320, lo: 1230, hi: 1410 },
  { wk: 'W4', actual: 1400, forecast: 1380, lo: 1280, hi: 1480 },
  { wk: 'W5', actual: null, forecast: 1420, lo: 1310, hi: 1530 },
  { wk: 'W6', actual: null, forecast: 1460, lo: 1330, hi: 1590 },
  { wk: 'W7', actual: null, forecast: 1510, lo: 1360, hi: 1660 },
  { wk: 'W8', actual: null, forecast: 1545, lo: 1380, hi: 1710 },
  { wk: 'W9', actual: null, forecast: 1580, lo: 1390, hi: 1770 },
  { wk: 'W10', actual: null, forecast: 1620, lo: 1410, hi: 1830 },
  { wk: 'W11', actual: null, forecast: 1655, lo: 1420, hi: 1890 },
  { wk: 'W12', actual: null, forecast: 1690, lo: 1430, hi: 1950 },
  { wk: 'W13', actual: null, forecast: 1720, lo: 1440, hi: 2000 },
];

export const regions = [
  { name: 'UAE', share: 39, growth: '+6.2%', tone: 'green' as const, note: 'Project-led growth, premium mix' },
  { name: 'Europe', share: 22, growth: '-3.1%', tone: 'amber' as const, note: 'Softness; protect margin' },
  { name: 'KSA', share: 12, growth: '+1.4%', tone: 'amber' as const, note: 'Competitive; price-watch' },
  { name: 'India', share: 10, growth: '+8.7%', tone: 'green' as const, note: 'Price-sensitive; volume play' },
  { name: 'Others', share: 17, growth: '+0.9%', tone: 'slate' as const, note: 'Long tail; export channels' },
];

export const stockoutRisks = [
  { sku: 'TIL-SLB-1200x2400-CRM', region: 'UAE', cover: 9, risk: 'High', action: 'Pull ex-Plant 2 by 3 days' },
  { sku: 'SAN-WCB-OASIS-WHT', region: 'India', cover: 12, risk: 'Medium', action: 'Re-route from UAE DC' },
  { sku: 'FAU-MX-CHR-405', region: 'Europe', cover: 22, risk: 'Low', action: 'Hold; demand softening' },
  { sku: 'TIL-60x60-MARBLE-LUX', region: 'KSA', cover: 7, risk: 'High', action: 'Expedite + dynamic price' },
  { sku: 'TBL-DIN-26-PORC', region: 'UAE', cover: 18, risk: 'Low', action: 'No action' },
];

export const kilnZones = [
  { zone: 'Pre-heat', temp: 540, target: 550, status: 'Green' },
  { zone: 'Firing-1', temp: 1180, target: 1180, status: 'Green' },
  { zone: 'Firing-2', temp: 1212, target: 1190, status: 'Amber' },
  { zone: 'Soak', temp: 1175, target: 1180, status: 'Green' },
  { zone: 'Cooling-1', temp: 720, target: 700, status: 'Amber' },
  { zone: 'Cooling-2', temp: 280, target: 280, status: 'Green' },
];

export const assetHealth = [
  { asset: 'Kiln K-04 · UAE Plant 2', risk: 78, window: '72h', advisory: 'Inspect burner #6, suspected drift in λ', mttr: '4.2h' },
  { asset: 'Press P-11 · UAE Plant 1', risk: 42, window: '7d', advisory: 'Schedule hydraulic seal swap', mttr: '2.1h' },
  { asset: 'Spray-dryer SD-02', risk: 24, window: '14d', advisory: 'Within band; monitor', mttr: '3.0h' },
  { asset: 'Glaze-line GL-07', risk: 61, window: '5d', advisory: 'Vibration trend rising', mttr: '1.6h' },
];

export const defects = [
  { cls: 'Edge chip', pct: 38, link: 'Cooling-1 ramp rate' },
  { cls: 'Glaze pinhole', pct: 22, link: 'Glaze viscosity drift' },
  { cls: 'Shade variance', pct: 18, link: 'Firing-2 over-temp' },
  { cls: 'Warpage', pct: 14, link: 'Soak duration' },
  { cls: 'Other', pct: 8, link: '—' },
];

export const copilotQA = [
  {
    q: 'What is the recommended tile spec for a 1,800 sqm hospitality lobby in Riyadh with heavy-foot traffic?',
    a: 'Based on the **RAK Maximus Slab** technical sheet, recommend **120x240 cm porcelain slabs** with **PEI Class V** (heavy commercial traffic) and **R10 anti-slip**. For lobby aesthetics, the **Marble Lux** or **Stone Onyx** series provides the premium finish typical of Riyadh hospitality projects. Verify load class with structural drawings.',
    sources: ['RAK Maximus Slab — Tech Sheet v2024', 'PEI Classification Guide', 'Project Spec Library · Hospitality'],
  },
  {
    q: 'Can you draft an answer to a dealer asking for stock availability of TIL-SLB-1200x2400-CRM in India?',
    a: 'Current cover in India DC is **12 days** — flagged Medium risk. The cockpit recommends **re-route from UAE DC** (lead time 9 days) to extend cover to ~25 days. Draft: "Thank you for the query. We have inventory at our UAE distribution centre and can route stock to your location within 9–11 days. We are also expediting the next domestic replenishment."',
    sources: ['Inventory cockpit · live snapshot', 'India DC policy doc', 'Dealer comms template library'],
  },
  {
    q: 'Summarise ESG levers for our UAE plants we can show the board next quarter.',
    a: 'Three quick-win levers grounded in the public sustainability report: (1) **Kiln waste-heat recovery** in Firing-2 (est. 6–9% gas reduction), (2) **Glaze water recycling** loop at Plant 1 (est. 18% freshwater cut), (3) **Solar PPA top-up** for finishing lines. Each links to a target SKU group; full carbon-intensity-per-m² delta available in the energy cockpit (under build).',
    sources: ['RAK Sustainability Report FY24 (public)', 'Energy intensity benchmarks', 'Plant 1 utility ledger'],
  },
];
