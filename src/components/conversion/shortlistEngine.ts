import { ConversionContext, ShortlistFund } from './types';
import { MOCK_FUNDS } from '@/data/sipMockData';

// Pillar 1 — Smart Shortlist generator (3-5 funds with "why" reasoning)
export function buildSmartShortlist(ctx: ConversionContext): ShortlistFund[] {
  let pool = [...MOCK_FUNDS];
  if (ctx.risk === 'Low') pool = pool.filter(f => f.riskLevel === 'Low' || f.riskLevel === 'Moderate');
  if (ctx.risk === 'High' || ctx.risk === 'Very High') pool = pool.filter(f => f.riskLevel === 'High' || f.riskLevel === 'Very High');
  // Goal-based tilt
  if (ctx.goal?.toLowerCase().includes('retire')) pool = pool.filter(f => f.assetClass !== 'Other');
  if (ctx.goal?.toLowerCase().includes('emergency')) pool = pool.filter(f => f.assetClass === 'Debt' || f.category === 'Liquid');

  // Score: 3Y returns - expense ratio penalty + AUM stability bonus
  const scored = pool.map(f => ({
    f,
    score: f.returns3Y - f.expenseRatio * 2 + Math.min(f.aum / 10000, 3),
  })).sort((a, b) => b.score - a.score).slice(0, 4);

  return scored.map(({ f }) => {
    const tags: string[] = [];
    if (f.expenseRatio < 0.7) tags.push('Low expense');
    if (f.returns3Y > 18) tags.push('Top quartile 3Y');
    if (f.aum > 20000) tags.push('Large AUM');
    if (f.rating >= 4) tags.push(`${f.rating}★ rated`);
    const reason = `${tags[0] || 'Strong fundamentals'} • 3Y ${f.returns3Y}% with ${f.expenseRatio}% expense — fits ${ctx.risk || 'your'} risk and ${ctx.horizon || 'long-term'} horizon.`;
    return {
      code: f.code,
      name: f.name,
      category: f.category,
      reason,
      reasonTags: tags.slice(0, 3),
      returns3Y: f.returns3Y,
      expenseRatio: f.expenseRatio,
      riskLevel: f.riskLevel,
      amc: f.amc,
    };
  });
}
