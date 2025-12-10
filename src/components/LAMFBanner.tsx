import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, ArrowRight, X } from 'lucide-react';

const LAMFBanner = () => {
  const navigate = useNavigate();
  const [lamfStatus, setLamfStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check localStorage for LAMF status
    const status = localStorage.getItem('lamf_status') as 'not_started' | 'in_progress' | 'completed' | null;
    if (status) {
      setLamfStatus(status);
    }
    
    // Check if banner was dismissed
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

  const rateComparisons = [
    { label: 'Auto Loan', rate: '12-15%', color: 'text-orange-400' },
    { label: 'Consumer Loan', rate: '14-28%', color: 'text-orange-500' },
    { label: 'Credit Card', rate: '24-36%', color: 'text-red-500' },
  ];

  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Title and badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="text-sm md:text-base font-semibold text-foreground">
                Digital Loan Against Mutual Funds (LAMF)
              </h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs md:text-sm text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span>Money credited within 2 working hours</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">No CIBIL impact</span>
            </div>
          </div>

          {/* Center: Rate comparison */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {rateComparisons.map((item) => (
              <div key={item.label} className="text-center px-2">
                <div className={`text-xs font-medium ${item.color} line-through opacity-70`}>{item.rate}</div>
                <div className="text-[10px] text-muted-foreground">{item.label}</div>
              </div>
            ))}
            <div className="text-center px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/30">
              <div className="text-lg md:text-xl font-bold text-primary">10.4%</div>
              <div className="text-[10px] text-primary/80 font-medium">LAMF Rate</div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAction}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-6 py-2 text-sm font-medium"
            >
              {lamfStatus === 'not_started' ? 'Start Now' : 'Resume / Manage'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dismiss button */}
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default LAMFBanner;
