
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ReturnsCalculatorProps {
  fundName: string;
  expectedReturn: number; // Annual return percentage
  benchmarkReturn?: number;
}

const ReturnsCalculator = ({ fundName, expectedReturn, benchmarkReturn = 7 }: ReturnsCalculatorProps) => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [calculatedReturns, setCalculatedReturns] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    profit: 0,
    absoluteReturn: 0
  });

  const calculateReturns = () => {
    let totalInvestment = 0;
    let maturityAmount = 0;

    if (investmentType === 'sip') {
      totalInvestment = monthlyAmount * 12 * investmentPeriod;
      const monthlyRate = expectedReturn / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      
      // SIP formula: M = P × [{(1 + i)^n - 1} / i] × (1 + i)
      maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      totalInvestment = lumpAmount;
      // Compound interest formula: A = P(1 + r)^t
      maturityAmount = lumpAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    }

    const profit = maturityAmount - totalInvestment;
    const absoluteReturn = (profit / totalInvestment) * 100;

    setCalculatedReturns({
      totalInvestment,
      maturityAmount,
      profit,
      absoluteReturn
    });
  };

  useEffect(() => {
    calculateReturns();
  }, [investmentType, monthlyAmount, lumpAmount, investmentPeriod, expectedReturn]);

  // Calculate comparison data for chart
  const getComparisonData = () => {
    const bankReturn = 4; // Bank FD rate
    const goldReturn = 8; // Gold average return
    
    let bankAmount = 0;
    let goldAmount = 0;
    let fundAmount = calculatedReturns.maturityAmount;

    if (investmentType === 'sip') {
      const totalInvestment = monthlyAmount * 12 * investmentPeriod;
      
      // Bank
      const bankMonthlyRate = bankReturn / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      bankAmount = monthlyAmount * (((Math.pow(1 + bankMonthlyRate, totalMonths) - 1) / bankMonthlyRate) * (1 + bankMonthlyRate));
      
      // Gold
      const goldMonthlyRate = goldReturn / 100 / 12;
      goldAmount = monthlyAmount * (((Math.pow(1 + goldMonthlyRate, totalMonths) - 1) / goldMonthlyRate) * (1 + goldMonthlyRate));
    } else {
      bankAmount = lumpAmount * Math.pow(1 + bankReturn / 100, investmentPeriod);
      goldAmount = lumpAmount * Math.pow(1 + goldReturn / 100, investmentPeriod);
    }

    return [
      { name: 'Bank Account', value: bankAmount / 100000, return: bankReturn },
      { name: 'Gold', value: goldAmount / 100000, return: goldReturn },
      { name: 'Category Avg', value: (bankAmount + goldAmount) / 2 / 100000, return: benchmarkReturn },
      { name: 'This Fund', value: fundAmount / 100000, return: expectedReturn }
    ];
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  const comparisonData = getComparisonData();

  return (
    <Card className="bg-white/70 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          {fundName} Returns Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Investment Type Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">Investment type</label>
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    investmentType === 'sip'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Monthly SIP
                </button>
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    investmentType === 'lumpsum'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Lumpsum
                </button>
              </div>
            </div>

            {/* Investment Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {investmentType === 'sip' ? 'Monthly investment' : 'Investment amount'}
              </label>
              <div className="space-y-2">
                <div className="text-xl font-semibold">
                  ₹{investmentType === 'sip' ? monthlyAmount.toLocaleString() : lumpAmount.toLocaleString()}
                </div>
                <Slider
                  value={[investmentType === 'sip' ? monthlyAmount : lumpAmount]}
                  onValueChange={(value) => {
                    if (investmentType === 'sip') {
                      setMonthlyAmount(value[0]);
                    } else {
                      setLumpAmount(value[0]);
                    }
                  }}
                  max={investmentType === 'sip' ? 100000 : 1000000}
                  min={investmentType === 'sip' ? 500 : 5000}
                  step={investmentType === 'sip' ? 500 : 5000}
                  className="w-full"
                />
              </div>
            </div>

            {/* Investment Period */}
            <div>
              <label className="block text-sm font-medium mb-2">Investment period</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInvestmentPeriod(Math.max(1, investmentPeriod - 1))}
                >
                  −
                </Button>
                <span className="text-xl font-semibold min-w-[60px] text-center">
                  {investmentPeriod} Yr
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInvestmentPeriod(Math.min(30, investmentPeriod + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {/* Comparison Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Investment Summary */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total investment</span>
                <span className="font-semibold">{formatAmount(calculatedReturns.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit</span>
                <span className="font-semibold text-green-600">{formatAmount(calculatedReturns.profit)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total corpus</span>
                  <span className="text-xl font-bold">{formatAmount(calculatedReturns.maturityAmount)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingUp size={16} />
                    Absolute return
                  </span>
                  <span className="text-green-600 font-semibold">
                    {calculatedReturns.absoluteReturn.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Disclaimer: These calculations are based on assumed returns and are for illustrative purposes only. 
          Actual returns may vary based on market conditions.
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsCalculator;
