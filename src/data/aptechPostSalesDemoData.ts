// Mock data for Aptech Post-Sales Demo

export interface StudentProfile {
  name: string;
  phone: string;
  email: string;
  studentId: string;
  center: string;
  batch: string;
  courseName: string;
  courseStartDate: string;
  courseExpectedEnd: string;
  currentModule: string;
  currentSession: number;
  totalSessions: number;
  nextSessionDate: string;
  sessionsAttended: number;
  lastAttendedDate: string;
  consecutiveAbsences: number;
  enrollmentDate: string;
  feePlan: string;
  nextDueDate: string;
  nextDueAmount: string;
  feeStatus: string;
  engagementScore: number;
}

export type WidgetType = 'survey' | 'payment' | 'schedule-change' | 'catchup-material' | 'certificate' | null;

export interface DemoMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  dayLabel?: string;
  messageType: string;
  widget?: WidgetType;
  widgetData?: Record<string, any>;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'fee' | 'survey' | 'attendance' | 'course' | 'recommendation';
  read: boolean;
}

export interface DashboardStudent {
  id: string;
  name: string;
  course: string;
  center: string;
  brand: string;
  engagementScore: number;
  churnProbability: number;
  sessionsCompleted: number;
  totalSessions: number;
  consecutiveAbsences: number;
  surveyStatus: string;
  feeStatus: string;
  feeDueDate: string;
  phone: string;
  lastActive: string;
}

// ─── Student Profile (synced with conversation) ─────────────────────────

export const mockStudentProfile: StudentProfile = {
  name: 'Rahul Verma',
  phone: '+91 98765 43210',
  email: 'rahul.verma@email.com',
  studentId: 'APT-STU-2026-0847',
  center: 'Andheri West',
  batch: 'March 2026 — Weekday Morning',
  courseName: 'Animation & VFX Pro',
  courseStartDate: 'March 3, 2026',
  courseExpectedEnd: 'March 2028',
  currentModule: 'Digital Sculpting (ZBrush)',
  currentSession: 8,
  totalSessions: 60,
  nextSessionDate: 'March 28, 2026',
  sessionsAttended: 6,
  lastAttendedDate: 'March 18, 2026',
  consecutiveAbsences: 2,
  enrollmentDate: 'February 17, 2026',
  feePlan: '12 Month EMI — ₹14,167/mo',
  nextDueDate: 'April 3, 2026',
  nextDueAmount: '₹14,167',
  feeStatus: 'Due in 6 days',
  engagementScore: 72,
};

// ─── Conversation Thread (Section 3.3) ──────────────────────────────────

export const mockConversationThread: DemoMessage[] = [
  {
    id: 1,
    type: 'bot',
    content: "Welcome to Aptech! 🎓 You're enrolled in **Animation & VFX Pro** at our Andheri West center.\n\nYour first session is on **March 3, 2026**. Here's how to access your course materials: [ProConnect Portal](https://proconnect.aptech.edu)\n\nReply with any question — I'm here to help throughout your journey!",
    timestamp: '9:00 AM',
    dayLabel: 'Day 1 — Welcome & Onboarding',
    messageType: 'welcome',
  },
  {
    id: 2,
    type: 'bot',
    content: "Quick reminder: Your ProConnect login is ready at proconnect.aptech.edu 🔑\n\nBatch timing: **Mon–Fri, 10:00 AM – 1:00 PM**\nFaculty: **Rajesh Menon** (12 yrs industry, ex-Prime Focus)\n\nSee you in class tomorrow! 🎬",
    timestamp: '9:05 AM',
    messageType: 'access',
  },
  {
    id: 3,
    type: 'bot',
    content: "Great start, Rahul! ✅ You completed **Session 1: Introduction to 3D Modeling**.\n\nNext up: **Session 2 — Maya Interface & Navigation**. See you in the next class!",
    timestamp: '1:30 PM',
    dayLabel: 'Day 1 — After Session 1',
    messageType: 'session1-complete',
  },
  // ── Survey (interactive) ──
  {
    id: 4,
    type: 'bot',
    content: "Quick check-in 📊 How's the course going so far? Please fill this quick survey:",
    timestamp: '1:30 PM',
    dayLabel: 'After Session 4 — Satisfaction Survey',
    messageType: 'survey-ask',
    widget: 'survey',
    widgetData: {},
  },
  // ── Schedule Change: Holiday Announcement ──
  {
    id: 5,
    type: 'bot',
    content: "📢 Important update about your upcoming schedule:",
    timestamp: '10:00 AM',
    dayLabel: 'Schedule Update — Holiday',
    messageType: 'holiday-announcement',
    widget: 'schedule-change',
    widgetData: {
      changeType: 'holiday',
      title: '🎉 Holiday — Holi Celebrations',
      details: ['No classes on March 14 (Friday)', 'Center closed for Holi celebrations', 'Regular classes resume March 17 (Monday)'],
      effectiveDate: 'March 14, 2026',
      note: 'Happy Holi! Enjoy the festival and see you on Monday!',
    },
  },
  // ── Faculty Change ──
  {
    id: 6,
    type: 'bot',
    content: "📢 Update about your upcoming classes:",
    timestamp: '5:00 PM',
    dayLabel: 'Faculty & Timing Change',
    messageType: 'faculty-change',
    widget: 'schedule-change',
    widgetData: {
      changeType: 'faculty-change',
      title: 'Faculty Update — Session 6 onwards',
      details: [
        'New faculty: **Priya Deshmukh** (10 yrs, ex-Pixar India)',
        'Priya specializes in Digital Sculpting & ZBrush',
        'Rajesh Menon continues for Maya & Rigging modules',
      ],
      effectiveDate: 'March 17, 2026',
      note: 'Priya is an award-winning sculptor — you\'re in great hands!',
    },
  },
  // ── Class Timing Change ──
  {
    id: 7,
    type: 'bot',
    content: "⏰ Your class timings are being adjusted next week:",
    timestamp: '6:00 PM',
    messageType: 'timing-change',
    widget: 'schedule-change',
    widgetData: {
      changeType: 'timing-change',
      title: 'Batch Timing Change',
      details: [
        'Old timing: 10:00 AM – 1:00 PM',
        'New timing: **11:00 AM – 2:00 PM**',
        'Applicable: March 17–21 only (temporary)',
      ],
      effectiveDate: 'March 17–21, 2026',
      note: 'This is a one-week adjustment. Regular timing resumes March 24.',
    },
  },
  // ── Absence trigger + catch-up materials ──
  {
    id: 8,
    type: 'bot',
    content: "Hi Rahul 👋 We noticed you've missed the **last 2 sessions** (Session 7 & 8).\n\nEverything okay? Here's the catch-up material so you don't fall behind:",
    timestamp: '10:00 AM',
    dayLabel: 'Trigger — 2 Consecutive Absences',
    messageType: 'absence-trigger',
    widget: 'catchup-material',
    widgetData: {
      sessionTitle: 'Character Modeling Basics & Polygon Topology',
      sessionNumber: 7,
      materials: [
        { title: 'Session 7 Recording: Character Modeling', type: 'video', duration: '1h 45m', url: '#' },
        { title: 'Session 8 Recording: Polygon Topology', type: 'video', duration: '1h 30m', url: '#' },
        { title: 'Character Modeling Reference Sheet', type: 'pdf', duration: '12 pages', url: '#' },
        { title: 'Practice Exercise: Low-Poly Character', type: 'exercise', duration: '~2 hrs', url: '#' },
      ],
    },
  },
  {
    id: 9,
    type: 'user',
    content: 'Was unwell, will join from next week.',
    timestamp: '11:30 AM',
    messageType: 'absence-reply',
  },
  {
    id: 10,
    type: 'bot',
    content: "Got it, Rahul — we've noted that. Hope you feel better! 🙏\n\nYour next session is **March 28 (Monday) — Digital Sculpting (ZBrush)**. See you then!\n\nMake sure to go through the catch-up materials above before rejoining.",
    timestamp: '11:31 AM',
    messageType: 'absence-acknowledged',
  },
  // ── Fee reminder with payment widget ──
  {
    id: 11,
    type: 'bot',
    content: "📋 **Fee Reminder**: Your next installment is due. You can pay directly here:",
    timestamp: '10:00 AM',
    dayLabel: 'Fee Reminder',
    messageType: 'fee-reminder',
    widget: 'payment',
    widgetData: { amount: '14,167', dueDate: 'April 3, 2026', installmentNumber: 5 },
  },
  // ── Student Query ──
  {
    id: 12,
    type: 'user',
    content: 'Where do I get my certificate?',
    timestamp: '3:00 PM',
    dayLabel: 'Student Query',
    messageType: 'query',
  },
  {
    id: 13,
    type: 'bot',
    content: "Here's your certificate for the completed module! 📜 You can view and download it right here:",
    timestamp: '3:01 PM',
    messageType: 'query-answer',
    widget: 'certificate',
    widgetData: {
      studentName: 'Rahul Verma',
      courseName: 'Animation & VFX Pro — Module 1: 3D Modeling Foundations',
      completionDate: 'March 25, 2026',
      certificateId: 'APT-CERT-2026-08471',
      brand: 'Arena',
      isPreview: false,
    },
  },
  // ── Post-course Recommendation ──
  {
    id: 14,
    type: 'bot',
    content: "🚀 **Recommended for you!**\n\nBased on your progress in **Animation & VFX Pro**, you might be interested in:\n\n🎬 **VFX Advanced** — Starting June 2026\n• Compositing, motion tracking, Houdini FX\n• 90% placement rate for advanced graduates\n\nHere's what the certificate looks like on completion:",
    timestamp: '10:00 AM',
    dayLabel: 'Post-Course Recommendation',
    messageType: 'recommendation',
    widget: 'certificate',
    widgetData: {
      studentName: 'Rahul Verma',
      courseName: 'VFX Advanced — Compositing & Houdini FX',
      completionDate: 'December 2026 (Expected)',
      certificateId: 'APT-CERT-XXXX-XXXXX',
      brand: 'Arena',
      isPreview: true,
    },
  },
];

// ─── Notifications ──────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Fee due in 6 days',
    description: 'Your installment of ₹14,167 is due on April 3, 2026.',
    time: '2 hours ago',
    type: 'fee',
    read: false,
  },
  {
    id: 2,
    title: 'Survey: How\'s the course?',
    description: 'Quick check-in after Session 4. Tap to respond.',
    time: '1 day ago',
    type: 'survey',
    read: false,
  },
  {
    id: 3,
    title: 'We missed you — 2 absences',
    description: 'You\'ve missed Session 7 & 8. Let us know if everything is okay.',
    time: '3 days ago',
    type: 'attendance',
    read: true,
  },
  {
    id: 4,
    title: 'New recommendation available',
    description: 'VFX Advanced course starting June 2026 — a great next step for you.',
    time: '5 days ago',
    type: 'recommendation',
    read: true,
  },
  {
    id: 5,
    title: 'Session 1 completed! 🎉',
    description: 'You\'ve completed Introduction to 3D Modeling. Keep going!',
    time: '1 week ago',
    type: 'course',
    read: true,
  },
];

// ─── Dashboard Students (5–10 varied states) ───────────────────────────

export const mockDashboardStudents: DashboardStudent[] = [
  {
    id: 'APT-STU-2026-0847',
    name: 'Rahul Verma',
    course: 'Animation & VFX Pro',
    center: 'Andheri West',
    brand: 'Arena',
    engagementScore: 72,
    churnProbability: 15,
    sessionsCompleted: 6,
    totalSessions: 60,
    consecutiveAbsences: 2,
    surveyStatus: '4/5 on Session 4',
    feeStatus: 'Due in 6 days',
    feeDueDate: 'Apr 3',
    phone: '+91 98765 43210',
    lastActive: '2 days ago',
  },
  {
    id: 'APT-STU-2026-0912',
    name: 'Priya Sharma',
    course: 'Web & App Development',
    center: 'Andheri West',
    brand: 'Arena',
    engagementScore: 88,
    churnProbability: 8,
    sessionsCompleted: 14,
    totalSessions: 48,
    consecutiveAbsences: 0,
    surveyStatus: '5/5 on Session 12',
    feeStatus: 'Paid',
    feeDueDate: 'May 1',
    phone: '+91 99887 76543',
    lastActive: 'Today',
  },
  {
    id: 'APT-STU-2026-0634',
    name: 'Arjun Patel',
    course: 'Animation & VFX Pro',
    center: 'Borivali',
    brand: 'Arena',
    engagementScore: 45,
    churnProbability: 62,
    sessionsCompleted: 8,
    totalSessions: 60,
    consecutiveAbsences: 4,
    surveyStatus: 'Overdue',
    feeStatus: 'Overdue 12 days',
    feeDueDate: 'Mar 16',
    phone: '+91 97654 32109',
    lastActive: '8 days ago',
  },
  {
    id: 'APT-STU-2026-0455',
    name: 'Sneha Kulkarni',
    course: 'MAAC — VFX Plus',
    center: 'Dadar',
    brand: 'MAAC',
    engagementScore: 91,
    churnProbability: 5,
    sessionsCompleted: 28,
    totalSessions: 30,
    consecutiveAbsences: 0,
    surveyStatus: '5/5 on Session 24',
    feeStatus: 'Paid',
    feeDueDate: '—',
    phone: '+91 98123 45678',
    lastActive: 'Today',
  },
  {
    id: 'APT-STU-2026-0789',
    name: 'Vikram Singh',
    course: 'Graphic Design',
    center: 'Andheri West',
    brand: 'Arena',
    engagementScore: 38,
    churnProbability: 55,
    sessionsCompleted: 5,
    totalSessions: 40,
    consecutiveAbsences: 3,
    surveyStatus: '2/5 on Session 4',
    feeStatus: 'Overdue 5 days',
    feeDueDate: 'Mar 23',
    phone: '+91 91234 56789',
    lastActive: '5 days ago',
  },
  {
    id: 'APT-STU-2026-1001',
    name: 'Ananya Desai',
    course: 'LAPA — Broadcast Journalism',
    center: 'Bandra',
    brand: 'LAPA',
    engagementScore: 76,
    churnProbability: 18,
    sessionsCompleted: 12,
    totalSessions: 36,
    consecutiveAbsences: 1,
    surveyStatus: '4/5 on Session 8',
    feeStatus: 'Due in 3 days',
    feeDueDate: 'Mar 31',
    phone: '+91 90876 54321',
    lastActive: 'Yesterday',
  },
  {
    id: 'APT-STU-2026-1102',
    name: 'Karan Mehta',
    course: 'Animation & VFX Pro',
    center: 'Borivali',
    brand: 'Arena',
    engagementScore: 65,
    churnProbability: 28,
    sessionsCompleted: 10,
    totalSessions: 60,
    consecutiveAbsences: 0,
    surveyStatus: '3/5 on Session 8',
    feeStatus: 'Paid',
    feeDueDate: 'Apr 15',
    phone: '+91 88765 43210',
    lastActive: 'Today',
  },
  {
    id: 'APT-STU-2026-1205',
    name: 'Ritu Agarwal',
    course: 'Lakmé — Beauty & Wellness',
    center: 'Juhu',
    brand: 'Lakmé Academy',
    engagementScore: 82,
    churnProbability: 10,
    sessionsCompleted: 20,
    totalSessions: 24,
    consecutiveAbsences: 0,
    surveyStatus: '5/5 on Session 16',
    feeStatus: 'Paid',
    feeDueDate: '—',
    phone: '+91 87654 32109',
    lastActive: 'Today',
  },
];

// ─── Dashboard Summary Helpers ──────────────────────────────────────────

export const getDashboardSummary = (students: DashboardStudent[]) => {
  const atRisk = students.filter(s => s.churnProbability > 50).length;
  const surveyOverdue = students.filter(s => s.surveyStatus === 'Overdue').length;
  const feeOverdue = students.filter(s => s.feeStatus.includes('Overdue')).length;
  const upgradeReady = students.filter(s => s.engagementScore >= 80 && s.sessionsCompleted / s.totalSessions > 0.8).length;
  const avgEngagement = Math.round(students.reduce((sum, s) => sum + s.engagementScore, 0) / students.length);
  const feePaid = students.filter(s => s.feeStatus === 'Paid').length;
  const collectionRate = Math.round((feePaid / students.length) * 100);

  return { atRisk, surveyOverdue, feeOverdue, upgradeReady, avgEngagement, collectionRate };
};

// ─── Actionable helpers ─────────────────────────────────────────────────

export type ActionType = 'call-atrisk' | 'send-survey' | 'follow-fee' | 're-engage' | 'upsell';

export interface StudentAction {
  studentId: string;
  studentName: string;
  actionType: ActionType;
  label: string;
  reason: string;
  phone: string;
}

export const getStudentActions = (students: DashboardStudent[]): StudentAction[] => {
  const actions: StudentAction[] = [];
  
  students.forEach(s => {
    if (s.churnProbability > 50 || s.consecutiveAbsences >= 2) {
      actions.push({
        studentId: s.id,
        studentName: s.name,
        actionType: 'call-atrisk',
        label: 'Call — At Risk',
        reason: s.churnProbability > 50 ? `Churn ${s.churnProbability}%` : `${s.consecutiveAbsences} absences`,
        phone: s.phone,
      });
    }
    if (s.surveyStatus === 'Overdue') {
      actions.push({
        studentId: s.id,
        studentName: s.name,
        actionType: 'send-survey',
        label: 'Send Survey',
        reason: 'Survey overdue',
        phone: s.phone,
      });
    }
    if (s.feeStatus.includes('Overdue')) {
      actions.push({
        studentId: s.id,
        studentName: s.name,
        actionType: 'follow-fee',
        label: 'Follow Up — Fee',
        reason: s.feeStatus,
        phone: s.phone,
      });
    }
    if (s.engagementScore < 40) {
      actions.push({
        studentId: s.id,
        studentName: s.name,
        actionType: 're-engage',
        label: 'Re-engage',
        reason: `Engagement ${s.engagementScore}/100`,
        phone: s.phone,
      });
    }
    if (s.engagementScore >= 80 && s.sessionsCompleted / s.totalSessions > 0.8) {
      actions.push({
        studentId: s.id,
        studentName: s.name,
        actionType: 'upsell',
        label: 'Upsell — Upgrade Ready',
        reason: `${Math.round(s.sessionsCompleted / s.totalSessions * 100)}% complete, engagement ${s.engagementScore}`,
        phone: s.phone,
      });
    }
  });

  return actions;
};
