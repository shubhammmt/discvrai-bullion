import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, AlertTriangle, Clock, CheckCircle2, Send, ArrowUpRight } from 'lucide-react';

interface Task {
  id: string;
  type: 'FLM Check' | 'Balance Recount' | 'Cassette Swap' | 'Seal Verification';
  status: 'Open' | 'In Progress' | 'Closed';
  assignedTo: string;
  createdAt: string;
  slaDeadline: string;
  slaRemaining: string;
}

interface Escalation {
  id: string;
  issue: string;
  escalatedTo: string;
  severity: 'High' | 'Critical';
  timestamp: string;
  status: 'Pending' | 'Acknowledged';
}

interface Props {
  terminalId: string;
}

const ActionConsole: React.FC<Props> = ({ terminalId }) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [taskAssigned, setTaskAssigned] = useState(false);
  const [escalated, setEscalated] = useState(false);

  const activeTasks: Task[] = [
    { id: 'TSK-001', type: 'FLM Check', status: 'In Progress', assignedTo: 'Vikram Meena', createdAt: '14:20', slaDeadline: '16:20', slaRemaining: '1h 42m' },
    { id: 'TSK-002', type: 'Balance Recount', status: 'Open', assignedTo: 'Unassigned', createdAt: '11:35', slaDeadline: '15:35', slaRemaining: '0h 18m' },
  ];

  const escalations: Escalation[] = [
    { id: 'ESC-001', issue: 'Balance Drift ₹5,200 unresolved for 6h', escalatedTo: 'Regional Manager — West', severity: 'High', timestamp: '12:30', status: 'Acknowledged' },
  ];

  const handleAssignTask = () => {
    if (selectedTask) setTaskAssigned(true);
  };

  const handleEscalate = () => {
    setEscalated(true);
  };

  const slaColor = (remaining: string) => {
    const mins = parseInt(remaining);
    if (remaining.includes('0h') && mins < 30) return 'text-red-600 bg-red-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  return (
    <div className="space-y-3">
      {/* Assign Task */}
      <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-3">
        <p className="text-[10px] font-bold text-blue-700 mb-2 flex items-center gap-1"><Wrench className="h-3.5 w-3.5" /> Assign Task</p>
        <div className="flex gap-2">
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger className="h-7 text-[10px] flex-1 border-blue-200">
              <SelectValue placeholder="Select action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flm" className="text-[11px]">Trigger Immediate FLM Check</SelectItem>
              <SelectItem value="recount" className="text-[11px]">Request Balance Recount</SelectItem>
              <SelectItem value="swap" className="text-[11px]">Schedule Cassette Swap</SelectItem>
              <SelectItem value="seal" className="text-[11px]">Verify Cassette Seal</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-7 text-[10px] gap-1" onClick={handleAssignTask} disabled={!selectedTask || taskAssigned}>
            <Send className="h-3 w-3" /> {taskAssigned ? 'Assigned ✓' : 'Assign'}
          </Button>
        </div>
        {taskAssigned && (
          <p className="text-[9px] text-emerald-600 font-medium mt-1.5">✓ Task assigned to next available FLM agent. SLA: 2 hours.</p>
        )}
      </div>

      {/* Escalate Exceptions */}
      <div className="rounded-lg border border-red-200 bg-red-50/30 p-3">
        <p className="text-[10px] font-bold text-red-700 mb-2 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Escalate Exception</p>
        <div className="space-y-1.5 mb-2">
          <div className="flex items-center gap-2 p-2 rounded border border-red-200 bg-white">
            <input type="checkbox" className="h-3 w-3" defaultChecked />
            <span className="text-[10px] text-slate-700">Balance Drift — ₹5,200 unresolved</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded border border-amber-200 bg-white">
            <input type="checkbox" className="h-3 w-3" />
            <span className="text-[10px] text-slate-700">Silent Close Event — Unreported overage</span>
          </div>
        </div>
        <Button size="sm" variant="destructive" className="h-7 text-[10px] gap-1 w-full" onClick={handleEscalate} disabled={escalated}>
          <ArrowUpRight className="h-3 w-3" /> {escalated ? 'Escalated to Regional Manager ✓' : 'Escalate to Regional Manager'}
        </Button>
      </div>

      {/* SLA Monitor */}
      <div className="rounded-lg border border-slate-200 p-3">
        <p className="text-[10px] font-bold text-slate-700 mb-2 flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-amber-500" /> Active SLA Monitor</p>
        {activeTasks.map(t => (
          <div key={t.id} className="flex items-center gap-2 p-2 rounded border border-slate-100 mb-1.5 last:mb-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-900">{t.type}</span>
                <Badge className={`text-[7px] px-1 py-0 ${t.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{t.status}</Badge>
              </div>
              <p className="text-[9px] text-slate-500">Assigned: {t.assignedTo} · Created {t.createdAt}</p>
            </div>
            <div className={`text-center px-2 py-1 rounded ${slaColor(t.slaRemaining)}`}>
              <p className="text-[8px] font-bold uppercase">SLA</p>
              <p className="text-[11px] font-bold font-mono">{t.slaRemaining}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Escalation History */}
      {escalations.length > 0 && (
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-[10px] font-bold text-slate-700 mb-2">Escalation History</p>
          {escalations.map(e => (
            <div key={e.id} className="p-2 rounded border border-slate-100 text-[10px]">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-slate-900">{e.issue}</span>
                <Badge className={`text-[7px] px-1 py-0 ${e.status === 'Acknowledged' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{e.status}</Badge>
              </div>
              <p className="text-[9px] text-slate-500">→ {e.escalatedTo} · {e.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionConsole;
