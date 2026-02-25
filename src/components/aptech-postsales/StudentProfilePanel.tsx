import React from 'react';
import { X, User, BookOpen, Calendar, CreditCard, Activity } from 'lucide-react';
import { mockStudentProfile } from '@/data/aptechPostSalesDemoData';

interface StudentProfilePanelProps {
  open: boolean;
  onClose: () => void;
}

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="h-4 w-4 text-orange-500" />
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
    </div>
    <div className="space-y-2 pl-6">{children}</div>
  </div>
);

const Field = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-baseline text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-medium ${highlight ? 'text-orange-600' : 'text-foreground'}`}>{value}</span>
  </div>
);

const StudentProfilePanel: React.FC<StudentProfilePanelProps> = ({ open, onClose }) => {
  const p = mockStudentProfile;

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />}

      {/* Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background border-r shadow-2xl z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-base">Student Profile</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        {/* Avatar + Name */}
        <div className="px-4 pt-5 pb-3 border-b flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {p.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-foreground">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.studentId}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-160px)] px-4 pt-4 pb-8">
          <Section icon={User} title="Personal">
            <Field label="Phone" value={p.phone} />
            <Field label="Email" value={p.email} />
            <Field label="Center" value={p.center} />
            <Field label="Batch" value={p.batch} />
          </Section>

          <Section icon={BookOpen} title="Course">
            <Field label="Course" value={p.courseName} />
            <Field label="Start" value={p.courseStartDate} />
            <Field label="Expected End" value={p.courseExpectedEnd} />
            <Field label="Current Module" value={p.currentModule} />
          </Section>

          <Section icon={Calendar} title="Attendance">
            <Field label="Sessions Attended" value={`${p.sessionsAttended} / ${p.totalSessions}`} />
            <Field label="Current Session" value={`#${p.currentSession}`} />
            <Field label="Last Attended" value={p.lastAttendedDate} />
            <Field label="Consecutive Absences" value={`${p.consecutiveAbsences}`} highlight={p.consecutiveAbsences > 0} />
            <Field label="Next Session" value={p.nextSessionDate} />
          </Section>

          <Section icon={CreditCard} title="Fees">
            <Field label="Plan" value={p.feePlan} />
            <Field label="Next Due" value={`${p.nextDueAmount} on ${p.nextDueDate}`} />
            <Field label="Status" value={p.feeStatus} highlight />
          </Section>

          <Section icon={Activity} title="Engagement">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-green-500 rounded-full" style={{ width: `${p.engagementScore}%` }} />
              </div>
              <span className="text-sm font-bold text-foreground">{p.engagementScore}/100</span>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default StudentProfilePanel;
