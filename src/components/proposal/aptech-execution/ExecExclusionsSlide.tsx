import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const exclusions = [
  { icon: '☁️', title: 'Cloud Hosting', desc: 'Infrastructure (e.g. AWS/GCP/Azure) for hosting services, databases, queues — usage-based or as per hosting agreement.' },
  { icon: '🧠', title: 'LLM Usage', desc: 'Text chat, embeddings, reasoning APIs — as per actual usage.' },
  { icon: '🎙️', title: 'Voice LLM / STT-TTS', desc: 'Speech-to-text, text-to-speech, voice AI — as per actual usage.' },
  { icon: '📞', title: 'Telephony Infrastructure', desc: 'PSTN/SIP/CPaaS for voice — we integrate; client procures and pays for the telephony provider.' },
  { icon: '💬', title: 'WhatsApp / Voice Usage', desc: 'Messaging and voice channel usage as per provider billing.' },
  { icon: '✈️', title: 'Travel & Related Expenses', desc: 'All travel and other team expenses (e.g. workshops, client visits) for the delivery team — billed as per actuals or agreed travel policy.' },
];

export const ExecExclusionsSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Exclusions</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2 max-w-3xl">
      Costs exclusive to the proposal
    </h2>
    <p className="text-sm text-slate-500 mb-6">Borne by client as per actuals</p>

    <div className="grid grid-cols-2 gap-4 mb-6">
      {exclusions.map((item, i) => (
        <div key={i} className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">{item.icon}</span>
          <div>
            <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <p className="text-sm text-slate-700">
        We will provide <strong>usage estimates and optimisation guidance</strong> where applicable.
      </p>
    </div>
  </ExecSlideLayout>
);
