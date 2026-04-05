import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Bot, Search, ChevronRight, Mail, Phone, ArrowRight, CheckCircle2, Lock, Eye, BarChart3, GitBranch, AlertTriangle, Network, Zap, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Three Pillars', href: '#pillars' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Governance', href: '#governance' },
  { label: 'Next Steps', href: '#next-steps' },
  { label: 'Contact', href: '#contact' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const GATES = [
  { label: 'Data QA', icon: FileCheck },
  { label: 'Train & Evaluate', icon: BarChart3 },
  { label: 'Shadow Deploy', icon: Eye },
  { label: 'Promote / Rollback', icon: GitBranch },
  { label: 'Audit Pack', icon: Shield },
];

const BajajFinservDeck: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [formData, setFormData] = useState({ name: '', org: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(n => n.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in name and email.');
      return;
    }
    setSubmitted(true);
    toast.success("Thank you — we'll revert within 2 business days.");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-base font-semibold tracking-tight" style={{ color: '#0f2b46' }}>
            Discvr<span className="font-light text-slate-400">.ai</span>
          </span>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="overview" className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#1a7a6d' }}>
              Prepared for Bajaj Finserv · Risk & AI Leadership
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#0f2b46' }}>
              AI for stronger risk decisions —<br />without trading governance for speed
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mb-8 leading-relaxed">
              A practical path across smarter features, automated model lifecycle, and fraud detection — aligned to your Databricks estate and swap-in/swap-out rhythm.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('#next-steps')}
                className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                style={{ background: '#0f2b46' }}
              >
                Request Discovery Workshop
              </button>
              <button
                onClick={() => scrollTo('#summary')}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors"
                style={{ borderColor: '#0f2b46', color: '#0f2b46' }}
              >
                Download Summary
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-6" style={{ background: '#f8fafb' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#0f2b46' }}>
              Why this matters
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: BarChart3,
                  text: 'You already operate mature ML; the opportunity is compound lift from richer signals, faster controlled iteration, and adaptive fraud defenses.',
                },
                {
                  icon: GitBranch,
                  text: 'Hybrid architecture: keep proven gradient-boosting decisioning; add AI for features, graphs, sequences, and orchestration.',
                },
                {
                  icon: Shield,
                  text: 'Built for Indian regulatory reality: explainability, lineage, human approval on high-stakes changes.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#e6f2f0' }}>
                    <item.icon size={18} style={{ color: '#1a7a6d' }} />
                  </div>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="pillars" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#0f2b46' }}>Three Pillars</h2>
            <p className="text-sm text-slate-500 mb-10 max-w-xl">Complementary capabilities that compound value — deployed independently or together.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border border-slate-150 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: '#e6f2f0' }}>
                <Brain size={20} style={{ color: '#1a7a6d' }} />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#0f2b46' }}>Smarter Risk Features</h3>
              <p className="text-xs font-medium mb-3" style={{ color: '#1a7a6d' }}>LLMs & Deep Learning, Hybrid</p>
              <p className="text-sm text-slate-500 mb-4">
                Turn text, networks, and behaviour-over-time into well-governed model inputs.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-5">
                {[
                  'LLM-assisted feature ideation and structured signals from text',
                  'Graph-style signals for relationships and rings',
                  'Sequence models where history matters',
                  'Everything lands in a governed feature layer feeding existing tree models',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1a7a6d' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg p-3 text-xs text-slate-600 italic" style={{ background: '#f8fafb', borderLeft: '3px solid #1a7a6d' }}>
                Not "LLM replaces the score" — augmented intelligence with validator-friendly explanations.
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border border-slate-150 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: '#e6f2f0' }}>
                <Bot size={20} style={{ color: '#1a7a6d' }} />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#0f2b46' }}>Agentic Model Lifecycle</h3>
              <p className="text-xs font-medium mb-3" style={{ color: '#1a7a6d' }}>Swap-in / Swap-out with Gated Automation</p>
              <p className="text-sm text-slate-500 mb-4">
                Accelerate monthly challenger work with gated automation — shadow first, promote when evidence clears.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-5">
                {[
                  'Automated data/quality gates',
                  'Standardised challenger vs champion evaluation',
                  'Shadow deployment with zero customer impact',
                  'Promotion/rollback playbooks',
                  'Auto-generated model evidence packs',
                  'Human checkpoints for thresholds, new data sources, sensitive features',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1a7a6d' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {/* Gates flowchart */}
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Gated Lifecycle</p>
                <div className="flex items-center gap-0 overflow-x-auto">
                  {GATES.map((gate, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center min-w-[60px]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#e6f2f0' }}>
                          <gate.icon size={14} style={{ color: '#1a7a6d' }} />
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 text-center leading-tight">{gate.label}</span>
                      </div>
                      {i < GATES.length - 1 && (
                        <ChevronRight size={12} className="text-slate-300 flex-shrink-0 -mx-1" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border border-slate-150 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: '#e6f2f0' }}>
                <AlertTriangle size={20} style={{ color: '#1a7a6d' }} />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#0f2b46' }}>Fraud Anomaly Detection</h3>
              <p className="text-xs font-medium mb-3" style={{ color: '#1a7a6d' }}>Layered Detection · Investigator-Grade Reasons</p>
              <p className="text-sm text-slate-500 mb-4">
                Known patterns + novel anomalies + network context; investigator-grade reasons on every flag.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-5">
                {[
                  'Supervised where labels exist',
                  'Unsupervised / ensemble for new tactics',
                  'Graph signals for rings and mules',
                  'Latency-aware design for real-time scoring',
                  'Optional buy-vs-build modularity for specialised platforms',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1a7a6d' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg p-3 text-xs text-slate-600 italic" style={{ background: '#f8fafb', borderLeft: '3px solid #1a7a6d' }}>
                Metrics agreed jointly — precision on investigations, false-positive rate, time-to-detect.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="py-20 px-6" style={{ background: '#f8fafb' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: '#0f2b46' }}>How We Work Together</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: 'Phase 0',
                title: 'Discovery',
                duration: '2–4 weeks',
                items: ['Scope & data-access boundaries', 'Success metrics definition', 'Validator / compliance checklist'],
              },
              {
                phase: 'Phase 1',
                title: 'Vertical Slice',
                duration: '8–14 weeks (indicative)',
                items: ['One credit segment OR one fraud channel', 'Features + shadow challenger OR anomaly MVP', 'Evidence pack for governance review'],
              },
              {
                phase: 'Phase 2',
                title: 'Scale',
                duration: 'Ongoing',
                items: ['More models across segments', 'Streaming hardening', 'Deeper automation of swap workflows'],
              },
            ].map((p, i) => (
              <motion.div key={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: '#e6f2f0', color: '#1a7a6d' }}>
                    {p.phase}
                  </span>
                  <span className="text-xs text-slate-400">{p.duration}</span>
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: '#0f2b46' }}>{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex gap-2 items-start text-sm text-slate-600">
                      <ArrowRight size={12} className="mt-1 flex-shrink-0" style={{ color: '#1a7a6d' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#0f2b46' }}>Governance & Trust</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Lock, text: 'DPDP-aligned data handling' },
                { icon: FileCheck, text: 'RBI / model-risk style documentation' },
                { icon: Search, text: 'Full lineage from data source to decision' },
                { icon: Shield, text: 'Encryption and access control at every layer' },
                { icon: Eye, text: 'No customer impact in shadow until promotion' },
                { icon: BarChart3, text: 'Fairness and drift monitoring as agreed' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center bg-white rounded-lg p-4 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#e6f2f0' }}>
                    <item.icon size={16} style={{ color: '#1a7a6d' }} />
                  </div>
                  <span className="text-sm text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section id="next-steps" className="py-20 px-6" style={{ background: '#f8fafb' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#0f2b46' }}>Next Steps</h2>
            <div className="space-y-4 mb-10">
              {[
                'Align on priority pillar for first vertical slice',
                'Workshop with risk + IT + compliance stakeholders',
                'SOW with milestones and success criteria',
                'Kickoff discovery sprint',
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: '#0f2b46' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm md:text-base text-slate-700">{step}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-5 border-l-4" style={{ background: '#fff', borderColor: '#1a7a6d' }}>
              <p className="text-sm text-slate-600 italic">
                "We meet you on Databricks and extend — we don't ask you to rip and replace."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0f2b46' }}>Get in Touch</h2>
            <p className="text-sm text-slate-500 mb-8">We'd welcome a conversation on how this maps to your current priorities.</p>
            {submitted ? (
              <div className="text-center py-12 rounded-xl border border-slate-100 bg-white">
                <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: '#1a7a6d' }} />
                <p className="text-base font-semibold" style={{ color: '#0f2b46' }}>Thank you</p>
                <p className="text-sm text-slate-500">We'll revert within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Organisation"
                    value={formData.org}
                    onChange={e => setFormData(prev => ({ ...prev, org: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                  style={{ background: '#0f2b46' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Printable Summary */}
      <section id="summary" className="py-20 px-6 print:block hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0f2b46' }}>DiscvrAI × Bajaj Finserv — Summary</h2>
          <p className="text-sm text-slate-600 mb-4">AI for stronger risk decisions — without trading governance for speed.</p>
          <p className="text-sm text-slate-600 mb-6">Three pillars: (1) Smarter risk features via LLMs & deep learning, (2) Agentic model lifecycle with swap-in/swap-out gated automation, (3) Layered fraud anomaly detection. Phased engagement: Discovery → Vertical slice → Scale. Built for Indian regulatory reality.</p>
          <p className="text-xs text-slate-400">Confidential — for discussion · hello@discvr.ai</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">Confidential — for discussion purposes only</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Mail size={12} /> shubham@discvr.ai</span>
            <span className="flex items-center gap-1"><Phone size={12} /> +91 9873961591</span>
          </div>
        </div>
      </footer>

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, #contact, button { display: none !important; }
          #summary { display: block !important; }
          section { page-break-inside: avoid; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
};

export default BajajFinservDeck;
