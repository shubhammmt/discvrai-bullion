import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info, Plus, Check, ChevronDown, ArrowUpDown, HelpCircle, Target, Heart, GraduationCap, Home, AlertTriangle } from 'lucide-react';
import { ConversionContext, ShortlistFund } from './types';
import { buildSmartShortlist, buildNoGoalShortlist, buildShortlistForGoal } from './shortlistEngine';
import { useGoals, Goal, requiredCAGR, goalHorizonYears } from '@/lib/goalsStore';
import { cn } from '@/lib/utils';

interface SmartShortlistProps {
  context?: ConversionContext;
  onInvest?: (fund: ShortlistFund) => void;
  onCompare?: (funds: ShortlistFund[]) => void;
  onAddGoal?: () => void;
  /** Lock to a single goal — used when embedded inside a Goal card. Hides the pill row. */
  lockedGoalId?: string;
  compact?: boolean;
}

type SortKey = 'match' | '1y' | '3y' | '5y' | 'expense';
const SORT_LABEL: Record<SortKey, string> = {
  match: 'Best match', '1y': '1Y returns', '3y': '3Y returns', '5y': '5Y returns', expense: 'Lowest expense',
};

const GOAL_ICONS: Record<string, typeof Target> = {
  Wedding: Heart, Education: GraduationCap, Home: Home, Emergency: Target, Retirement: Sparkles,
};

type ActivePill = 'all' | string; // 'all' or goal.id

export function SmartShortlist({ context, onInvest, onCompare, onAddGoal, lockedGoalId, compact }: SmartShortlistProps) {
  const goals = useGoals();
  const lockedGoal = lockedGoalId ? goals.find(g => g.id === lockedGoalId) : undefined;

  // Default pill: locked → that goal; else if user has goals → first goal; else 'all'
  const defaultPill: ActivePill = lockedGoal ? lockedGoal.id : (goals[0]?.id ?? 'all');
  const [active, setActive] = useState<ActivePill>(defaultPill);

  // Re-sync when goals list changes (e.g. user added a goal)
  useEffect(() => {
    if (lockedGoalId) { setActive(lockedGoalId); return; }
    if (active !== 'all' && !goals.find(g => g.id === active)) setActive(goals[0]?.id ?? 'all');
  }, [goals, lockedGoalId]);

  const activeGoal: Goal | undefined = active === 'all' ? undefined : goals.find(g => g.id === active);

  // Build the right list for the active pill
  const fullList = useMemo<ShortlistFund[]>(() => {
    if (activeGoal) return buildShortlistForGoal(activeGoal, 20);
    // 'all' — if user has a context use legacy, else no-goal default
    if (context?.goal || context?.risk) return buildSmartShortlist(context, 20);
    return buildNoGoalShortlist(40);
  }, [active, activeGoal, context]);

  const [sort, setSort] = useState<SortKey>('match');
  const [showAll, setShowAll] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);

  // Reset sort/expand when switching pill
  useEffect(() => { setSort('match'); setShowAll(false); setExpanded(null); }, [active]);

  const sorted = useMemo(() => {
    const arr = [...fullList];
    if (sort === '1y') arr.sort((a, b) => b.returns1Y - a.returns1Y);
    else if (sort === '3y') arr.sort((a, b) => b.returns3Y - a.returns3Y);
    else if (sort === '5y') arr.sort((a, b) => b.returns5Y - a.returns5Y);
    else if (sort === 'expense') arr.sort((a, b) => a.expenseRatio - b.expenseRatio);
    return arr;
  }, [fullList, sort]);

  const visible = showAll ? sorted : sorted.slice(0, 4);
  const toggleCompare = (code: string) =>
    setCompare(p => p.includes(code) ? p.filter(c => c !== code) : p.length < 3 ? [...p, code] : p);

  const isAnonymousAll = active === 'all' && !context?.goal && !context?.risk && goals.length === 0;
  const cagr = activeGoal ? requiredCAGR(activeGoal) : null;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sip-brand" />
          <h3 className="text-sm font-semibold text-foreground">Smart Shortlist</h3>
          <Badge variant="secondary" className="text-[10px]">{sorted.length} matched</Badge>
          <button onClick={() => setExplainOpen(o => !o)} className="text-muted-foreground hover:text-foreground" aria-label="How this list is built">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="text-[11px] bg-background border border-border rounded px-1.5 py-0.5 text-foreground focus:outline-none focus:ring-1 focus:ring-sip-brand"
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map(k => <option key={k} value={k}>{SORT_LABEL[k]}</option>)}
          </select>
        </div>
      </div>

      {/* Goal pills — hidden when locked to a single goal */}
      {!lockedGoalId && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          <button
            onClick={() => setActive('all')}
            className={cn('shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors flex items-center gap-1',
              active === 'all' ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand' : 'bg-background text-foreground border-border hover:border-sip-brand/40')}
          >
            <Sparkles className="w-3 h-3" /> {goals.length === 0 ? 'Recommended' : 'All'}
          </button>
          {goals.map(g => {
            const Icon = GOAL_ICONS[g.category] || Target;
            const isActive = active === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={cn('shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors flex items-center gap-1 max-w-[180px]',
                  isActive ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand' : 'bg-background text-foreground border-border hover:border-sip-brand/40')}
                title={g.name}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="truncate">{g.name}</span>
              </button>
            );
          })}
          {onAddGoal && (
            <button
              onClick={onAddGoal}
              className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border border-dashed border-border text-muted-foreground hover:border-sip-brand/50 hover:text-sip-brand flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add goal
            </button>
          )}
        </div>
      )}

      {/* How it's built — context-aware copy */}
      {explainOpen && (
        <div className="text-[11px] text-foreground bg-sip-brand/5 border border-sip-brand/20 rounded p-2.5 leading-relaxed">
          <p className="font-semibold mb-1">How this shortlist is built</p>
          {activeGoal ? (
            <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
              <li>Asset tilt by goal type & horizon (<b className="text-foreground">{activeGoal.category}, {goalHorizonYears(activeGoal.targetDate)}y</b>) — e.g. emergency stays in Liquid/Debt; long horizon goes equity-led.</li>
              <li>Risk guardrail (<b className="text-foreground">{activeGoal.riskLevel}</b>) caps how aggressive the picks can be.</li>
              <li>Score = <b className="text-foreground">3Y returns − (expense × 2) + AUM stability bonus</b>.</li>
            </ol>
          ) : (
            <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
              <li>Filter universe: <b className="text-foreground">AUM &gt; ₹10,000 Cr</b> AND <b className="text-foreground">expense &lt; 0.5%</b>, exclude sectoral/thematic.</li>
              <li>Sort by <b className="text-foreground">3Y returns</b> (descending).</li>
              <li>Take top <b className="text-foreground">40</b>.</li>
            </ol>
          )}
          {isAnonymousAll && (
            <p className="mt-1.5 text-muted-foreground">No goal yet? Set one to see funds tailored to your horizon, risk and target — most users see 30% better matches after that.</p>
          )}
        </div>
      )}

      {/* Goal context strip */}
      {activeGoal && (
        <div className="rounded-lg bg-muted/40 border border-border p-2.5 text-[11px] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{activeGoal.name}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">₹{(activeGoal.targetAmount / 100000).toFixed(1)}L by {activeGoal.targetDate}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">₹{activeGoal.monthlySIP.toLocaleString()}/mo</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{activeGoal.riskLevel}</span>
            {cagr != null && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className={cn('font-semibold', cagr > 14 ? 'text-amber-600' : 'text-sip-success')}>
                  ~{cagr.toFixed(0)}% CAGR needed
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Stretch warning */}
      {activeGoal && cagr != null && cagr > 14 && activeGoal.riskLevel === 'Conservative' && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span className="text-amber-900">This goal needs ~{cagr.toFixed(0)}% CAGR but your risk is set to Conservative. Consider raising risk, increasing the SIP, or extending the timeline.</span>
        </div>
      )}

      {/* Fund cards */}
      <div className={cn('grid gap-2', compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
        {visible.map(f => (
          <Card key={f.code} className="border-sip-border hover:border-sip-brand/40 transition-colors">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-2">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.amc} · {f.category}</p>
                </div>
                <button
                  onClick={() => toggleCompare(f.code)}
                  title="Add to compare"
                  className={cn('shrink-0 w-6 h-6 rounded border flex items-center justify-center transition-colors',
                    compare.includes(f.code) ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand' : 'border-border text-muted-foreground hover:border-sip-brand/40')}
                >
                  {compare.includes(f.code) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center">
                <div><p className="text-[9px] text-muted-foreground uppercase">1Y</p><p className="text-xs font-bold text-sip-success">{f.returns1Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">3Y</p><p className="text-xs font-bold text-sip-success">{f.returns3Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">5Y</p><p className="text-xs font-bold text-sip-success">{f.returns5Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">Exp</p><p className="text-xs font-bold text-foreground">{f.expenseRatio}%</p></div>
              </div>

              <button onClick={() => setExpanded(expanded === f.code ? null : f.code)}
                className="w-full flex items-center justify-between gap-1 px-2 py-1 rounded bg-sip-brand/5 border border-sip-brand/20 text-[10px] text-sip-brand hover:bg-sip-brand/10">
                <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Why this fund</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', expanded === f.code && 'rotate-180')} />
              </button>

              {expanded === f.code && (
                <div className="text-[11px] text-foreground bg-muted/40 p-2 rounded border border-border">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {f.reasonTags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-sip-brand/10 text-sip-brand rounded">{t}</span>)}
                  </div>
                  {f.reason}
                </div>
              )}

              <Button size="sm" className="w-full h-7 text-xs bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                Invest
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {sorted.length > 4 && (
        <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={() => setShowAll(s => !s)}>
          {showAll ? 'Show top 4 only' : `See all ${sorted.length} matched funds`}
        </Button>
      )}

      {compare.length >= 2 && (
        <div className="sticky bottom-2 flex justify-center">
          <Button size="sm" onClick={() => onCompare?.(sorted.filter(f => compare.includes(f.code)))}
            className="bg-foreground text-background hover:bg-foreground/90 shadow-lg">
            Compare {compare.length} funds →
          </Button>
        </div>
      )}
    </div>
  );
}
