import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, ArrowRight, X, Wallet, TrendingUp, IndianRupee } from 'lucide-react';

const LAMFBanner = () => {
  const navigate = useNavigate();
  const [lamfStatus, setLamfStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const status = localStorage.getItem('lamf_status') as 'not_started' | 'in_progress' | 'completed' | null;
    if (status) {
      setLamfStatus(status);
    }
    
    const dismissed = localStorage.getItem('lamf_banner_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleAction = () => {
    if (lamfStatus === 'not_started') {
      localStorage.setItem('lamf_status', 'in_progress');
      setLamfStatus('in_progress');
    }
    navigate('/lamf');
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('lamf_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  const creditLimit = 600000;
  const withdrawnAmount = 40000;
  const utilizationPercent = (withdrawnAmount / creditLimit) * 100;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 border-b border-blue-400/30">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          
          {/* Left: Title and badges */}
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <h3 className="text-base md:text-lg font-bold text-white">
              Loan Against Mutual Funds
            </h3>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full">
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs text-white/90">Money in 2 hours</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full">
                <Shield className="w-3.5 h-3.5 text-green-300" />
                <span className="text-xs text-white/90">No CIBIL impact</span>
              </div>
            </div>
          </div>

          {/* Center: Credit Card Style Display */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            {/* Credit Limit Card */}
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20 shadow-lg">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-white/70" />
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-medium">Credit Limit</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg text-white/80">₹</span>
                <span className="text-2xl md:text-3xl font-bold text-white">6,00,000</span>
              </div>
            </div>

            {/* Withdrawn Amount Card */}
            <div className="relative bg-white/95 rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <IndianRupee className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Cash Withdrawn</span>
              </div>
              <div className="flex items-baseline gap-0.5 mb-2">
                <span className="text-sm text-gray-500">₹</span>
                <span className="text-xl font-bold text-gray-800">40,000</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${utilizationPercent}%` }}
                />
              </div>
            </div>

            {/* Interest Rate Badge */}
            <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-green-500 rounded-xl px-4 py-2.5 shadow-lg">
              <span className="text-[10px] uppercase tracking-wider text-green-900/70 font-medium">Interest Rate</span>
              <span className="text-2xl font-bold text-white">10.4%</span>
              <span className="text-[9px] text-green-900/60">p.a.</span>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAction}
              className="bg-white hover:bg-gray-100 text-blue-600 px-5 md:px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {lamfStatus === 'not_started' ? 'Get Started' : 'Resume / Manage'}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dismiss button */}
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4 text-white/80" />
      </button>
    </div>
  );
};

export default LAMFBanner;
