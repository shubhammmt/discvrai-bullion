import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { overageEvents, ejLogs } from '@/data/cmsDataLake';
import { Clock, AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  terminalId: string;
}

const PenaltyTracker: React.FC<Props> = ({ terminalId }) => {
  const overages = overageEvents.filter(o => o.terminalId === terminalId);
  const disputed = ejLogs.filter(e => e.terminalId === terminalId && e.status === 'Disputed');
  const autoRecoveries = ejLogs.filter(e => e.terminalId === terminalId && e.type === 'AutoRecovery');

  // T+5 countdown simulation
  const getCountdown = (detectedAt: string) => {
    const detected = new Date(detectedAt);
    const deadline = new Date(detected.getTime() + 5 * 24 * 60 * 60 * 1000);
    const now = new Date('2026-04-12T18:00:00'); // simulated "now"
    const remaining = deadline.getTime() - now.getTime();
    const days = Math.max(0, Math.floor(remaining / (24 * 60 * 60 * 1000)));
    const hours = Math.max(0, Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));
    return { days, hours, expired: remaining <= 0 };
  };

  return (
    <div className="space-y-3">
      {/* Disputed Claims with T+5 Countdown */}
      {disputed.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Claim Resolution Window (T+5)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {disputed.map(d => {
              const cd = getCountdown(d.timestamp);
              return (
                <div key={d.id} className="p-3 bg-white rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{d.ticketId}</span>
                    <Badge className={`text-[10px] ${cd.expired ? 'bg-red-100 text-red-700' : cd.days <= 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {cd.expired ? 'PENALTY ACTIVE' : `${cd.days}D ${cd.hours}H remaining`}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2">{d.errorDesc}</p>
                  {d.amount && <p className="text-xs font-bold text-slate-900">₹{d.amount.toLocaleString('en-IN')}</p>}

                  {/* Visual clock */}
                  <div className="mt-2 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(day => {
                      const elapsed = 5 - cd.days;
                      const filled = day <= elapsed;
                      return (
                        <div
                          key={day}
                          className={`h-2 flex-1 rounded-full ${
                            filled
                              ? day >= 4 ? 'bg-red-500' : day >= 3 ? 'bg-amber-500' : 'bg-emerald-500'
                              : 'bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-slate-400">T-Day</span>
                    <span className="text-[9px] text-slate-400">T+5 (Penalties apply)</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Overage & Penalty */}
      {overages.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Overage & Penalty Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {overages.map(o => {
              const cd = getCountdown(o.detectedAt);
              return (
                <div key={o.id} className={`p-3 rounded-lg border text-xs ${o.penaltyApplicable ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">₹{o.amount.toLocaleString('en-IN')}</span>
                    <div className="flex items-center gap-1.5">
                      {o.penaltyApplicable && (
                        <Badge className="text-[9px] bg-red-600 text-white animate-pulse">
                          ⏰ {cd.expired ? 'PENALTY ACTIVE' : `${cd.days}D ${cd.hours}H`}
                        </Badge>
                      )}
                      <Badge className={`text-[10px] ${o.status === 'Unreported' ? 'bg-red-100 text-red-700' : o.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {o.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[10px] mt-1 text-slate-600">
                    Detected: {o.detectedAt} {o.declaredAt ? `· Declared: ${o.declaredAt}` : '· ⚠ Not declared'}
                  </p>
                  {o.penaltyApplicable && (
                    <p className="text-[10px] font-semibold text-red-600 mt-1">⚠ Harmonizing Penalty — not reported within EOD. Daily penalties backdated to T-Day.</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Recovery State */}
      {autoRecoveries.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Recovery State Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {autoRecoveries.map(ar => (
              <div key={ar.id} className="p-3 rounded-lg border border-amber-200 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="text-[9px] bg-amber-600 text-white">AUTO-RECOVERY</Badge>
                  <span className="font-mono text-[11px] font-bold text-slate-800">{ar.ticketId}</span>
                </div>
                <p className="text-[11px] text-slate-600">{ar.errorDesc}</p>
                <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-100">
                  <p className="text-[10px] text-amber-700 font-semibold">
                    🔴 FLM ticket was <span className="underline">Silent Closed</span> — No overage reported
                  </p>
                  <p className="text-[10px] text-amber-600 mt-0.5">
                    Machine auto-cleared jam without physical inspection. Logged as Suspected Overage Event.
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PenaltyTracker;
