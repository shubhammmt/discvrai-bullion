import { useState } from 'react';
import { CheckCircle2, Download, Share2, ArrowRight, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { MutualFund } from '@/data/sipMockData';
import { FundDetailSheet } from './FundDetailSheet';

interface TransactionSuccessProps {
  type: 'sip' | 'onetime';
  fundName: string;
  fund?: MutualFund;
  amount: number;
  units?: string;
  nav?: number;
  frequency?: string;
  startDate?: Date;
  stepUpPercent?: number;
  bankMandate?: string;
  goalTag?: string;
  transactionId?: string;
  onNewPurchase?: () => void;
  onViewPortfolio?: () => void;
  onInvestInFund?: (fund: MutualFund, mode: 'sip' | 'onetime') => void;
}

export function TransactionSuccess({
  type, fundName, fund, amount, units, nav, frequency, startDate, stepUpPercent,
  bankMandate, goalTag, transactionId, onNewPurchase, onViewPortfolio, onInvestInFund,
}: TransactionSuccessProps) {
  const txId = transactionId || `order_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const [showFundDetail, setShowFundDetail] = useState(false);

  const copyTxId = () => {
    navigator.clipboard.writeText(txId);
    toast.success('Transaction ID copied');
  };

  return (
    <div className="space-y-6 py-4">
      {/* Success Icon & Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-sip-action-success-light mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-sip-action-success" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {type === 'sip' ? 'SIP Created Successfully!' : 'Investment Confirmed!'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your {type === 'sip' ? 'SIP' : 'investment'} in <span className="font-semibold text-foreground">{fundName}</span> has been confirmed.
          </p>
        </div>
      </div>

      {/* Transaction Details Card */}
      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Transaction Details</span>
          <Badge variant="secondary" className="text-[10px] bg-sip-action-success-light text-sip-action-success-foreground">
            ✅ Confirmed
          </Badge>
        </div>
        <Separator />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Amount</p>
            <p className="font-bold text-foreground text-lg">₹{amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Type</p>
            <Badge variant={type === 'sip' ? 'default' : 'secondary'} className="text-xs mt-1">
              {type === 'sip' ? '🔄 SIP' : '⚡ One-Time'}
            </Badge>
          </div>
          {units && nav && (
            <>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Est. Units</p>
                <p className="font-semibold text-foreground">{units}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">NAV</p>
                <p className="font-semibold text-foreground">₹{nav.toLocaleString()}</p>
              </div>
            </>
          )}
          {type === 'sip' && frequency && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Frequency</p>
              <p className="font-semibold text-foreground capitalize">{frequency}</p>
            </div>
          )}
          {startDate && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">{type === 'sip' ? 'Start Date' : 'Date'}</p>
              <p className="font-semibold text-foreground">{format(startDate, 'dd MMM yyyy')}</p>
            </div>
          )}
          {type === 'sip' && stepUpPercent !== undefined && stepUpPercent > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Step-Up</p>
              <p className="font-semibold text-foreground">{stepUpPercent}% yearly</p>
            </div>
          )}
          {bankMandate && (
            <div className="col-span-2">
              <p className="text-[10px] text-muted-foreground uppercase">Bank</p>
              <p className="font-semibold text-foreground text-xs">{bankMandate}</p>
            </div>
          )}
          {goalTag && (
            <div className="col-span-2">
              <p className="text-[10px] text-muted-foreground uppercase">Goal</p>
              <Badge variant="outline" className="text-xs mt-0.5">{goalTag}</Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* Transaction ID */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Transaction ID</p>
            <p className="text-xs font-mono text-foreground mt-0.5">{txId}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={copyTxId}>
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* What's Next */}
      {type === 'sip' && (
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 space-y-1.5">
          <p className="text-xs font-semibold text-foreground">📅 What happens next?</p>
          <ul className="text-[11px] text-muted-foreground space-y-1">
            <li>• Your first installment of ₹{amount.toLocaleString()} will be debited on {startDate ? format(startDate, 'dd MMM yyyy') : 'the start date'}</li>
            <li>• Units will be allotted within 1-2 business days</li>
            {stepUpPercent && stepUpPercent > 0 && (
              <li>• Amount will increase by {stepUpPercent}% annually starting next year</li>
            )}
            <li>• You can pause or modify your SIP anytime from the Manage tab</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onNewPurchase}>
          <ArrowRight className="w-4 h-4 mr-1" /> New Investment
        </Button>
        {onViewPortfolio && (
          <Button className="flex-1" onClick={onViewPortfolio}>
            View Portfolio
          </Button>
        )}
      </div>
    </div>
  );
}
