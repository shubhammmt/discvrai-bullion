import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { atmProfiles, getStatusColor } from '@/data/cmsDataLake';
import { MapPin, Building2, Cpu, Signal } from 'lucide-react';

interface Props {
  terminalId: string;
}

const ATMProfileCard: React.FC<Props> = ({ terminalId }) => {
  const atm = atmProfiles.find(a => a.terminalId === terminalId);
  if (!atm) return null;

  return (
    <Card className="border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-base font-bold text-slate-900 font-mono">{atm.terminalId}</p>
            <p className="text-xs text-slate-500">{atm.atmType} ATM</p>
          </div>
          <Badge className={`text-[10px] ${getStatusColor(atm.status)}`}>{atm.status}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            <span>{atm.bank}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{atm.hub}, {atm.state}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Cpu className="h-3.5 w-3.5 text-slate-400" />
            <span>{atm.region} Region</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Signal className="h-3.5 w-3.5 text-slate-400" />
            <span>Last Sync: {atm.lastSync.split(' ')[1]}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-slate-500">Data Completeness</span>
            <span className="font-bold text-slate-700">{atm.dataCompleteness}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${atm.dataCompleteness >= 95 ? 'bg-emerald-500' : atm.dataCompleteness >= 85 ? 'bg-blue-500' : atm.dataCompleteness >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${atm.dataCompleteness}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ATMProfileCard;
