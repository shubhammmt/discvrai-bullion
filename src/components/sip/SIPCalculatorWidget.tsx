import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Target, IndianRupee, ArrowRight, Sparkles, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

function calcSIP(monthly: number, years: number, rate: number, stepUp: number = 0): { total: number; invested: number; returns: number } {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  if (stepUp === 0) {
    const fv = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return { total: Math.round(fv), invested: monthly * months, returns: Math.round(fv) - monthly * months };
  }

  // With step-up: recalculate yearly
  let totalValue = 0;
  let totalInvested = 0;
  let currentMonthly = monthly;

  for (let year = 0; year < years; year++) {
    const yearlyFV = currentMonthly * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
    const remainingMonths = (years - year - 1) * 12;
    totalValue += yearlyFV * Math.pow(1 + monthlyRate, remainingMonths);
    totalInvested += currentMonthly * 12;
    currentMonthly = Math.round(currentMonthly * (1 + stepUp / 100));
  }

  return { total: Math.round(totalValue), invested: totalInvested, returns: Math.round(totalValue - totalInvested) };
}

function calcLumpsum(amount: number, years: number, rate: number): { total: number; invested: number; returns: number } {
  const fv = amount * Math.pow(1 + rate / 100, years);
  return { total: Math.round(fv), invested: amount, returns: Math.round(fv - amount) };
}

function calcGoalSIP(targetAmount: number, years: number, rate: number): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const sip = targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  return Math.round(sip);
}

// Donut chart via SVG
function DonutChart({ invested, returns, size = 160 }: { invested: number; returns: number; size?: number }) {
  const total = invested + returns;
  const investedPct = total > 0 ? invested / total : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const investedArc = circumference * investedPct;
  const returnsArc = circumference * (1 - investedPct);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 160 160" className="-rotate-90">
        {/* Returns segment */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--chart-2))"
          strokeWidth="20" strokeDasharray={`${returnsArc} ${circumference}`}
          strokeDashoffset={0} />
        {/* Invested segment */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--primary))"
          strokeWidth="20" strokeDasharray={`${investedArc} ${circumference}`}
          strokeDashoffset={-returnsArc} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] text-muted-foreground">Total</span>
        <span className="text-sm font-bold text-foreground">{formatINR(total)}</span>
      </div>
    </div>
  );
}

export function SIPCalculatorWidget({ onStartSIP }: { onStartSIP?: (amount: number) => void }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Calculator className="w-4 h-4 text-primary" />
          Investment Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sip" className="text-xs">SIP</TabsTrigger>
            <TabsTrigger value="lumpsum" className="text-xs">Lumpsum</TabsTrigger>
            <TabsTrigger value="goal" className="text-xs">Goal Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="mt-4">
            <SIPCalc onStartSIP={onStartSIP} />
          </TabsContent>
          <TabsContent value="lumpsum" className="mt-4">
            <LumpsumCalc />
          </TabsContent>
          <TabsContent value="goal" className="mt-4">
            <GoalCalc onStartSIP={onStartSIP} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function SIPCalc({ onStartSIP }: { onStartSIP?: (amount: number) => void }) {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(12);
  const [stepUp, setStepUp] = useState(0);

  const result = useMemo(() => calcSIP(monthly, years, rate, stepUp), [monthly, years, rate, stepUp]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Input — Left */}
      <div className="space-y-4">
        <SliderInput label="Monthly Amount" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} prefix="₹" />
        <SliderInput label="Duration" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
        <SliderInput label="Return %" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
        <SliderInput label="Step-Up %" value={stepUp} onChange={setStepUp} min={0} max={25} step={5} suffix="%" />
      </div>

      {/* Output — Right */}
      <div className="rounded-xl border border-border bg-muted/30 p-3 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-foreground mb-2">{formatINR(result.total)}</p>
        <p className="text-[10px] text-muted-foreground mb-3">after {years} yrs</p>

        <div className="flex items-center gap-4">
          <DonutChart invested={result.invested} returns={result.returns} size={100} />
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--primary))' }} />
              <div>
                <p className="text-[9px] text-muted-foreground">Invested</p>
                <p className="text-xs font-bold">{formatINR(result.invested)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <div>
                <p className="text-[9px] text-muted-foreground">Returns</p>
                <p className="text-xs font-bold text-sip-success">{formatINR(result.returns)}</p>
              </div>
            </div>
          </div>
        </div>

        {onStartSIP && (
          <Button size="sm" className="w-full mt-3" onClick={() => onStartSIP(monthly)}>
            <Sparkles className="w-3 h-3 mr-1" /> Start ₹{monthly.toLocaleString()}/mo
          </Button>
        )}
      </div>
    </div>
  );
}

function LumpsumCalc() {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(12);

  const result = useMemo(() => calcLumpsum(amount, years, rate), [amount, years, rate]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <SliderInput label="Amount" value={amount} onChange={setAmount} min={5000} max={10000000} step={5000} prefix="₹" />
        <SliderInput label="Duration" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
        <SliderInput label="Return %" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-3 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-foreground mb-2">{formatINR(result.total)}</p>
        <p className="text-[10px] text-muted-foreground mb-3">after {years} yrs</p>

        <div className="flex items-center gap-4">
          <DonutChart invested={result.invested} returns={result.returns} size={100} />
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--primary))' }} />
              <div>
                <p className="text-[9px] text-muted-foreground">Invested</p>
                <p className="text-xs font-bold">{formatINR(result.invested)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <div>
                <p className="text-[9px] text-muted-foreground">Returns</p>
                <p className="text-xs font-bold text-sip-success">{formatINR(result.returns)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalCalc({ onStartSIP }: { onStartSIP?: (amount: number) => void }) {
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const requiredSIP = useMemo(() => calcGoalSIP(targetAmount, years, rate), [targetAmount, years, rate]);
  const result = useMemo(() => calcSIP(requiredSIP, years, rate), [requiredSIP, years, rate]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <SliderInput label="Target Amount" value={targetAmount} onChange={setTargetAmount} min={100000} max={100000000} step={100000} prefix="₹" />
        <SliderInput label="Time Frame" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
        <SliderInput label="Return %" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5 mb-1">
          <Target className="w-4 h-4 text-primary" />
          <p className="text-xs text-muted-foreground">{formatINR(targetAmount)} in {years} yrs</p>
        </div>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Invest monthly</p>
        <p className="text-2xl font-bold text-primary">{formatINR(requiredSIP)}</p>

        <div className="flex items-center gap-4 mt-3">
          <DonutChart invested={result.invested} returns={result.returns} size={90} />
          <div className="space-y-2 text-xs">
            <div>
              <p className="text-[9px] text-muted-foreground">You invest</p>
              <p className="font-bold">{formatINR(result.invested)}</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Earnings</p>
              <p className="font-bold text-sip-success">{formatINR(result.returns)}</p>
            </div>
          </div>
        </div>

        {onStartSIP && (
          <Button size="sm" className="w-full mt-3" onClick={() => onStartSIP(requiredSIP)}>
            <Sparkles className="w-3 h-3 mr-1" /> Start {formatINR(requiredSIP)}/mo
          </Button>
        )}
      </div>
    </div>
  );
}

function SliderInput({ label, value, onChange, min, max, step, prefix, suffix }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-foreground">{label}</Label>
        <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1">
          {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
          <Input
            type="number" value={value}
            onChange={e => {
              const v = Number(e.target.value);
              if (v >= min && v <= max) onChange(v);
            }}
            className="w-20 h-6 border-0 p-0 text-right text-sm font-semibold focus-visible:ring-0 bg-transparent"
          />
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider value={[value]} onValueChange={v => onChange(v[0])} min={min} max={max} step={step} />
    </div>
  );
}
