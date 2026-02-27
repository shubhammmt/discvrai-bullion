export const bankStatement = [
  { id: "B1", date: "15-Jan-25", reference: "REF/CIT/001", amount: 1250000, narration: "CIT collection — Zone North" },
  { id: "B2", date: "16-Jan-25", reference: "REF/INV/101", amount: 280000, narration: "Part payment — Client A" },
  { id: "B3", date: "17-Jan-25", reference: "REF/INV/102", amount: 120000, narration: "Balance — Client A" },
  { id: "B4", date: "18-Jan-25", reference: "REF/MISC", amount: 45000, narration: "Fee adjustment" },
];

export const erpLedger = [
  { id: "INV-101", client: "Client A", amount: 280000, date: "14-Jan-25", type: "Service Invoice", status: "Open" },
  { id: "INV-102", client: "Client A", amount: 120000, date: "14-Jan-25", type: "Service Invoice", status: "Open" },
  { id: "INV-103", client: "Client B", amount: 1250000, date: "15-Jan-25", type: "CIT Collection", status: "Open" },
  { id: "FEE-01", client: "Client A", amount: 45000, date: "18-Jan-25", type: "Service Fee", status: "Open" },
];

export const cashPhysical = [
  { siteId: "SITE-041", date: "15-Jan-25", dispensed: 980000, deposited: 1250000, location: "Zone North Vault" },
  { siteId: "SITE-017", date: "16-Jan-25", dispensed: 1120000, deposited: 400000, location: "Zone East Vault" },
  { siteId: "SITE-088", date: "17-Jan-25", dispensed: 650000, deposited: 120000, location: "Zone North Vault" },
  { siteId: "SITE-005", date: "18-Jan-25", dispensed: 210000, deposited: 45000, location: "Zone West Vault" },
];

export interface MatchItem {
  source: string;
  ref: string;
  amount: string;
}

export interface MatchGroup {
  id: string;
  status: 'matched' | 'exception';
  confidence: 'High' | 'Medium' | 'Low';
  reason: string;
  agentNote?: string;
  exceptionType?: string;
  agentSuggestion?: string;
  items: MatchItem[];
}

export const matchGroups: MatchGroup[] = [
  {
    id: "MG-001",
    status: "matched",
    confidence: "High",
    reason: "Exact reference + amount match",
    items: [
      { source: "Bank", ref: "REF/CIT/001", amount: "₹12,50,000" },
      { source: "ERP", ref: "INV-103", amount: "₹12,50,000" },
    ],
  },
  {
    id: "MG-002",
    status: "matched",
    confidence: "High",
    reason: "One-to-many: two invoices matched to one split bank credit",
    agentNote: "Agent matched part payment B2 (₹2,80,000) + B3 (₹1,20,000) across INV-101 and INV-102 — split confirmed by date proximity and client code.",
    items: [
      { source: "Bank", ref: "REF/INV/101 (part)", amount: "₹2,80,000" },
      { source: "Bank", ref: "REF/INV/102 (bal)", amount: "₹1,20,000" },
      { source: "ERP", ref: "INV-101", amount: "₹2,80,000" },
      { source: "ERP", ref: "INV-102", amount: "₹1,20,000" },
    ],
  },
  {
    id: "MG-003",
    status: "matched",
    confidence: "Medium",
    reason: "Amount + date match; reference partially truncated in bank feed",
    items: [
      { source: "Bank", ref: "REF/MISC", amount: "₹45,000" },
      { source: "ERP", ref: "FEE-01", amount: "₹45,000" },
    ],
  },
  {
    id: "MG-004",
    status: "exception",
    confidence: "Low",
    reason: "Cash vault variance — deposited vs. expected mismatch",
    exceptionType: "Cash variance · SITE-017",
    agentSuggestion: "Variance of ₹7,200 detected on SITE-017 (Zone East Vault). Likely cause: CIT receipt timing lag — deposit recorded on T+1. Agent suggests: raise field investigation ticket to operations; hold provision pending confirmation. If confirmed as timing lag — no write-off required.",
    items: [
      { source: "Cash", ref: "SITE-017 vault report", amount: "₹4,00,000" },
      { source: "Bank", ref: "Expected deposit", amount: "₹4,07,200" },
    ],
  },
];

export const auditTrailInitial = [
  { time: "09:41:12", actor: "Agent" as const, action: "Data sync complete — bank (4), ERP (4), cash (4) entries loaded and validated." },
  { time: "09:41:13", actor: "Agent" as const, action: "Running probabilistic matching across 3 sources. Applying reference, amount, date, and client-code heuristics." },
  { time: "09:41:14", actor: "Agent" as const, action: "MG-001 matched: INV-103 ↔ REF/CIT/001 · ₹12,50,000 · Confidence: High." },
  { time: "09:41:15", actor: "Agent" as const, action: "MG-002 matched: INV-101 + INV-102 ↔ REF/INV/101 + REF/INV/102 (one-to-many split) · ₹4,00,000 total." },
  { time: "09:41:15", actor: "Agent" as const, action: "MG-003 matched: FEE-01 ↔ REF/MISC · ₹45,000 · Confidence: Medium (reference truncated — amount + date used)." },
  { time: "09:41:16", actor: "Agent" as const, action: "MG-004 flagged as exception: SITE-017 cash variance ₹7,200. Resolution suggested. Awaiting user approval." },
];
