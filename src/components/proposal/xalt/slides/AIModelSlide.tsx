import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, MessageCircle, Users, Shield } from 'lucide-react';

interface AIModelSlideProps {
  slideNumber: number;
  totalSlides: number;
}

const pods = [
  {
    pod: 'Deal Intelligence',
    agent: 'Deal Ingestion Agent',
    scope: 'Deal sourcing → Standardization → Publication',
    icon: FileSearch,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    pod: 'Investor Experience',
    agent: 'Investor Deal Concierge',
    scope: 'Unassisted self-service (investor → AI directly)',
    icon: MessageCircle,
    color: 'bg-green-100 text-green-700',
  },
  {
    pod: 'Growth & RM',
    agent: 'RM Copilot',
    scope: 'Human-assisted high-touch (RM uses AI → RM delivers)',
    icon: Users,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    pod: 'Risk & Governance',
    agent: 'Compliance Guardrails',
    scope: 'Eligibility → Content review → Audit trails',
    icon: Shield,
    color: 'bg-amber-100 text-amber-700',
  },
];

export const AIModelSlide: React.FC<AIModelSlideProps> = ({ slideNumber, totalSlides }) => {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400">XALT × DiscvrAI</span>
          <span className="text-sm text-slate-400">{slideNumber}/{totalSlides}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Four Virtual Pods <span className="text-amber-600">(MECE Framework)</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8">Our Answer — AI-First Operating Model</p>
        </motion.div>

        {/* Pods Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {pods.map((pod, index) => (
            <motion.div
              key={pod.pod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${pod.color.split(' ')[0]}`}>
                  <pod.icon className={`w-6 h-6 ${pod.color.split(' ')[1]}`} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{pod.pod}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pod.agent}</h3>
                  <p className="text-slate-600 text-sm">{pod.scope}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div 
          className="bg-amber-50 rounded-xl p-6 border border-amber-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h4 className="font-bold text-slate-900 mb-3">How It Works</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              Agents sit <strong>behind</strong> your existing digital experience
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              Turn unstructured inputs (PDFs, decks, emails, investor questions) into <strong>consistent, compliant, and actionable outputs</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <strong>Decision Rule:</strong> Investor asks directly → Concierge. RM preparing → Copilot.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
