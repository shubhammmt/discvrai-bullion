import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecDependenciesSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 3a — Dependencies & Client-Borne Costs</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5 max-w-3xl">
      Integration support, infrastructure, and what the client owns
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {/* Integration */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="font-bold text-slate-900 text-sm mb-2">⚙️ Integration with Vendors / 3P Systems</p>
        <p className="text-xs text-slate-600 mb-2">Integration of our product with Aptech's systems: websites, mobile app, CRM, Aptrack/ProConnect, and any 3P platforms.</p>
        <div className="bg-white rounded-lg p-3 border border-slate-100 space-y-1.5 text-xs">
          <p className="text-slate-700"><strong>In scope:</strong> API/event contract definition, our adapter development, documentation, test environments, joint validation</p>
          <p className="text-slate-700"><strong>Out of scope:</strong> Vendor/3P or Aptech development effort to expose APIs, add embeds, or change their systems</p>
          <p className="text-slate-500 italic">Additional integration support (extended hand-holding, on-site) can be scoped as add-on</p>
        </div>
      </div>

      {/* Voice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="font-bold text-slate-900 text-sm mb-2">📞 Voice — Telephony Infrastructure</p>
        <p className="text-xs text-slate-600 mb-2">For voice (outbound/inbound calls, voice AI), a telephony infrastructure is required.</p>
        <div className="bg-white rounded-lg p-3 border border-slate-100 space-y-1.5 text-xs">
          <p className="text-slate-700"><strong>Our scope:</strong> Voice agent logic, routing, and integration with a telephony provider</p>
          <p className="text-slate-700"><strong>Client responsibility:</strong> Procure and operate telephony infrastructure (Twilio, Exotel, or similar)</p>
          <p className="text-slate-500 italic">Provider-specific customisation beyond standard integration may be quoted as add-on</p>
        </div>
      </div>

      {/* Cloud + LLM */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="font-bold text-slate-900 text-sm mb-2">☁️ Cloud, LLM, and Voice LLM — Client-Borne</p>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">•</span><span><strong>Cloud hosting:</strong> AWS/GCP/Azure for hosting services, DBs, queues — borne by client as per actuals</span></div>
          <div className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">•</span><span><strong>LLM usage:</strong> Text chat, embeddings, reasoning — borne by client as per actual usage</span></div>
          <div className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">•</span><span><strong>Voice LLM / STT/TTS:</strong> Speech-to-text, text-to-speech — borne by client as per actuals</span></div>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">We will provide usage estimates and optimisation guidance; final billing is with the respective providers.</p>
      </div>

      {/* Train + First delivery */}
      <div className="space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-1">🎓 Train the Trainer</p>
          <p className="text-xs text-slate-600">Part of post-sales flow: simple agentic solution for session-prep + feedback capture. Kept intentionally light. Cost: ₹2–4L.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-1">🚀 First Deployment</p>
          <p className="text-xs text-slate-600">First delivery expected in <strong>12–16 weeks from kick-off</strong> (including 4-week scoping). Exact scope, date, and success criteria confirmed after scoping.</p>
        </div>
      </div>
    </div>
  </ExecSlideLayout>
);
