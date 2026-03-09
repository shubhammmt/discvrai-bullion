import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Target, TrendingUp, MessageSquare, Phone, Smartphone, 
  Mail, ChevronRight, Zap, Brain, CheckCircle2, ArrowRight,
  CreditCard, Shield, Home, Wallet, PiggyBank, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockCustomers, 
  generateNbaRecommendations, 
  nbaMetrics,
  NbfcCustomer,
  NbaRecommendation 
} from '@/data/nbfcDemoData';

const productIcons: Record<string, React.ElementType> = {
  'Health Insurance': Shield,
  'Term Insurance': Shield,
  'Top-Up Loan': Wallet,
  'Credit Card': CreditCard,
  'Mutual Fund SIP': PiggyBank,
  'Home Loan': Home,
};

const channelIcons: Record<string, React.ElementType> = {
  'WhatsApp': MessageSquare,
  'App': Smartphone,
  'Call': Phone,
  'SMS': Mail,
};

const NbfcNbaDemo: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<NbfcCustomer | null>(null);
  const [recommendations, setRecommendations] = useState<NbaRecommendation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCustomerSelect = (customer: NbfcCustomer) => {
    setSelectedCustomer(customer);
    setIsProcessing(true);
    setShowResults(false);
    setRecommendations([]);

    // Simulate AI processing
    setTimeout(() => {
      const recs = generateNbaRecommendations(customer);
      setRecommendations(recs);
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NBA Engine Demo</h1>
              <p className="text-sm text-white/50">Next Best Action — Cross-Sell Intelligence</p>
            </div>
          </div>
          <Badge variant="outline" className="border-amber-500/50 text-amber-400">
            Live Demo
          </Badge>
        </div>
      </header>

      <div className="p-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{(nbaMetrics.totalCustomers / 10000000).toFixed(1)} Cr</p>
                  <p className="text-xs text-white/50">Total Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{(nbaMetrics.crossSellEligible / 10000000).toFixed(1)} Cr</p>
                  <p className="text-xs text-white/50">Cross-Sell Eligible</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{nbaMetrics.conversionRate}%</p>
                  <p className="text-xs text-white/50">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(nbaMetrics.monthlyRevenue)}</p>
                  <p className="text-xs text-white/50">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Customer Selection Panel */}
          <div className="col-span-4">
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  Select Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {mockCustomers.map((customer) => (
                  <motion.div
                    key={customer.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCustomerSelect(customer)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCustomer?.id === customer.id
                        ? 'bg-amber-500/20 border border-amber-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{customer.name}</p>
                      <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                        {customer.tier}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                      <span>{customer.city}</span>
                      <span>Score: {customer.creditScore}</span>
                      <span>Income: ₹{(customer.monthlyIncome / 1000).toFixed(0)}K</span>
                      <span>{customer.existingProducts.length} Products</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {customer.existingProducts.map((prod, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] bg-white/10 text-white/70">
                          {prod}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Customer 360° & AI Processing */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              {!selectedCustomer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Select a customer to generate NBA recommendations</p>
                  </div>
                </motion.div>
              )}

              {selectedCustomer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Customer 360° View */}
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader className="border-b border-white/10 pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-amber-400" />
                          Customer 360° — {selectedCustomer.name}
                        </CardTitle>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {selectedCustomer.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/40 mb-1">Monthly Income</p>
                          <p className="text-lg font-bold text-white">₹{selectedCustomer.monthlyIncome.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/40 mb-1">Credit Score</p>
                          <p className="text-lg font-bold text-emerald-400">{selectedCustomer.creditScore}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/40 mb-1">UPI Transactions</p>
                          <p className="text-lg font-bold text-blue-400">{selectedCustomer.upiTransactions}/month</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/40 mb-1">Relationship</p>
                          <p className="text-lg font-bold text-purple-400">{selectedCustomer.accountAge} months</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-white/40 mb-2">Existing Products</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedCustomer.existingProducts.map((p, i) => (
                              <Badge key={i} className="bg-blue-500/20 text-blue-400 border-blue-500/30">{p}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 mb-2">Preferred Channel</p>
                          <div className="flex items-center gap-2">
                            {React.createElement(channelIcons[selectedCustomer.preferredChannel] || MessageSquare, {
                              className: "w-4 h-4 text-amber-400"
                            })}
                            <span className="text-white">{selectedCustomer.preferredChannel}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 mb-2">Language Preference</p>
                          <span className="text-white">{selectedCustomer.language}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Processing */}
                  {isProcessing && (
                    <Card className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-amber-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Brain className="w-10 h-10 text-amber-400" />
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="absolute inset-0 border-2 border-amber-400/30 border-t-amber-400 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold mb-2">AI Agent Processing...</p>
                            <div className="space-y-1 text-sm text-white/60">
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                ✓ Analyzing transaction patterns...
                              </motion.p>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                              >
                                ✓ Evaluating product eligibility...
                              </motion.p>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0 }}
                              >
                                ✓ Computing propensity scores...
                              </motion.p>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                              >
                                ✓ Optimizing channel & timing...
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* NBA Recommendations */}
                  {showResults && recommendations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-semibold text-white">NBA Recommendations</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-400">{recommendations.length} Actions</Badge>
                      </div>

                      {recommendations.map((rec, index) => {
                        const ProductIcon = productIcons[rec.product] || Target;
                        const ChannelIcon = channelIcons[rec.channel] || MessageSquare;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                          >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    rec.confidence > 0.85 ? 'bg-emerald-500/20' :
                                    rec.confidence > 0.75 ? 'bg-amber-500/20' : 'bg-blue-500/20'
                                  }`}>
                                    <ProductIcon className={`w-6 h-6 ${
                                      rec.confidence > 0.85 ? 'text-emerald-400' :
                                      rec.confidence > 0.75 ? 'text-amber-400' : 'text-blue-400'
                                    }`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-semibold text-white">{rec.product}</h4>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-white/40">Confidence</span>
                                        <Badge className={`${
                                          rec.confidence > 0.85 ? 'bg-emerald-500/20 text-emerald-400' :
                                          rec.confidence > 0.75 ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                          {(rec.confidence * 100).toFixed(0)}%
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-white/60 mb-3">{rec.reason}</p>
                                    <div className="grid grid-cols-4 gap-3">
                                      <div className="bg-white/5 rounded-lg p-2">
                                        <div className="flex items-center gap-1 mb-1">
                                          <ChannelIcon className="w-3 h-3 text-white/40" />
                                          <span className="text-xs text-white/40">Channel</span>
                                        </div>
                                        <p className="text-sm font-medium text-white">{rec.channel}</p>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-2">
                                        <p className="text-xs text-white/40 mb-1">Timing</p>
                                        <p className="text-sm font-medium text-white">{rec.timing}</p>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-2">
                                        <p className="text-xs text-white/40 mb-1">Expected Conv.</p>
                                        <p className="text-sm font-medium text-emerald-400">{(rec.expectedConversion * 100).toFixed(0)}%</p>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-2">
                                        <p className="text-xs text-white/40 mb-1">Potential Rev.</p>
                                        <p className="text-sm font-medium text-amber-400">₹{rec.potentialRevenue.toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                                    Execute <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Channel Performance */}
        <Card className="bg-white/5 border-white/10 mt-8">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">Channel Performance Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(nbaMetrics.channelOptimization).map(([channel, data]) => {
                const Icon = channelIcons[channel.charAt(0).toUpperCase() + channel.slice(1)] || MessageSquare;
                return (
                  <div key={channel} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-amber-400" />
                      <span className="font-semibold text-white capitalize">{channel}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/50">Reach</span>
                          <span className="text-white">{data.reach}%</span>
                        </div>
                        <Progress value={data.reach} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/50">Conversion</span>
                          <span className="text-emerald-400">{data.conversion}%</span>
                        </div>
                        <Progress value={data.conversion * 5} className="h-2" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-3 mt-8">
        <div className="flex justify-between items-center text-xs text-white/30">
          <span>DiscvrAI — NBFC AI Solutions</span>
          <span>Demo Data — Not Real Customer Information</span>
        </div>
      </footer>
    </div>
  );
};

export default NbfcNbaDemo;
