import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

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

  // Calculate comparison data for chart with distinct colors
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
      { 
        name: 'Bank Account', 
        value: bankAmount / 100000, 
        return: bankReturn,
        color: '#ef4444' // Red
      },
      { 
        name: 'Gold', 
        value: goldAmount / 100000, 
        return: goldReturn,
        color: '#f59e0b' // Amber
      },
      { 
        name: 'Category Avg', 
        value: (bankAmount + goldAmount) / 2 / 100000, 
        return: benchmarkReturn,
        color: '#6b7280' // Gray
      },
      { 
        name: 'This Fund', 
        value: fundAmount / 100000, 
        return: expectedReturn,
        color: '#10b981' // Emerald
      }
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
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Returns Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Investment Type Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">Investment type</label>
              <div className="flex border rounded-lg overflow-hidden bg-gray-50">
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    investmentType === 'sip'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Monthly SIP
                </button>
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    investmentType === 'lumpsum'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100'
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
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gray-900">
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
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInvestmentPeriod(Math.max(1, investmentPeriod - 1))}
                  className="h-10 w-10 rounded-full"
                >
                  −
                </Button>
                <span className="text-2xl font-bold min-w-[80px] text-center text-gray-900">
                  {investmentPeriod} Yr
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInvestmentPeriod(Math.min(30, investmentPeriod + 1))}
                  className="h-10 w-10 rounded-full"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {/* Comparison Chart */}
            <div className="h-48 bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {comparisonData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Investment Summary */}
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
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

        {/* Bottom section with disclaimer on the left */}
        <div className="grid lg:grid-cols-2 gap-6 items-end">
          {/* Disclaimer - moved to bottom left */}
          <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <strong>Disclaimer:</strong> These calculations are based on assumed returns and are for illustrative purposes only. 
            Actual returns may vary based on market conditions.
          </div>
          
          {/* Empty space on the right for balance */}
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsCalculator;
