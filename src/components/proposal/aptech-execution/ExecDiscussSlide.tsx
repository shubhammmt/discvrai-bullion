import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const topics = [
  {
    title: 'Integration Ownership & Support',
    points: ['Exact list of systems (Aptrack/ProConnect versions, CRM, website(s), app)', 'Who implements which side (APIs, webhooks, embeds)', 'Definition of "integration support" and any add-on pricing'],
  },
  {
    title: 'Voice & Telephony',
    points: ['Preferred telephony provider (or shortlist); who procures and pays', 'Voice LLM / STT-TTS choice and who bears usage cost', 'Timeline for provisioning'],
  },
  {
    title: 'Cloud & LLM Strategy',
    points: ['Hosting preference (cloud provider, region, compliance)', 'LLM strategy (model choice, fallbacks, cost caps or alerts)', 'Approval for client-borne usage'],
  },
  {
    title: 'First Delivery (12–16 Weeks)',
    points: ['Concrete first-delivery scope (which centers, flows, dashboards)', 'Success criteria and sign-off process for "first value"', 'Fixed in the 4-week scoping output'],
  },
  {
    title: 'Pilot & Rollout',
    points: ['Pilot brands/centers and volumes; rollout gates and criteria', 'Data and access needed from Aptech for pilot', 'APIs, sample data, test accounts'],
  },
  {
    title: 'Governance & Change Control',
    points: ['Steering cadence, escalation path', 'How scope changes and 10% buffer are tracked and billed'],
  },
  {
    title: 'Aptech Connect Add-ons (C, D, A++)',
    points: ['Priority and sequencing; data ownership for portfolio/cert and placement', 'Deep academic workflow (A++): dependency on LMS/Aptrack module APIs'],
  },
  {
    title: 'Train the Trainer',
    points: ['Channel (chat/WhatsApp/web) and who owns the KB/content', 'Kept simple: agentic session-prep + feedback capture'],
  },
];

export const ExecDiscussSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 9 — Discussion Topics</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      What to discuss more closely and specifically
    </h2>
    <p className="text-xs text-slate-500 mb-4">To lock scope, timeline, and commercials — the following are recommended for detailed alignment.</p>

    <div className="grid grid-cols-2 gap-3">
      {topics.map((t, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <p className="font-bold text-slate-900 text-sm mb-1.5">{i + 1}. {t.title}</p>
          <ul className="space-y-0.5">
            {t.points.map((p, j) => (
              <li key={j} className="text-xs text-slate-600 flex items-start gap-1.5">
                <span className="text-blue-500 mt-0.5">•</span>{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </ExecSlideLayout>
);
