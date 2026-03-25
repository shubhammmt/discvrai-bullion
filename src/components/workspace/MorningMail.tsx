import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Pin, Check, AlertCircle } from 'lucide-react';
import { morningMailSections, beforeChecklist } from '@/data/workspaceDemo';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const MorningMail: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const [reviewedSources, setReviewedSources] = useState(false);

  const handleApprove = () => {
    toast.success('Queued for approval (demo)', {
      description: 'Morning mail would be sent to 2,400 recipients',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          Research: <span className="text-ws-gold font-medium">Morning Mail</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          Daily market brief sent to 2,400+ recipients every morning before market open.
        </p>
      </motion.div>

      {/* Toggle */}
      <div className="flex items-center gap-2 mb-6">
        {(['before', 'after'] as const).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(v)}
            className={view === v
              ? 'bg-ws-navy text-white hover:bg-ws-navy/90'
              : 'border-ws-border text-ws-text-secondary'}
          >
            {v === 'before' ? '❌ Before' : '✅ After'}
          </Button>
        ))}
      </div>

      {view === 'before' ? (
        <motion.div
          key="before"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-ws-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-ws-text-primary">Manual Process — ~70 minutes</h2>
          </div>
          <div className="space-y-3">
            {beforeChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-ws-surface rounded-lg">
                <div className="w-8 h-8 rounded-full bg-ws-navy/10 flex items-center justify-center text-sm font-semibold text-ws-navy">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ws-text-primary">{item.step}</p>
                </div>
                <span className="text-sm text-ws-text-muted font-mono">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Total time:</strong> ~70 minutes every morning. Most time spent on formatting, not thinking.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="after"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* AI-generated sections */}
          {morningMailSections.map((section, i) => (
            <div key={i} className="bg-white border border-ws-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-ws-text-primary">{section.title}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  section.confidence === 'high' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {section.confidence} confidence
                </span>
              </div>
              <p className="text-sm text-ws-text-secondary mb-3 leading-relaxed">{section.content}</p>
              <div className="flex items-center gap-1 text-xs text-ws-text-muted">
                <Pin className="w-3 h-3" />
                <span>{section.source}</span>
              </div>
            </div>
          ))}

          {/* Approval gate */}
          <div className="bg-white border-2 border-ws-gold/30 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={reviewedSources}
                  onCheckedChange={setReviewedSources}
                />
                <span className="text-sm text-ws-text-primary font-medium">
                  I have reviewed all sources and citations
                </span>
              </div>
              <Button
                disabled={!reviewedSources}
                onClick={handleApprove}
                className="bg-ws-gold text-ws-navy hover:bg-ws-gold-dark disabled:opacity-40"
              >
                <Check className="w-4 h-4 mr-1" /> Approve to Send Queue
              </Button>
            </div>
            <p className="text-xs text-ws-text-muted mt-2">
              Formatting time shifts to review time. AI drafts — humans approve.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MorningMail;
