// Mock data for ICICI Lombard Distributor Sales Enablement Suite
export const REGIONS = ['North', 'South', 'West', 'East', 'Central', 'Metro-NCR'];

export type LeadStatus = 'New' | 'Contacted' | 'Met' | 'Quoted' | 'Bound' | 'Follow-up' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  city: string;
  cityTier: 'T1' | 'T2' | 'T3';
  age: number;
  family: string;
  income: string;
  score: number;
  reasons: string[];
  recommendedPlan: string;
  premiumBand: string;
  renewalDue?: string;
  priorPolicy?: string;
  status: LeadStatus;
  lastTouch: string;
  nextAction: string;
  channel: 'Inbound' | 'Referral' | 'Renewal' | 'Cross-sell' | 'Campaign';
}

export const LEADS: Lead[] = [
  { id: 'L-2041', name: 'Rajesh Mehta', city: 'Mumbai', cityTier: 'T1', age: 38, family: 'Self + Spouse + 2 kids', income: '₹18–24 L', score: 92, reasons: ['Renewal in 18 days', 'Maternity rider opened email 3x', 'High propensity (model)'], recommendedPlan: 'Family Floater · ₹10L', premiumBand: '₹22–26K', renewalDue: '24 Nov 2026', priorPolicy: 'Complete Health 2024', status: 'New', lastTouch: 'Email opened · 2h ago', nextAction: 'Call within 24h', channel: 'Renewal' },
  { id: 'L-2042', name: 'Priya Sharma', city: 'Pune', cityTier: 'T1', age: 32, family: 'Self + Spouse', income: '₹12–16 L', score: 88, reasons: ['Quote requested', 'Compared 3 plans on web', 'Prior dental claim'], recommendedPlan: 'Family Floater · ₹5L + Top-up ₹15L', premiumBand: '₹14–18K', status: 'Quoted', lastTouch: 'Quote sent · 1d ago', nextAction: 'Follow-up call', channel: 'Inbound' },
  { id: 'L-2043', name: 'Arvind Kumar', city: 'Lucknow', cityTier: 'T2', age: 45, family: 'Self + Spouse + Parents', income: '₹8–12 L', score: 81, reasons: ['Parents 65+ · senior cover need', 'Existing motor with us', 'Cross-sell signal'], recommendedPlan: 'Senior Care + Family ₹7L', premiumBand: '₹28–34K', priorPolicy: 'Motor Insurance', status: 'Contacted', lastTouch: 'WhatsApp · 4h ago', nextAction: 'Schedule visit', channel: 'Cross-sell' },
  { id: 'L-2044', name: 'Sunita Reddy', city: 'Hyderabad', cityTier: 'T1', age: 29, family: 'Self', income: '₹10–14 L', score: 76, reasons: ['First-time buyer', 'Lifestyle indicator', 'PIN code high-conversion'], recommendedPlan: 'Individual ₹5L + Critical Illness', premiumBand: '₹9–12K', status: 'New', lastTouch: 'Lead received · 30m ago', nextAction: 'Call now (golden hour)', channel: 'Campaign' },
  { id: 'L-2045', name: 'Imran Sheikh', city: 'Bhopal', cityTier: 'T2', age: 41, family: 'Self + Spouse + 1 kid', income: '₹6–9 L', score: 73, reasons: ['Asked about OPD cover', 'Referred by existing customer'], recommendedPlan: 'Family Floater · ₹5L', premiumBand: '₹13–16K', status: 'Met', lastTouch: 'Met yesterday', nextAction: 'Send proposal', channel: 'Referral' },
  { id: 'L-2046', name: 'Deepa Iyer', city: 'Chennai', cityTier: 'T1', age: 36, family: 'Self + Spouse', income: '₹15–20 L', score: 84, reasons: ['Top-up enquiry', 'Existing ₹3L corporate cover'], recommendedPlan: 'Super Top-up ₹15L', premiumBand: '₹6–8K', status: 'Follow-up', lastTouch: 'Said call back Mon', nextAction: 'Call Mon 11am', channel: 'Inbound' },
  { id: 'L-2047', name: 'Manoj Bhatt', city: 'Dehradun', cityTier: 'T2', age: 52, family: 'Self + Spouse', income: '₹10–14 L', score: 79, reasons: ['Renewal lapse risk · 12 days', 'Hospitalization last year'], recommendedPlan: 'Renew + upgrade to ₹10L', premiumBand: '₹26–30K', renewalDue: '18 Nov 2026', status: 'Contacted', lastTouch: 'Reminder sent', nextAction: 'Personal call', channel: 'Renewal' },
  { id: 'L-2048', name: 'Kavita Nair', city: 'Kochi', cityTier: 'T2', age: 34, family: 'Self + 1 kid', income: '₹9–13 L', score: 71, reasons: ['Single parent · maternity completed', 'Sum insured low'], recommendedPlan: 'Floater ₹7L', premiumBand: '₹15–18K', status: 'New', lastTouch: 'Web form · 1h ago', nextAction: 'Call back', channel: 'Inbound' },
  { id: 'L-2049', name: 'Vikram Singh', city: 'Jaipur', cityTier: 'T2', age: 47, family: 'Self + Spouse + 2 kids', income: '₹14–18 L', score: 86, reasons: ['Diabetic · pre-existing', 'Wants comprehensive cover'], recommendedPlan: 'Elite Health ₹10L + CI Rider', premiumBand: '₹32–38K', status: 'Quoted', lastTouch: 'Quote 2d ago', nextAction: 'Objection: premium high', channel: 'Inbound' },
  { id: 'L-2050', name: 'Anita Joshi', city: 'Indore', cityTier: 'T2', age: 39, family: 'Self + Spouse', income: '₹8–11 L', score: 68, reasons: ['Cold lead · 7 days no response', 'Recycling'], recommendedPlan: 'Floater ₹5L', premiumBand: '₹13–16K', status: 'Follow-up', lastTouch: '7d ago', nextAction: 'WhatsApp re-engagement', channel: 'Campaign' },
  { id: 'L-2051', name: 'Rohit Agarwal', city: 'Kolkata', cityTier: 'T1', age: 31, family: 'Self', income: '₹11–15 L', score: 74, reasons: ['Bachelor · CI focus', 'Tech professional'], recommendedPlan: 'Individual ₹7L + CI', premiumBand: '₹11–14K', status: 'New', lastTouch: 'Lead received · 6h ago', nextAction: 'Call', channel: 'Campaign' },
  { id: 'L-2052', name: 'Meena Patel', city: 'Surat', cityTier: 'T2', age: 44, family: 'Self + Spouse + Mother', income: '₹12–16 L', score: 82, reasons: ['Mother age 70 · needs senior cover', 'Existing customer NPS 9'], recommendedPlan: 'Senior Care ₹5L (separate)', premiumBand: '₹22–26K', status: 'Met', lastTouch: '3d ago', nextAction: 'Close this week', channel: 'Cross-sell' },
];

export const OBJECTIONS = [
  { q: 'Premium is too high', a: 'I understand. Let me show you the value: this plan covers ₹10L hospitalization + day-care + post-hospitalization. Per day, this is just ₹62 — less than a coffee. Compared to one hospital day at ₹15-25K, the math works out within 1 incident.' },
  { q: 'I already have corporate insurance', a: 'Great. Corporate cover usually ends when you change jobs or retire. A personal policy locks in your no-claim discount and continuity. Most senior managers buy ₹10–15L on top of corporate cover.' },
  { q: 'I am young and healthy', a: 'That is exactly why this is the right time. Premium is locked at today\'s age, no medical tests needed under ₹5L, and you build a continuity benefit. Buying after age 40 costs 60–80% more for the same cover.' },
  { q: 'I will think about it', a: 'Absolutely, take your time. Just so you have full information — the quoted premium is valid for 7 days. Can I send a 1-pager comparison and call you Wednesday at 6pm to answer remaining questions?' },
  { q: 'Why not LIC / generic insurer', a: 'Fair question. ICICI Lombard has 90%+ cashless network in your city, claim settlement ratio of 87%, and a dedicated relationship manager. Let me show you the cashless hospital list near your home.' },
  { q: 'Can I get a discount', a: 'On health insurance, premium is regulated and cannot be discounted. But I can structure a 2-year plan that gives you 7.5% saving and rate-lock for 24 months.' },
  { q: 'My family is small, I don\'t need ₹10L', a: 'Today maybe. But hospitalization costs are rising 12% per year. ₹5L cover today is roughly ₹2.5L cover in 7 years. ₹10L gives you headroom for the next 5–7 years without re-underwriting.' },
  { q: 'What about pre-existing conditions', a: 'Pre-existing conditions like diabetes/BP are covered after a 24–36 month waiting period. The earlier you buy, the sooner you cross that waiting period. We can also structure a plan with reduced waiting period.' },
  { q: 'Claims process is painful', a: 'Valid concern. ICICI Lombard offers cashless in 6500+ hospitals and reimbursement in 7 days. I personally help my clients raise the claim. Last month I closed 4 claims for my customers — happy to share references.' },
  { q: 'Will you be available later', a: 'Yes, I am your dedicated advisor. You have my mobile, email, and our 24x7 helpline. I will personally call you 30 days before renewal and at the time of any claim.' },
  { q: 'Can I cancel later', a: 'Yes — there is a 15-day free-look period. If you don\'t find value, you get a full refund minus medical test cost. No questions asked.' },
  { q: 'My agent already gave me a quote', a: 'No problem. May I see what they quoted? Often we find we can match or beat on rider quality, network, and service. Even if not, you get a second informed view before you decide.' },
];

export const TEMPLATES_EN = [
  { name: 'First contact', text: 'Hi {{name}}, this is {{rep}} from ICICI Lombard. You enquired about health insurance — I have a personalized plan ready. Is now a good time for 5 mins?' },
  { name: 'Renewal nudge', text: 'Hi {{name}}, your ICICI Lombard policy renews on {{date}}. I have an upgrade option that adds maternity + restoration at almost the same premium. Shall I send details?' },
  { name: 'Quote follow-up', text: 'Hi {{name}}, sharing the quote we discussed. Plan: {{plan}}, Premium: {{premium}}. The cashless network includes {{hospital}}. Call me when you have 5 mins.' },
];

export const TEMPLATES_HI = [
  { name: 'Pehla contact', text: 'Namaste {{name}} ji, main {{rep}} bol raha hoon ICICI Lombard se. Aapne health insurance ke baare mein puchha tha — maine ek personal plan ready kiya hai. Abhi 5 minute baat ho sakti hai?' },
  { name: 'Renewal nudge', text: 'Namaste {{name}} ji, aapki ICICI Lombard policy {{date}} ko renew ho rahi hai. Maternity aur restoration benefit ke saath ek upgrade option hai, premium almost same. Details bhejun?' },
  { name: 'Quote follow-up', text: '{{name}} ji, jo quote humne discuss kiya tha bhej raha hoon. Plan: {{plan}}, Premium: {{premium}}. Aapke ghar ke paas {{hospital}} cashless hai. 5 minute mile to call kariye.' },
];

// Manager dashboard data
export const FUNNEL = [
  { stage: 'Leads', count: 4820, conv: 100 },
  { stage: 'Contacted', count: 3614, conv: 75 },
  { stage: 'Met', count: 1928, conv: 40 },
  { stage: 'Quoted', count: 1156, conv: 24 },
  { stage: 'Bound', count: 482, conv: 10 },
];

export const REPS = [
  { id: 'R-101', name: 'Suresh Patil', region: 'West', sla: 92, m2q: 38, q2b: 44, ren: 86, leads: 142, bound: 23 },
  { id: 'R-102', name: 'Anjali Singh', region: 'North', sla: 88, m2q: 41, q2b: 48, ren: 89, leads: 138, bound: 27 },
  { id: 'R-103', name: 'Karthik Rao', region: 'South', sla: 95, m2q: 35, q2b: 42, ren: 91, leads: 154, bound: 26 },
  { id: 'R-104', name: 'Pooja Verma', region: 'Metro-NCR', sla: 78, m2q: 29, q2b: 36, ren: 78, leads: 121, bound: 14 },
  { id: 'R-105', name: 'Manish Gupta', region: 'East', sla: 84, m2q: 32, q2b: 40, ren: 82, leads: 128, bound: 19 },
  { id: 'R-106', name: 'Reshma Khan', region: 'Central', sla: 90, m2q: 39, q2b: 46, ren: 87, leads: 145, bound: 25 },
];

export const RENEWAL_BUCKETS = [
  { window: '0–30 days', count: 1842, value: '₹3.2 Cr', risk: 14 },
  { window: '31–60 days', count: 2614, value: '₹4.8 Cr', risk: 9 },
  { window: '61–90 days', count: 3128, value: '₹5.6 Cr', risk: 6 },
];

export const INTERVENTIONS = [
  { id: 'I-01', cust: 'Vikram Singh', issue: 'Quoted 3d ago · no response', risk: 'High', action: 'Manager call · price reframing', value: '₹38K' },
  { id: 'I-02', cust: 'Manoj Bhatt', issue: 'Renewal lapse 12d window', risk: 'High', action: 'Personal visit + 2-yr structure', value: '₹28K' },
  { id: 'I-03', cust: 'Anita Joshi', issue: '7d cold · re-engagement', risk: 'Medium', action: 'WhatsApp + new pitch angle', value: '₹15K' },
  { id: 'I-04', cust: 'Rajesh Mehta', issue: 'Renewal · upgrade opportunity', risk: 'Low', action: 'Cross-sell maternity rider', value: '₹26K' },
  { id: 'I-05', cust: 'Deepa Iyer', issue: 'Top-up · waiting on call back', risk: 'Medium', action: 'Confirm Monday slot', value: '₹8K' },
];

export const COACHING_REASONS = [
  { reason: 'Premium objection not handled', share: 34 },
  { reason: 'Pre-existing condition concerns', share: 22 },
  { reason: 'Wanted to compare with competitor', share: 18 },
  { reason: 'No urgency created', share: 14 },
  { reason: 'Wrong plan recommended', share: 8 },
  { reason: 'Other', share: 4 },
];
