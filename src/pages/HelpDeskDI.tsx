import React, { useState, useRef } from 'react';
import { Activity, ChevronDown, Upload, MapPin, CheckCircle2, AlertTriangle, Clock, Wrench, Zap, Package, ShieldAlert, Users, Fuel, CalendarCheck, FileCheck, Pencil, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type Priority = 'critical' | 'high' | 'medium' | 'low';
type Category = 'mechanical' | 'electrical' | 'supply-chain' | 'safety' | 'crew-hr';
type TicketStatus = 'open' | 'in-progress' | 'waiting-parts' | 'resolved';

interface Ticket {
  id: string;
  category: Category;
  priority: Priority;
  subject: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
  headOfficeNote?: string;
}

const CATEGORIES: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: 'mechanical', label: 'Mechanical', icon: <Wrench className="w-4 h-4" /> },
  { value: 'electrical', label: 'Electrical', icon: <Zap className="w-4 h-4" /> },
  { value: 'supply-chain', label: 'Supply Chain', icon: <Package className="w-4 h-4" /> },
  { value: 'safety', label: 'Safety (HSE)', icon: <ShieldAlert className="w-4 h-4" /> },
  { value: 'crew-hr', label: 'Crew / HR', icon: <Users className="w-4 h-4" /> },
];

const PRIORITIES: { value: Priority; label: string; color: string; bgColor: string }[] = [
  { value: 'critical', label: 'Critical', color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)' },
  { value: 'high', label: 'High', color: '#F97316', bgColor: 'rgba(249,115,22,0.15)' },
  { value: 'medium', label: 'Medium', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)' },
  { value: 'low', label: 'Low', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.15)' },
];

const STATUS_CONFIG: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  'open': { label: 'Open', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  'in-progress': { label: 'In-Progress', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  'waiting-parts': { label: 'Waiting for Parts', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  'resolved': { label: 'Resolved', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
};

const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TK-1024',
    category: 'mechanical',
    priority: 'critical',
    subject: 'Drawworks brake band failure',
    description: 'Primary brake band showing excessive wear, secondary holding but needs immediate replacement.',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    headOfficeNote: 'Replacement part dispatched via express. ETA 4 hours. Keep secondary brake engaged.',
  },
  {
    id: 'TK-1023',
    category: 'supply-chain',
    priority: 'medium',
    subject: 'Drill bit inventory low',
    description: '12¼" PDC bits down to last 2 units. Need restock for next section.',
    status: 'waiting-parts',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    headOfficeNote: 'Order placed with vendor. Expected delivery: 2 days.',
  },
  {
    id: 'TK-1021',
    category: 'electrical',
    priority: 'high',
    subject: 'VFD fault on Pump #3',
    description: 'Variable frequency drive throwing overcurrent fault intermittently on mud pump #3.',
    status: 'open',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 'TK-1018',
    category: 'safety',
    priority: 'low',
    subject: 'Safety signage update needed',
    description: 'H2S warning signs at cellar deck faded and need replacement per HSE audit.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    headOfficeNote: 'New signage installed. Closed after site verification.',
  },
];

let ticketCounter = 1025;

const HelpDeskDI = () => {
  const [selectedRig, setSelectedRig] = useState('Rig #7');
  const [rigStatus, setRigStatus] = useState<'operational' | 'npt'>('operational');
  const [category, setCategory] = useState<Category | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [errors, setErrors] = useState<{ category?: boolean; priority?: boolean }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTicketId, setLastTicketId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    const newErrors: { category?: boolean; priority?: boolean } = {};
    if (!category) newErrors.category = true;
    if (!priority) newErrors.priority = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const id = `TK-${ticketCounter++}`;
    const newTicket: Ticket = {
      id,
      category: category as Category,
      priority: priority as Priority,
      subject: subject || 'No subject provided',
      description: description || 'No description provided',
      status: 'open',
      createdAt: new Date(),
    };

    setTickets([newTicket, ...tickets]);
    setLastTicketId(id);
    setShowSuccess(true);
    setCategory('');
    setPriority('');
    setSubject('');
    setDescription('');
    setFileName('');

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 }, colors: ['#22C55E', '#3B82F6', '#F59E0B'] });

    setTimeout(() => setShowSuccess(false), 4000);
  };

  const timeAgo = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen" style={{ background: '#0B0F19', color: '#FFFFFF' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: 'rgba(11,15,25,0.95)', borderColor: 'rgba(148,163,184,0.15)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6" style={{ color: '#22C55E' }} />
              <h1 className="text-lg font-bold tracking-tight">Rig-Sight Field Support</h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
                style={{
                  background: rigStatus === 'operational' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  color: rigStatus === 'operational' ? '#22C55E' : '#EF4444',
                  border: `1px solid ${rigStatus === 'operational' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: rigStatus === 'operational' ? '#22C55E' : '#EF4444' }} />
                {rigStatus === 'operational' ? 'Operational' : 'NPT/Down'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs" style={{ color: '#94A3B8' }}>
            <span>Logged in as: <strong className="text-white">Site Supervisor</strong></span>
            <div className="relative">
              <select
                value={selectedRig}
                onChange={(e) => setSelectedRig(e.target.value)}
                className="appearance-none text-xs font-semibold px-3 py-1.5 pr-7 rounded-lg border cursor-pointer"
                style={{ background: 'rgba(148,163,184,0.1)', borderColor: 'rgba(148,163,184,0.2)', color: '#FFFFFF' }}
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i} value={`Rig #${i + 1}`} style={{ background: '#0B0F19' }}>Rig #{i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#94A3B8' }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm"
              style={{ background: 'linear-gradient(135deg, #065F46, #064E3B)', border: '1px solid rgba(34,197,94,0.3)' }}
            >
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" style={{ color: '#22C55E' }} />
              <div>
                <p className="font-bold text-sm">Ticket #{lastTicketId} Raised!</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Sent to Head Office. Response Time: &lt;2 Hours</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Raise a Ticket Form */}
        <section>
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
            Raise a Ticket
          </h2>

          <div className="space-y-5 p-5 rounded-2xl border" style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)' }}>
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
                Category <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value as Category); setErrors(prev => ({ ...prev, category: false })); }}
                  className="w-full appearance-none px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer"
                  style={{
                    background: 'rgba(148,163,184,0.08)',
                    borderColor: errors.category ? '#EF4444' : 'rgba(148,163,184,0.15)',
                    color: category ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  <option value="" style={{ background: '#0B0F19' }}>Select issue category...</option>
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value} style={{ background: '#0B0F19' }}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#94A3B8' }} />
              </div>
              {errors.category && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>⚠ Category is required</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
                Priority <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRIORITIES.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => { setPriority(p.value); setErrors(prev => ({ ...prev, priority: false })); }}
                    className="py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      background: priority === p.value ? p.bgColor : 'rgba(148,163,184,0.06)',
                      border: `2px solid ${priority === p.value ? p.color : errors.priority ? '#EF4444' : 'rgba(148,163,184,0.1)'}`,
                      color: priority === p.value ? p.color : '#94A3B8',
                      boxShadow: priority === p.value ? `0 0 20px ${p.bgColor}` : 'none',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {errors.priority && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>⚠ Priority is required</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Issue Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief title of the issue..."
                className="w-full px-4 py-3 rounded-xl border text-sm"
                style={{ background: 'rgba(148,163,184,0.08)', borderColor: 'rgba(148,163,184,0.15)', color: '#FFFFFF' }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Detailed Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is the problem? Describe in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border text-sm resize-none"
                style={{ background: 'rgba(148,163,184,0.08)', borderColor: 'rgba(148,163,184,0.15)', color: '#FFFFFF' }}
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Evidence Upload</label>
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all hover:border-opacity-50"
                style={{ borderColor: 'rgba(148,163,184,0.2)', color: '#94A3B8', background: 'rgba(148,163,184,0.04)' }}
              >
                <Upload className="w-4 h-4" />
                {fileName || 'Take Photo or Upload File'}
              </button>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Location</label>
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm"
                style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)', color: '#94A3B8' }}
              >
                <MapPin className="w-4 h-4" style={{ color: '#22C55E' }} />
                <span>Gopavaram Site — {selectedRig}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(34,197,94,0.3)',
              }}
            >
              🚀 RAISE SUPPORT TICKET
            </button>
          </div>
        </section>

        {/* My Active Tickets */}
        <section>
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: '#3B82F6' }} />
            My Active Tickets
          </h2>
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const statusCfg = STATUS_CONFIG[ticket.status];
              const priCfg = PRIORITIES.find(p => p.value === ticket.priority);
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl border"
                  style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold" style={{ color: '#94A3B8' }}>#{ticket.id}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                        style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}30` }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {priCfg && (
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: priCfg.color }} />
                      )}
                      <span className="text-[10px]" style={{ color: '#94A3B8' }}>{timeAgo(ticket.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-1">{ticket.subject}</p>
                  <p className="text-xs mb-3" style={{ color: '#94A3B8' }}>{ticket.description}</p>
                  {ticket.headOfficeNote && (
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(59,130,246,0.08)', borderLeft: '3px solid #3B82F6' }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#3B82F6' }}>Head Office Note</p>
                      <p className="text-xs" style={{ color: '#CBD5E1' }}>{ticket.headOfficeNote}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Rig Vital Signs */}
        <section className="pb-8">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" style={{ color: '#22C55E' }} />
            Rig Vital Signs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Fuel */}
            <div className="p-4 rounded-2xl border" style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Fuel className="w-4 h-4" style={{ color: '#F59E0B' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Fuel Stock</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold">65%</span>
                <span className="text-xs pb-1" style={{ color: '#94A3B8' }}>Remaining</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(148,163,184,0.15)' }}>
                <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #F59E0B, #EAB308)' }} />
              </div>
            </div>

            {/* Maintenance */}
            <div className="p-4 rounded-2xl border" style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarCheck className="w-4 h-4" style={{ color: '#3B82F6' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Maintenance</span>
              </div>
              <p className="text-sm font-semibold">Next Service Due</p>
              <p className="text-lg font-bold mt-1" style={{ color: '#3B82F6' }}>15-Apr-2026</p>
            </div>

            {/* Compliance */}
            <div className="p-4 rounded-2xl border" style={{ background: 'rgba(148,163,184,0.04)', borderColor: 'rgba(148,163,184,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="w-4 h-4" style={{ color: '#22C55E' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Compliance</span>
              </div>
              <p className="text-sm font-semibold">Vehicle Paperwork</p>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#22C55E' }} />
                <span className="text-lg font-bold" style={{ color: '#22C55E' }}>100% Valid</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpDeskDI;
