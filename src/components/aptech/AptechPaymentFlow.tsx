import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Check, IndianRupee, Clock, Shield, Loader2 } from 'lucide-react';
import type { CourseProgram } from '@/data/aptechCourseData';

interface AptechPaymentFlowProps {
  course: CourseProgram;
  leadName: string;
  onPaymentComplete: (paymentData: PaymentData) => void;
  offer?: { label: string; discountPercent: number };
}

export interface PaymentData {
  courseName: string;
  courseId: string;
  amountPaid: number;
  originalAmount: number;
  emiPlan: string;
  transactionId: string;
  discountApplied?: string;
}

const emiPlans = [
  { label: 'Full Payment', months: 1, interest: 0 },
  { label: '6 Month EMI', months: 6, interest: 0 },
  { label: '12 Month EMI', months: 12, interest: 0 },
  { label: '18 Month EMI', months: 18, interest: 5 },
  { label: '24 Month EMI', months: 24, interest: 8 },
];

const AptechPaymentFlow = ({ course, leadName, onPaymentComplete, offer }: AptechPaymentFlowProps) => {
  const [selectedEmi, setSelectedEmi] = useState(2); // default 12 months
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'confirm' | 'processing'>('select');

  const baseAmount = Math.round((course.priceMin + course.priceMax) / 2);
  const discountAmount = offer ? Math.round(baseAmount * (offer.discountPercent / 100)) : 0;
  const finalAmount = baseAmount - discountAmount;
  const plan = emiPlans[selectedEmi];
  const monthlyEmi = Math.round((finalAmount * (1 + plan.interest / 100)) / plan.months);
  const totalPayable = monthlyEmi * plan.months;

  const handlePay = () => {
    setStep('processing');
    setProcessing(true);
    setTimeout(() => {
      const txnId = `TXN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      onPaymentComplete({
        courseName: course.name,
        courseId: course.id,
        amountPaid: plan.months === 1 ? finalAmount : monthlyEmi,
        originalAmount: baseAmount,
        emiPlan: plan.label,
        transactionId: txnId,
        discountApplied: offer?.label,
      });
      setProcessing(false);
    }, 2000);
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Payment — {course.name}
        </h3>
        <p className="text-blue-100 text-xs mt-0.5">Secure payment powered by Razorpay</p>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Course Summary */}
        <div className="bg-background rounded-lg p-3 border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">{course.name}</p>
              <p className="text-xs text-muted-foreground">{course.brand} • {course.duration}</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-0 text-xs">
              {course.placementRate} placement
            </Badge>
          </div>
          {offer && (
            <div className="mt-2 flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700 border-0 text-xs animate-pulse">
                🎉 {offer.label}
              </Badge>
              <span className="text-xs text-red-600 font-medium">-{offer.discountPercent}% OFF</span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Course Fee</span>
            <span className={offer ? 'line-through text-muted-foreground' : 'font-medium'}>₹{baseAmount.toLocaleString()}</span>
          </div>
          {offer && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({offer.label})</span>
              <span>-₹{discountAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold border-t border-border pt-1.5">
            <span>Total Amount</span>
            <span className="text-blue-700">₹{finalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* EMI Selection */}
        {step === 'select' && (
          <>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Select Payment Plan</p>
              <div className="space-y-1.5">
                {emiPlans.map((p, i) => {
                  const emi = Math.round((finalAmount * (1 + p.interest / 100)) / p.months);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedEmi(i)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all ${
                        selectedEmi === i
                          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                          : 'border-border hover:border-blue-300 bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedEmi === i ? 'border-blue-600' : 'border-muted-foreground/40'
                        }`}>
                          {selectedEmi === i && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <span>{p.label}</span>
                        {p.interest === 0 && p.months > 1 && (
                          <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">No Cost</Badge>
                        )}
                      </div>
                      <span className="font-medium">
                        ₹{emi.toLocaleString()}{p.months > 1 ? '/mo' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={() => setStep('confirm')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
            >
              <IndianRupee className="h-4 w-4 mr-1" />
              Proceed to Pay ₹{(plan.months === 1 ? finalAmount : monthlyEmi).toLocaleString()}
              {plan.months > 1 ? '/mo' : ''}
            </Button>
          </>
        )}

        {/* Confirmation */}
        {step === 'confirm' && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm font-medium text-amber-800">Confirm Payment</p>
              <p className="text-xs text-amber-700 mt-1">
                {leadName}, you're enrolling in <strong>{course.name}</strong> with <strong>{plan.label}</strong>.
                {plan.months > 1 ? ` Monthly EMI: ₹${monthlyEmi.toLocaleString()}/mo for ${plan.months} months.` : ` One-time payment: ₹${finalAmount.toLocaleString()}.`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('select')}>
                Go Back
              </Button>
              <Button onClick={handlePay} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Shield className="h-4 w-4 mr-1" /> Confirm & Pay
              </Button>
            </div>
          </div>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <div className="flex flex-col items-center py-6 gap-3">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium">Processing payment via Razorpay...</p>
            <p className="text-xs text-muted-foreground">Please don't close this window</p>
          </div>
        )}

        {/* Security badges */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> SSL Encrypted</span>
          <span>•</span>
          <span>PCI DSS Compliant</span>
          <span>•</span>
          <span>Razorpay Secure</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AptechPaymentFlow;
