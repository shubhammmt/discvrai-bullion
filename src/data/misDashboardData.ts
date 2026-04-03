// MIS Workspace Demo — All sample data (fictional)

export const researchHoldings = [
  { stock: 'Sample Motors Ltd', isin: 'INE001A01001', prev: 2450000, curr: 2680000, delta: 230000, value: 142.5, pctScheme: 4.2, tag: '' },
  { stock: 'Demo Finance Ltd', isin: 'INE002B02002', prev: 1800000, curr: 1800000, delta: 0, value: 98.3, pctScheme: 2.9, tag: '' },
  { stock: 'Prism Pharma Inc', isin: 'INE003C03003', prev: 0, curr: 520000, delta: 520000, value: 34.7, pctScheme: 1.0, tag: 'New' },
  { stock: 'Zenith Infra Ltd', isin: 'INE004D04004', prev: 1200000, curr: 1450000, delta: 250000, value: 67.8, pctScheme: 2.0, tag: '' },
  { stock: 'Arka Chemicals', isin: 'INE005E05005', prev: 900000, curr: 0, delta: -900000, value: 0, pctScheme: 0, tag: 'Exit' },
  { stock: 'Nova Tech Systems', isin: 'INE006F06006', prev: 3100000, curr: 2850000, delta: -250000, value: 210.4, pctScheme: 6.2, tag: '' },
  { stock: 'BlueStar Energy', isin: 'INE007G07007', prev: 750000, curr: 980000, delta: 230000, value: 55.1, pctScheme: 1.6, tag: '' },
  { stock: 'Meridian Textiles', isin: 'INE008H08008', prev: 1600000, curr: 1580000, delta: -20000, value: 88.9, pctScheme: 2.6, tag: '' },
  { stock: 'Coral Logistics', isin: 'INE009I09009', prev: 0, curr: 340000, delta: 340000, value: 21.2, pctScheme: 0.6, tag: 'New' },
  { stock: 'Saffron FMCG Ltd', isin: 'INE010J10010', prev: 2200000, curr: 2200000, delta: 0, value: 156.0, pctScheme: 4.6, tag: '' },
];

export const researchKpis = {
  netSharesAdded: { value: 1400000, delta: 12.4 },
  newPositions: 2,
  fullExits: 1,
  topSectorMove: { sector: 'Automobiles', change: '+₹74.7 Cr' },
};

export const momChartData = [
  { month: 'Jan', 'Sample Motors': 180000, 'Zenith Infra': 120000, 'Nova Tech': -80000, 'BlueStar': 50000 },
  { month: 'Feb', 'Sample Motors': -40000, 'Zenith Infra': 200000, 'Nova Tech': -120000, 'BlueStar': 150000 },
  { month: 'Mar', 'Sample Motors': 230000, 'Zenith Infra': 250000, 'Nova Tech': -250000, 'BlueStar': 230000 },
];

export const topBuysSells = [
  { name: 'Prism Pharma Inc', value: 34.7, type: 'buy' as const },
  { name: 'Coral Logistics', value: 21.2, type: 'buy' as const },
  { name: 'Sample Motors Ltd', value: 18.5, type: 'buy' as const },
  { name: 'Zenith Infra Ltd', value: 14.2, type: 'buy' as const },
  { name: 'BlueStar Energy', value: 12.8, type: 'buy' as const },
  { name: 'Arka Chemicals', value: -45.3, type: 'sell' as const },
  { name: 'Nova Tech Systems', value: -18.4, type: 'sell' as const },
  { name: 'Meridian Textiles', value: -1.1, type: 'sell' as const },
];

export const funds = ['All Funds', 'Alpha Growth Fund', 'Steady Income Fund', 'Balanced Advantage Fund'];
export const fundManagers = ['All Managers', 'Rajesh Kumar', 'Anita Desai', 'Vikram Singh'];
export const schemes = ['All Schemes', 'Alpha Growth - Direct', 'Alpha Growth - Regular', 'Steady Income - Direct'];

// Sales & Trading
export const salesKpis = {
  mtdBrokerage: 8.42,
  mtdVolume: 1247,
  activeCounterparties: 23,
};

export const dailyBrokerage = [
  { date: '21 Mar', cash: 0.72, deriv: 0.34 },
  { date: '22 Mar', cash: 0.85, deriv: 0.41 },
  { date: '23 Mar', cash: 0.63, deriv: 0.28 },
  { date: '24 Mar', cash: 0.91, deriv: 0.52 },
  { date: '25 Mar', cash: 0.78, deriv: 0.39 },
  { date: '26 Mar', cash: 1.02, deriv: 0.61 },
  { date: '27 Mar', cash: 0.67, deriv: 0.33 },
  { date: '28 Mar', cash: 0.88, deriv: 0.47 },
  { date: '29 Mar', cash: 0.95, deriv: 0.55 },
  { date: '31 Mar', cash: 1.12, deriv: 0.63 },
];

export const counterpartyData = [
  { name: 'Amber Capital', '21 Mar': 12.3, '24 Mar': 14.1, '27 Mar': 11.8, '31 Mar': 15.2, total: 53.4, avgYield: 0.042 },
  { name: 'Pinnacle Securities', '21 Mar': 8.7, '24 Mar': 9.2, '27 Mar': 10.1, '31 Mar': 8.9, total: 36.9, avgYield: 0.038 },
  { name: 'Horizon Investments', '21 Mar': 6.4, '24 Mar': 7.8, '27 Mar': 5.9, '31 Mar': 8.1, total: 28.2, avgYield: 0.035 },
  { name: 'Vertex Fund Mgmt', '21 Mar': 4.2, '24 Mar': 5.1, '27 Mar': 4.8, '31 Mar': 6.3, total: 20.4, avgYield: 0.031 },
  { name: 'Cedar Wealth', '21 Mar': 3.8, '24 Mar': 3.5, '27 Mar': 4.2, '31 Mar': 3.9, total: 15.4, avgYield: 0.029 },
  { name: 'Lotus Trading Co', '21 Mar': 2.1, '24 Mar': 2.8, '27 Mar': 3.1, '31 Mar': 2.5, total: 10.5, avgYield: 0.027 },
];

// ECM
export const ecmIssuances = [
  { issuer: 'Vega Renewables Ltd', date: '15-Feb-2025', size: 1250, sector: 'Energy', banker: 'Apex Capital', listingGain: 18.4 },
  { issuer: 'Orbit Finserv Inc', date: '22-Feb-2025', size: 800, sector: 'Finance', banker: 'Meridian Advisory', listingGain: -3.2 },
  { issuer: 'Pulse Healthcare', date: '05-Mar-2025', size: 2100, sector: 'Healthcare', banker: 'Apex Capital', listingGain: 12.7 },
  { issuer: 'Atlas Logistics', date: '12-Mar-2025', size: 650, sector: 'Logistics', banker: 'Crest Partners', listingGain: 8.9 },
  { issuer: 'Maple FMCG Ltd', date: '20-Mar-2025', size: 1800, sector: 'FMCG', banker: 'Meridian Advisory', listingGain: 5.1 },
  { issuer: 'Quartz Metals Inc', date: '28-Mar-2025', size: 950, sector: 'Metals', banker: 'Crest Partners', listingGain: -1.8 },
];

export const derivedPacks = [
  { name: 'Weekly banker summary', status: 'Ready' },
  { name: 'Sector IPO watch', status: 'Ready' },
  { name: 'Monthly listing tracker', status: 'Generated (demo)' },
  { name: 'QIP pipeline tracker', status: 'Ready' },
  { name: 'Banker league table cut', status: 'Pending approval' },
  { name: 'Board-level digest', status: 'Generated (demo)' },
];

// Events
export const eventKpis = {
  registrations: 342,
  attended: 278,
  corporateGuests: 45,
  avgFeedback: 4.2,
};

export const eventAttendance = [
  { event: 'Annual Strategy Summit', registered: 180, attended: 152 },
  { event: 'Sector Deep Dive — Infra', registered: 95, attended: 78 },
  { event: 'Fixed Income Roundtable', registered: 67, attended: 48 },
];

// Input sources
export const inputSources = [
  {
    id: 'mf-holdings',
    title: 'MF Holdings (Monthly)',
    purpose: 'Same logical content as a monthly NAV / holdings file.',
    fields: ['Scheme name', 'AMC', 'Fund manager', 'ISIN', 'Stock name', 'Shares', 'Market value', '% of scheme', 'Cap category', 'As-of date'],
    connector: 'Upload' as const,
  },
  {
    id: 'brokerage',
    title: 'Brokerage — Cash & Derivatives',
    purpose: 'Date-wise extracts by counterparty.',
    fields: ['Dates', 'Brokerage amounts', 'Volume', 'Counterparty name', 'Cash vs derivatives type'],
    connector: 'Scheduled export' as const,
  },
  {
    id: 'ecm-primary',
    title: 'ECM Primary Market Master',
    purpose: 'IPO / issuance shadow file.',
    fields: ['Company', 'Issue date', 'Size', 'Listing metrics', 'Bankers', 'Sector (tentative)'],
    connector: 'Upload' as const,
  },
  {
    id: 'ecm-master',
    title: 'ECM Master MIS',
    purpose: 'Weekly / monthly master from which other MIS is cut.',
    fields: ['Version date', 'Owner', 'Downstream packs listed in ECM tab'],
    connector: 'Upload' as const,
  },
  {
    id: 'crm',
    title: 'CRM (Meetings / Visits)',
    purpose: 'Export TBD with team.',
    fields: ['Date', 'Client', 'Activity type'],
    connector: 'API (later)' as const,
  },
  {
    id: 'events',
    title: 'Event App (e.g. Conferences)',
    purpose: 'Registrations, attendance, corporates, feedback — export or integration TBD.',
    fields: ['Event name', 'Registrations', 'Attendance', 'Feedback scores'],
    connector: 'API (later)' as const,
  },
];
