import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Shield, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentCardProps {
  amount: string;
  dueDate: string;
  installmentNumber?: number;
}

type PaymentStep = 'details' | 'processing' | 'success';

const PaymentCard: React.FC<PaymentCardProps> = ({ amount, dueDate, installmentNumber = 5 }) => {
  const [step, setStep] = useState<PaymentStep>('details');
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center animate-fade-in">
        <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-bold text-green-700">Payment Successful! ✅</p>
        <p className="text-xs text-green-600 mt-1">₹{amount} paid via {method.toUpperCase()}</p>
        <p className="text-[10px] text-green-500 mt-1">Txn ID: APT-{Date.now().toString().slice(-8)}</p>
        <div className="mt-3 bg-green-100 rounded-lg p-2 text-[11px] text-green-700">
          📧 Receipt sent to your email • Next installment: May 3, 2026
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center animate-fade-in">
        <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-blue-700">Processing Payment...</p>
        <p className="text-xs text-blue-500 mt-1">Please wait, verifying with payment gateway</p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden animate-fade-in shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-white" />
          <span className="text-white font-semibold text-sm">Fee Payment</span>
        </div>
        <div className="flex items-center gap-1 text-white/80">
          <Shield className="h-3 w-3" />
          <span className="text-[10px]">Secure</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Amount */}
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-muted-foreground">Installment {installmentNumber} of 12</span>
          <span className="text-lg font-bold text-foreground">₹{amount}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">Due: {dueDate}</p>

        {/* Payment Methods */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground">Payment Method</p>
          <div className="flex gap-2">
            {([
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'Card' },
              { id: 'netbanking', label: 'Net Banking' },
            ] as const).map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  method === m.id
                    ? 'border-orange-400 bg-orange-50 text-orange-700 font-medium'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* UPI input mock */}
        {method === 'upi' && (
          <input
            placeholder="Enter UPI ID (e.g. rahul@upi)"
            className="w-full text-xs rounded-lg border px-3 py-2 bg-muted/50 focus:outline-none focus:ring-1 focus:ring-orange-400"
            defaultValue="rahul@oksbi"
          />
        )}

        <Button onClick={handlePay} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm h-9">
          <CreditCard className="h-4 w-4 mr-2" /> Pay ₹{amount}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          🔒 Payments secured by Razorpay • PCI-DSS compliant
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
