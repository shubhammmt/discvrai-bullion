import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Clock, Users } from 'lucide-react';

interface MetricCardProps {
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: React.ReactNode;
}

const MetricCard = ({ label, before, after, improvement, icon }: MetricCardProps) => (
  <Card className="bg-white border border-slate-200">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">{icon}</div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-400 line-through">{before}</p>
          <p className="text-2xl font-bold text-slate-900">{after}</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{improvement}</span>
      </div>
    </CardContent>
  </Card>
);

const CMSMetricsStrip = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <MetricCard
        label="Match Rate"
        before="62%"
        after="94%"
        improvement="+52%"
        icon={<ArrowUp className="h-4 w-4" />}
      />
      <MetricCard
        label="Exceptions"
        before="127"
        after="8"
        improvement="-94%"
        icon={<ArrowDown className="h-4 w-4" />}
      />
      <MetricCard
        label="Time to Close"
        before="6 days"
        after="4 hours"
        improvement="-96%"
        icon={<Clock className="h-4 w-4" />}
      />
      <MetricCard
        label="Manual Touch Points"
        before="380"
        after="12"
        improvement="-97%"
        icon={<Users className="h-4 w-4" />}
      />
    </div>
  );
};

export default CMSMetricsStrip;
