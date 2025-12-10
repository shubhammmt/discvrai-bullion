import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, ArrowRight, X, TrendingDown } from 'lucide-react';
import LAMFCreditDisplay from './LAMFCreditDisplay';

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

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 border-b border-blue-400/30">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6">
          
          {/* Left Section: Info + CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-1">
            {/* Title and badges */}
            <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Loan Against Mutual Funds
              </h3>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium text-white">Money in 2 hours</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span className="text-sm font-medium text-white">No CIBIL impact</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <TrendingDown className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm font-medium text-white">Lowest interest rate</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={handleAction}
              className="bg-white hover:bg-gray-100 text-blue-600 px-5 md:px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {lamfStatus === 'not_started' ? 'Get Started' : 'Resume / Manage'}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Right Section: Credit Display (Desktop: right side, Mobile: below) */}
          <div className="w-full lg:w-auto lg:min-w-[480px]">
            <LAMFCreditDisplay />
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
