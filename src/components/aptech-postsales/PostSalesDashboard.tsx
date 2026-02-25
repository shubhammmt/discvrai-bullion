import React, { useState } from 'react';
import { Phone, MessageSquare, TrendingUp, AlertTriangle, CreditCard, ClipboardList, Sparkles, ChevronDown, Filter, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { mockDashboardStudents, getDashboardSummary, getStudentActions, type DashboardStudent } from '@/data/aptechPostSalesDemoData';
import { toast } from 'sonner';

const PostSalesDashboard: React.FC = () => {
  const [centerFilter, setCenterFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');

  const centers = ['All', ...Array.from(new Set(mockDashboardStudents.map(s => s.center)))];
  const brands = ['All', ...Array.from(new Set(mockDashboardStudents.map(s => s.brand)))];

  const filtered = mockDashboardStudents.filter(s =>
    (centerFilter === 'All' || s.center === centerFilter) &&
    (brandFilter === 'All' || s.brand === brandFilter)
  );

  const summary = getDashboardSummary(filtered);
  const actions = getStudentActions(filtered);

  const handleAction = (action: string, studentName: string) => {
    toast.success(`Action logged: ${action} for ${studentName}`);
  };

  const getChurnBadge = (prob: number) => {
    if (prob > 50) return <Badge className="bg-red-100 text-red-700 border-red-200 text-[10px]">High {prob}%</Badge>;
    if (prob > 25) return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">Med {prob}%</Badge>;
    return <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">Low {prob}%</Badge>;
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getFeesBadge = (status: string) => {
    if (status.includes('Overdue')) return <Badge className="bg-red-100 text-red-700 border-red-200 text-[10px]">{status}</Badge>;
    if (status.includes('Due')) return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">{status}</Badge>;
    return <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">{status}</Badge>;
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-slate-50 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white font-bold text-xl">Post-Sales Dashboard</h1>
          <p className="text-slate-300 text-sm">Counsellor & Internal View — Metrics + Actionables</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select value={centerFilter} onChange={e => setCenterFilter(e.target.value)} className="text-sm border rounded-lg px-3 py-1.5 bg-background">
            {centers.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="text-sm border rounded-lg px-3 py-1.5 bg-background">
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
          <span className="text-xs text-muted-foreground ml-auto">{filtered.length} students</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <SummaryCard icon={AlertTriangle} label="At Risk" value={summary.atRisk} color="text-red-600" bg="bg-red-50" />
          <SummaryCard icon={ClipboardList} label="Survey Overdue" value={summary.surveyOverdue} color="text-blue-600" bg="bg-blue-50" />
          <SummaryCard icon={CreditCard} label="Fee Overdue" value={summary.feeOverdue} color="text-amber-600" bg="bg-amber-50" />
          <SummaryCard icon={Sparkles} label="Upgrade Ready" value={summary.upgradeReady} color="text-purple-600" bg="bg-purple-50" />
          <SummaryCard icon={Activity} label="Avg Engagement" value={summary.avgEngagement} color="text-green-600" bg="bg-green-50" suffix="/100" />
          <SummaryCard icon={CreditCard} label="Collection Rate" value={summary.collectionRate} color="text-emerald-600" bg="bg-emerald-50" suffix="%" />
        </div>

        {/* Actionables */}
        {actions.length > 0 && (
          <Card className="border-orange-200">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" /> Priority Actions ({actions.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {actions.slice(0, 8).map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(a.label, a.studentName)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-muted/50 transition-colors text-left"
                  >
                    <ActionIcon type={a.actionType} />
                    <div>
                      <span className="font-medium text-foreground">{a.studentName}</span>
                      <span className="text-muted-foreground"> — {a.label}</span>
                      <span className="text-xs text-muted-foreground block">{a.reason}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Student Table */}
        <Card>
          <CardContent className="p-0">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Student List</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Course</TableHead>
                    <TableHead className="text-xs text-center">Engagement</TableHead>
                    <TableHead className="text-xs text-center">Churn</TableHead>
                    <TableHead className="text-xs text-center">Sessions</TableHead>
                    <TableHead className="text-xs text-center">Absences</TableHead>
                    <TableHead className="text-xs">Survey</TableHead>
                    <TableHead className="text-xs">Fee Status</TableHead>
                    <TableHead className="text-xs text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="text-sm">
                        <div>
                          <span className="font-medium">{s.name}</span>
                          <span className="block text-[10px] text-muted-foreground">{s.center} • {s.brand}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{s.course}</TableCell>
                      <TableCell className="text-center">
                        <span className={`font-bold text-sm ${getEngagementColor(s.engagementScore)}`}>{s.engagementScore}</span>
                      </TableCell>
                      <TableCell className="text-center">{getChurnBadge(s.churnProbability)}</TableCell>
                      <TableCell className="text-center text-xs">{s.sessionsCompleted}/{s.totalSessions}</TableCell>
                      <TableCell className="text-center">
                        <span className={`text-sm font-medium ${s.consecutiveAbsences >= 2 ? 'text-red-600' : 'text-foreground'}`}>
                          {s.consecutiveAbsences}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">{s.surveyStatus}</TableCell>
                      <TableCell>{getFeesBadge(s.feeStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-center">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleAction('Call', s.name)}>
                            <Phone className="h-3 w-3 mr-1" /> Call
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleAction('Message', s.name)}>
                            <MessageSquare className="h-3 w-3 mr-1" /> Msg
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper components
const SummaryCard = ({ icon: Icon, label, value, color, bg, suffix }: { icon: React.ElementType; label: string; value: number; color: string; bg: string; suffix?: string }) => (
  <Card className="border">
    <CardContent className="p-3 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground leading-none">{value}{suffix}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const ActionIcon = ({ type }: { type: string }) => {
  const map: Record<string, { icon: React.ElementType; color: string }> = {
    'call-atrisk': { icon: Phone, color: 'text-red-500' },
    'send-survey': { icon: ClipboardList, color: 'text-blue-500' },
    'follow-fee': { icon: CreditCard, color: 'text-amber-500' },
    're-engage': { icon: MessageSquare, color: 'text-orange-500' },
    'upsell': { icon: Sparkles, color: 'text-purple-500' },
  };
  const { icon: Icon, color } = map[type] || { icon: Activity, color: 'text-gray-500' };
  return <Icon className={`h-4 w-4 ${color} shrink-0`} />;
};

export default PostSalesDashboard;
