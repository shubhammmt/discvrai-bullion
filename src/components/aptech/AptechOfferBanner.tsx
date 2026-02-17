import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Gift, Tag, Percent } from 'lucide-react';

interface AptechOfferBannerProps {
  offer: OfferInfo;
  onApply: (offer: OfferInfo) => void;
}

export interface OfferInfo {
  id: string;
  label: string;
  description: string;
  discountPercent: number;
  expiresInMinutes: number;
  type: 'early_bird' | 'scholarship' | 'referral' | 'flash';
}

// Detect applicable offers based on user profile
export function detectOffers(profile: {
  educationalBackground?: string;
  currentStatus?: string;
  startDate?: string;
}): OfferInfo[] {
  const offers: OfferInfo[] = [];

  // Early bird offer — if enrolling within a month
  if (profile.startDate && ['Immediately', 'This month', 'Next month', 'February 2026'].includes(profile.startDate)) {
    offers.push({
      id: 'early_bird',
      label: 'Early Bird Discount',
      description: 'Enroll before batch starts and save!',
      discountPercent: 15,
      expiresInMinutes: 30,
      type: 'early_bird',
    });
  }

  // Merit scholarship — for graduates/post-graduates
  if (profile.educationalBackground && ['Graduate', 'Post Graduate'].includes(profile.educationalBackground)) {
    offers.push({
      id: 'merit_scholarship',
      label: 'Merit Scholarship',
      description: 'Available for graduates with 60%+ marks',
      discountPercent: 20,
      expiresInMinutes: 60,
      type: 'scholarship',
    });
  }

  // Career switcher offer
  if (profile.currentStatus === 'Career Switcher') {
    offers.push({
      id: 'career_switch',
      label: 'Career Switch Offer',
      description: 'Special discount for career changers',
      discountPercent: 10,
      expiresInMinutes: 45,
      type: 'flash',
    });
  }

  // Flash offer (always available as fallback)
  if (offers.length === 0) {
    offers.push({
      id: 'flash_sale',
      label: 'Flash Sale',
      description: 'Limited time offer — act now!',
      discountPercent: 10,
      expiresInMinutes: 20,
      type: 'flash',
    });
  }

  return offers;
}

const AptechOfferBanner = ({ offer, onApply }: AptechOfferBannerProps) => {
  const [timeLeft, setTimeLeft] = useState(offer.expiresInMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const bgGradient = offer.type === 'scholarship'
    ? 'from-purple-500 to-indigo-600'
    : offer.type === 'early_bird'
    ? 'from-orange-500 to-red-500'
    : offer.type === 'referral'
    ? 'from-green-500 to-emerald-600'
    : 'from-pink-500 to-rose-600';

  const icon = offer.type === 'scholarship' ? <Gift className="h-5 w-5" /> :
    offer.type === 'early_bird' ? <Tag className="h-5 w-5" /> :
    <Percent className="h-5 w-5" />;

  return (
    <Card className="overflow-hidden shadow-lg border-0 animate-fade-in">
      <div className={`bg-gradient-to-r ${bgGradient} px-4 py-3 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <p className="font-bold text-sm">{offer.label}</p>
              <p className="text-xs text-white/80">{offer.description}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 text-lg font-bold px-3">
            {offer.discountPercent}% OFF
          </Badge>
        </div>
      </div>
      <CardContent className="p-3 bg-gradient-to-r from-white to-orange-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3.5 w-3.5 text-red-500" />
            <span className="font-medium text-red-600">
              {timeLeft > 0 ? `Expires in ${mins}:${secs.toString().padStart(2, '0')}` : 'Expired'}
            </span>
          </div>
          <button
            onClick={() => onApply(offer)}
            disabled={timeLeft <= 0}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
              timeLeft > 0
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-md'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {timeLeft > 0 ? 'Apply Offer' : 'Expired'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AptechOfferBanner;
