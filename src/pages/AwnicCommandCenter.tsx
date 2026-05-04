import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Clock,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Screen = {
  id: string;
  title: string;
  subtitle: string;
  narration: string;
  speaker: string;
};

const screens: Screen[] = [
  {
    id: 'identity',
    title: 'Unified customer context',
    subtitle: 'Policyholder identity stitched across app, IVR, chatbot and branch notes.',
    narration: 'AWNIC starts with one service memory per customer, so every next action sees the same policy, claim, consent and renewal context.',
    speaker: 'Speaker: We are not replacing channels — we are giving them shared intelligence.',
  },
  {
    id: 'claims',
    title: 'Claims trust engine',
    subtitle: 'Transparent milestones, SLA prediction and proactive status deflection.',
    narration: 'The claim journey becomes predictable: customers see progress, handlers see exceptions, and service teams act before trust is damaged.',
    speaker: 'Speaker: Claims transparency is the retention moment.',
  },
  {
    id: 'recovery',
    title: 'Service recovery cockpit',
    subtitle: 'Escalations, sentiment, callback promises and complaint risk in one queue.',
    narration: 'The command layer finds high-risk service moments and routes them to the right owner with a clear recovery playbook.',
    speaker: 'Speaker: First protect trust, then discuss growth.',
  },
  {
    id: 'renewal',
    title: 'Renewal protection',
    subtitle: 'Churn risk, renewal objections and save offers governed by service status.',
    narration: 'Renewal action is triggered by customer risk and claim context, not by a generic calendar blast.',
    speaker: 'Speaker: The save motion is strongest after a resolved service moment.',
  },
  {
    id: 'growth',
    title: 'Contextual growth guardrails',
    subtitle: 'Cross-sell and upsell are suppressed until service issues are resolved.',
    narration: 'Responsible growth only appears after resolution, using consent, frequency caps and product relevance across motor, travel, home and cyber.',
    speaker: 'Speaker: No spam. No offer during an open claim.',
  },
  {
    id: 'kpis',
    title: 'Outcome command view',
    subtitle: 'FCR, claims turnaround, renewal save and post-resolution offer acceptance.',
    narration: 'The operating model is measured on service trust first and monetisation second, with every intervention tied to an auditable KPI.',
    speaker: 'Speaker: AWNIC does not need another reporting layer; it needs journey orchestration.',
  },
];

const kpis = [
  { label: 'First contact resolution', value: '78%', delta: '+9 pp', icon: Headphones },
  { label: 'Claims turnaround time', value: '3.8d', delta: '-22%', icon: Clock },
  { label: 'Renewal save rate', value: '41%', delta: '+7 pp', icon: ShieldCheck },
  { label: 'Offer acceptance post-resolution', value: '16.4%', delta: '+4.2 pp', icon: Target },
];

const claimMilestones = ['FNOL', 'Surveyor', 'Workshop', 'Approval', 'Settlement'];

const customerEvents = [
  { time: '09:12', channel: 'Mobile app', event: 'Claim FNOL submitted for motor policy AW-M-28491', status: 'Captured' },
  { time: '09:18', channel: 'AI assistant', event: 'Photo quality check passed; missing invoice requested', status: 'Next best step' },
  { time: '10:05', channel: 'Contact centre', event: 'Customer asked for workshop ETA; agent had full context', status: 'Resolved' },
  { time: '11:40', channel: 'Workshop', event: 'Parts delay predicted; proactive message drafted', status: 'At risk' },
];

const serviceQueue = [
  { customer: 'Policyholder A-1842', issue: 'Workshop ETA uncertainty', risk: 'High', action: 'Supervisor callback within 30 min' },
  { customer: 'Policyholder M-9021', issue: 'Renewal due with open complaint', risk: 'High', action: 'Suppress offer; resolve complaint first' },
  { customer: 'Policyholder K-3370', issue: 'Travel claim document gap', risk: 'Medium', action: 'Send document checklist in WhatsApp' },
];

const ScreenVisual: React.FC<{ id: string }> = ({ id }) => {
  if (id === 'identity') {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Customer 360</p>
                <h3 className="text-xl font-semibold text-card-foreground">Policyholder A-1842</h3>
              </div>
              <Badge className="bg-enterprise-blue text-enterprise-text-primary hover:bg-enterprise-blue">PII masked</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {['Motor comprehensive', 'Open claim C-48211', 'Renewal in 36 days', 'Consent: App + Email'].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-secondary p-3 text-sm font-medium text-secondary-foreground">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Channel memory</p>
            <div className="space-y-3">
              {customerEvents.slice(0, 3).map((event) => (
                <div key={event.time} className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="font-mono text-xs text-muted-foreground">{event.time}</span>
                  <div>
                    <p className="text-xs font-semibold text-enterprise-blue">{event.channel}</p>
                    <p className="text-sm text-card-foreground">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (id === 'claims') {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Claim C-48211</p>
              <h3 className="text-xl font-semibold text-card-foreground">Motor claim milestone tracker</h3>
            </div>
            <Badge className="bg-enterprise-success text-enterprise-text-primary hover:bg-enterprise-success">SLA protected</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {claimMilestones.map((milestone, index) => (
              <div key={milestone} className="relative rounded-lg border border-border bg-secondary p-4 text-center">
                <div className={`mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full ${index < 3 ? 'bg-enterprise-success text-enterprise-text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {index < 3 ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <p className="text-sm font-semibold text-secondary-foreground">{milestone}</p>
                <p className="mt-1 text-xs text-muted-foreground">{index < 3 ? 'Complete' : 'Pending'}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-enterprise-danger"><AlertTriangle className="h-4 w-4" /> Exception surfaced</div>
            <p className="mt-2 text-sm text-muted-foreground">Workshop capacity is at 92%; reroute or proactive ETA message recommended before inbound call spike.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (id === 'recovery') {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {serviceQueue.map((row) => (
          <Card key={row.customer} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <UserRoundCheck className="h-5 w-5 text-enterprise-blue" />
                <Badge variant="outline" className="border-enterprise-danger text-enterprise-danger">{row.risk}</Badge>
              </div>
              <h3 className="text-base font-semibold text-card-foreground">{row.customer}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{row.issue}</p>
              <div className="mt-4 rounded-lg bg-secondary p-3 text-sm font-medium text-secondary-foreground">{row.action}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (id === 'renewal') {
    return (
      <Card className="border-border bg-card">
        <CardContent className="grid gap-5 p-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Renewal risk</p>
            <h3 className="mt-2 text-3xl font-bold text-enterprise-danger">High</h3>
            <p className="mt-3 text-sm text-muted-foreground">Open workshop delay plus renewal in 36 days. Discount campaign suppressed until claim recovery is complete.</p>
          </div>
          <div className="space-y-3">
            {['Resolve claim ETA uncertainty', 'Send apology + clear next-step message', 'Trigger renewal save call after closure', 'Offer motor add-on only post-resolution'].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-enterprise-navy text-enterprise-text-primary text-xs font-bold">{index + 1}</span>
                <span className="text-sm font-medium text-secondary-foreground">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (id === 'growth') {
    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Suppressed now</p>
            <h3 className="mt-2 text-lg font-semibold text-card-foreground">Cross-sell blocked during open claim</h3>
            <p className="mt-3 text-sm text-muted-foreground">Travel, home and cyber offers are hidden until claim status is resolved and sentiment recovers.</p>
          </CardContent>
        </Card>
        <div className="hidden items-center lg:flex"><ArrowRight className="h-8 w-8 text-enterprise-blue" /></div>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Eligible later</p>
            <h3 className="mt-2 text-lg font-semibold text-card-foreground">Post-resolution contextual offer</h3>
            <p className="mt-3 text-sm text-muted-foreground">Roadside assistance add-on appears only after positive closure, consent check and frequency-cap pass.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.label} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="mb-4 flex items-start justify-between">
                <p className="max-w-32 text-xs uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
                <Icon className="h-5 w-5 text-enterprise-blue" />
              </div>
              <p className="text-3xl font-bold text-card-foreground">{kpi.value}</p>
              <p className="mt-2 text-sm font-semibold text-enterprise-success">{kpi.delta}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const AwnicCommandCenter: React.FC = () => {
  const [active, setActive] = useState(screens[0].id);
  const screen = useMemo(() => screens.find((item) => item.id === active) ?? screens[0], [active]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-enterprise-navy text-enterprise-text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-card-foreground">AWNIC Journey Orchestration Command Center</h1>
                <Badge variant="outline" className="border-enterprise-blue text-enterprise-blue">Demo</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Customer service · claims trust · renewal protection · contextual growth</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-enterprise-success text-enterprise-text-primary hover:bg-enterprise-success"><BellRing className="mr-1 h-3.5 w-3.5" /> Live orchestration</Badge>
            <Badge variant="outline" className="border-border">AWNIC branding placeholder</Badge>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-5 px-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Interactive screens</p>
          <div className="space-y-1">
            {screens.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`w-full rounded-md px-3 py-3 text-left transition ${active === item.id ? 'bg-enterprise-navy text-enterprise-text-primary' : 'text-card-foreground hover:bg-secondary'}`}
              >
                <span className="block text-xs font-semibold uppercase tracking-wider opacity-70">Screen {index + 1}</span>
                <span className="mt-1 block text-sm font-semibold leading-tight">{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-enterprise-blue">AWNIC service orchestration layer</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">{screen.title}</h2>
                  <p className="mt-2 max-w-3xl text-base text-muted-foreground">{screen.subtitle}</p>
                </div>
                <Button className="bg-enterprise-navy text-enterprise-text-primary hover:bg-enterprise-navy/90">
                  <RefreshCw className="mr-2 h-4 w-4" /> Simulate next event
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <ScreenVisual id={screen.id} />
            </motion.div>
          </AnimatePresence>

          <Card className="border-border bg-enterprise-navy text-enterprise-text-primary">
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-enterprise-gold" /> Narration panel</div>
                <p className="text-sm leading-relaxed text-enterprise-text-secondary">{screen.narration}</p>
              </div>
              <div className="rounded-lg border border-enterprise-border bg-enterprise-surface p-4 text-sm text-enterprise-text-secondary">
                {screen.speaker}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default AwnicCommandCenter;