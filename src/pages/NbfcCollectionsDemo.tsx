import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, TrendingDown, Phone, MessageSquare, Users,
  Clock, DollarSign, Shield, Brain, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, Zap, Target, ArrowRight, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockCollectionAccounts, 
  collectionMetrics,
  CollectionRiskAccount 
} from '@/data/nbfcDemoData';

const priorityColors = {
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
  high: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  low: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
};

const NbfcCollectionsDemo: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<CollectionRiskAccount | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  const handleAnalyze = (account: CollectionRiskAccount) => {
    setSelectedAccount(account);
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  const sortedAccounts = [...mockCollectionAccounts].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Predictive Collections Demo</h1>
              <p className="text-sm text-white/50">Early Warning System — Pre-Default Intervention</p>
            </div>
          </div>
          <Badge variant="outline" className="border-red-500/50 text-red-400">
            Live Demo
          </Badge>
        </div>
      </header>

      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(collectionMetrics.totalPortfolio)}</p>
                  <p className="text-xs text-white/50">Total Portfolio</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{collectionMetrics.accountsAtRisk.toLocaleString()}</p>
                  <p className="text-xs text-white/50">Accounts At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(collectionMetrics.predictedNpa)}</p>
                  <p className="text-xs text-white/50">Predicted NPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-2xl font-bold text-emerald-400">{formatCurrency(collectionMetrics.preventableNpa)}</p>
                  <p className="text-xs text-white/50">Preventable (68%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{collectionMetrics.avgDaysEarlyWarning}</p>
                  <p className="text-xs text-white/50">Days Early Warning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Risk Portfolio */}
          <div className="col-span-7">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-400" />
                    Risk-Scored Portfolio
                  </CardTitle>
                  <div className="flex gap-2">
                    {Object.entries(priorityColors).map(([key, colors]) => (
                      <Badge key={key} className={`${colors.bg} ${colors.text} ${colors.border} capitalize text-xs`}>
                        {key}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {sortedAccounts.map((account) => {
                  const colors = priorityColors[account.priority];
                  const isExpanded = expandedId === account.id;
                  
                  return (
                    <motion.div
                      key={account.id}
                      layout
                      className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : account.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                              <span className={`text-lg font-bold ${colors.text}`}>{account.riskScore}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-white">{account.customer}</p>
                                <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                                  {account.loanType}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/50 mt-1">
                                <span>Outstanding: {formatCurrency(account.outstanding)}</span>
                                <span>EMI: ₹{account.emi.toLocaleString()}</span>
                                <span className={account.dpd > 0 ? 'text-red-400' : ''}>
                                  DPD: {account.dpd}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-xs text-white/40">Predicted Default</p>
                              <p className={`font-semibold ${colors.text}`}>{account.predictedDefault}</p>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-white/40" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-white/40" />
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/10"
                          >
                            <div className="p-4 space-y-4">
                              <div>
                                <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
                                  <Brain className="w-3 h-3" /> Behavioral Signals (AI Detected)
                                </p>
                                <ul className="space-y-1">
                                  {account.behavioralSignals.map((signal, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                      <AlertTriangle className="w-3 h-3 text-amber-400 mt-1 shrink-0" />
                                      {signal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-xs text-white/40 mb-1">Recommended Action</p>
                                <p className="text-white font-medium">{account.recommendedAction}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button 
                                  size="sm" 
                                  className="bg-amber-500 hover:bg-amber-600"
                                  onClick={() => handleAnalyze(account)}
                                >
                                  <Brain className="w-4 h-4 mr-1" /> Deep Analysis
                                </Button>
                                <Button size="sm" variant="outline" className="border-white/20">
                                  <Phone className="w-4 h-4 mr-1" /> Initiate Contact
                                </Button>
                                <span className="text-xs text-white/40 ml-auto">
                                  Contact Attempts: {account.contactAttempts}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Deep Analysis Panel */}
          <div className="col-span-5">
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Deep Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <AnimatePresence mode="wait">
                  {!selectedAccount && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-64 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <Target className="w-12 h-12 text-white/20 mx-auto mb-3" />
                        <p className="text-white/40">Select an account for deep analysis</p>
                      </div>
                    </motion.div>
                  )}

                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Brain className="w-8 h-8 text-purple-400" />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Analyzing {selectedAccount?.customer}...</p>
                          <p className="text-sm text-white/50">Running predictive models</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          'Analyzing payment history patterns...',
                          'Cross-referencing UPI transaction data...',
                          'Checking employment & income signals...',
                          'Computing default probability...',
                          'Generating intervention strategy...'
                        ].map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.4 }}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.4 + 0.2 }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </motion.div>
                            {step}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {analysisComplete && selectedAccount && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">{selectedAccount.customer}</h4>
                          <Badge className={`${priorityColors[selectedAccount.priority].bg} ${priorityColors[selectedAccount.priority].text}`}>
                            Risk Score: {selectedAccount.riskScore}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/40 text-xs">Default Probability</p>
                            <p className="text-red-400 font-bold">{selectedAccount.riskScore}%</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/40 text-xs">Days to Default</p>
                            <p className="text-amber-400 font-bold">
                              {selectedAccount.dpd > 0 ? 'Already DPD' : `~${45 - selectedAccount.riskScore / 3} days`}
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/40 text-xs">Recovery Probability</p>
                            <p className="text-emerald-400 font-bold">{100 - selectedAccount.riskScore + 15}%</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-white/40 text-xs">Best Contact Time</p>
                            <p className="text-white font-bold">6-8 PM</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-white/40 mb-2">AI Intervention Strategy</p>
                        <div className="space-y-2">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="w-4 h-4 text-emerald-400" />
                              <span className="text-sm font-semibold text-emerald-400">Primary Action</span>
                            </div>
                            <p className="text-sm text-white/80">{selectedAccount.recommendedAction}</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="w-4 h-4 text-blue-400" />
                              <span className="text-sm font-semibold text-blue-400">Backup Strategy</span>
                            </div>
                            <p className="text-sm text-white/80">
                              {selectedAccount.priority === 'critical' 
                                ? 'Escalate to senior collections manager. Prepare legal notice draft.'
                                : 'Schedule automated reminder sequence via WhatsApp in preferred language.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-white/40 mb-2">Suggested Script (AI Generated)</p>
                        <div className="bg-white/5 rounded-lg p-3 text-sm text-white/70 italic">
                          "Hello {selectedAccount.customer.split(' ')[0]} ji, this is regarding your {selectedAccount.loanType} account. 
                          We noticed some irregularity and wanted to check if everything is okay. 
                          {selectedAccount.riskScore > 70 
                            ? 'We have some flexible payment options that might help you during this time.'
                            : 'Your payment is due soon, and we wanted to ensure you have everything in place.'}
                          Would you like to discuss?"
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                          <Phone className="w-4 h-4 mr-1" /> Execute Call
                        </Button>
                        <Button variant="outline" className="flex-1 border-white/20">
                          <MessageSquare className="w-4 h-4 mr-1" /> Send WhatsApp
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Metrics */}
        <Card className="bg-white/5 border-white/10 mt-8">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">System Impact — Before vs After AI</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div>
                    <p className="text-2xl font-bold text-white/40 line-through">₹120</p>
                    <p className="text-xs text-white/30">Before</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">₹{collectionMetrics.costPerContact}</p>
                    <p className="text-xs text-white/50">After</p>
                  </div>
                </div>
                <p className="text-sm text-white/50">Cost per Contact</p>
                <Badge className="mt-1 bg-emerald-500/20 text-emerald-400">-62%</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div>
                    <p className="text-2xl font-bold text-white/40 line-through">28%</p>
                    <p className="text-xs text-white/30">Before</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">{collectionMetrics.contactRateImprovement + 28}%</p>
                    <p className="text-xs text-white/50">After</p>
                  </div>
                </div>
                <p className="text-sm text-white/50">Contact Rate</p>
                <Badge className="mt-1 bg-emerald-500/20 text-emerald-400">+{collectionMetrics.contactRateImprovement}%</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div>
                    <p className="text-2xl font-bold text-white/40 line-through">0</p>
                    <p className="text-xs text-white/30">Before</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{collectionMetrics.avgDaysEarlyWarning}</p>
                    <p className="text-xs text-white/50">After</p>
                  </div>
                </div>
                <p className="text-sm text-white/50">Days Early Warning</p>
                <Badge className="mt-1 bg-purple-500/20 text-purple-400">New Capability</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div>
                    <p className="text-2xl font-bold text-white/40 line-through">18%</p>
                    <p className="text-xs text-white/30">Before</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">{18 + collectionMetrics.collectionEfficiency}%</p>
                    <p className="text-xs text-white/50">After</p>
                  </div>
                </div>
                <p className="text-sm text-white/50">Collection Efficiency</p>
                <Badge className="mt-1 bg-emerald-500/20 text-emerald-400">+{collectionMetrics.collectionEfficiency}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-3 mt-8">
        <div className="flex justify-between items-center text-xs text-white/30">
          <span>DiscvrAI — Predictive Collections Platform</span>
          <span>Demo Data — Not Real Customer Information</span>
        </div>
      </footer>
    </div>
  );
};

export default NbfcCollectionsDemo;
