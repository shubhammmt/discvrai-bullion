import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileScan, LayoutTemplate, Brain, Mic, GitBranch, Plug, ShieldCheck } from 'lucide-react';
import { platformLayers } from '@/data/workspaceDemo';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.FC<any>> = {
  'database': Database,
  'file-scan': FileScan,
  'layout-template': LayoutTemplate,
  'brain': Brain,
  'mic': Mic,
  'git-branch': GitBranch,
  'plug': Plug,
  'shield-check': ShieldCheck,
};

type Filter = 'all' | 'research' | 'ib' | 'mis';

const PlatformLayers: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const isHighlighted = (layer: typeof platformLayers[0]) => {
    if (filter === 'all') return true;
    return layer.usedBy.includes(filter as any);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          Platform Architecture — <span className="text-ws-gold font-medium">Shared Layers</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
        Both Research, IB, and MIS are built on the same 8 layers. This is why governance, audit, and templates work identically across all businesses.
        </p>
      </motion.div>

      {/* Filter Toggle */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-sm text-ws-text-muted mr-2">Highlight layers used by:</span>
        {(['all', 'research', 'ib'] as Filter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className={filter === f 
              ? 'bg-ws-navy text-white hover:bg-ws-navy/90' 
              : 'border-ws-border text-ws-text-secondary hover:bg-ws-surface'}
          >
            {f === 'all' ? 'Both' : f === 'research' ? 'Research' : 'Investment Banking'}
          </Button>
        ))}
      </div>

      {/* Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformLayers.map((layer, idx) => {
          const Icon = iconMap[layer.icon] || Database;
          const highlighted = isHighlighted(layer);
          return (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: highlighted ? 1 : 0.35, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className={`bg-white border rounded-xl p-5 transition-all ${
                highlighted ? 'border-ws-gold/40 shadow-sm' : 'border-ws-border'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  highlighted ? 'bg-ws-gold/10' : 'bg-ws-surface'
                }`}>
                  <Icon className={`w-5 h-5 ${highlighted ? 'text-ws-gold-dark' : 'text-ws-text-muted'}`} />
                </div>
                <div>
                  <span className="text-xs font-mono text-ws-text-muted">{layer.id}</span>
                  <h3 className="font-semibold text-ws-text-primary text-sm">{layer.name}</h3>
                </div>
              </div>
              <p className="text-xs text-ws-text-secondary leading-relaxed">{layer.description}</p>
              <div className="flex gap-1 mt-3">
                {layer.usedBy.map((u) => (
                  <span
                    key={u}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      u === 'research'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {u === 'research' ? 'Research' : 'IB'}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformLayers;
