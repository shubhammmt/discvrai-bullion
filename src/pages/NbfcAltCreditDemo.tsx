import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, TrendingUp, Smartphone, CreditCard, Building2, 
  User, CheckCircle2, AlertTriangle, Zap, Target,
  ArrowRight, BarChart3, Activity, Wallet, ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

interface ThinFileApplicant {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  monthlyIncome: number;
  bureauScore: number | null; // null = no bureau history
  upiData: {
    monthlyTransactions: number;
    avgAmount: number;
    merchantCategories: number;
    p2pRatio: number;
    salaryCredits: number;
    consistencyScore: number;
  };
  gstData?: {
    gstNumber: string;
    monthlyTurnover: number;
    filingConsistency: number;
    yearsInBusiness: number;
  };
  psychometric?: {
    riskTolerance: number;
    financialDiscipline: number;
    futureOrientation: number;
  };
  deviceData: {
    deviceAge: number;
    appInstalls: number;
    financialApps: number;
  };
}

const mockApplicants: ThinFileApplicant[] = [
  {
    id: 'APP001',
    name: 'Ramesh Kumar',
    age: 28,
    city: 'Lucknow',
    occupation: 'Gig Worker (Delivery)',
    monthlyIncome: 25000,
    bureauScore: null,
    upiData: {
      monthlyTransactions: 142,
      avgAmount: 850,
      merchantCategories: 18,
      p2pRatio: 0.35,
      salaryCredits: 4,
      consistencyScore: 82
    },
    psychometric: {
      riskTolerance: 45,
      financialDiscipline: 78,
      futureOrientation: 65
    },
    deviceData: {
      deviceAge: 18,
      appInstalls: 45,
      financialApps: 6
    }
  },
  {
    id: 'APP002',
    name: 'Sunita Devi',
    age: 35,
    city: 'Patna',
    occupation: 'Street Vendor',
    monthlyIncome: 18000,
    bureauScore: null,
    upiData: {
      monthlyTransactions: 98,
      avgAmount: 420,
      merchantCategories: 8,
      p2pRatio: 0.55,
      salaryCredits: 0,
      consistencyScore: 71
    },
    gstData: {
      gstNumber: 'GST10AAAA1234',
      monthlyTurnover: 85000,
      filingConsistency: 92,
      yearsInBusiness: 4
    },
    deviceData: {
      deviceAge: 24,
      appInstalls: 22,
      financialApps: 3
    }
  },
  {
    id: 'APP003',
    name: 'Mohammed Irfan',
    age: 32,
    city: 'Hyderabad',
    occupation: 'Auto Driver',
    monthlyIncome: 32000,
    bureauScore: 580, // Low bureau score
    upiData: {
      monthlyTransactions: 186,
      avgAmount: 1200,
      merchantCategories: 24,
      p2pRatio: 0.28,
      salaryCredits: 0,
      consistencyScore: 89
    },
    psychometric: {
      riskTolerance: 52,
      financialDiscipline: 85,
      futureOrientation: 72
    },
    deviceData: {
      deviceAge: 8,
      appInstalls: 62,
      financialApps: 9
    }
  }
];

const NbfcAltCreditDemo: React.FC = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<ThinFileApplicant | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [scoreResults, setScoreResults] = useState<any>(null);

  const runScoring = (applicant: ThinFileApplicant) => {
    setSelectedApplicant(applicant);
    setIsScoring(true);
    setScoreResults(null);

    setTimeout(() => {
      // Simulate AI scoring
      const upiScore = applicant.upiData.consistencyScore * 0.3 + 
                       (applicant.upiData.monthlyTransactions / 2) * 0.2 +
                       (applicant.upiData.merchantCategories * 2) * 0.15;
      const psychoScore = applicant.psychometric ? 
                          (applicant.psychometric.financialDiscipline * 0.5 + 
                           applicant.psychometric.futureOrientation * 0.3 +
                           (100 - applicant.psychometric.riskTolerance) * 0.2) : 50;
      const gstScore = applicant.gstData ? 
                       (applicant.gstData.filingConsistency * 0.6 + 
                        Math.min(applicant.gstData.yearsInBusiness * 10, 40)) : 0;
      const deviceScore = Math.min((applicant.deviceData.financialApps * 8) + 
                          (applicant.deviceData.appInstalls / 3), 100);

      const altScore = Math.round(
        upiScore * 0.35 + 
        psychoScore * 0.25 + 
        (gstScore || deviceScore) * 0.25 +
        deviceScore * 0.15
      );

      const finalScore = Math.min(Math.max(altScore + 550, 550), 850);

      setScoreResults({
        altCreditScore: finalScore,
        scoreBreakdown: {
          upiVelocity: Math.round(upiScore),
          psychometric: Math.round(psychoScore),
          businessData: Math.round(gstScore || 0),
          digitalFootprint: Math.round(deviceScore)
        },
        riskBand: finalScore >= 720 ? 'LOW' : finalScore >= 650 ? 'MEDIUM' : 'HIGH',
        recommendation: finalScore >= 680 ? 'APPROVE' : finalScore >= 620 ? 'APPROVE_WITH_CONDITIONS' : 'MANUAL_REVIEW',
        maxLoanAmount: finalScore >= 720 ? 200000 : finalScore >= 680 ? 100000 : 50000,
        interestRate: finalScore >= 720 ? 14 : finalScore >= 680 ? 18 : 24,
        signals: [
          { type: 'positive', text: `${applicant.upiData.monthlyTransactions} UPI transactions/month indicates active financial behavior` },
          { type: 'positive', text: `Consistency score ${applicant.upiData.consistencyScore}% shows stable income pattern` },
          applicant.upiData.salaryCredits > 0 ? 
            { type: 'positive', text: `${applicant.upiData.salaryCredits} salary credits detected — employment verified` } :
            { type: 'neutral', text: 'No regular salary credits — likely self-employed/gig worker' },
          applicant.psychometric?.financialDiscipline && applicant.psychometric.financialDiscipline > 70 ?
            { type: 'positive', text: `High financial discipline score (${applicant.psychometric.financialDiscipline}) from psychometric assessment` } :
            { type: 'neutral', text: 'Average financial discipline — standard monitoring recommended' },
          applicant.gstData ?
            { type: 'positive', text: `GST filing consistency ${applicant.gstData.filingConsistency}% — business is compliant` } :
            { type: 'neutral', text: 'No GST data — individual borrower profile' }
        ].filter(Boolean)
      });
      setIsScoring(false);
    }, 3000);
  };

  const getRiskBandColor = (band: string) => {
    switch (band) {
      case 'LOW': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'HIGH': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Alternative Credit Scoring Demo</h1>
              <p className="text-sm text-white/50">AI-Powered Scoring for 190M+ New-to-Credit Indians</p>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            Live Demo
          </Badge>
        </div>
      </header>

      <div className="p-8">
        {/* Data Sources */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-white">UPI Velocity</p>
                <p className="text-xs text-white/50">Transaction patterns</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-white">Psychometrics</p>
                <p className="text-xs text-white/50">Behavioral signals</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">GST Data</p>
                <p className="text-xs text-white/50">Business health</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Activity className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-white">Device Data</p>
                <p className="text-xs text-white/50">Digital footprint</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-sm font-semibold text-white">E-Commerce</p>
                <p className="text-xs text-white/50">Purchase history</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Applicant Selection */}
          <div className="col-span-4">
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Thin-File Applicants
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {mockApplicants.map((applicant) => (
                  <motion.div
                    key={applicant.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedApplicant?.id === applicant.id
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => !isScoring && setSelectedApplicant(applicant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{applicant.name}</p>
                      {applicant.bureauScore ? (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          Bureau: {applicant.bureauScore}
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          No Bureau History
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/50 mb-3">
                      <span>{applicant.occupation}</span>
                      <span>{applicant.city}</span>
                      <span>Age: {applicant.age}</span>
                      <span>Income: ₹{applicant.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="text-[10px] border-blue-400/30 text-blue-400">
                        {applicant.upiData.monthlyTransactions} UPI/mo
                      </Badge>
                      {applicant.gstData && (
                        <Badge variant="outline" className="text-[10px] border-emerald-400/30 text-emerald-400">
                          GST Registered
                        </Badge>
                      )}
                      {applicant.psychometric && (
                        <Badge variant="outline" className="text-[10px] border-purple-400/30 text-purple-400">
                          Psychometric ✓
                        </Badge>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-purple-500 hover:bg-purple-600"
                      onClick={(e) => { e.stopPropagation(); runScoring(applicant); }}
                      disabled={isScoring}
                    >
                      <Brain className="w-4 h-4 mr-1" /> Generate Alt Score
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Scoring Results */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              {!selectedApplicant && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-96 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Target className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Select an applicant to generate alternative credit score</p>
                  </div>
                </motion.div>
              )}

              {selectedApplicant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Input Data */}
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader className="border-b border-white/10 pb-3">
                      <CardTitle className="text-white">Input Signals — {selectedApplicant.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {/* UPI Data */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Smartphone className="w-5 h-5 text-blue-400" />
                            <span className="font-semibold text-white">UPI Data</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/50">Transactions/mo</span>
                              <span className="text-white">{selectedApplicant.upiData.monthlyTransactions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Avg Amount</span>
                              <span className="text-white">₹{selectedApplicant.upiData.avgAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Merchant Types</span>
                              <span className="text-white">{selectedApplicant.upiData.merchantCategories}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Consistency</span>
                              <span className="text-blue-400">{selectedApplicant.upiData.consistencyScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Psychometric */}
                        {selectedApplicant.psychometric && (
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Brain className="w-5 h-5 text-purple-400" />
                              <span className="font-semibold text-white">Psychometric</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Risk Tolerance</span>
                                <span className="text-white">{selectedApplicant.psychometric.riskTolerance}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Fin. Discipline</span>
                                <span className="text-purple-400">{selectedApplicant.psychometric.financialDiscipline}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Future Orient.</span>
                                <span className="text-white">{selectedApplicant.psychometric.futureOrientation}%</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* GST or Device Data */}
                        {selectedApplicant.gstData ? (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Building2 className="w-5 h-5 text-emerald-400" />
                              <span className="font-semibold text-white">GST Data</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Monthly Turnover</span>
                                <span className="text-white">₹{selectedApplicant.gstData.monthlyTurnover.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Filing Consistency</span>
                                <span className="text-emerald-400">{selectedApplicant.gstData.filingConsistency}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Years in Business</span>
                                <span className="text-white">{selectedApplicant.gstData.yearsInBusiness}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Activity className="w-5 h-5 text-amber-400" />
                              <span className="font-semibold text-white">Device Data</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Device Age</span>
                                <span className="text-white">{selectedApplicant.deviceData.deviceAge} months</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">App Installs</span>
                                <span className="text-white">{selectedApplicant.deviceData.appInstalls}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Financial Apps</span>
                                <span className="text-amber-400">{selectedApplicant.deviceData.financialApps}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scoring Animation */}
                  {isScoring && (
                    <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Brain className="w-10 h-10 text-purple-400" />
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="absolute inset-0 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold mb-2">AI Scoring Engine Processing...</p>
                            <div className="space-y-1 text-sm text-white/60">
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                ✓ Analyzing UPI transaction velocity...
                              </motion.p>
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                                ✓ Processing psychometric responses...
                              </motion.p>
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                                ✓ Evaluating digital behavior patterns...
                              </motion.p>
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                                ✓ Computing alternative credit score...
                              </motion.p>
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                                ✓ Generating lending recommendation...
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Score Results */}
                  {scoreResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Main Score Card */}
                      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                              <p className="text-sm text-white/50 mb-2">Alternative Credit Score</p>
                              <p className="text-6xl font-bold text-white">{scoreResults.altCreditScore}</p>
                              <Badge className={`mt-2 ${getRiskBandColor(scoreResults.riskBand)}`}>
                                {scoreResults.riskBand} RISK
                              </Badge>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-white/50 mb-3">Score Breakdown</p>
                              <div className="space-y-3">
                                {Object.entries(scoreResults.scoreBreakdown).map(([key, value]: [string, any]) => (
                                  <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                      <span className="text-white">{value}/100</span>
                                    </div>
                                    <Progress value={value} className="h-2" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recommendation */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className={`border ${
                          scoreResults.recommendation === 'APPROVE' ? 'bg-emerald-500/10 border-emerald-500/30' :
                          scoreResults.recommendation === 'APPROVE_WITH_CONDITIONS' ? 'bg-amber-500/10 border-amber-500/30' :
                          'bg-red-500/10 border-red-500/30'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              {scoreResults.recommendation === 'APPROVE' ? (
                                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                              ) : scoreResults.recommendation === 'APPROVE_WITH_CONDITIONS' ? (
                                <AlertTriangle className="w-8 h-8 text-amber-400" />
                              ) : (
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                              )}
                              <div>
                                <p className="font-semibold text-white">Recommendation</p>
                                <p className={`text-sm ${
                                  scoreResults.recommendation === 'APPROVE' ? 'text-emerald-400' :
                                  scoreResults.recommendation === 'APPROVE_WITH_CONDITIONS' ? 'text-amber-400' :
                                  'text-red-400'
                                }`}>
                                  {scoreResults.recommendation.replace(/_/g, ' ')}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/5 rounded-lg p-2">
                                <p className="text-xs text-white/40">Max Loan</p>
                                <p className="text-lg font-bold text-white">₹{scoreResults.maxLoanAmount.toLocaleString()}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <p className="text-xs text-white/40">Interest Rate</p>
                                <p className="text-lg font-bold text-white">{scoreResults.interestRate}% p.a.</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <p className="text-sm text-white/50 mb-3">AI Signals</p>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {scoreResults.signals.map((signal: any, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-xs">
                                  {signal.type === 'positive' ? (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                                  ) : (
                                    <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                                  )}
                                  <span className="text-white/70">{signal.text}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-3 mt-8">
        <div className="flex justify-between items-center text-xs text-white/30">
          <span>DiscvrAI — Alternative Credit Scoring Platform</span>
          <span>Demo Data — Serving 190M+ New-to-Credit Indians</span>
        </div>
      </footer>
    </div>
  );
};

export default NbfcAltCreditDemo;
