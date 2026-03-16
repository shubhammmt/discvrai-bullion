export const msmeCreditData = [
  { name: "Supplier A", inv30d: 45, inv14d: 22, delta: -2.2, riskScore: 72 },
  { name: "Supplier X", inv30d: 38, inv14d: 12, delta: -23.1, riskScore: 58 },
  { name: "Supplier B", inv30d: 52, inv14d: 28, delta: 7.7, riskScore: 85 },
  { name: "Supplier C", inv30d: 31, inv14d: 15, delta: -3.2, riskScore: 68 },
  { name: "Supplier D", inv30d: 41, inv14d: 21, delta: 2.4, riskScore: 79 },
];

export const complianceData = [
  { corp: "Corp A", msme: "MSME P", amount: "₹12.5L", dueDate: "15-Jan-25", status: "MSME", eligible: true, overdue: false },
  { corp: "Corp ABC", msme: "MSME XYZ", amount: "₹8.2L", dueDate: "10-Jan-25", status: "MSME", eligible: true, overdue: true },
  { corp: "Corp B", msme: "MSME Q", amount: "₹5.1L", dueDate: "18-Jan-25", status: "MSME", eligible: true, overdue: false },
  { corp: "Corp C", msme: "MSME R", amount: "₹22L", dueDate: "20-Jan-25", status: "MSME", eligible: true, overdue: false },
];

export const crossBorderDoc = {
  fileName: "LC_2025_001.pdf",
  languages: "English + Mandarin",
  parties: { exporter: "Exporter CN", importer: "Importer IN" },
  amount: "USD 125,000",
  tenor: "90 days",
  fxVolatility: "2.3%",
  hedgeSuggestion: "Forward contract",
  sanctionsResult: "✓ No match on OFAC, UN, EU lists",
  processingTime: "8 seconds",
  manualTime: "2–3 hours",
};
