import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Shield, CheckCircle2, XCircle, AlertTriangle, Camera,
  MapPin, FileText, Fingerprint, Brain, User, Clock, Zap,
  Eye, Scan, UserCheck, BadgeCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface KycCandidate {
  id: string;
  name: string;
  aadhaarLast4: string;
  panNumber: string;
  applicationId: string;
  loanType: string;
  requestedAmount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

const mockCandidates: KycCandidate[] = [
  { id: '1', name: 'Amit Kumar Singh', aadhaarLast4: '4532', panNumber: 'BXPS1234K', applicationId: 'PL-2026-48291', loanType: 'Personal Loan', requestedAmount: 350000, status: 'pending' },
  { id: '2', name: 'Priya Sharma', aadhaarLast4: '8821', panNumber: 'AHPS5678M', applicationId: 'HL-2026-12847', loanType: 'Home Loan', requestedAmount: 4500000, status: 'pending' },
  { id: '3', name: 'Rajesh Verma', aadhaarLast4: '3367', panNumber: 'CVPV9012R', applicationId: 'BL-2026-39481', loanType: 'Business Loan', requestedAmount: 1200000, status: 'pending' },
];

const NbfcKycDemo: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<KycCandidate | null>(null);
  const [kycStep, setKycStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [kycResults, setKycResults] = useState<any>(null);

  const startKyc = (candidate: KycCandidate) => {
    setSelectedCandidate(candidate);
    setKycStep(1);
    setIsProcessing(true);
    setKycResults(null);

    // Simulate step-by-step KYC process
    const steps = [1, 2, 3, 4, 5, 6];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setKycStep(step);
        if (step === 6) {
          setIsProcessing(false);
          setKycResults({
            livenessScore: 98.7,
            deepfakeScore: 2.1,
            faceMatch: 99.2,
            documentValidity: 'Valid',
            geoLocation: { lat: 19.0760, lng: 72.8777, city: 'Mumbai', verified: true },
            aadhaarVerified: true,
            panVerified: true,
            nameMatch: 98.5,
            overallStatus: 'APPROVED',
            processingTime: '47 seconds'
          });
        }
      }, (index + 1) * 1200);
    });
  };

  const kycSteps = [
    { label: 'Initializing Session', icon: Camera, description: 'Establishing secure video connection' },
    { label: 'Liveness Detection', icon: Eye, description: 'Anti-deepfake challenge (blink, turn head)' },
    { label: 'Face Capture', icon: User, description: 'High-resolution facial capture' },
    { label: 'Document Scan', icon: FileText, description: 'OCR on Aadhaar & PAN' },
    { label: 'Geo-Verification', icon: MapPin, description: 'GPS location & IP validation' },
    { label: 'AI Verification', icon: Brain, description: 'Cross-referencing with government DBs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Video KYC Demo</h1>
              <p className="text-sm text-white/50">RBI-Compliant V-KYC with Anti-Deepfake AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              RBI Master Direction Compliant
            </Badge>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
              Live Demo
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Compliance Badges */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">Anti-Deepfake</p>
                <p className="text-xs text-white/50">Active liveness detection</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-white">Geotagging</p>
                <p className="text-xs text-white/50">GPS + IP verification</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Fingerprint className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-white">Aadhaar OTP</p>
                <p className="text-xs text-white/50">UIDAI e-KYC integration</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-white">&lt; 2 Minutes</p>
                <p className="text-xs text-white/50">End-to-end processing</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Candidate Queue */}
          <div className="col-span-4">
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  KYC Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {mockCandidates.map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCandidate?.id === candidate.id
                        ? 'bg-emerald-500/20 border border-emerald-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => !isProcessing && setSelectedCandidate(candidate)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{candidate.name}</p>
                      <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                        {candidate.applicationId}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                      <span>Aadhaar: ****{candidate.aadhaarLast4}</span>
                      <span>PAN: {candidate.panNumber}</span>
                      <span>{candidate.loanType}</span>
                      <span>₹{candidate.requestedAmount.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600"
                      onClick={(e) => { e.stopPropagation(); startKyc(candidate); }}
                      disabled={isProcessing}
                    >
                      <Video className="w-4 h-4 mr-1" /> Start V-KYC
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* KYC Process Visualization */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              {!selectedCandidate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-96 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Select a candidate to initiate Video KYC</p>
                  </div>
                </motion.div>
              )}

              {selectedCandidate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Video Feed Mockup */}
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Video Frame */}
                        <div className="aspect-video bg-slate-800 rounded-xl relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {isProcessing ? (
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-center"
                              >
                                <Scan className="w-20 h-20 text-emerald-400 mx-auto mb-2" />
                                <p className="text-white/60 text-sm">Processing...</p>
                              </motion.div>
                            ) : kycResults ? (
                              <div className="text-center">
                                <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-2" />
                                <p className="text-emerald-400 font-semibold">KYC Complete</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Camera className="w-16 h-16 text-white/30 mx-auto mb-2" />
                                <p className="text-white/40 text-sm">Video Feed</p>
                              </div>
                            )}
                          </div>
                          {isProcessing && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-red-500 text-white animate-pulse">
                                ● LIVE
                              </Badge>
                            </div>
                          )}
                          {/* Face Detection Overlay */}
                          {isProcessing && kycStep >= 2 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 border-4 border-emerald-400/50 rounded-xl m-8"
                            />
                          )}
                        </div>

                        {/* Process Steps */}
                        <div className="space-y-3">
                          {kycSteps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isActive = kycStep === index + 1;
                            const isComplete = kycStep > index + 1;
                            
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0.5 }}
                                animate={{ 
                                  opacity: isComplete || isActive ? 1 : 0.5,
                                  scale: isActive ? 1.02 : 1
                                }}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                                  isComplete ? 'bg-emerald-500/10 border border-emerald-500/30' :
                                  isActive ? 'bg-blue-500/10 border border-blue-500/30' :
                                  'bg-white/5 border border-white/10'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isComplete ? 'bg-emerald-500' :
                                  isActive ? 'bg-blue-500' : 'bg-white/10'
                                }`}>
                                  {isComplete ? (
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  ) : (
                                    <StepIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${
                                    isComplete ? 'text-emerald-400' :
                                    isActive ? 'text-blue-400' : 'text-white/60'
                                  }`}>{step.label}</p>
                                  <p className="text-xs text-white/40">{step.description}</p>
                                </div>
                                {isActive && (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full"
                                  />
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Results Panel */}
                  {kycResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
                        <CardHeader className="border-b border-white/10 pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                              <BadgeCheck className="w-5 h-5 text-emerald-400" />
                              KYC Verification Results
                            </CardTitle>
                            <Badge className="bg-emerald-500 text-white">
                              {kycResults.overallStatus}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div className="bg-white/5 rounded-lg p-3">
                              <p className="text-xs text-white/40 mb-1">Liveness Score</p>
                              <p className="text-xl font-bold text-emerald-400">{kycResults.livenessScore}%</p>
                              <p className="text-xs text-emerald-400/70">Human verified</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <p className="text-xs text-white/40 mb-1">Deepfake Risk</p>
                              <p className="text-xl font-bold text-emerald-400">{kycResults.deepfakeScore}%</p>
                              <p className="text-xs text-emerald-400/70">Very Low</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <p className="text-xs text-white/40 mb-1">Face Match</p>
                              <p className="text-xl font-bold text-emerald-400">{kycResults.faceMatch}%</p>
                              <p className="text-xs text-emerald-400/70">Aadhaar photo match</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <p className="text-xs text-white/40 mb-1">Processing Time</p>
                              <p className="text-xl font-bold text-white">{kycResults.processingTime}</p>
                              <p className="text-xs text-white/50">End-to-end</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <div>
                                <p className="text-sm text-white">Aadhaar Verified</p>
                                <p className="text-xs text-white/50">UIDAI e-KYC success</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <div>
                                <p className="text-sm text-white">PAN Verified</p>
                                <p className="text-xs text-white/50">NSDL validation pass</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                              <div>
                                <p className="text-sm text-white">{kycResults.geoLocation.city}</p>
                                <p className="text-xs text-white/50">Location verified</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
          <span>DiscvrAI — Video KYC Platform</span>
          <span>Demo Mode — RBI Master Direction 2026 Compliant</span>
        </div>
      </footer>
    </div>
  );
};

export default NbfcKycDemo;
