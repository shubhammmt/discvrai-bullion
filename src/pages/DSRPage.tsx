
import React, { useState, useMemo, useCallback } from 'react';
import { Activity, Calendar as CalendarIcon, Sun, Moon, Plus, Minus, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const DSRPage = () => {
  const [selectedRig, setSelectedRig] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [shift, setShift] = useState<'day' | 'night'>('day');

  // Section 1: Time Accounting
  const [productive, setProductive] = useState<string>('0');
  const [logisticsNPT, setLogisticsNPT] = useState<string>('0');
  const [mechanicalNPT, setMechanicalNPT] = useState<string>('0');
  const [waitingOther, setWaitingOther] = useState<string>('0');

  // Section 2: Fuel
  const [openingStock, setOpeningStock] = useState<string>('0');
  const [received, setReceived] = useState<string>('0');
  const [consumed, setConsumed] = useState<string>('0');

  // Section 4: Logistics
  const [incomingTrucks, setIncomingTrucks] = useState<number>(0);
  const [outgoingTrucks, setOutgoingTrucks] = useState<number>(0);
  const [urgentRequirements, setUrgentRequirements] = useState('');

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toNum = (s: string) => Number(s) || 0;
  const totalHours = useMemo(() => toNum(productive) + toNum(logisticsNPT) + toNum(mechanicalNPT) + toNum(waitingOther), [productive, logisticsNPT, mechanicalNPT, waitingOther]);
  const closingStock = useMemo(() => toNum(openingStock) + toNum(received) - toNum(consumed), [openingStock, received, consumed]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();
  const handleNumChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const Counter = ({ value, onChange, label, color = 'text-white' }: { value: number; onChange: (v: number) => void; label: string; color?: string }) => (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-xs font-semibold uppercase tracking-wider ${color}`}>{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(0, value - 1))} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-2xl font-bold text-white w-10 text-center">{value}</span>
        <button onClick={() => onChange(value + 1)} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0F19' }}>
        <div className="text-center space-y-6 p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">DSR Submitted Successfully</h2>
          <p className="text-slate-400">
            DSR for <span className="text-emerald-400 font-semibold">{format(date, 'PPP')}</span> submitted. Data digitized for Command Center.
          </p>
          <Button onClick={() => { setSubmitted(false); }} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Submit Another DSR
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0B0F19' }}>
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-4" style={{ background: 'rgba(11,15,25,0.95)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Daily Operations Report (DSR)</h1>
              <p className="text-xs text-slate-400">Rig-Sight Digital Field Reporting</p>
            </div>
          </div>

          {/* Header Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Rig Selection */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Rig Selection</Label>
              <Select value={selectedRig} onValueChange={setSelectedRig}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select Rig" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {Array.from({ length: 15 }, (_, i) => (
                    <SelectItem key={i + 1} value={`rig-${i + 1}`} className="text-white focus:bg-white/10 focus:text-white">
                      Rig #{i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-900 border-white/10" align="start">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            {/* Shift Toggle */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Shift</Label>
              <div className="flex rounded-lg overflow-hidden border border-white/10">
                <button
                  onClick={() => setShift('day')}
                  className={cn("flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-all", shift === 'day' ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10')}
                >
                  <Sun className="w-4 h-4" /> Day
                </button>
                <button
                  onClick={() => setShift('night')}
                  className={cn("flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-all", shift === 'night' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10')}
                >
                  <Moon className="w-4 h-4" /> Night
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-4">

        {/* Section 1: Time Accounting */}
        <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">⏱ Time Accounting</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Productive Hours</Label>
              <Input type="number" min={0} value={productive} onFocus={handleFocus} onChange={handleNumChange(setProductive)} className="bg-white/5 border-white/10 text-white text-lg font-bold text-center" />
            </div>
            <div>
              <Label className="text-xs text-amber-400 mb-1 block">Logistics NPT</Label>
              <Input type="number" min={0} value={logisticsNPT} onFocus={handleFocus} onChange={handleNumChange(setLogisticsNPT)} className="bg-white/5 border-amber-500/30 text-white text-lg font-bold text-center" />
            </div>
            <div>
              <Label className="text-xs text-amber-400 mb-1 block">Mechanical NPT</Label>
              <Input type="number" min={0} value={mechanicalNPT} onFocus={handleFocus} onChange={handleNumChange(setMechanicalNPT)} className="bg-white/5 border-amber-500/30 text-white text-lg font-bold text-center" />
            </div>
            <div>
              <Label className="text-xs text-slate-500 mb-1 block">Waiting / Other</Label>
              <Input type="number" min={0} value={waitingOther} onFocus={handleFocus} onChange={handleNumChange(setWaitingOther)} className="bg-white/5 border-white/10 text-white text-lg font-bold text-center" />
            </div>
          </div>
        </div>

        {/* Section 2: Fuel & Consumables */}
        <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">⛽ Fuel & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Opening Stock (Liters)</Label>
              <Input type="number" min={0} value={openingStock} onChange={(e) => setOpeningStock(Number(e.target.value))} className="bg-white/5 border-white/10 text-white text-lg font-bold text-center" />
            </div>
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Received Today (Liters)</Label>
              <Input type="number" min={0} value={received} onChange={(e) => setReceived(Number(e.target.value))} className="bg-white/5 border-white/10 text-white text-lg font-bold text-center" />
            </div>
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Consumed Today (Liters)</Label>
              <Input type="number" min={0} value={consumed} onChange={(e) => setConsumed(Number(e.target.value))} className="bg-white/5 border-white/10 text-white text-lg font-bold text-center" />
            </div>
          </div>
          <div className="rounded-xl border border-cyan-500/20 p-4 text-center bg-cyan-500/5">
            <span className="text-xs text-cyan-400 uppercase tracking-wider">Closing Stock</span>
            <div className="text-3xl font-black text-cyan-300 mt-1">{closingStock.toLocaleString()} <span className="text-sm font-normal text-slate-500">Liters</span></div>
          </div>
        </div>

        {/* Section 3: HSE & Safety */}
        <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">🛡 Safety & Personnel</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Counter value={toolBoxTalks} onChange={setToolBoxTalks} label="Tool-Box Talks" color="text-emerald-400" />
            <Counter value={nearMisses} onChange={setNearMisses} label="Near Misses" color="text-amber-400" />
            <Counter value={totalPersonnel} onChange={setTotalPersonnel} label="Total Personnel" />
          </div>
          <div className="rounded-xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={cn("w-4 h-4", stopWork ? 'text-red-400' : 'text-slate-500')} />
                <span className={cn("text-sm font-semibold", stopWork ? 'text-red-400' : 'text-slate-400')}>Stop Work Authority</span>
              </div>
              <Switch checked={stopWork} onCheckedChange={setStopWork} />
            </div>
            {stopWork && (
              <div className="mt-3">
                <Label className="text-xs text-red-400 mb-1 block">Detailed Reason</Label>
                <Textarea value={stopWorkReason} onChange={(e) => setStopWorkReason(e.target.value)} placeholder="Describe the reason for invoking Stop Work Authority..." className="bg-white/5 border-red-500/30 text-white placeholder:text-slate-600 min-h-[80px]" />
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Logistics */}
        <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">🚛 Logistics & Materials</h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <Counter value={incomingTrucks} onChange={setIncomingTrucks} label="Incoming Trucks" color="text-emerald-400" />
            <Counter value={outgoingTrucks} onChange={setOutgoingTrucks} label="Outgoing Trucks" color="text-cyan-400" />
          </div>
          <div>
            <Label className="text-xs text-slate-400 mb-1 block">Urgent Material / Spares Requirements</Label>
            <Textarea value={urgentRequirements} onChange={(e) => setUrgentRequirements(e.target.value)} placeholder="List any urgent material or spares needed..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 min-h-[100px]" />
          </div>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} disabled={submitting} className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-xl">
          {submitting ? (
            <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Generating Report...</span>
          ) : (
            'SUBMIT FINAL DSR'
          )}
        </Button>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default DSRPage;
