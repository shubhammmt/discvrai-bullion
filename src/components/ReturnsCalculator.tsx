
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
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
          <Calculator className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
          Returns Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-6">
          {/* Mobile: Stacked Layout, Desktop: Side by Side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8">
            
            {/* Input Section - Full width on mobile, left column on desktop */}
            <div className="space-y-4 lg:space-y-6">
              {/* Investment Type Toggle - Mobile Optimized */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Investment type</label>
                <div className="flex border rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setInvestmentType('sip')}
                    className={`flex-1 py-2 lg:py-3 px-3 lg:px-4 text-xs lg:text-sm font-medium transition-colors ${
                      investmentType === 'sip'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Monthly SIP
                  </button>
                  <button
                    onClick={() => setInvestmentType('lumpsum')}
                    className={`flex-1 py-2 lg:py-3 px-3 lg:px-4 text-xs lg:text-sm font-medium transition-colors ${
                      investmentType === 'lumpsum'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Lumpsum
                  </button>
                </div>
              </div>

              {/* Investment Amount - Mobile Optimized */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {investmentType === 'sip' ? 'Monthly investment' : 'Investment amount'}
                </label>
                <div className="space-y-3">
                  <div className="text-xl lg:text-2xl font-bold text-gray-900 text-center lg:text-left">
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
                  {/* Range indicators for mobile */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹{investmentType === 'sip' ? '500' : '5,000'}</span>
                    <span>₹{investmentType === 'sip' ? '1,00,000' : '10,00,000'}</span>
                  </div>
                </div>
              </div>

              {/* Investment Period - Mobile Optimized */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Investment period</label>
                <div className="flex items-center justify-center gap-3 lg:gap-4 bg-gray-50 rounded-lg p-3 lg:p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInvestmentPeriod(Math.max(1, investmentPeriod - 1))}
                    className="h-8 w-8 lg:h-10 lg:w-10 rounded-full text-lg font-bold"
                  >
                    −
                  </Button>
                  <span className="text-xl lg:text-2xl font-bold min-w-[60px] lg:min-w-[80px] text-center text-gray-900">
                    {investmentPeriod} Yr
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInvestmentPeriod(Math.min(30, investmentPeriod + 1))}
                    className="h-8 w-8 lg:h-10 lg:w-10 rounded-full text-lg font-bold"
                  >
                    +
                  </Button>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Results Section - Full width on mobile, right column on desktop */}
            <div className="space-y-4">
              {/* Comparison Chart - Responsive Height */}
              <div className="h-40 lg:h-48 bg-gray-50 rounded-lg p-3 lg:p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <XAxis 
                      dataKey="name" 
                      fontSize={10}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      fontSize={10}
                      tick={{ fill: '#6b7280' }}
                      width={30}
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend - Mobile Optimized Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600 truncate">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Investment Summary - Mobile Optimized */}
              <div className="space-y-3 bg-gray-50 rounded-lg p-3 lg:p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total investment</span>
                  <span className="text-sm lg:text-base font-semibold">{formatAmount(calculatedReturns.totalInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profit</span>
                  <span className="text-sm lg:text-base font-semibold text-green-600">{formatAmount(calculatedReturns.profit)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm lg:text-base font-medium">Total corpus</span>
                    <span className="text-lg lg:text-xl font-bold">{formatAmount(calculatedReturns.maturityAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp size={14} />
                      Absolute return
                    </span>
                    <span className="text-green-600 font-semibold text-sm lg:text-base">
                      {calculatedReturns.absoluteReturn.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer - Mobile Optimized */}
          <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <strong>Disclaimer:</strong> These calculations are based on assumed returns and are for illustrative purposes only. 
            Actual returns may vary based on market conditions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsCalculator;
