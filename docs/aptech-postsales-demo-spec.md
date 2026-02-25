# Aptech Post-Sales Demo — Build Spec for Lovable

**Purpose**: Detailed spec for building the post-sales-only demo experience: agentic chat (web + WhatsApp), user profile & notifications in the chat UI, full conversation flows from Day 1, and counsellor/internal dashboard with metrics and actionables.

**Reference**: Aptech-PostSales-NextSteps-Deck-and-Demo.md (Part 3 demo flow).

---

## 1. Demo Scope Summary (Confirmed)

| # | Requirement | In scope |
|---|-------------|----------|
| 1 | Agentic conversational flow: One agent that can answer and update any current engagement with the student, starting from Day 1 of visit (enrollment). | Yes |
| 2 | User profile in chat UI: Same agent has access to full user profile (user details, course details, attendance, other metadata). Profile + all notifications available in the chat interface: mobile = hamburger menu, desktop = top-left (agentic interface). | Yes |
| 3 | Complete agent conversations from Day 1: Display full thread from Day 1 welcome → consistent messaging across all use cases → survey filling → fees → query → recommendation. | Yes |
| 4 | Same experience on WhatsApp: Demo the same flows and capabilities in WhatsApp (student view). | Yes |
| 5 | Counsellor / internal dashboard: Dashboard with metrics and clear actionables for counsellors and internal users. | Yes |
| 6 | Dashboard metrics: Engagement score, churn probability, and other key metrics with clearly defined actionables. | Yes |

---

## 2. User Personas & Entry Points

| Persona | What they use | Purpose of demo |
|---------|--------------|-----------------|
| Student | (1) Web/in-app agentic chat, (2) WhatsApp | See one agent from Day 1: welcome, updates, surveys, fees, query, recommendation. Profile & notifications in chat UI. |
| Counsellor | Dashboard (web) | See metrics (engagement, churn probability, etc.) and actionables (who to call, what to do). |
| Internal / HQ | Same dashboard (broader view) | Same metrics at center/brand level; actionables for ops. |

---

## 3. Agentic Conversational Interface (Web / In-App)

### 3.1 Layout & Navigation

- **Main area**: Chat thread with the agent. All post-sales messages (welcome, session touches, triggers, surveys, fees, query replies, recommendations) appear in this single thread.
- **User profile & notifications**:
  - **Desktop**: Top-left of the agentic interface — icon or label "Profile" and "Notifications" (e.g. click to open a panel or slide-over).
  - **Mobile**: Hamburger menu (top-left or top-right) — open to show Profile and Notifications.
- **Profile panel/screen** (opened from top-left or hamburger) shows:
  - User details: Name, phone, email, student ID, center, batch.
  - Course details: Course name, start date, expected end, current module/session.
  - Attendance / metadata: Sessions attended, last attendance date, absences (e.g. "Last 2 sessions missed"), next session date.
  - Other metadata: Enrollment date, fee plan, next due date, engagement score (optional in profile for student view).
- **Notifications panel/screen**: List of all notifications (e.g. "Fee due in 3 days", "Survey: How's the course?", "We missed you – 2 absences"). Tapping one can scroll the chat to the relevant message or open the relevant action.

### 3.2 Agent Behaviour (Post-Sales Only for Demo)

One agent for the student. The agent:
- Answers questions (e.g. "Where is my certificate?", "What's my next session?") using user profile + course details + attendance.
- Updates current engagement: e.g. after user fills a survey, agent says "Thanks, we've recorded your feedback"; after payment, "Payment received."
- Conversation is contextual: Agent can say "You've completed 5 sessions" or "You missed the last 2 sessions" because it has attendance/metadata in the profile.
- All flows start from Day 1: Demo shows a single scrollable thread that includes (in order) Day 1 welcome through to recommendation, so "complete agent conversations from Day 1" is visible in one place.

### 3.3 Conversation Flows to Implement (Full Thread — Same Order for Demo)

Implement as one continuous thread (oldest at top, newest at bottom). Each message type should be clearly sendable by the agent in sequence for the demo.

| Order | Message type | Sender | Example content |
|-------|-------------|--------|-----------------|
| 1 | Day 1 – Welcome | Agent | "Welcome to [Aptech]! You're enrolled in [Course]. Your first session is on [date]. Here's how to access: [link]. Reply with any question." |
| 2 | Day 1 – Access | Agent | "Quick reminder: ProConnect login is [link]. Your batch timing: [time]. See you in class." |
| 3 | After session 1 | Agent | "Great start — you completed Session 1. Next up: [topic]. See you in the next class." |
| 4 | After session 4 (or every 4th) | Agent | "Quick check: How's the course going? Reply with a number 1–5 (5 = great). If anything's blocking you, just type it." |
| 5 | User reply (survey) | User | "4" |
| 6 | Agent (survey recorded) | Agent | "Thanks! We've recorded your feedback. We're here if you need anything." |
| 7 | Trigger – 2 absences | Agent | "We noticed you missed the last 2 sessions. Everything okay? Reply here or we'll call to check in." |
| 8 | User reply | User | "Was unwell, will join from next week." |
| 9 | Agent (engagement updated) | Agent | "Got it, we've noted that. Hope you feel better. Your next session is [date]. See you then." |
| 10 | Fee reminder | Agent | "Reminder: Your installment of ₹X is due on [date]. Pay here: [link]. Reply PAYMENT if you need help." |
| 11 | Query | User | "Where do I get my certificate?" |
| 12 | Agent (query answer) | Agent | "Certificates are under Profile → Certificates in ProConnect. If you don't see it after completion, reply SUPPORT and we'll escalate." |
| 13 | Post-course recommendation | Agent | "Based on your progress in [Current Course], you might like VFX Advanced (starting [date]). Reply YES for details or LATER to skip." |

### 3.4 User Profile Data (Demo / Mock)

For the demo, the profile (top-left / hamburger) should show at least:
- **User**: Name, Phone, Email, Student ID, Center, Batch.
- **Course**: Course name, Start date, Current session # (e.g. 8), Total sessions, Next session date.
- **Attendance**: Sessions attended (e.g. 6), Last attended (date), Consecutive absences (e.g. 2) or "None".
- **Fees**: Next due date, Amount, Status (e.g. "Due in 3 days").
- **Engagement score** (optional in profile): e.g. 72/100 for demo.

Use mock data for one student so the agent's answers and the profile stay in sync (e.g. "You've completed 6 sessions", "You missed the last 2").

---

## 4. WhatsApp Demo (Same Flows)

Same sequence as in Section 3.3 should be demoable in WhatsApp (student view).

**Options**:
- **A)** Build a WhatsApp Business API integration and send the same message types in order (recommended for "live" feel).
- **B)** Use a scrollable WhatsApp-style UI (mock) that shows the same thread — same content, same order, WhatsApp look and feel.

**Profile / notifications**: For WhatsApp, profile and notifications can be:
- Shown in a web dashboard "Student view" that mirrors the same thread and has a "Profile & Notifications" panel, or
- Simulated via a short menu in the mock (e.g. "Menu" → "My profile" / "Notifications") that opens a simple screen with the same fields as in 3.1.

**Must-have**: One demo path where the full thread (Day 1 welcome → survey → trigger → fees → query → recommendation) is visible in WhatsApp (or WhatsApp-style) so we can say "same experience on WhatsApp."

---

## 5. Counsellor / Internal Dashboard

### 5.1 Purpose

Show metrics and clear actionables so counsellors and internal users see what to do next.
Metrics must include engagement score and churn probability; other key metrics and actionables below.

### 5.2 Dashboard Layout (Single View for Demo)

- **Top / filters**: Center (or "All"), Brand, Date range (e.g. last 7 days / 30 days).
- **Main content**: Cards or sections for (1) Key metrics, (2) Actionables, (3) Student list (with metrics and actions).

### 5.3 Key Metrics to Display

| Metric | Description | Example / demo value |
|--------|-------------|---------------------|
| Engagement score | Per-student score (e.g. 0–100) from attendance, survey responses, reconnect events. | Show for each student; e.g. 72, 45, 88. |
| Churn probability | Likelihood of dropout (e.g. % or High/Medium/Low). | e.g. 15%, 62%, 8%; or "Low", "High", "Low". |
| Sessions completed | Out of expected (e.g. 6/30). | Per student. |
| Consecutive absences | Count (e.g. 0, 2). | Per student. |
| Survey status | Last survey (e.g. "4/5 on Session 4") or "Overdue". | Per student. |
| Fee status | Due date, overdue (e.g. "Due in 3 days", "Overdue 5 days"). | Per student. |
| At-risk count | Number of students with churn probability above threshold (e.g. >50%). | e.g. 12. |
| Collection rate | % of fees collected in period. | e.g. 94%. |

### 5.4 Clearly Defined Actionables

Each actionable should have a short label, reason (which metric/rule triggered it), and primary action (e.g. "Call", "Send message", "Escalate").

| Actionable | When shown | Primary action |
|------------|-----------|----------------|
| Call – at-risk | Churn probability > threshold (e.g. >50%) or 2+ consecutive absences. | "Call student" (with phone/student name). |
| Send message – survey overdue | Survey due (e.g. every 4th session) not completed. | "Send survey prompt" (or "Open chat"). |
| Follow up – fee overdue | Fee overdue by X days (e.g. 3+). | "Send reminder" / "Call for payment". |
| Re-engage – low engagement | Engagement score below threshold (e.g. <40). | "Call" or "Send check-in message". |
| Upsell – upgrade-ready | High engagement + near completion or completion. | "Suggest next course" (or "Already suggested"). |

**Dashboard implementation**:
- **Student list table** (or cards): Columns/cards: Student name, Course, Engagement score, Churn probability, Sessions, Absences, Fee status, Survey status, Actions (dropdown or buttons: Call, Send message, etc.).
- **Summary cards at top**: e.g. "At-risk: 12", "Survey overdue: 5", "Fee overdue: 3", "Upgrade-ready: 8".
- Clicking an action can (for demo): open a modal "Action logged" or deep-link to chat/WhatsApp with that student.

### 5.5 Internal vs Counsellor View

- **Counsellor**: Same dashboard filtered to their center (or assigned students); same metrics and actionables.
- **Internal / HQ**: Same dashboard with all centers or by brand; same metrics, aggregate (e.g. at-risk count by center, collection rate by center).
- One layout; role-based filter (center/brand) is enough for the demo.

---

## 6. Technical Hints for Lovable

- **Chat UI**: Single scrollable thread; messages from agent and user; optional "Profile" and "Notifications" in top-left (desktop) and hamburger (mobile). Use mock message list that can be preloaded with the Section 3.3 sequence.
- **Profile/Notifications**: Side panel or separate screen; data from a single mock student object (user, course, attendance, fees, engagement score).
- **Agent replies**: For demo, can be static per message type (no live LLM required); ensure answers to "Where is my certificate?" and "What's my next session?" are consistent with mock profile (course, next session date).
- **Survey flow**: Agent sends survey message → user input (number or text) → agent sends "Thanks, we've recorded your feedback."
- **WhatsApp**: Either (1) WhatsApp Business API + same content, or (2) a second view that looks like WhatsApp (same thread, same order).
- **Dashboard**: One page: summary metrics (engagement, churn, at-risk, fees, surveys) + table of students with metrics + action buttons. Mock data for 5–10 students with varied engagement/churn/fee states so actionables are visible.

---

## 7. Demo Script (Order of Show)

### Student – Web/In-app chat
1. Open agentic interface. Show top-left (desktop) / hamburger (mobile) → open Profile → show user, course, attendance, fees.
2. Open Notifications → show list.
3. Scroll full thread from Day 1 welcome → survey (ask → user reply → agent confirm) → 2 absences trigger → user reply → agent update → fee reminder → user query (certificate) → agent answer → post-course recommendation.

### Student – WhatsApp
1. Show same thread (or WhatsApp-style mock) with same flows so "same experience on WhatsApp" is clear.

### Counsellor / Internal – Dashboard
1. Open dashboard. Point to metrics: engagement score, churn probability, at-risk count, collection rate, etc.
2. Point to actionables: e.g. "Call – at-risk", "Survey overdue", "Fee overdue", "Re-engage", "Upsell".
3. Open student list; show per-student metrics and action buttons; click one action (e.g. "Call") to show it's clear and actionable.

---

## 8. Acceptance Criteria (Demo Ready)

- [ ] One agentic chat thread (web) with full conversation from Day 1 welcome through recommendation (Section 3.3 order).
- [ ] Profile (user, course, attendance, metadata) openable from top-left (desktop) and hamburger (mobile).
- [ ] Notifications list openable from same places; at least 2–3 sample notifications.
- [ ] Agent can answer (e.g. certificate, next session) and update (e.g. survey recorded, "noted – will join next week") in the thread.
- [ ] Survey flow: agent asks → user replies → agent confirms "recorded."
- [ ] WhatsApp (or WhatsApp-style) view with same thread / same flows.
- [ ] Dashboard with: engagement score, churn probability, at-risk count, fee/survey status; actionables (Call at-risk, Survey overdue, Fee overdue, Re-engage, Upsell) with clear labels and primary action.
- [ ] Student list with per-student metrics and action buttons; counsellor view (one center) and internal view (all/aggregate) possible via filter.

---

*Document end. This spec is intended for Lovable to implement the post-sales demo; extend or refine sections as needed for implementation details (e.g. API contracts, state management).*
