import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Minus, Plus, ChevronDown, Pencil, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PurchaseSuccessScreen } from "./PurchaseSuccessScreen";
import { PaymentFailureScreen } from "./PaymentFailureScreen";

interface UnifiedBuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  currentPrice: number;
  onPurchaseComplete?: (holdings: { gold: number; silver: number }) => void;
}

type BuyMode = "sip" | "onetime";
type Frequency = "daily" | "weekly" | "monthly";
type OneTimeMode = "amount" | "grams";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Metal-specific configuration
const metalConfig = {
  gold: {
    name: "Gold",
    icon: "🪙",
    sip: {
      daily: { min: 50, max: 2000, step: 50 },
      weekly: { min: 1500, max: 25000, step: 100 },
      monthly: { min: 1500, max: 25000, step: 100 }
    },
    oneTime: {
      amount: { min: 10, max: 100000, step: 10 },
      grams: { min: 0.1, max: 50, step: 1 }
    }
  },
  silver: {
    name: "Silver",
    icon: "🥈",
    sip: {
      daily: { min: 10, max: 5000, step: 5 },
      weekly: { min: 750, max: 25000, step: 50 },
      monthly: { min: 500, max: 25000, step: 50 }
    },
    oneTime: {
      amount: { min: 10, max: 100000, step: 10 },
      grams: { min: 1, max: 1300, step: 1 }
    }
  }
};

export function UnifiedBuyModal({ open, onOpenChange, metal, currentPrice, onPurchaseComplete }: UnifiedBuyModalProps) {
  const config = metalConfig[metal];
  
  const [mode, setMode] = useState<BuyMode>("sip");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [oneTimeMode, setOneTimeMode] = useState<OneTimeMode>("amount");
  const [sipAmount, setSipAmount] = useState(config.sip.daily.min);
  const [oneTimeAmount, setOneTimeAmount] = useState(config.oneTime.amount.min);
  const [grams, setGrams] = useState(config.oneTime.grams.min);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [stepUpEnabled, setStepUpEnabled] = useState(true);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [failureType, setFailureType] = useState<"payment_failed" | "order_failed">("payment_failed");
  const [purchaseGrams, setPurchaseGrams] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");

  // Reset values when metal or frequency changes
  useEffect(() => {
    const sipConfig = config.sip[frequency];
    setSipAmount(sipConfig.min);
  }, [metal, frequency]);

  useEffect(() => {
    setOneTimeAmount(config.oneTime.amount.min);
    setGrams(config.oneTime.grams.min);
  }, [metal]);

  // Reset one-time values when switching modes
  useEffect(() => {
    if (oneTimeMode === "amount") {
      setOneTimeAmount(config.oneTime.amount.min);
    } else {
      setGrams(config.oneTime.grams.min);
    }
  }, [oneTimeMode, metal]);

  const getSipConfig = () => config.sip[frequency];
  const getOneTimeAmountConfig = () => config.oneTime.amount;
  const getOneTimeGramsConfig = () => config.oneTime.grams;

  // Calculate projected returns (simplified 5-year projection with ~10% annual return)
  const calculateProjection = () => {
    if (mode === "sip") {
      const periodsPerYear = frequency === "daily" ? 365 : frequency === "weekly" ? 52 : 12;
      const totalInvestment = sipAmount * periodsPerYear * 5;
      const annualReturn = 0.10;
      
      // Simple compound calculation with step-up
      let projectedValue = 0;
      let yearlyAmount = sipAmount * periodsPerYear;
      
      for (let year = 1; year <= 5; year++) {
        projectedValue = (projectedValue + yearlyAmount) * (1 + annualReturn);
        if (stepUpEnabled) {
          yearlyAmount *= (1 + stepUpPercent / 100);
        }
      }
      
      const totalInvested = stepUpEnabled 
        ? Array.from({ length: 5 }, (_, i) => sipAmount * periodsPerYear * Math.pow(1 + stepUpPercent / 100, i)).reduce((a, b) => a + b, 0)
        : totalInvestment;
      
      return {
        projected: Math.round(projectedValue),
        invested: Math.round(totalInvested),
        earnings: Math.round(projectedValue - totalInvested)
      };
    } else {
      // One-time purchase calculation
      const investment = oneTimeMode === "amount" 
        ? oneTimeAmount 
        : grams * currentPrice;
      const projected = investment * Math.pow(1.10, 5);
      return {
        projected: Math.round(projected),
        invested: Math.round(investment),
        earnings: Math.round(projected - investment)
      };
    }
  };

  const projection = calculateProjection();

  const handleIncrement = () => {
    if (mode === "sip") {
      const sipConfig = getSipConfig();
      setSipAmount(prev => Math.min(prev + sipConfig.step, sipConfig.max));
    } else if (oneTimeMode === "amount") {
      const amountConfig = getOneTimeAmountConfig();
      setOneTimeAmount(prev => Math.min(prev + amountConfig.step, amountConfig.max));
    } else {
      const gramsConfig = getOneTimeGramsConfig();
      setGrams(prev => Math.min(prev + gramsConfig.step, gramsConfig.max));
    }
  };

  const handleDecrement = () => {
    if (mode === "sip") {
      const sipConfig = getSipConfig();
      setSipAmount(prev => Math.max(prev - sipConfig.step, sipConfig.min));
    } else if (oneTimeMode === "amount") {
      const amountConfig = getOneTimeAmountConfig();
      setOneTimeAmount(prev => Math.max(prev - amountConfig.step, amountConfig.min));
    } else {
      const gramsConfig = getOneTimeGramsConfig();
      setGrams(prev => Math.max(prev - gramsConfig.step, gramsConfig.min));
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (mode === "sip") {
      setSipAmount(value[0]);
    } else if (oneTimeMode === "amount") {
      setOneTimeAmount(value[0]);
    } else {
      setGrams(value[0]);
    }
  };

  const handleProceed = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // Simulate random failure for demo (10% chance)
    const shouldFail = Math.random() < 0.1;
    if (shouldFail) {
      setFailureType(Math.random() < 0.5 ? "payment_failed" : "order_failed");
      setIsFailure(true);
      return;
    }
    
    // Calculate purchased grams and amount
    const finalAmount = mode === "sip" 
      ? sipAmount 
      : oneTimeMode === "amount" 
        ? oneTimeAmount 
        : grams * currentPrice;
    const finalGrams = mode === "sip"
      ? sipAmount / currentPrice
      : oneTimeMode === "grams"
        ? grams
        : oneTimeAmount / currentPrice;
    
    setPurchaseAmount(finalAmount);
    setPurchaseGrams(finalGrams);
    setTransactionId(`BUL-${Date.now().toString(36).toUpperCase()}`);
    setIsSuccess(true);
    
    onPurchaseComplete?.({ 
      gold: metal === "gold" ? finalGrams : 0, 
      silver: metal === "silver" ? finalGrams : 0 
    });
  };

  const handleClose = () => {
    setMode("sip");
    setFrequency("daily");
    setOneTimeMode("amount");
    setSipAmount(config.sip.daily.min);
    setOneTimeAmount(config.oneTime.amount.min);
    setGrams(config.oneTime.grams.min);
    setIsSuccess(false);
    setIsFailure(false);
    onOpenChange(false);
  };
  
  const handleRetry = () => {
    setIsFailure(false);
    handleProceed();
  };

  const formatIndianNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  const getSliderConfig = () => {
    if (mode === "sip") {
      const sipConfig = getSipConfig();
      return { min: sipConfig.min, max: sipConfig.max, step: sipConfig.step, value: sipAmount };
    } else if (oneTimeMode === "amount") {
      const amountConfig = getOneTimeAmountConfig();
      return { min: amountConfig.min, max: amountConfig.max, step: amountConfig.step, value: oneTimeAmount };
    } else {
      const gramsConfig = getOneTimeGramsConfig();
      return { min: gramsConfig.min, max: gramsConfig.max, step: gramsConfig.step, value: grams };
    }
  };

  // Calculate equivalent values for display
  const getEquivalentDisplay = () => {
    if (oneTimeMode === "amount") {
      const equivalentGrams = oneTimeAmount / currentPrice;
      return `≈ ${equivalentGrams.toFixed(metal === "gold" ? 2 : 1)}g ${config.name}`;
    } else {
      const equivalentAmount = grams * currentPrice;
      return `≈ ₹${formatIndianNumber(Math.round(equivalentAmount))}`;
    }
  };

  const sliderConfig = getSliderConfig();

  // Show Failure Screen
  if (isFailure) {
    return (
      <PaymentFailureScreen
        open={open}
        onOpenChange={handleClose}
        type={failureType}
        amount={mode === "sip" ? sipAmount : oneTimeMode === "amount" ? oneTimeAmount : grams * currentPrice}
        referenceId={`PAY-${Date.now().toString(36).toUpperCase()}`}
        reason={failureType === "payment_failed" ? "Payment timeout - please try again" : "Unable to process gold order"}
        onRetry={handleRetry}
        onTryAnotherMethod={() => {
          setIsFailure(false);
          toast.info("You can try UPI, Net Banking, or Card");
        }}
      />
    );
  }

  // Show Success Screen
  if (isSuccess) {
    return (
      <PurchaseSuccessScreen
        open={open}
        onOpenChange={handleClose}
        type={mode === "sip" ? "sip" : "one_time"}
        metal={metal}
        amount={purchaseAmount}
        grams={purchaseGrams}
        transactionId={transactionId}
        onStartSIP={mode === "onetime" ? () => {
          setIsSuccess(false);
          setMode("sip");
          setSipAmount(Math.max(purchaseAmount, 100));
        } : undefined}
        onViewPortfolio={handleClose}
        onShare={() => toast.success("Share link copied!")}
        bonusAmount={10}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 bg-[#FFF8E7] border-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
          <button onClick={handleClose} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-700 font-medium">
            Need Help?
          </Button>
        </div>

        {/* Projected Returns Section */}
        <div className="px-6 pt-4 pb-8 text-center">
          <p className="text-gray-600 text-sm mb-2">Projected returns in 5 years</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">₹{formatIndianNumber(projection.projected)}</h2>
          <p className="text-gray-500 text-sm">
            Investment: ₹{formatIndianNumber(projection.invested)} | Earning: ₹{formatIndianNumber(projection.earnings)} 🎉
          </p>
        </div>

        {/* Gold Bars Illustration */}
        <div className="flex justify-center pb-4">
          <div className="text-6xl">{metal === "gold" ? "🪙" : "🥈"}</div>
        </div>

        {/* Bottom Panel */}
        <div className="bg-white rounded-t-3xl p-6 space-y-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          {/* Mode Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setMode("sip")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  mode === "sip" ? "bg-[#1B4B43] text-white" : "text-gray-600"
                )}
              >
                Setup SIP
              </button>
              <button
                onClick={() => setMode("onetime")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  mode === "onetime" ? "bg-[#1B4B43] text-white" : "text-gray-600"
                )}
              >
                One Time
              </button>
            </div>
          </div>

          {/* SIP Frequency Selection */}
          {mode === "sip" && (
            <div className="flex justify-center gap-2">
              {(["daily", "weekly", "monthly"] as Frequency[]).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={cn(
                    "px-5 py-2.5 rounded-full border text-sm font-medium transition-all capitalize",
                    frequency === freq 
                      ? "border-[#1B4B43] bg-[#1B4B43]/5 text-[#1B4B43]" 
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {freq}
                </button>
              ))}
            </div>
          )}

          {/* One-Time Mode Selection: Amount vs Grams */}
          {mode === "onetime" && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setOneTimeMode("amount")}
                className={cn(
                  "px-5 py-2.5 rounded-full border text-sm font-medium transition-all",
                  oneTimeMode === "amount"
                    ? "border-[#1B4B43] bg-[#1B4B43]/5 text-[#1B4B43]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                By Amount (₹)
              </button>
              <button
                onClick={() => setOneTimeMode("grams")}
                className={cn(
                  "px-5 py-2.5 rounded-full border text-sm font-medium transition-all",
                  oneTimeMode === "grams"
                    ? "border-[#1B4B43] bg-[#1B4B43]/5 text-[#1B4B43]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                By Grams
              </button>
            </div>
          )}

          {/* Day/Date Selector for SIP */}
          {mode === "sip" && frequency === "weekly" && (
            <div className="flex justify-center items-center gap-2 text-gray-600">
              <span>On every</span>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-auto border-0 p-0 h-auto font-medium text-gray-900 underline underline-offset-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WEEKDAYS.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {mode === "sip" && frequency === "monthly" && (
            <div className="flex justify-center items-center gap-2 text-gray-600">
              <span>On every</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="font-medium text-gray-900 underline underline-offset-2 inline-flex items-center gap-1">
                    {selectedDate ? format(selectedDate, "do") : "1st"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Amount/Gram Display with +/- buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleDecrement}
              className="w-12 h-12 rounded-full border-2 border-[#1B4B43] text-[#1B4B43] flex items-center justify-center hover:bg-[#1B4B43]/5 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-center min-w-[160px]">
              {mode === "sip" ? (
                <span className="text-4xl font-bold text-gray-900">₹{formatIndianNumber(sipAmount)}</span>
              ) : oneTimeMode === "amount" ? (
                <span className="text-4xl font-bold text-gray-900">₹{formatIndianNumber(oneTimeAmount)}</span>
              ) : (
                <span className="text-4xl font-bold text-gray-900">{grams.toFixed(metal === "gold" ? 1 : 0)}g</span>
              )}
            </div>
            <button
              onClick={handleIncrement}
              className="w-12 h-12 rounded-full border-2 border-[#1B4B43] text-[#1B4B43] flex items-center justify-center hover:bg-[#1B4B43]/5 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Equivalent display for one-time purchases */}
          {mode === "onetime" && (
            <p className="text-center text-gray-500 text-sm -mt-2">
              {getEquivalentDisplay()}
            </p>
          )}

          {/* Amount Payable for One-Time */}
          {mode === "onetime" && (
            <p className="text-center text-gray-600">
              Amount payable: <span className="font-semibold text-gray-900">
                ₹{formatIndianNumber(Math.round(
                  (oneTimeMode === "amount" ? oneTimeAmount : grams * currentPrice) * 1.03
                ))}
              </span>
              <span className="text-gray-400 text-xs ml-1">(incl. 3% GST)</span>
            </p>
          )}

          {/* Slider */}
          <div className="px-2">
            <Slider
              value={[sliderConfig.value]}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              onValueChange={handleSliderChange}
              className="w-full [&_[role=slider]]:bg-[#1B4B43] [&_[role=slider]]:border-[#1B4B43] [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
            />
          </div>

          {/* Annual SIP Step-up */}
          {mode === "sip" && (
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="stepup"
                  checked={stepUpEnabled}
                  onCheckedChange={(checked) => setStepUpEnabled(checked as boolean)}
                  className="border-[#1B4B43] data-[state=checked]:bg-[#1B4B43]"
                />
                <label htmlFor="stepup" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Annual SIP Step-up ({stepUpPercent}%)
                </label>
              </div>
              <button className="text-[#1B4B43] text-sm font-medium flex items-center gap-1">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          )}

          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            disabled={isProcessing}
            className="w-full h-14 bg-[#1B4B43] hover:bg-[#163d37] text-white font-semibold text-lg rounded-xl"
          >
            {isProcessing ? "Processing..." : "Proceed"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
