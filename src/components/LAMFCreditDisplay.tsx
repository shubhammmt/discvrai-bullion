import { TrendingUp, IndianRupee } from 'lucide-react';

interface LAMFCreditDisplayProps {
  creditLimit?: number;
  withdrawnAmount?: number;
  interestRate?: number;
}

const LAMFCreditDisplay = ({ 
  creditLimit = 600000, 
  withdrawnAmount = 40000,
  interestRate = 10.4 
}: LAMFCreditDisplayProps) => {
  const utilizationPercent = (withdrawnAmount / creditLimit) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Credit Limit Card */}
        <div className="relative bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-md rounded-xl px-5 py-4 border border-blue-400/20 flex-1 w-full">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider text-blue-300/80 font-medium">Credit Limit</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg text-blue-300/80">₹</span>
            <span className="text-3xl font-bold text-white">{formatCurrency(creditLimit)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Based on your MF portfolio</p>
        </div>

        {/* Withdrawn Amount Card */}
        <div className="relative bg-white rounded-xl px-5 py-4 shadow-lg flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Cash Withdrawn</span>
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-base text-gray-500">₹</span>
            <span className="text-2xl font-bold text-gray-800">{formatCurrency(withdrawnAmount)}</span>
          </div>
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${utilizationPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 text-right">{utilizationPercent.toFixed(1)}% utilized</p>
          </div>
        </div>

        {/* Interest Rate Badge */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl px-5 py-4 shadow-lg min-w-[100px]">
          <span className="text-[10px] uppercase tracking-wider text-green-100/80 font-medium">Interest</span>
          <span className="text-3xl font-bold text-white">{interestRate}%</span>
          <span className="text-xs text-green-100/70">p.a.</span>
        </div>
      </div>
    </div>
  );
};

export default LAMFCreditDisplay;
